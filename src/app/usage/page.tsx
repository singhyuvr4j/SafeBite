'use client';

import { Navigation } from '@/components/safebite/Navigation';
import { Footer } from '@/components/safebite/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, CheckCircle, AlertTriangle, Zap, Shield, Clock } from 'lucide-react';

export default function UsagePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <BookOpen className="mx-auto mb-4 h-16 w-16 text-primary" />
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">Usage Policy</h1>
            <p className="text-lg text-muted-foreground">
              Guidelines for using SafeBite effectively and responsibly.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2025</p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-8">
            {/* Intended Use */}
            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-safe" />
                  <h2 className="text-2xl font-bold text-foreground">Intended Use</h2>
                </div>
                <p className="mb-4 text-muted-foreground">
                  SafeBite is designed to help Indian consumers make more informed decisions about
                  packaged foods. Appropriate uses include:
                </p>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Personal Research:</strong> Learning about
                    the safety and nutritional profile of packaged foods you consume
                  </li>
                  <li>
                    <strong className="text-foreground">Parental Guidance:</strong> Making informed
                    decisions about snacks and foods for children
                  </li>
                  <li>
                    <strong className="text-foreground">Dietary Planning:</strong> Understanding
                    what is in your food to support health goals
                  </li>
                  <li>
                    <strong className="text-foreground">Education:</strong> Learning about food
                    additives, processing levels, and nutritional content
                  </li>
                  <li>
                    <strong className="text-foreground">Comparison Shopping:</strong> Comparing
                    similar products to make healthier choices
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Best Practices</h2>
                <div className="space-y-6">
                  <div className="rounded-lg border border-border p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                      <Shield className="h-5 w-5 text-primary" />
                      Always Verify with Labels
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Product formulations change frequently. Always double-check the actual product
                      label for the most current ingredients and nutritional information.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                      <Clock className="h-5 w-5 text-primary" />
                      Check Analysis Date
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Our cached analyses may be up to 7 days old. For critical decisions, consider
                      requesting a fresh analysis or checking the latest product information.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                      <Zap className="h-5 w-5 text-primary" />
                      Use Age-Appropriate Analysis
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Select the correct age group for relevant recommendations. A food that is safe
                      for adults may not be suitable for toddlers or pregnant women.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Consider Individual Needs
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Our analysis provides general guidance. Individual health conditions,
                      allergies, and dietary restrictions should be discussed with healthcare
                      professionals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Limitations */}
            <Card className="border-caution/20 bg-caution/5">
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-caution" />
                  <h2 className="text-2xl font-bold text-foreground">Limitations to Consider</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">
                      Product Coverage Limitations
                    </h3>
                    <ul className="list-inside list-disc space-y-1">
                      <li>Not all Indian products are in the Open Food Facts database</li>
                      <li>Regional or local brands may have limited information</li>
                      <li>New products may not be immediately available</li>
                      <li>Some products may have incomplete nutritional data</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Analysis Limitations</h3>
                    <ul className="list-inside list-disc space-y-1">
                      <li>AI analysis is based on available data and may miss nuances</li>
                      <li>Novel ingredients may not be fully understood</li>
                      <li>Interaction effects between ingredients are not fully modeled</li>
                      <li>Processing methods that affect safety may not be captured</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Regulatory Changes</h3>
                    <ul className="list-inside list-disc space-y-1">
                      <li>FSSAI regulations are continuously evolving</li>
                      <li>International standards may be updated</li>
                      <li>Banned additives lists may change</li>
                      <li>Our analysis reflects current knowledge at time of analysis</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prohibited Uses */}
            <Card className="border-avoid/20">
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Prohibited Uses</h2>
                <p className="mb-4 text-muted-foreground">
                  The following uses of SafeBite are prohibited:
                </p>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Commercial Exploitation:</strong> Using our
                    analysis for commercial products or services without permission
                  </li>
                  <li>
                    <strong className="text-foreground">Medical Claims:</strong> Using our analysis
                    to make medical claims or replace professional medical advice
                  </li>
                  <li>
                    <strong className="text-foreground">System Abuse:</strong> Overloading our
                    servers with automated requests or bots
                  </li>
                  <li>
                    <strong className="text-foreground">Data Scraping:</strong> Bulk downloading or
                    scraping of analysis results
                  </li>
                  <li>
                    <strong className="text-foreground">Misrepresentation:</strong> Presenting our
                    analysis as your own or misrepresenting the source
                  </li>
                  <li>
                    <strong className="text-foreground">Illegal Activities:</strong> Any use that
                    violates applicable laws
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Rate Limits */}
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Rate Limits</h2>
                <p className="mb-4 text-muted-foreground">
                  To ensure fair access for all users and maintain service quality, we implement
                  the following guidelines:
                </p>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Recommended maximum: 10 analysis requests per minute per user</li>
                  <li>Excessive requests may result in temporary throttling</li>
                  <li>Cached results are provided instantly without counting toward limits</li>
                  <li>Consider using manual input for batch analysis needs</li>
                </ul>
              </CardContent>
            </Card>

            {/* Accuracy Reporting */}
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Reporting Issues</h2>
                <p className="mb-4 text-muted-foreground">
                  Help us improve SafeBite by reporting:
                </p>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Inaccurate product information</li>
                  <li>Missing products that should be in the database</li>
                  <li>Incorrect safety assessments</li>
                  <li>Translation errors</li>
                  <li>Technical issues or bugs</li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                  Your feedback helps us improve the accuracy and usefulness of SafeBite for all
                  users.
                </p>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Getting the Most Out of SafeBite
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Start with the Barcode Scanner
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Barcode lookup provides the most complete product information from Open Food
                        Facts.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Select Your Language</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred language for easier understanding of the analysis.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Choose the Right Age Group</h3>
                      <p className="text-sm text-muted-foreground">
                        Different age groups have different nutritional needs and safety thresholds.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Review All Sections</h3>
                      <p className="text-sm text-muted-foreground">
                        Take time to review nutrient analysis, additives, and healthier alternatives
                        for a complete picture.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      5
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Consider Healthier Alternatives</h3>
                      <p className="text-sm text-muted-foreground">
                        We provide Indian-specific alternatives that are often healthier and more
                        culturally appropriate.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
