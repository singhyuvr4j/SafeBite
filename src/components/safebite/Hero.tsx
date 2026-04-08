'use client';

import { motion } from 'framer-motion';
import { Shield, Globe, Users, Award, Scan, Cookie } from 'lucide-react';

const stats = [
  {
    icon: Award,
    value: '4',
    label: 'Safety Standards',
    description: 'FSSAI, WHO, EU, FDA',
  },
  {
    icon: Globe,
    value: '100+',
    label: 'Languages',
    description: 'Full localization',
  },
  {
    icon: Users,
    value: '6',
    label: 'Age Groups',
    description: 'Tailored advice',
  },
  {
    icon: Shield,
    value: 'Free',
    label: 'Forever',
    description: 'No hidden costs',
  },
];

// Pre-defined positions to avoid hydration mismatch
const floatingSnackPositions = [
  { x: 10, y: 15, delay: 0, duration: 15 },
  { x: 80, y: 25, delay: 0.5, duration: 18 },
  { x: 25, y: 70, delay: 1, duration: 12 },
  { x: 70, y: 80, delay: 1.5, duration: 16 },
  { x: 5, y: 50, delay: 2, duration: 14 },
  { x: 90, y: 45, delay: 2.5, duration: 17 },
  { x: 40, y: 10, delay: 3, duration: 13 },
  { x: 55, y: 90, delay: 3.5, duration: 19 },
];

const floatingSnacks = [
  'Kurkure',
  'Lays',
  'Maggi',
  'Parle-G',
  'Britannia',
  'Haldirams',
  'Bingo',
  'Too Yumm',
];

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Floating snack chips background */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingSnacks.map((snack, index) => {
          const pos = floatingSnackPositions[index];
          return (
            <motion.div
              key={snack}
              className="absolute rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary/60"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                y: [-20, -60, -20],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                delay: pos.delay,
                ease: 'easeInOut',
              }}
            >
              {snack}
            </motion.div>
          );
        })}
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Cookie className="h-4 w-4" />
              Indian Food Safety Scanner
            </div>
          </motion.div>

          <motion.h1
            className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-primary">SafeBite</span>
            <br />
            Know What You Eat
          </motion.h1>

          <motion.p
            className="mb-8 text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Scan any packaged food product and get instant safety analysis based on FSSAI,
            WHO, EU, and FDA standards. Get personalized recommendations for different age
            groups in your preferred language.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#scanner"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              <Scan className="h-5 w-5" />
              Start Scanning
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="rounded-xl border border-border bg-card p-4 text-center shadow-sm transition-all hover:shadow-md md:p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                <Icon className="mx-auto mb-2 h-8 w-8 text-primary" />
                <div className="text-2xl font-bold text-foreground md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
