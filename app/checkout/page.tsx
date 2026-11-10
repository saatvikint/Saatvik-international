import Link from 'next/link';
import { EnquiryCheckout } from './enquiry-checkout';
export const metadata = { title: 'Wholesale Quotation & Enquiry | Saatvik International' };

export default function Page() {
  return (
    <main id="main" className="checkout-page shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/catalog">Catalog</Link><span aria-hidden="true">/</span><span aria-current="page">B2B Quotation</span></nav>
      <header className="checkout-heading">
        <span className="eyebrow">SAATVIK INTERNATIONAL B2B ENQUIRIES</span>
        <h1>Request a Quotation</h1>
        <p>Tell us how to reach your company and send your bulk selection to Saatvik International.</p>
      </header>
      <EnquiryCheckout />
    </main>
  );
}
