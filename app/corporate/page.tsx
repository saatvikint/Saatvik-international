import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { corporateSegments } from '@/content/services';
import { HomeTradeEnquiry } from '../home-trade-enquiry';
import { ImageSlot } from '../image-slot';
import { PageHero } from '../page-hero';
import { Icon } from '../visuals';

export const metadata: Metadata = {
  title: APP_CONFIG.pageTitle('Corporate & Bulk Supply'),
  description: 'Corporate pantry and vending supply, HORECA and hotel chains, corporate gifting and customised bulk orders of makhana, puffs and freeze-dried fruits.',
};

// Corporate & Bulk (client 2026-11-16 offers; 2026-11-20: "looks very basic", add photos of corporate
// pantry and HORECA / hotel chains). No pack sizes, MOQs or delivery promises until confirmed (Q12).

const audiences = [
  { icon: 'building', title: 'Corporate buyers', text: 'Companies, offices, admin and procurement teams, and institutions.', tone: 'tone-lime' },
  { icon: 'hotel', title: 'HORECA', text: 'Hotel chains, restaurants, cafés, caterers and institutional kitchens.', tone: 'tone-pink' },
  { icon: 'store', title: 'Wholesale & retail', text: 'Distributors, wholesalers, retailers and supermarket chains.', tone: 'tone-yellow' },
  { icon: 'globe', title: 'Food brands & importers', text: 'Food brands, private-label owners, exporters and importers.', tone: 'tone-blue' },
] as const;

export default function CorporatePage() {
  return (
    <main id="main" className="content-page corporate-supply-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Corporate &amp; Bulk Supply</span></nav>
        <PageHero id="corporate-title" tone="yellow" kicker="B2B sourcing enquiries"
          rows={[[{ text: 'Corporate', tone: 'lime' }], [{ text: '& Bulk', tone: 'red' }]]}
          intro={<p>Pantry and vending supply, HORECA and hotel chains, corporate gifting and customised bulk orders of makhana, roasted puffs and freeze-dried fruits, all through one direct enquiry.</p>}
          actions={<><Link className="button primary" href="/contact">Get a quote <Icon name="arrow" /></Link><Link className="button yellow" href="/catalog">Explore products</Link></>}
          facts={[{ icon: 'coffee', label: 'Pantry & vending' }, { icon: 'hotel', label: 'HORECA' }, { icon: 'gift', label: 'Gifting' }, { icon: 'store', label: 'Bulk orders' }]} />

        <nav className="service-jump" aria-label="Corporate services">
          {corporateSegments.map(segment => <a key={segment.id} href={`#${segment.id}`}><Icon name={segment.icon} /> {segment.title}</a>)}
        </nav>

        <section className="feature-rows" aria-label="What we supply">
          {corporateSegments.map((segment, index) => (
            <article key={segment.id} id={segment.id} className={`feature-row${index % 2 ? ' is-flipped' : ''}`}>
              <ImageSlot image={segment.image} ratio="4 / 3" />
              <div className="feature-row-copy">
                <p className="eyebrow">{String(index + 1).padStart(2, '0')}</p>
                <h2><Icon name={segment.icon} /> {segment.title}</h2>
                <p>{segment.text}</p>
                <ul className="pdp-ticks">{segment.points.map(point => <li key={point}><Icon name="check" /> {point}</li>)}</ul>
              </div>
            </article>
          ))}
        </section>

        <section className="corporate-audience" aria-labelledby="corporate-audience-title">
          <header className="content-section-heading">
            <p className="eyebrow">WHO WE SUPPLY</p>
            <h2 id="corporate-audience-title">Built for business buyers.</h2>
          </header>
          <div className="content-card-grid four-up">
            {audiences.map(item => (
              <article key={item.title} className={`content-card ${item.tone}`}>
                <span className="content-card-number"><Icon name={item.icon} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="content-actions corporate-supply-actions"><Link className="button yellow" href="/catalog">Explore products <Icon name="arrow" /></Link><Link className="button primary" href="/contact">Get a quote</Link></div>
      </div>
      <HomeTradeEnquiry />
    </main>
  );
}
