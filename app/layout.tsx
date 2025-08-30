import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "TruckFlow - Complete Trucking Management SaaS Platform",
    template: "%s | TruckFlow",
  },
  description:
    "Comprehensive trucking SaaS platform for fleet management, dispatch operations, financial tracking, and AI-powered logistics optimization. Streamline your trucking business with TruckFlow.",
  keywords: [
    "trucking software",
    "fleet management",
    "dispatch software",
    "trucking SaaS",
    "logistics platform",
    "ELD compliance",
    "route optimization",
    "trucking financial management",
    "load management",
    "trucking analytics",
  ],
  authors: [{ name: "TruckFlow Team" }],
  creator: "TruckFlow",
  publisher: "TruckFlow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://truckflow.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://truckflow.app",
    title: "TruckFlow - Complete Trucking Management SaaS Platform",
    description:
      "Streamline your trucking operations with our comprehensive SaaS platform featuring fleet management, dispatch operations, financial tracking, and AI-powered optimization.",
    siteName: "TruckFlow",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TruckFlow - Trucking Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TruckFlow - Complete Trucking Management SaaS Platform",
    description:
      "Streamline your trucking operations with comprehensive fleet management, dispatch, and AI-powered optimization.",
    images: ["/twitter-image.jpg"],
    creator: "@truckflow",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "TruckFlow",
              description:
                "Comprehensive trucking SaaS platform for fleet management, dispatch operations, financial tracking, and AI-powered logistics optimization.",
              url: "https://truckflow.app",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                category: "SaaS",
                businessFunction:
                  "Fleet Management, Dispatch Operations, Financial Tracking",
              },
              provider: {
                "@type": "Organization",
                name: "TruckFlow",
                url: "https://truckflow.app",
              },
              featureList: [
                "Fleet Management",
                "Dispatch Operations",
                "Financial Tracking",
                "AI-Powered Route Optimization",
                "ELD Compliance",
                "Document Management",
                "Load Management",
                "Driver Performance Analytics",
              ],
            }),
          }}
        />
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#1e40af' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='TruckFlow' />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
