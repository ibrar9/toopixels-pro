import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import Script from "next/script";
import VisitTracker from "@/components/layout/VisitTracker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: "Best Digital Agency in UAE | TopPixels - Branding & Web Solutions",
    template: "%s | TopPixels UAE"
  },
  description: "TopPixels is the leading digital agency in the UAE (Dubai, Abu Dhabi, Sharjah). Specializing in premium Logo Design, Website Development, and ROI-driven Digital Marketing since 2018.",
  keywords: ["digital agency dubai", "web development uae", "logo design abu dhabi", "marketing agency sharjah", "best branding agency uae"],
  openGraph: {
    title: "TopPixels | Best Digital Agency in UAE",
    description: "Premium Branding, Web & Marketing Solutions in Dubai & UAE.",
    url: "https://toopixels.pro",
    siteName: "TopPixels UAE",
    images: [{ url: "https://toopixels.pro/og-image.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TopPixels | Digital Agency UAE",
    description: "Premium Digital Solutions in Dubai.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "TopPixels",
    "image": "https://toopixels.pro/logo.png",
    "@id": "https://toopixels.pro",
    "url": "https://toopixels.pro",
    "telephone": "+971556721324",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Business Bay",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.1852,
      "longitude": 55.2734
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/toopixels",
      "https://www.instagram.com/toopixels"
    ],
    "priceRange": "AED",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1800"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        <VisitTracker />
        <ConditionalLayout>{children}</ConditionalLayout>
        <Script id="clear-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistrations().then(function(registrations) {
                for(let registration of registrations) {
                  registration.unregister();
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
