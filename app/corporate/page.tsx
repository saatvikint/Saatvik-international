import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { HomeTradeEnquiry } from '../home-trade-enquiry';
import { Icon } from '../visuals';
import { StickerHeading } from '../sticker-heading';

export const metadata: Metadata = {
  title: APP_CONFIG.pageTitle('Corporate & Bulk Supply'),
  description: 'B2B snack supply enquiries for companies, distributors, retailers, food brands, HORECA and institutional buyers.',
};

export default function CorporatePage() {
  return (
    <main id="main" className="content-page corporate-supply-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Corporate &amp; Bulk Supply</span></nav>
        <header className="content-page-header">
          <StickerHeading id="corporate-title" kicker="B2B sourcing enquiries" rows={[[{ text: 'Corporate', tone: 'lime' }], [{ text: '& Bulk', tone: 'red' }]]} />
          <p>Source makhana, roasted puffs and freeze-dried fruits for your business through one direct enquiry.</p>
        </header>

        <section className="content-card-grid three-up" aria-labelledby="corporate-title">
          <article className="content-card tone-lime"><span className="content-card-number">01</span><h3>Corporate buyers</h3><p>Product enquiries for companies, offices and institutional procurement teams.</p></article>
          <article className="content-card tone-yellow"><span className="content-card-number">02</span><h3>Wholesale supply</h3><p>Supply enquiries for distributors, wholesalers, retailers and supermarket chains.</p></article>
          <article className="content-card tone-blue"><span className="content-card-number">03</span><h3>Food businesses</h3><p>Sourcing enquiries for food brands, HORECA, importers and other business buyers.</p></article>
        </section>

        <div className="content-actions corporate-supply-actions"><Link className="button yellow" href="/catalog">Explore products <Icon name="arrow" /></Link><Link className="button primary" href="/export-query">Get a quote</Link></div>
      </div>
      <HomeTradeEnquiry />
    </main>
  );
}
