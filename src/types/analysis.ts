export type Verdict = 'safe' | 'caution' | 'avoid';
export type Status = 'approved' | 'caution' | 'banned';
export type NutrientLevel = 'low' | 'medium' | 'high';
export type NutriScoreGrade = 'A' | 'B' | 'C' | 'D' | 'E';

export interface AgeGroupVerdict {
  verdict: Verdict;
  reason: string;
}

export interface AgeGroups {
  toddler_1_3: AgeGroupVerdict;
  child_4_12: AgeGroupVerdict;
  teen_13_17: AgeGroupVerdict;
  adult: AgeGroupVerdict;
  pregnant: AgeGroupVerdict;
  elderly: AgeGroupVerdict;
}

export interface StandardStatus {
  status: Status;
  notes: string;
}

export interface StandardsComparison {
  fssai: StandardStatus;
  who: StandardStatus;
  eu: StandardStatus;
  fda_usa: StandardStatus;
}

export interface NutriScore {
  grade: NutriScoreGrade;
  explanation: string;
}

export interface NovaRating {
  level: 1 | 2 | 3 | 4;
  label: string;
  explanation: string;
}

export interface NutrientInfo {
  level: NutrientLevel;
  value: string;
  percent_daily: number;
  verdict: string;
}

export interface CalorieInfo {
  value: string;
  per_serving: string;
  verdict: string;
}

export interface NutrientAnalysis {
  fat: NutrientInfo;
  saturated_fat: NutrientInfo;
  trans_fat: NutrientInfo;
  sugar: NutrientInfo;
  salt: NutrientInfo;
  protein: NutrientInfo;
  fiber: NutrientInfo;
  calories: CalorieInfo;
}

export interface Additive {
  code: string;
  name: string;
  purpose: string;
  safety: Verdict;
  banned_in: string[];
  fssai_permitted: boolean;
  notes: string;
}

export interface IngredientsAnalysis {
  palm_oil: boolean | null;
  is_vegan: boolean | null;
  is_vegetarian: boolean | null;
  has_artificial_colours: boolean;
  has_artificial_flavours: boolean;
  has_preservatives: boolean;
  ultra_processed_markers: string[];
  concerning_ingredients: string[];
  positive_ingredients: string[];
}

export interface Packaging {
  material: string;
  recyclable: boolean | null;
  environmental_impact: 'low' | 'medium' | 'high';
  food_contact_safe: boolean | null;
}

export interface ConsumptionAdvice {
  frequency: string;
  safe_portion: string;
  best_time: string;
  pairing_tip: string;
}

export interface AnalysisResult {
  product_name: string;
  brand: string;
  overall_verdict: Verdict;
  overall_score: number;
  age_groups: AgeGroups;
  standards_comparison: StandardsComparison;
  nutriscore: NutriScore;
  nova_rating: NovaRating;
  nutrient_analysis: NutrientAnalysis;
  additives: Additive[];
  allergens: string[];
  ingredients_analysis: IngredientsAnalysis;
  hfss_category: boolean;
  hfss_details: string;
  packaging: Packaging;
  consumption_advice: ConsumptionAdvice;
  healthier_alternatives: string[];
  school_tiffin_safe: boolean;
  school_tiffin_reason: string;
  summary: string;
  disclaimer: string;
}

export interface OpenFoodFactsProduct {
  code: string;
  product?: {
    product_name?: string;
    product_name_en?: string;
    brands?: string;
    image_front_url?: string;
    image_front_small_url?: string;
    nutriscore_grade?: string;
    nova_group?: number;
    nutriments?: {
      fat_100g?: number;
      saturated_fat_100g?: number;
      trans_fat_100g?: number;
      sugars_100g?: number;
      salt_100g?: number;
      sodium_100g?: number;
      proteins_100g?: number;
      fiber_100g?: number;
      energy_100g?: number;
      energy_kcal_100g?: number;
    };
    ingredients_text?: string;
    ingredients_text_en?: string;
    ingredients?: Array<{
      id: string;
      text: string;
      vegan?: string;
      vegetarian?: string;
    }>;
    additives?: {
      tags?: string[];
    };
    allergens?: string;
    allergens_tags?: string[];
    categories?: string;
    categories_tags?: string[];
    labels?: string;
    labels_tags?: string[];
    quantity?: string;
    serving_size?: string;
    packaging?: string;
  };
  status: number;
  status_verbose?: string;
}

export interface AnalyzeRequest {
  barcode?: string;
  productData?: OpenFoodFactsProduct['product'];
  language: string;
  ageGroup: string;
}

export interface ImageAnalyzeRequest {
  imageBase64: string;
  language: string;
  ageGroup: string;
}
