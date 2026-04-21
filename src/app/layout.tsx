import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: 'swap' });

export const metadata: Metadata = {
  title: "Best Digital Agency in Dubai | TopPixels - Branding & Web Solutions",
  description: "TopPixels is the best digital agency in Dubai. We specialize in premium Logo Design, Website Development, and Performance Marketing for modern brands since 2018.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
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
