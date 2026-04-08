'use client';

import Link from 'next/link';
import { Cookie, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { href: '/about', label: 'About Us' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
    { href: '/usage', label: 'Usage Policy' },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Cookie className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">
              Safe<span className="text-primary">Bite</span>
            </span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            Made with <Heart className="inline h-4 w-4 text-primary" /> for Indian consumers
          </p>
          <p className="text-center text-xs text-muted-foreground">
            &copy; {currentYear} SafeBite. All rights reserved.
          </p>
          <p className="text-center text-xs text-muted-foreground">
            This analysis is for informational purposes only and does not constitute medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
