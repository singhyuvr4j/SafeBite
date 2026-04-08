'use client';

import { motion } from 'framer-motion';
import { useAnalysisStore } from '@/store/analysisStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Shield,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Baby,
  Smile,
  User,
  UserPlus,
  Heart,
  PersonStanding,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useState } from 'react';
import type { Verdict } from '@/types/analysis';

const verdictColors: Record<Verdict, { bg: string; text: string; border: string }> = {
  safe: { bg: 'bg-safe/10', text: 'text-safe', border: 'border-safe/20' },
  caution: { bg: 'bg-caution/10', text: 'text-caution', border: 'border-caution/20' },
  avoid: { bg: 'bg-avoid/10', text: 'text-avoid', border: 'border-avoid/20' },
};

const verdictIcons: Record<Verdict, typeof CheckCircle2> = {
  safe: CheckCircle2,
  caution: AlertTriangle,
  avoid: XCircle,
};

const ageGroupIcons: Record<string, typeof Baby> = {
  toddler_1_3: Baby,
  child_4_12: Smile,
  teen_13_17: User,
  adult: PersonStanding,
  pregnant: Heart,
  elderly: UserPlus,
};

const ageGroupLabels: Record<string, string> = {
  toddler_1_3: 'Toddler (1-3 years)',
  child_4_12: 'Child (4-12 years)',
  teen_13_17: 'Teen (13-17 years)',
  adult: 'Adult',
  pregnant: 'Pregnant Women',
  elderly: 'Elderly (60+)',
};

function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const colors = verdictColors[verdict];
  const Icon = verdictIcons[verdict];

  return (
    <Badge
      variant="outline"
      className={`${colors.bg} ${colors.text} ${colors.border} gap-1 border px-3 py-1 text-sm font-semibold`}
    >
      <Icon className="h-3.5 w-3.5" />
      {verdict.charAt(0).toUpperCase() + verdict.slice(1)}
    </Badge>
  );
}

function ScoreCircle({ score }: { score: number }) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-safe';
    if (s >= 60) return 'text-caution';
    if (s >= 40) return 'text-avoid';
    return 'text-avoid';
  };

  const getScoreBg = (s: number) => {
    if (s >= 80) return 'bg-safe/10';
    if (s >= 60) return 'bg-caution/10';
    if (s >= 40) return 'bg-avoid/10';
    return 'bg-avoid/10';
  };

  return (
    <div
      className={`flex h-24 w-24 items-center justify-center rounded-full ${getScoreBg(score)}`}
    >
      <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
    </div>
  );
}

function NutrientBar({
  label,
  value,
  percent,
  level,
}: {
  label: string;
  value: string;
  percent: number;
  level: string;
}) {
  const getColor = (l: string) => {
    switch (l) {
      case 'low':
        return 'bg-safe';
      case 'medium':
        return 'bg-caution';
      case 'high':
        return 'bg-avoid';
      default:
        return 'bg-muted-foreground';
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value}</span>
      </div>
      <Progress value={percent} className="h-2" />
      <div className="flex justify-between text-xs">
        <span className={`${level === 'high' ? 'text-avoid' : 'text-muted-foreground'}`}>
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
        <span className="text-muted-foreground">{percent}% daily</span>
      </div>
    </div>
  );
}

function ExpandableCard({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: typeof Shield;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader
        className="cursor-pointer transition-colors hover:bg-muted/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            {title}
          </span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </CardTitle>
      </CardHeader>
      {isOpen && <CardContent className="pt-0">{children}</CardContent>}
    </Card>
  );
}

