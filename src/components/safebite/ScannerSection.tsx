'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAnalysisStore, loadingSteps } from '@/store/analysisStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Barcode,
  Camera,
  Upload,
  Scan,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  CameraOff,
} from 'lucide-react';
import type { AnalysisResult } from '@/types/analysis';

// Dynamic import for QR scanner to avoid SSR issues
let ScannerComponent: React.ComponentType<{
  onScan: (result: { rawValue: string }) => void;
  onError: (error: unknown) => void;
}> | null = null;

// Import scanner dynamically
if (typeof window !== 'undefined') {
  import('@yudiel/react-qr-scanner').then((mod) => {
    ScannerComponent = mod.Scanner;
  });
}

const languages = [
  'English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati',
  'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Odia', 'Assamese', 'Spanish',
  'French', 'German', 'Arabic', 'Chinese', 'Japanese', 'Portuguese', 'Russian',
];

const ageGroups = [
  { value: 'toddler_1_3', label: 'Toddler (1-3 years)' },
  { value: 'child_4_12', label: 'Child (4-12 years)' },
  { value: 'teen_13_17', label: 'Teen (13-17 years)' },
  { value: 'adult', label: 'Adult (18-59 years)' },
  { value: 'pregnant', label: 'Pregnant Women' },
  { value: 'elderly', label: 'Elderly (60+ years)' },
];

