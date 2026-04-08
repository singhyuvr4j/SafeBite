'use client';

import { Navigation } from '@/components/safebite/Navigation';
import { Footer } from '@/components/safebite/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, AlertTriangle, CheckCircle, Scale, RefreshCw } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <FileText className="mx-auto mb-4 h-16 w-16 text-primary" />
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">Terms of Use</h1>
            <p className="text-lg text-muted-foreground">
              Please read these terms carefully before using SafeBite.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2025</p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-8">
            {/* Acceptance */}
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using SafeBite, you agree to be bound by these Terms of Use. If
                  you do not agree to these terms, please do not use our service. Your continued
                  use of SafeBite constitutes acceptance of these terms.
                </p>
              </CardContent>
            </Card>

            {/* Not Medical Advice */}
            <Card className="border-avoid/20 bg-avoid/5">
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-avoid" />
                  <h2 className="text-2xl font-bold text-foreground">Not Medical Advice</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Important:</strong> SafeBite provides
                    informational analysis only. Our service is NOT a substitute for professional
                    medical advice, diagnosis, or treatment.
                  </p>
                  <ul className="list-inside list-disc space-y-2">
                    <li>Always consult healthcare professionals for dietary decisions</li>
                    <li>Do not make medical decisions based solely on our analysis</li>
                    <li>Individual health conditions may require different dietary approaches</li>
                    <li>Allergies and sensitivities should be verified with medical professionals</li>
                    <li>Our analysis may not capture all individual health considerations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Service Description</h2>
                <p className="mb-4 text-muted-foreground">
                  SafeBite is a food safety analysis tool that:
                </p>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Fetches product data from Open Food Facts database</li>
                  <li>Performs AI-based analysis of ingredients and nutrition</li>
                  <li>Compares products against multiple safety standards</li>
                  <li>Provides age-specific recommendations</li>
                  <li>Offers translations in multiple languages</li>
                </ul>
              </CardContent>
            </Card>

            {/* Accuracy Disclaimer */}
            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-caution" />
                  <h2 className="text-2xl font-bold text-foreground">Accuracy & Limitations</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    While we strive for accuracy, please be aware of the following limitations:
                  </p>
                  <ul className="list-inside list-disc space-y-2">
                    <li>Product formulations may change without notice</li>
                    <li>Open Food Facts data may not always be current or complete</li>
                    <li>AI analysis is based on available information and may have limitations</li>
                    <li>Nutritional values may vary by batch and region</li>
                    <li>Regulatory standards evolve over time</li>
                    <li>Some ingredients may not be fully disclosed on labels</li>
                  </ul>
                  <p className="mt-4 font-medium text-foreground">
                    Always verify information by reading the actual product label.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-safe" />
                  <h2 className="text-2xl font-bold text-foreground">User Responsibilities</h2>
                </div>
                <p className="mb-4 text-muted-foreground">As a user of SafeBite, you agree to:</p>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Use the service for informational purposes only</li>
                  <li>Not rely solely on our analysis for health decisions</li>
                  <li>Verify critical information with product labels and healthcare providers</li>
                  <li>Not use the service for commercial purposes without permission</li>
                  <li>Not attempt to abuse or overload our systems</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Scale className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Intellectual Property</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    SafeBite and its original content are protected by intellectual property laws.
                    The SafeBite name, logo, and design are our property.
                  </p>
                  <p>
                    Product information retrieved from Open Food Facts is subject to their terms of
                    use and licensing (Open Database License).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer of Warranties */}
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Disclaimer of Warranties
                </h2>
                <p className="text-muted-foreground">
                  SafeBite is provided &quot;as is&quot; without warranties of any kind, express or
                  implied. We do not warrant that the service will be uninterrupted, error-free,
                  secure, or that defects will be corrected. We make no warranties regarding the
                  accuracy, reliability, or completeness of any analysis or information provided.
                </p>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="border-border">
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  To the fullest extent permitted by law, SafeBite and its team shall not be liable
                  for any direct, indirect, incidental, special, consequential, or punitive damages
                  arising from your use of the service. This includes, but is not limited to,
                  damages for health issues, allergic reactions, or any other outcomes related to
                  food consumption decisions made based on our analysis.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <RefreshCw className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Changes to Terms</h2>
                </div>
                <p className="text-muted-foreground">
                  We reserve the right to modify these Terms of Use at any time. Changes will be
                  effective immediately upon posting. Your continued use of SafeBite after changes
                  constitutes acceptance of the updated terms. We encourage you to review these
                  terms periodically.
                </p>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms of Use shall be governed by and construed in accordance with the laws
                  of India. Any disputes shall be subject to the exclusive jurisdiction of the
                  courts in India.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Questions?</h2>
                <p className="text-muted-foreground">
                  If you have questions about these Terms of Use, please contact us. We are here to
                  help clarify any concerns you may have.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
