import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ShopProvider } from './shop';
import { SiteHeader } from './site-header';
import { Footer } from './footer';
import { APP_CONFIG } from '@/config/APP_CONFIG';
export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.siteUrl),
  title: APP_CONFIG.pageTitle(),
  description: APP_CONFIG.description,
  icons: { icon: APP_CONFIG.logo.src },
};

export const viewport: Viewport = { themeColor: APP_CONFIG.themeColor };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={APP_CONFIG.locale}>
      <head>
        <link rel="preload" href="/assets/display.ttf" as="font" type="font/ttf" crossOrigin="" />
        <link rel="preload" href="/assets/outfit-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body id="top">
        <a className="skip" href="#main">Skip to content</a>
        <ShopProvider>
          <SiteHeader />
          {children}
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}
