'use client';

import { Navigation } from '@/components/safebite/Navigation';
import { Footer } from '@/components/safebite/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Database, Cookie, Globe, Lock, AlertCircle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <Shield className="mx-auto mb-4 h-16 w-16 text-primary" />
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Your privacy matters to us. Here is how we handle your data.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2025</p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-8">
            {/* Introduction */}
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Introduction</h2>
                <p className="text-muted-foreground">
                  SafeBite is committed to protecting your privacy. This Privacy Policy explains
                  what information we collect, how we use it, and your rights regarding your
                  personal data. We believe in transparency and want you to understand exactly how
                  our service works.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Database className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Information We Collect</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Data You Provide</h3>
                    <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                      <li>Barcode numbers you enter for product lookup</li>
                      <li>Product images you upload for analysis</li>
                      <li>Manual ingredient text you input</li>
                      <li>Language and age group preferences</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Automatically Collected</h3>
                    <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                      <li>Browser type and version</li>
                      <li>Device type (mobile/desktop)</li>
                      <li>General location (country/region)</li>
                      <li>Pages visited and time spent</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What We Do NOT Collect */}
            <Card className="border-safe/20 bg-safe/5">
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Lock className="h-6 w-6 text-safe" />
                  <h2 className="text-2xl font-bold text-foreground">What We Do NOT Collect</h2>
                </div>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>No personal identification (name, email, phone)</li>
                  <li>No user accounts or login credentials</li>
                  <li>No payment information (our service is free)</li>
                  <li>No health data or medical information</li>
                  <li>No contact lists or social media data</li>
                </ul>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  How We Use Your Information
                </h2>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>To fetch product data from Open Food Facts database</li>
                  <li>To perform AI-based safety analysis</li>
                  <li>To cache results for faster repeat queries</li>
                  <li>To improve our service and analysis quality</li>
                  <li>To generate anonymous usage statistics</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Cookie className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Cookies & Local Storage</h2>
                </div>
                <p className="mb-4 text-muted-foreground">
                  We use cookies and local storage for the following purposes:
                </p>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border p-4">
                    <h3 className="mb-2 font-semibold text-foreground">Essential Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      Store your cookie consent preferences and theme settings. Required for basic
                      functionality.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <h3 className="mb-2 font-semibold text-foreground">Local Storage</h3>
                    <p className="text-sm text-muted-foreground">
                      Cache previously analyzed products for offline access and faster loading. This
                      data stays on your device only.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Third-Party Services</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Open Food Facts</h3>
                    <p className="text-muted-foreground">
                      We query the Open Food Facts database for product information. Their privacy
                      policy applies to their services.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">AI Analysis Service</h3>
                    <p className="text-muted-foreground">
                      Product data is sent to our AI service for analysis. We do not store personal
                      identifiers with this data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Lock className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Data Security</h2>
                </div>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>All data transmission uses HTTPS encryption</li>
                  <li>Uploaded images are processed immediately and not stored long-term</li>
                  <li>Analysis cache is automatically cleared after 7 days</li>
                  <li>Regular security audits and updates</li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Your Rights</h2>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Clear your local storage at any time through browser settings</li>
                  <li>Reject non-essential cookies through our cookie banner</li>
                  <li>Use the service anonymously without creating an account</li>
                  <li>Request deletion of any cached analysis data</li>
                </ul>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Children&apos;s Privacy</h2>
                <p className="text-muted-foreground">
                  Our service is designed to help parents make informed decisions about food for
                  their children. We do not knowingly collect any personal information from children
                  or adults. Since we do not require accounts or personal details, children can use
                  the service safely under parental supervision.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Questions or Concerns?</h2>
                </div>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy or our data practices, please
                  reach out to us. We are committed to addressing your concerns promptly.
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
