import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { corporateSegments, packagingFormats, packagingPromises, privateLabel } from '@/content/services';
import { ImageSlot } from '../image-slot';
import { PageHero } from '../page-hero';
import { Icon, type IconName } from '../visuals';
import { StickerHeading } from '../sticker-heading';
import { PackShowcase } from './pack-showcase';

export const metadata: Metadata = {
  title: APP_CONFIG.pageTitle('B2B Snack Services'),
  description: 'Private labelling with your brand on the pack, corporate pantry and HORECA supply, bulk orders and nitrogen-flushed packing options from Saatvik International.',
};

// Services (client 2026-11-20): richer private label with a 360° "Your Brand Name" pack mock-up,
// corporate & bulk with photos, and packaging formats with descriptions and photos.

const jump: { href: string; icon: IconName; label: string }[] = [
  { href: '#private-label', icon: 'brush', label: 'Private labelling' },
  { href: '#corporate', icon: 'building', label: 'Corporate requirements' },
  { href: '#bulk-supply', icon: 'store', label: 'Bulk supplies' },
  { href: '#packing-options', icon: 'package', label: 'Packing options' },
];

export default function ServicesPage() {
  return (
    <main id="main" className="content-page services-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Services</span></nav>
        <PageHero id="services-title" tone="pink" kicker="Flexible solutions for businesses"
          rows={[[{ text: 'Our', tone: 'lime' }], [{ text: 'Services', tone: 'red' }]]}
          intro={<p>Private labelling, corporate supply, bulk orders and packing, for makhana, millet-based puffs and freeze-dried fruits. One supplier, one quotation.</p>}
          actions={<><Link className="button primary" href="/contact">Get a quote <Icon name="arrow" /></Link><Link className="button yellow" href="#private-label">Start your brand</Link></>}
          facts={[{ icon: 'check', label: 'Low MOQ' }, { icon: 'package-check', label: 'Nitrogen-flushed packing' }, { icon: 'sparkle', label: '15 flavours' }]} />

        <nav className="service-jump" aria-label="Services on this page">
          {jump.map(item => <a key={item.href} href={item.href}><Icon name={item.icon} /> {item.label}</a>)}
        </nav>
      </div>

      {/* ---------- Private label ---------- */}
      <section id="private-label" className="pl-section" aria-labelledby="pl-title">
        <div className="shell">
          <div className="pl-hero">
            <div className="pl-copy">
              <p className="eyebrow">01 · PRIVATE LABELLING</p>
              <h2 id="pl-title">Your brand.<br />Our snacks.</h2>
              <p className="pl-intro">{privateLabel.intro}</p>
              <ul className="pl-for" aria-label="Who it is for">
                {privateLabel.forWho.map(item => <li key={item}>{item}</li>)}
              </ul>
              <div className="content-actions"><Link className="button yellow" href="/contact">Start a private-label enquiry <Icon name="arrow" /></Link></div>
            </div>
            <PackShowcase />
          </div>

          <div className="pl-offers">
            {privateLabel.offers.map(offer => (
              <article key={offer.title} className="pl-offer">
                <span className="pl-offer-icon"><Icon name={offer.icon as IconName} /></span>
                <h3>{offer.title}</h3>
                <p>{offer.text}</p>
              </article>
            ))}
          </div>

          <div className="pl-process">
            <header className="pl-process-head">
              <StickerHeading size="md" align="start" rays={false} kicker="How private labelling works"
                rows={[[{ text: 'Brief', tone: 'yellow' }, { text: 'to', tone: 'pink', small: true }], [{ text: 'Shelf', tone: 'lime' }]]} />
              <ImageSlot image={privateLabel.image} className="pl-range-photo" ratio="4 / 3" />
            </header>
            <ol className="pl-steps">
              {privateLabel.steps.map((step, index) => (
                <li key={step.title}><span className="pl-step-num">{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="shell">
        {/* ---------- Corporate requirements + bulk supplies ---------- */}
        <section id="corporate" className="svc-block" aria-labelledby="corporate-heading">
          <header className="svc-block-head">
            <p className="eyebrow">02 · CORPORATE REQUIREMENTS</p>
            <h2 id="corporate-heading">Snacks for offices, hotels & gifting.</h2>
            <p>Pantry and vending supply, HORECA and hotel chains, and corporate gift packs, sourced through one direct enquiry.</p>
          </header>
          <div className="svc-photo-grid">
            {corporateSegments.slice(0, 3).map(segment => (
              <article key={segment.id} className="svc-photo-card">
                <ImageSlot image={segment.image} />
                <div className="svc-photo-card-copy"><h3><Icon name={segment.icon} /> {segment.title}</h3><p>{segment.text}</p></div>
              </article>
            ))}
          </div>
          <Link className="text-link svc-more" href="/corporate">Corporate &amp; bulk supply in detail <Icon name="arrow" /></Link>
        </section>

        <section id="bulk-supply" className="svc-block svc-split" aria-labelledby="bulk-heading">
          <ImageSlot image={corporateSegments[3].image} ratio="5 / 4" />
          <div>
            <p className="eyebrow">03 · BULK SUPPLIES</p>
            <h2 id="bulk-heading">Wholesale, distribution & export.</h2>
            <p>We supply makhana, millet-based puffs and freeze-dried fruits in bulk to distributors, wholesalers, retailers, supermarket chains, food brands, HORECA and importers.</p>
            <ul className="pdp-ticks">
              <li><Icon name="check" /> Multi-product sourcing in one quotation</li>
              <li><Icon name="check" /> Domestic and export enquiries</li>
              <li><Icon name="check" /> Bulk aluminium pouches or retail-ready packs</li>
              <li><Icon name="check" /> Low MOQ: quantities confirmed in your quotation</li>
            </ul>
            <div className="content-actions"><Link className="button primary" href="/contact">Get a quote <Icon name="arrow" /></Link><Link className="button yellow" href="/export-query">Export query</Link></div>
          </div>
        </section>

        {/* ---------- Packing options ---------- */}
        <section id="packing-options" className="svc-block" aria-labelledby="packing-heading">
          <header className="svc-block-head">
            <p className="eyebrow">04 · PACKING OPTIONS</p>
            <h2 id="packing-heading">Packed the way you sell.</h2>
            <p>Five pack formats for retail, gifting, food service and bulk. Every pack is nitrogen flushed and food grade.</p>
            <ul className="pack-promises">{packagingPromises.map(item => <li key={item}><Icon name="check" /> {item}</li>)}</ul>
          </header>
          <div className="pack-grid">
            {packagingFormats.map(format => (
              <article key={format.id} className="pack-card">
                <ImageSlot image={format.image} ratio="1 / 1" />
                <span className="pack-card-tag">Nitrogen flushed</span>
                <div className="pack-card-copy">
                  <h3><Icon name={format.icon} /> {format.name}</h3>
                  <p>{format.text}</p>
                  <p className="pack-card-best"><strong>Best for:</strong> {format.bestFor}</p>
                  {format.note && <p className="pack-card-note">{format.note}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="services-cta" aria-label="Start an enquiry">
          <div><p className="eyebrow">HAVE A PRODUCT BRIEF?</p><h2>Let’s build the right supply solution.</h2></div>
          <div className="content-actions"><Link className="button yellow" href="/contact">Get a quote <Icon name="arrow" /></Link><Link className="button primary" href="/export-query">Export query</Link></div>
        </section>
      </div>
    </main>
  );
}
