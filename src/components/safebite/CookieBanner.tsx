'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie, Settings, X } from 'lucide-react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'safebite-cookie-consent';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      essential: true,
      analytics: true,
      functional: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setIsVisible(false);
  };

  const rejectAll = () => {
    const consent = {
      essential: true,
      analytics: false,
      functional: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setIsVisible(false);
  };

  const savePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-2xl shadow-lg">
        <CardContent className="p-4">
          {!showSettings ? (
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <Cookie className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Cookie Preferences</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We use cookies to improve your experience. By continuing, you agree to our{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                  <Settings className="mr-1 h-4 w-4" />
                  Customize
                </Button>
                <Button variant="ghost" size="sm" onClick={rejectAll}>
                  Reject All
                </Button>
                <Button size="sm" onClick={acceptAll}>
                  Accept All
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Cookie Settings</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsVisible(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <h4 className="font-medium">Essential Cookies</h4>
                    <p className="text-xs text-muted-foreground">
                      Required for basic functionality
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.essential}
                    disabled
                    className="h-4 w-4 cursor-not-allowed"
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <h4 className="font-medium">Analytics Cookies</h4>
                    <p className="text-xs text-muted-foreground">
                      Help us understand how you use the site
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="h-4 w-4 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <h4 className="font-medium">Functional Cookies</h4>
                    <p className="text-xs text-muted-foreground">
                      Enable enhanced features and personalization
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) =>
                      setPreferences({ ...preferences, functional: e.target.checked })
                    }
                    className="h-4 w-4 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowSettings(false)}>
                  Back
                </Button>
                <Button size="sm" onClick={savePreferences}>
                  Save Preferences
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
