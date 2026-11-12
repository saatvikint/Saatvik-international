import Link from 'next/link';
import { EnquiryCheckout } from './enquiry-checkout';
import { StickerHeading } from '../sticker-heading';
export const metadata = { title: 'Wholesale Quotation & Enquiry | Saatvik International' };

export default function Page() {
  return (
    <main id="main" className="checkout-page shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/catalog">Catalog</Link><span aria-hidden="true">/</span><span aria-current="page">B2B Quotation</span></nav>
      <header className="checkout-heading">
        <StickerHeading as="h1" size="md" align="start" kicker="Saatvik International B2B enquiries"
          rows={[[{ text: 'Request', tone: 'lime' }, { text: 'a', tone: 'pink', small: true }], [{ text: 'Quote', tone: 'red' }]]} />
        <p>Tell us how to reach your company and send your bulk selection to Saatvik International.</p>
      </header>
      <EnquiryCheckout />
    </main>
  );
}
