import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { Icon } from '../visuals';
import { StickerHeading } from '../sticker-heading';

export const metadata: Metadata = {
  title: APP_CONFIG.pageTitle('B2B Snack Services'),
  description: 'Private-labelling enquiries, corporate requirements and bulk healthy-snack supply from Saatvik International.',
};

const services = [
  {
    id: 'private-label',
    number: '01',
    tone: 'tone-pink',
    eyebrow: 'PRIVATE-LABEL ENQUIRIES',
    title: 'Private labelling',
    text: 'Share your company, product and quantity requirements. The available private-labelling scope will be confirmed for your enquiry.',
    points: ['Business details', 'Product selection', 'Estimated quantity'],
  },
  {
    id: 'corporate',
    number: '02',
    tone: 'tone-yellow',
    eyebrow: 'FOR TEAMS & OCCASIONS',
    title: 'Corporate requirements',
    text: 'Source healthy snacks for companies, offices and institutional procurement requirements.',
    points: ['Product enquiries', 'Corporate supply', 'Direct quotation support'],
  },
  {
    id: 'bulk-supply',
    number: '03',
    tone: 'tone-lime',
    eyebrow: 'WHOLESALE & DISTRIBUTION',
    title: 'Bulk supplies',
    text: 'We provide makhana, roasted puffs and freeze-dried fruits for distributors, wholesalers, retailers, food brands, HORECA and importers.',
    points: ['Multi-product sourcing', 'Domestic and export enquiries', 'B2B quotation based on requirement'],
  },
] as const;

export default function ServicesPage() {
  return (
    <main id="main" className="content-page services-page shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Services</span></nav>
      <header className="content-page-header">
        <StickerHeading id="services-title" kicker="Flexible solutions for businesses" rows={[[{ text: 'Our', tone: 'lime' }], [{ text: 'Services', tone: 'red' }]]} />
        <p>Send one product or a multi-product requirement, and our team will review the appropriate B2B supply route.</p>
      </header>

      <section className="services-list" aria-labelledby="services-title">
        {services.map((service) => (
          <article key={service.id} id={service.id} className={`service-panel ${service.tone}`}>
            <div className="service-panel-number">{service.number}</div>
            <div className="service-panel-copy">
              <p className="eyebrow">{service.eyebrow}</p>
              <h2>{service.title}</h2>
              <p>{service.text}</p>
            </div>
            <ul>{service.points.map(point => <li key={point}><Icon name="check" /> {point}</li>)}</ul>
          </article>
        ))}
      </section>

      <section className="services-cta" aria-label="Start an enquiry">
        <div><p className="eyebrow">HAVE A PRODUCT BRIEF?</p><h2>Let’s build the right supply solution.</h2></div>
        <div className="content-actions"><Link className="button yellow" href="/export-query">Get a quote <Icon name="arrow" /></Link><Link className="button primary" href="/contact">Contact us</Link></div>
      </section>
    </main>
  );
}