export function ScannerSection() {
  const {
    activeTab,
    setActiveTab,
    barcode,
    setBarcode,
    language,
    setLanguage,
    ageGroup,
    setAgeGroup,
    isLoading,
    loadingStep,
    setIsLoading,
    setLoadingStep,
    setAnalysisResult,
    productInfo,
    setProductInfo,
    error,
    setError,
  } = useAnalysisStore();

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scannerReady, setScannerReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Check if scanner is ready
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkScanner = setInterval(() => {
        if (ScannerComponent) {
          setScannerReady(true);
          clearInterval(checkScanner);
        }
      }, 100);
      return () => clearInterval(checkScanner);
    }
  }, []);

  const simulateLoading = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    for (let i = 0; i < loadingSteps.length; i++) {
      setLoadingStep(i);
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));
    }
  };

  const handleBarcodeLookup = async () => {
    if (!barcode.trim()) {
      setError('Please enter a barcode number');
      return;
    }

    try {
      await simulateLoading();

      // First, lookup the product
      const lookupResponse = await fetch(`/api/barcode/${barcode}`);
      const lookupData = await lookupResponse.json();

      if (!lookupResponse.ok) {
        setError(lookupData.error || 'Product not found');
        setIsLoading(false);
        return;
      }

      // Set product info
      if (lookupData.product) {
        setProductInfo({
          name: lookupData.product.name,
          brand: lookupData.product.brand,
          image: lookupData.product.image,
        });
      }

      // Then analyze
      const analyzeResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          barcode,
          language,
          ageGroup,
        }),
      });

      const analyzeData = await analyzeResponse.json();

      if (!analyzeResponse.ok) {
        setError(analyzeData.error || 'Analysis failed');
        setIsLoading(false);
        return;
      }

      setAnalysisResult(analyzeData.analysis as AnalysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBarcodeDetected = useCallback((result: { rawValue: string }) => {
    if (result.rawValue) {
      // Extract just numbers from the barcode
      const numbers = result.rawValue.replace(/\D/g, '');
      if (numbers.length >= 8) {
        setBarcode(numbers);
        setActiveTab('barcode');
        // Auto-analyze after scanning
        setTimeout(() => {
          handleBarcodeLookup();
        }, 500);
      }
    }
  }, [setBarcode, setActiveTab]);

  const handleScannerError = useCallback((error: unknown) => {
    console.error('Scanner error:', error);
    setCameraError('Unable to access camera. Please check permissions or use manual barcode entry.');
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setUploadedImage(base64);
      setUploadedImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleImageAnalyze = async () => {
    if (!uploadedImage) {
      setError('Please upload an image first');
      return;
    }

    try {
      await simulateLoading();

      const response = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: uploadedImage,
          language,
          ageGroup,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Image analysis failed');
        setIsLoading(false);
        return;
      }

      setAnalysisResult(data.analysis as AnalysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const clearUploadedImage = () => {
    setUploadedImage(null);
    setUploadedImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section id="scanner" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Scan Your Product
            </h2>
            <p className="text-muted-foreground">
              Enter a barcode manually, scan with camera, or upload a product photo for AI analysis
            </p>
          </div>

          {/* Settings Row */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="language" className="text-sm font-medium">
                Language:
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="ageGroup" className="text-sm font-medium">
                Age Group:
              </Label>
              <Select value={ageGroup} onValueChange={setAgeGroup}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  {ageGroups.map((ag) => (
                    <SelectItem key={ag.value} value={ag.value}>
                      {ag.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Scanner Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="barcode" className="flex items-center gap-2">
                <Barcode className="h-4 w-4" />
                <span className="hidden sm:inline">Barcode</span>
              </TabsTrigger>
              <TabsTrigger value="camera" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                <span className="hidden sm:inline">Camera</span>
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Upload</span>
              </TabsTrigger>
            </TabsList>

            {/* Barcode Tab */}
            <TabsContent value="barcode" className="mt-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4">
                  <Label htmlFor="barcode-input" className="mb-2 block text-sm font-medium">
                    Enter Product Barcode
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="barcode-input"
                      type="text"
                      placeholder="e.g., 6111266962187"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                      className="flex-1"
                      onKeyDown={(e) => e.key === 'Enter' && handleBarcodeLookup()}
                    />
                    <Button onClick={handleBarcodeLookup} disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Scan className="h-4 w-4" />
                      )}
                      <span className="ml-2">Analyze</span>
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Enter the barcode number from the product packaging (EAN/UPC code)
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Camera Tab - Barcode Scanner */}
            <TabsContent value="camera" className="mt-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex flex-col items-center justify-center py-4">
                  {cameraError ? (
                    <div className="text-center">
                      <CameraOff className="mb-4 h-16 w-16 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-semibold">Camera Unavailable</h3>
                      <p className="mb-4 text-sm text-muted-foreground">{cameraError}</p>
                      <Button variant="outline" onClick={() => setActiveTab('barcode')}>
                        Enter Barcode Manually
                      </Button>
                    </div>
                  ) : !scannerReady ? (
                    <div className="text-center">
                      <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Loading camera...</p>
                    </div>
                  ) : ScannerComponent ? (
                    <div className="w-full max-w-md">
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <ScannerComponent
                          onScan={handleBarcodeDetected}
                          onError={handleScannerError}
                        />
                      </div>
                      <p className="text-center text-sm text-muted-foreground">
                        Point your camera at a barcode to scan automatically
                      </p>
                      {barcode && (
                        <div className="mt-4 rounded-lg bg-primary/10 p-3 text-center">
                          <p className="text-sm font-medium">Detected: {barcode}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <CameraOff className="mb-4 h-16 w-16 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Camera scanning requires camera access. Please use manual barcode entry.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Upload Tab - AI Image Analysis */}
            <TabsContent value="upload" className="mt-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4">
                  <Label className="mb-2 block text-sm font-medium">
                    Upload Product Image for AI Analysis
                  </Label>
                  <p className="text-xs text-muted-foreground mb-4">
                    Upload a photo of the product label. Our AI will analyze ingredients, nutrition info, and provide safety recommendations.
                  </p>
                </div>
                {uploadedImagePreview ? (
                  <div className="relative mb-4">
                    <img
                      src={uploadedImagePreview}
                      alt="Uploaded product"
                      className="mx-auto max-h-64 rounded-lg object-contain"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={clearUploadedImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12 transition-colors hover:border-primary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="mb-2 text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP (Max 10MB)
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={handleImageAnalyze}
                    disabled={!uploadedImage || isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Scan className="h-4 w-4" />
                    )}
                    <span className="ml-2">Analyze with AI</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 rounded-xl border border-border bg-card p-6"
            >
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
                <div className="space-y-2 text-center">
                  {loadingSteps.map((step, index) => (
                    <div
                      key={step}
                      className={`flex items-center gap-2 text-sm transition-opacity ${
                        index <= loadingStep ? 'opacity-100' : 'opacity-30'
                      }`}
                    >
                      {index < loadingStep ? (
                        <CheckCircle2 className="h-4 w-4 text-safe" />
                      ) : index === loadingStep ? (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-border" />
                      )}
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 rounded-xl border border-avoid/20 bg-avoid/10 p-4"
            >
              <div className="flex items-center gap-2 text-avoid">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Error</span>
              </div>
              <p className="mt-2 text-sm text-foreground whitespace-pre-line">{error}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
