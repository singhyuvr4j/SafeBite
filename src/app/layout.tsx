import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafeBite - Indian Food Safety Scanner | Know What You Eat",
  description: "Scan any packaged food product and get instant safety analysis based on FSSAI, WHO, EU, and FDA standards. Personalized recommendations for different age groups in your preferred language.",
  keywords: ["SafeBite", "food safety", "FSSAI", "Indian food", "barcode scanner", "nutrition analysis", "food additives", "healthy eating", "India"],
  authors: [{ name: "SafeBite Team" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "SafeBite - Indian Food Safety Scanner",
    description: "Know What You Eat - AI-powered food safety analysis for Indian consumers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeBite - Indian Food Safety Scanner",
    description: "Know What You Eat - AI-powered food safety analysis for Indian consumers",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
