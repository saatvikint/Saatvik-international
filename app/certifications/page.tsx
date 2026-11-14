import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { Icon } from '../visuals';
import { StickerHeading } from '../sticker-heading';

export const metadata: Metadata = {
  title: APP_CONFIG.pageTitle('Certifications & Business Documents'),
  description: `View confirmed registration details for ${APP_CONFIG.name} and request the documents needed for your B2B enquiry.`,
};

export default function CertificationsPage() {
  return (
    <main id="main" className="content-page certifications-page shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Certifications</span></nav>
      <header className="content-page-header">
        <StickerHeading id="certifications-title" kicker="Verified business information" rows={[[{ text: 'Business', tone: 'pink' }], [{ text: 'Documents', tone: 'purple' }]]} />
        <p>Procurement documentation varies by product, destination and order type. We publish only information that has been confirmed by the business.</p>
      </header>

      <section className="registration-card" aria-labelledby="registration-title">
        <div className="registration-seal"><Icon name="check" /></div>
        <div><p className="eyebrow">CONFIRMED REGISTRATION</p><h2 id="registration-title">Goods and Services Tax (GST)</h2><p>GSTIN <strong>{APP_CONFIG.gstin}</strong></p></div>
        <span className="registration-status">Confirmed</span>
      </section>

      <section className="document-process" aria-labelledby="document-process-title">
        <header className="content-section-heading"><p className="eyebrow">BUYER DOCUMENT REQUESTS</p><h2 id="document-process-title">Need documents for procurement?</h2><p>Tell us the product, destination market and documents your organisation requires. Our team will confirm what is applicable and available for that enquiry.</p></header>
        <div className="content-card-grid three-up">
          <article className="content-card tone-yellow"><span className="content-card-number">01</span><h3>Share your requirement</h3><p>Include products, quantities, destination and your buyer checklist.</p></article>
          <article className="content-card tone-blue"><span className="content-card-number">02</span><h3>We verify applicability</h3><p>Requirements can differ by order, product and destination market.</p></article>
          <article className="content-card tone-lime"><span className="content-card-number">03</span><h3>Receive confirmation</h3><p>We respond with confirmed information for your specific enquiry.</p></article>
        </div>
        <div className="content-actions"><Link className="button yellow" href="/export-query">Request documents <Icon name="arrow" /></Link><Link className="button primary" href="/contact">Contact us</Link></div>
      </section>

      <aside className="certification-note"><Icon name="receipt" /><p>FSSAI, IEC, APEDA and other certificate details are not displayed until copies are supplied and verified. This prevents unconfirmed claims from appearing on the website.</p></aside>
    </main>
  );
}
