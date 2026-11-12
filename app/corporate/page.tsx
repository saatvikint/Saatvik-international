import Link from 'next/link';
import { CorporateEnquiry } from './corporate-enquiry';
import { CorporateFaq } from './corporate-faq';
import { Icon } from '../visuals';
import { ProductCollage } from '../product-collage';

export const metadata = {
  title: 'Corporate Gifting & Bulk Makhana Enquiries | Snack Munch',
  description: 'Custom corporate hampers, employee wellness snacks, festive gifting, and wholesale bulk crates with tiered discounts. 100% roasted makhana with zero palm oil.',
};

export default function Page() {
  return (
    <main id="main" className="corporate-page shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Corporate &amp; Bulk Enquiries</span>
      </nav>

      {/* Brand Hero - Styled like the iconic .bundle card */}
      <section className="bundle corporate-hero-bundle" aria-labelledby="corporate-hero-title">
        <div className="bundle-copy corporate-hero-copy">
          <span className="eyebrow">CORPORATE GIFTING</span>
          <h1 id="corporate-hero-title" className="corporate-headline">
            Corporate Gifting &amp;<br />Bulk Makhana.
          </h1>
          <p>
            Ditch ordinary sweets. 100% roasted makhana with custom branding, tiered savings, and pan-India doorstep delivery.
          </p>
          <div className="corporate-hero-buttons">
            <a href="#enquiry-builder" className="button yellow">
              Build corporate pack <Icon name="arrow" />
            </a>
            <a href="/catalog" className="text-link hero-catalog-link">
              Explore products <Icon name="arrow" />
            </a>
          </div>
        </div>

        <div className="bundle-art corporate-bundle-art" aria-hidden="true">
          <div className="bundle-circle"></div>
          <ProductCollage />
          <div className="corporate-hamper-badge">
            <span>CUSTOM BRANDED</span>
            <span className="badge-sub">GIFT HAMPERS</span>
          </div>
        </div>
      </section>

      {/* Brand Perks Strip - Direct .perks design */}
      <section className="perks corporate-perks" aria-label="Saatvik International corporate benefits">
        <div className="perks-inner">
          <div>
            <span className="perk-icon"><Icon name="flame" /></span>
            100% Roasted<br />Zero Palm Oil
          </div>
          <div>
            <span className="perk-icon"><Icon name="leaf" /></span>
            Custom Sleeves<br />&amp; Gift Cards
          </div>
          <div>
            <span className="perk-icon"><Icon name="crunch" /></span>
            15% – 35%<br />Tiered Savings
          </div>
          <div>
            <span className="perk-icon"><Icon name="sun" /></span>
            Pan-India Drops<br />&amp; GST Invoicing
          </div>
        </div>
      </section>

      {/* Interactive Builder & Enquiry Form */}
      <CorporateEnquiry />

      {/* Corporate Gifting Solutions Section */}
      <section className="corporate-solutions" aria-labelledby="solutions-heading">
        <header className="cravings-heading">
          <span className="eyebrow">TAILORED FOR TEAMS</span>
          <h2 id="solutions-heading">Made for Every<br />Corporate Moment</h2>
        </header>

        <div className="corporate-solutions-grid">
          <article className="solution-card">
            <span className="sticker solution-sticker">Diwali &amp; Milestones</span>
            <h3>Festive Gift Hampers</h3>
            <p>
              Replace ordinary calorie-heavy sweets with four punchy flavours. Packed in custom co-branded gift boxes with your leadership’s personalized message cards.
            </p>
            <ul className="solution-perks-list">
              <li><Icon name="check" /> Premium gold/matte gift packaging</li>
              <li><Icon name="check" /> Individual doorstep courier to remote team members</li>
              <li><Icon name="check" /> Compliant with corporate gifting policies</li>
            </ul>
          </article>

          <article className="solution-card">
            <span className="sticker solution-sticker">Workplace Wellness</span>
            <h3>Office Pantry Stash</h3>
            <p>
              Keep developers, designers, and sales teams fueled through the 4 PM slump. Zero trans-fat, non-fried roasted makhana that keeps energy high with zero sugar crash.
            </p>
            <ul className="solution-perks-list">
              <li><Icon name="check" /> Monthly bulk replenishment cartons</li>
              <li><Icon name="check" /> Resealable 75g jars to maintain crisp crunch</li>
              <li><Icon name="check" /> Direct factory volume pricing for offices</li>
            </ul>
          </article>

          <article className="solution-card">
            <span className="sticker solution-sticker">Events &amp; Retreats</span>
            <h3>Conferences &amp; Retreat Bags</h3>
            <p>
              Memorable, travel-friendly healthy snacks for leadership retreats, hackathons, investor summits, and client delegate bags.
            </p>
            <ul className="solution-perks-list">
              <li><Icon name="check" /> Nitrogen-flushed jars for 9-month freshness</li>
              <li><Icon name="check" /> Urgent 48-hour turnarounds on conference lots</li>
              <li><Icon name="check" /> Direct hotel &amp; venue drop logistics across India</li>
            </ul>
          </article>
        </div>
      </section>

      {/* Redesigned Rich Corporate & Bulk FAQ Section */}
      <CorporateFaq />
    </main>
  );
}
