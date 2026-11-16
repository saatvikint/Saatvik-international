import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { HomeTradeEnquiry } from '../home-trade-enquiry';
import { Icon } from '../visuals';
import { StickerHeading } from '../sticker-heading';

export const metadata: Metadata = {
  title: APP_CONFIG.pageTitle('Corporate & Bulk Supply'),
  description: 'Corporate pantry and vending supply, corporate gifting and customised bulk orders of makhana, puffs and freeze-dried fruits.',
};

// Three corporate offers from client feedback 2026-11-16. Gifting returns at the client's request
// (supersedes decision 35 for corporate gifting). No pack sizes, MOQs or delivery promises until confirmed (Q12).
const offers = [
  {
    id: 'pantry-vending',
    number: '01',
    tone: 'tone-lime',
    icon: 'coffee',
    eyebrow: 'FOR OFFICES, CAMPUSES & CO-WORKING',
    title: 'Corporate pantry & vending supply',
    text: 'Keep office pantries, cafeterias and vending machines stocked with makhana, roasted puffs and freeze-dried fruits instead of fried snacks.',
    points: ['Mixed range for pantries and cafeterias', 'Pack formats suited to vending', 'Repeat supply discussed per requirement'],
  },
  {
    id: 'gifting',
    number: '02',
    tone: 'tone-pink',
    icon: 'gift',
    eyebrow: 'FESTIVALS, EVENTS & CLIENT GIFTS',
    title: 'Corporate gifting solutions',
    text: 'Healthy snack hampers and gift packs for Diwali, new-year and employee or client gifting, put together for your quantity and occasion.',
    points: ['Curated mixes across categories', 'Gift-pack options for your brand', 'Bulk quantities for teams and clients'],
  },
  {
    id: 'custom-bulk',
    number: '03',
    tone: 'tone-yellow',
    icon: 'package',
    eyebrow: 'DISTRIBUTORS, RETAIL, HORECA & BRANDS',
    title: 'Customised bulk orders',
    text: 'Bulk orders built around your product mix, flavours, packing and quantities, for resale, food service or your own label.',
    points: ['Choose products and flavours', 'Bulk or private-label packing', 'One quotation for the full list'],
  },
] as const;

export default function CorporatePage() {
  return (
    <main id="main" className="content-page corporate-supply-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Corporate &amp; Bulk Supply</span></nav>
        <header className="content-page-header">
          <StickerHeading as="h1" id="corporate-title" kicker="B2B sourcing enquiries" rows={[[{ text: 'Corporate', tone: 'lime' }], [{ text: '& Bulk', tone: 'red' }]]} />
          <p>Pantry and vending supply, corporate gifting and customised bulk orders of makhana, roasted puffs and freeze-dried fruits, all through one direct enquiry.</p>
        </header>

        <nav className="corporate-jump" aria-label="Corporate services">
          {offers.map(offer => <a key={offer.id} href={`#${offer.id}`}><Icon name={offer.icon} /> {offer.title}</a>)}
        </nav>

        <section className="services-list" aria-labelledby="corporate-title">
          {offers.map(offer => (
            <article key={offer.id} id={offer.id} className={`service-panel ${offer.tone}`}>
              <div className="service-panel-number">{offer.number}</div>
              <div className="service-panel-copy">
                <p className="eyebrow">{offer.eyebrow}</p>
                <h2>{offer.title}</h2>
                <p>{offer.text}</p>
              </div>
              <ul>{offer.points.map(point => <li key={point}><Icon name="check" /> {point}</li>)}</ul>
            </article>
          ))}
        </section>

        <section className="corporate-audience" aria-labelledby="corporate-audience-title">
          <header className="content-section-heading">
            <p className="eyebrow">WHO WE SUPPLY</p>
            <h2 id="corporate-audience-title">Built for business buyers.</h2>
          </header>
          <div className="content-card-grid three-up">
            <article className="content-card tone-lime"><span className="content-card-number">01</span><h3>Corporate buyers</h3><p>Companies, offices, admin and procurement teams, and institutions.</p></article>
            <article className="content-card tone-yellow"><span className="content-card-number">02</span><h3>Wholesale & retail</h3><p>Distributors, wholesalers, retailers and supermarket chains.</p></article>
            <article className="content-card tone-blue"><span className="content-card-number">03</span><h3>Food businesses</h3><p>Food brands, HORECA, importers and other business buyers.</p></article>
          </div>
        </section>

        <div className="content-actions corporate-supply-actions"><Link className="button yellow" href="/catalog">Explore products <Icon name="arrow" /></Link><Link className="button primary" href="/export-query">Get a quote</Link></div>
      </div>
      <HomeTradeEnquiry />
    </main>
  );
}
