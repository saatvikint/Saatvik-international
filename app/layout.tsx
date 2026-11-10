import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ShopProvider } from './shop';
import { SiteHeader } from './site-header';
import { Footer } from './footer';
import { SvgLibrary } from './visuals';
export const metadata: Metadata = {
  title: 'Saatvik International | Healthy Snacking Solutions',
  description: 'Explore Saatvik International roasted makhana flavours and healthy snacking solutions. Wholesale, corporate and bulk enquiry.',
  icons: { icon: '/assets/saatvik-logo.png' },
};

export const viewport: Viewport = { themeColor: '#fff6e8' };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/assets/display.ttf" as="font" type="font/ttf" crossOrigin="" />
        <link rel="preload" href="/assets/outfit-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body id="top">
        <a className="skip" href="#main">Skip to content</a>
        <SvgLibrary />
        <ShopProvider>
          <SiteHeader />
          {children}
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}
