'use client';

import { Navigation } from '@/components/safebite/Navigation';
import { Hero } from '@/components/safebite/Hero';
import { ScannerSection } from '@/components/safebite/ScannerSection';
import { ResultsSection } from '@/components/safebite/ResultsSection';
import { Footer } from '@/components/safebite/Footer';
import { CookieBanner } from '@/components/safebite/CookieBanner';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <ScannerSection />
        <ResultsSection />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