export function ResultsSection() {
  const { analysisResult, productInfo } = useAnalysisStore();

  if (!analysisResult) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-8"
    >
      <div className="container mx-auto px-4">
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground">Analysis Results</h2>
          <p className="text-muted-foreground">Complete safety analysis for your product</p>
        </motion.div>

        {/* Product Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-6 md:flex-row">
                {productInfo?.image && (
                  <img
                    src={productInfo.image}
                    alt={analysisResult.product_name}
                    className="h-40 w-40 rounded-lg object-contain shadow-md"
                  />
                )}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="mb-1 text-2xl font-bold text-foreground">
                    {analysisResult.product_name}
                  </h3>
                  <p className="mb-4 text-muted-foreground">{analysisResult.brand}</p>
                  <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
                    <VerdictBadge verdict={analysisResult.overall_verdict} />
                    <ScoreCircle score={analysisResult.overall_score} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary Card */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Shield className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="mb-2 font-semibold text-foreground">Summary</h4>
                  <p className="text-muted-foreground">{analysisResult.summary}</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                {analysisResult.disclaimer}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Age Groups Card */}
          <motion.div variants={itemVariants}>
            <ExpandableCard title="Age Group Analysis" icon={User} defaultOpen>
              <div className="space-y-4">
                {Object.entries(analysisResult.age_groups).map(([key, value]) => {
                  const Icon = ageGroupIcons[key] || User;
                  return (
                    <div key={key} className="rounded-lg border border-border p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-2 font-medium">
                          <Icon className="h-4 w-4 text-primary" />
                          {ageGroupLabels[key]}
                        </span>
                        <VerdictBadge verdict={value.verdict} />
                      </div>
                      <p className="text-sm text-muted-foreground">{value.reason}</p>
                    </div>
                  );
                })}
              </div>
            </ExpandableCard>
          </motion.div>

          {/* Standards Comparison Card */}
          <motion.div variants={itemVariants}>
            <ExpandableCard title="Safety Standards" icon={Shield}>
              <div className="space-y-3">
                {Object.entries(analysisResult.standards_comparison).map(([key, value]) => (
                  <div key={key} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                    <div>
                      <span className="font-medium uppercase">{key}</span>
                      <p className="mt-1 text-sm text-muted-foreground">{value.notes}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${verdictColors[value.status as Verdict]?.bg || ''} ${
                        verdictColors[value.status as Verdict]?.text || ''
                      }`}
                    >
                      {value.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </ExpandableCard>
          </motion.div>

          {/* Nutrient Analysis Card */}
          <motion.div variants={itemVariants}>
            <ExpandableCard title="Nutrient Analysis" icon={Heart}>
              <div className="grid gap-4 sm:grid-cols-2">
                <NutrientBar
                  label="Fat"
                  value={analysisResult.nutrient_analysis.fat.value}
                  percent={analysisResult.nutrient_analysis.fat.percent_daily}
                  level={analysisResult.nutrient_analysis.fat.level}
                />
                <NutrientBar
                  label="Saturated Fat"
                  value={analysisResult.nutrient_analysis.saturated_fat.value}
                  percent={analysisResult.nutrient_analysis.saturated_fat.percent_daily}
                  level={analysisResult.nutrient_analysis.saturated_fat.level}
                />
                <NutrientBar
                  label="Sugar"
                  value={analysisResult.nutrient_analysis.sugar.value}
                  percent={analysisResult.nutrient_analysis.sugar.percent_daily}
                  level={analysisResult.nutrient_analysis.sugar.level}
                />
                <NutrientBar
                  label="Salt"
                  value={analysisResult.nutrient_analysis.salt.value}
                  percent={analysisResult.nutrient_analysis.salt.percent_daily}
                  level={analysisResult.nutrient_analysis.salt.level}
                />
                <NutrientBar
                  label="Protein"
                  value={analysisResult.nutrient_analysis.protein.value}
                  percent={analysisResult.nutrient_analysis.protein.percent_daily}
                  level={analysisResult.nutrient_analysis.protein.level}
                />
                <NutrientBar
                  label="Fiber"
                  value={analysisResult.nutrient_analysis.fiber.value}
                  percent={analysisResult.nutrient_analysis.fiber.percent_daily}
                  level={analysisResult.nutrient_analysis.fiber.level}
                />
              </div>
              <div className="mt-4 rounded-lg bg-muted p-3">
                <span className="font-medium">Calories: </span>
                {analysisResult.nutrient_analysis.calories.value}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({analysisResult.nutrient_analysis.calories.per_serving})
                </span>
              </div>
            </ExpandableCard>
          </motion.div>

          {/* Additives Card */}
          <motion.div variants={itemVariants}>
            <ExpandableCard title="Additives" icon={AlertTriangle}>
              {analysisResult.additives.length > 0 ? (
                <div className="space-y-3">
                  {analysisResult.additives.map((additive, index) => (
                    <div key={index} className="rounded-lg border border-border p-3">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <span className="font-medium">{additive.code}</span>
                          <span className="ml-2 text-muted-foreground">{additive.name}</span>
                        </div>
                        <VerdictBadge verdict={additive.safety} />
                      </div>
                      <p className="mb-1 text-sm text-muted-foreground">{additive.purpose}</p>
                      <p className="text-sm">{additive.notes}</p>
                      {additive.banned_in.length > 0 && (
                        <p className="mt-2 text-xs text-avoid">
                          Banned in: {additive.banned_in.join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No additives information available</p>
              )}
            </ExpandableCard>
          </motion.div>

          {/* NutriScore & NOVA Card */}
          <motion.div variants={itemVariants}>
            <ExpandableCard title="NutriScore & NOVA" icon={Heart}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border p-4 text-center">
                  <div className="mb-2 text-4xl font-bold text-primary">
                    {analysisResult.nutriscore.grade}
                  </div>
                  <p className="text-sm font-medium">NutriScore</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {analysisResult.nutriscore.explanation}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4 text-center">
                  <div className="mb-2 text-4xl font-bold text-primary">
                    {analysisResult.nova_rating.level}
                  </div>
                  <p className="text-sm font-medium">{analysisResult.nova_rating.label}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {analysisResult.nova_rating.explanation}
                  </p>
                </div>
              </div>
            </ExpandableCard>
          </motion.div>

          {/* Consumption Advice Card */}
          <motion.div variants={itemVariants}>
            <ExpandableCard title="Consumption Advice" icon={CheckCircle2}>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="font-medium">Frequency:</span>
                  <span className="text-muted-foreground">
                    {analysisResult.consumption_advice.frequency}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="font-medium">Safe Portion:</span>
                  <span className="text-muted-foreground">
                    {analysisResult.consumption_advice.safe_portion}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="font-medium">Best Time:</span>
                  <span className="text-muted-foreground">
                    {analysisResult.consumption_advice.best_time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Pairing Tip:</span>
                  <span className="text-muted-foreground">
                    {analysisResult.consumption_advice.pairing_tip}
                  </span>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-muted p-3">
                <span className="font-medium">School Tiffin: </span>
                {analysisResult.school_tiffin_safe ? (
                  <Badge className="bg-safe/20 text-safe">Safe</Badge>
                ) : (
                  <Badge className="bg-avoid/20 text-avoid">Not Recommended</Badge>
                )}
                <p className="mt-1 text-sm text-muted-foreground">
                  {analysisResult.school_tiffin_reason}
                </p>
              </div>
            </ExpandableCard>
          </motion.div>

          {/* Healthier Alternatives Card */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <ExpandableCard title="Healthier Alternatives" icon={CheckCircle2}>
              <div className="flex flex-wrap gap-2">
                {analysisResult.healthier_alternatives.map((alt, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1.5 text-sm">
                    {alt}
                  </Badge>
                ))}
              </div>
            </ExpandableCard>
          </motion.div>

          {/* Allergens Card */}
          {analysisResult.allergens.length > 0 && (
            <motion.div variants={itemVariants} className="md:col-span-2">
              <ExpandableCard title="Allergens" icon={AlertTriangle}>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.allergens.map((allergen, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-avoid/30 bg-avoid/10 text-avoid"
                    >
                      {allergen}
                    </Badge>
                  ))}
                </div>
              </ExpandableCard>
            </motion.div>
          )}

          {/* HFSS Status Card */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">HFSS Category</h4>
                    <p className="text-sm text-muted-foreground">
                      High in Fat, Sugar, and Salt
                    </p>
                  </div>
                  {analysisResult.hfss_category ? (
                    <Badge className="bg-avoid/20 text-avoid">Yes - HFSS</Badge>
                  ) : (
                    <Badge className="bg-safe/20 text-safe">No</Badge>
                  )}
                </div>
                {analysisResult.hfss_details && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {analysisResult.hfss_details}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
