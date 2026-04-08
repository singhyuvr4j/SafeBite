import OpenAI from 'openai';
import { SAFEBITE_SYSTEM_PROMPT } from '@/lib/prompts/safebiteSystem';
import type { AnalysisResult } from '@/types/analysis';

// NVIDIA NIM API configuration
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '';
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1';
const NVIDIA_MODEL = 'google/gemma-4-31b-it';

if (!NVIDIA_API_KEY) {
  console.warn('Warning: NVIDIA_API_KEY environment variable is not set');
}

// Initialize OpenAI client pointing to NVIDIA NIM
const client = new OpenAI({
  apiKey: NVIDIA_API_KEY,
  baseURL: NVIDIA_BASE_URL,
});

interface AnalyzeWithAIParams {
  productData: Record<string, unknown> | null;
  imageBase64: string | null;
  language: string;
  ageGroup: string;
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

  const response = await client.chat.completions.create({
    model: NVIDIA_MODEL,
    messages,
    max_tokens: 16384,
    temperature: 0.3,
    top_p: 0.95,
    stream: false,
  });

  let responseText = response.choices[0]?.message?.content;

  if (!responseText) {
    throw new Error('No response from NVIDIA AI');
  }

  // Strip thinking tags if present
  responseText = responseText.replace(/<thinking>[\s\S]*?<\/thinking>/g, '').trim();

  // Strip markdown code fences
  responseText = responseText.replace(/```json|```/g, '').trim();

  // Extract JSON object
  const start = responseText.indexOf('{');
  const end = responseText.lastIndexOf('}');

  if (start === -1 || end === -1) {
    console.error('AI Response:', responseText);
    throw new Error('No valid JSON found in response');
  }

  const jsonStr = responseText.slice(start, end + 1);

  try {
    const analysis: AnalysisResult = JSON.parse(jsonStr);
    return analysis;
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    console.error('JSON string:', jsonStr.substring(0, 500));
    throw new Error('Failed to parse AI response as JSON');
  }
}
