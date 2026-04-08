import OpenAI from 'openai';
import { SAFEBITE_SYSTEM_PROMPT } from '@/lib/prompts/safebiteSystem';
import type { AnalysisResult } from '@/types/analysis';

// NVIDIA NIM API configuration - Using Llama 4 Maverick (much faster)
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '';
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1';
// Recommended model: meta/llama-4-maverick-17b-128e-instruct (46x faster than gemma)
// Alternative: google/gemma-4-31b-it
const NVIDIA_MODEL = 'meta/llama-4-maverick-17b-128e-instruct';

// Timeout settings
const API_TIMEOUT = 60000; // 1 minute timeout
const MAX_RETRIES = 2;

if (!NVIDIA_API_KEY) {
  console.warn('Warning: NVIDIA_API_KEY environment variable is not set');
}

// Initialize OpenAI client pointing to NVIDIA NIM
const client = new OpenAI({
  apiKey: NVIDIA_API_KEY,
  baseURL: NVIDIA_BASE_URL,
  timeout: API_TIMEOUT,
  maxRetries: MAX_RETRIES,
});

// Helper function to create a timeout promise
function createTimeoutPromise<T>(ms: number): Promise<T> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timed out after ${ms / 1000} seconds. Please try again.`)), ms);
  });
}

interface AnalyzeWithAIParams {
  productData: Record<string, unknown> | null;
  imageBase64: string | null;
  language: string;
  ageGroup: string;
}

function parseAIResponse(responseText: string): AnalysisResult {
  // Strip thinking tags if present
  let cleanedText = responseText.replace(/<thinking>[\s\S]*?<\/thinking>/g, '').trim();

  // Strip markdown code fences
  cleanedText = cleanedText.replace(/```json|```/g, '').trim();

  // Extract JSON object
  const start = cleanedText.indexOf('{');
  const end = cleanedText.lastIndexOf('}');

  if (start === -1 || end === -1) {
    console.error('AI Response (no JSON found):', cleanedText.substring(0, 1000));
    throw new Error('No valid JSON found in response');
  }

  const jsonStr = cleanedText.slice(start, end + 1);

  try {
    const analysis: AnalysisResult = JSON.parse(jsonStr);
    return analysis;
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    console.error('JSON string (first 500 chars):', jsonStr.substring(0, 500));
    console.error('JSON string (last 200 chars):', jsonStr.slice(-200));
    
    // Try to fix common JSON issues
    try {
      // Sometimes the JSON is truncated - try to close it properly
      let fixedJson = jsonStr;
      const openBraces = (jsonStr.match(/{/g) || []).length;
      const closeBraces = (jsonStr.match(/}/g) || []).length;
      const openBrackets = (jsonStr.match(/\[/g) || []).length;
      const closeBrackets = (jsonStr.match(/]/g) || []).length;
      
      if (openBraces > closeBraces || openBrackets > closeBrackets) {
        // Add missing closing brackets
        for (let i = 0; i < openBrackets - closeBrackets; i++) {
          fixedJson += ']';
        }
        for (let i = 0; i < openBraces - closeBraces; i++) {
          fixedJson += '}';
        }
        
        console.log('Attempting to parse fixed JSON...');
        const analysis: AnalysisResult = JSON.parse(fixedJson);
        return analysis;
      }
    } catch (fixError) {
      console.error('Failed to fix JSON:', fixError);
    }
    
    throw new Error('Failed to parse AI response as JSON. The response may have been truncated.');
  }
}

export async function analyzeWithAI({
  productData,
  imageBase64,
  language,
  ageGroup,
}: AnalyzeWithAIParams): Promise<AnalysisResult> {
  const languageInstruction = `Output all text fields in ${language} language. Keep codes and numbers in English.`;
  const ageInstruction = `Focus analysis on age group: ${ageGroup}. Provide specific recommendations for this demographic.`;

  let messages: OpenAI.Chat.ChatCompletionMessageParam[];

  if (imageBase64) {
    // Vision mode for image analysis
    messages = [
      {
        role: 'system',
        content: SAFEBITE_SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${imageBase64}`,
            },
          },
          {
            type: 'text',
            text: `Analyze this food product label/image. ${languageInstruction} ${ageInstruction}

Extract all visible information and provide a complete safety analysis. If some information is not visible, make reasonable inferences based on what can be seen and mark unknown values as null.`,
          },
        ],
      },
    ];
  } else {
    // Text mode for product data analysis
    messages = [
      {
        role: 'system',
        content: SAFEBITE_SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: `Analyze this food product data. ${languageInstruction} ${ageInstruction}

Product Data:
${JSON.stringify(productData, null, 2)}

Provide a complete safety analysis based on the available information.`,
      },
    ];
  }

  console.log(`Calling NVIDIA AI API (${NVIDIA_MODEL})...`);
  const startTime = Date.now();

  try {
    // Use Promise.race to enforce our own timeout
    const apiCall = client.chat.completions.create({
      model: NVIDIA_MODEL,
      messages,
      max_tokens: 8192,
      temperature: 0.3,
      top_p: 0.95,
      stream: false,
    });

    // Race between API call and our timeout
    const response = await Promise.race([
      apiCall,
      createTimeoutPromise<OpenAI.Chat.ChatCompletion>(API_TIMEOUT),
    ]);

    const elapsed = Date.now() - startTime;
    console.log(`NVIDIA AI API response received in ${elapsed}ms`);

    let responseText = response.choices[0]?.message?.content;
    const finishReason = response.choices[0]?.finish_reason;
    
    console.log(`Finish reason: ${finishReason}`);
    console.log(`Response length: ${responseText?.length || 0} characters`);

    if (!responseText) {
      throw new Error('No response from NVIDIA AI. The AI may be experiencing issues.');
    }

    // Warn if response may be truncated
    if (finishReason === 'length') {
      console.warn('AI response was truncated due to max_tokens limit');
    }

    return parseAIResponse(responseText);
  } catch (error: unknown) {
    const elapsed = Date.now() - startTime;
    console.error(`NVIDIA AI API error after ${elapsed}ms:`, error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('timed out')) {
        throw new Error(`AI analysis timed out after ${elapsed / 1000}s. Please try again.`);
      }
      if (error.message.includes('rate limit') || error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      }
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        throw new Error('API authentication failed. Please check the API key.');
      }
      // Re-throw with more context
      throw new Error(`AI analysis failed: ${error.message}`);
    }
    
    throw error;
  }
}
