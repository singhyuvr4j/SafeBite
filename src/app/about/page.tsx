'use client';

import { Navigation } from '@/components/safebite/Navigation';
import { Footer } from '@/components/safebite/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Target, Heart, Users, Award, Globe } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Multiple Safety Standards',
    description:
      'We analyze products against FSSAI (India), WHO, EU (EFSA), and US FDA standards for comprehensive safety insights.',
  },
  {
    icon: Users,
    title: 'Age-Specific Analysis',
    description:
      'Get personalized recommendations for toddlers, children, teens, adults, pregnant women, and elderly consumers.',
  },
  {
    icon: Globe,
    title: '100+ Languages',
    description:
      'Receive analysis reports in your preferred language, making food safety accessible to all Indians.',
  },
  {
    icon: Award,
    title: 'Expert AI Analysis',
    description:
      'Our AI is trained on food safety regulations, nutritional science, and Indian dietary patterns.',
  },
  {
    icon: Heart,
    title: 'Healthier Alternatives',
    description:
      'Get suggestions for healthier Indian alternatives that are culturally relevant and easily available.',
  },
  {
    icon: Target,
    title: 'HFSS Detection',
    description:
      'Identify High Fat, Sugar, Salt (HFSS) products that may be subject to FSSAI restrictions.',
  },
];

const team = [
  {
    name: 'SafeBite Team',
    role: 'Food Safety Advocates',
    description:
      'A dedicated team of food safety experts, nutritionists, and technologists working to make packaged food safer for Indian consumers.',
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <Shield className="mx-auto mb-4 h-16 w-16 text-primary" />
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">About SafeBite</h1>
            <p className="text-lg text-muted-foreground">
              Empowering Indian consumers with knowledge about what they eat
            </p>
          </div>

          {/* Mission Section */}
          <section className="mx-auto mt-12 max-w-4xl">
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Our Mission</h2>
                <p className="text-muted-foreground">
                  SafeBite was created with a simple yet powerful mission: to help Indian consumers
                  make informed decisions about the packaged food they consume. In a market flooded
                  with processed foods, misleading labels, and confusing ingredient lists, we believe
                  everyone deserves clear, accurate, and actionable information about what they eat.
                </p>
                <p className="mt-4 text-muted-foreground">
                  We analyze packaged foods against multiple international safety standards,
                  considering the unique dietary patterns, health concerns, and cultural context of
                  Indian consumers. Our goal is not to demonize any food, but to provide honest,
                  science-based information that helps you make choices aligned with your health
                  goals.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Features Section */}
          <section className="mt-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-foreground">What We Offer</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                      <Icon className="mb-4 h-10 w-10 text-primary" />
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mx-auto mt-16 max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-foreground">How It Works</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    1
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Scan or Enter</h3>
                    <p className="text-muted-foreground">
                      Enter a barcode, upload a product photo, or manually input ingredients from
                      any packaged food product.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    2
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">AI Analysis</h3>
                    <p className="text-muted-foreground">
                      Our AI analyzes the product against FSSAI, WHO, EU, and FDA standards,
                      considering nutritional content, additives, and processing level.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    3
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Personalized Report</h3>
                    <p className="text-muted-foreground">
                      Receive a detailed safety report customized for your selected age group,
                      delivered in your preferred language.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Team Section */}
          <section className="mx-auto mt-16 max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-foreground">Our Team</h2>
            {team.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6 text-center">
                  <h3 className="mb-1 text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="mb-3 text-primary">{member.role}</p>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Disclaimer */}
          <section className="mx-auto mt-16 max-w-4xl">
            <Card className="border-caution/20 bg-caution/5">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold text-foreground">Important Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  SafeBite provides informational analysis only. Our reports are not medical advice
                  and should not replace professional healthcare consultation. Always read the
                  original product label and consult healthcare professionals for specific dietary
                  needs or allergies.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
