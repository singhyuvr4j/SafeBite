import { create } from 'zustand';
import type { AnalysisResult } from '@/types/analysis';

export type ScannerTab = 'barcode' | 'camera' | 'upload' | 'manual';

interface AnalysisState {
  // Scanner state
  activeTab: ScannerTab;
  setActiveTab: (tab: ScannerTab) => void;

  // Product input state
  barcode: string;
  setBarcode: (barcode: string) => void;

  // Settings
  language: string;
  setLanguage: (language: string) => void;
  ageGroup: string;
  setAgeGroup: (ageGroup: string) => void;

  // Loading state
  isLoading: boolean;
  loadingStep: number;
  setIsLoading: (loading: boolean) => void;
  setLoadingStep: (step: number) => void;

  // Results
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;

  // Product info from barcode lookup
  productInfo: {
    name: string;
    brand: string;
    image: string | null;
  } | null;
  setProductInfo: (info: { name: string; brand: string; image: string | null } | null) => void;

  // Error state
  error: string | null;
  setError: (error: string | null) => void;

  // Reset
  reset: () => void;
}

const loadingSteps = [
  'Fetching product data...',
  'Analyzing ingredients...',
  'Checking safety standards...',
  'Generating recommendations...',
  'Preparing your report...',
];

const initialState = {
  activeTab: 'barcode' as ScannerTab,
  barcode: '',
  language: 'English',
  ageGroup: 'adult',
  isLoading: false,
  loadingStep: 0,
  analysisResult: null,
  productInfo: null,
  error: null,
};

export const useAnalysisStore = create<AnalysisState>((set) => ({
  ...initialState,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setBarcode: (barcode) => set({ barcode }),
  setLanguage: (language) => set({ language }),
  setAgeGroup: (ageGroup) => set({ ageGroup }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setLoadingStep: (loadingStep) => set({ loadingStep }),
  setAnalysisResult: (analysisResult) => set({ analysisResult }),
  setProductInfo: (productInfo) => set({ productInfo }),
  setError: (error) => set({ error }),

  reset: () => set(initialState),
}));

export { loadingSteps };
