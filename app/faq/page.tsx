import Link from 'next/link';
import { FaqClient } from './faq-client';

export const metadata = {
  title: 'Frequently Asked Questions (FAQ) | Saatvik International',
  description: 'Answers about Saatvik International products, B2B supply, quotations, GST registration and export enquiries.',
};

export default function Page() {
  return (
    <main id="main" className="faq-page shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">FAQ &amp; Help Center</span>
      </nav>

      {/* Hero Header */}
      <header className="faq-hero-header">
        <div className="faq-hero-copy">
          <span className="eyebrow">HELP &amp; SUPPORT CENTER</span>
          <h1 className="faq-headline">
            Frequently Asked<br />Questions.
          </h1>
          <p className="faq-hero-subtitle">
            Find answers about our product range, B2B supply, quotations, GST registration, private-labelling enquiries and export queries.
          </p>
        </div>

        <div className="faq-hero-badge-wrap" aria-hidden="true">
          <span className="sticker faq-hero-sticker">
            Big Crunch Help Desk
          </span>
        </div>
      </header>

      {/* Interactive FAQ Client Application */}
      <FaqClient />
    </main>
  );
}

