import { CategoryGrid, Lineup } from './lineup';
import { ProductCollage } from './product-collage';
import { FlavourHero } from './hero';
import { Icon } from './visuals';
import { HomeReviews } from './home-reviews';
import { HomeFaq } from './home-faq';
import { HomeTradeEnquiry } from './home-trade-enquiry';
import { StickerHeading } from './sticker-heading';
import { HomeStats } from './home-stats';
import { WhySaatvik } from './why-saatvik';
import { PuffsFlow } from './puffs-flow';
import { FloatingSnackDecor } from './floating-snack-decor';
import { APP_CONFIG } from '@/config/APP_CONFIG';

export default function Page() {
  return (
    <main id="main">
      <FloatingSnackDecor />
      <FlavourHero />
      <section className="perks" aria-label="What Saatvik International offers">
        <div className="shell perks-inner">
          <div><span className="perk-icon"><Icon name="building" /></span>B2B<br />Supply</div>
          <div><span className="perk-icon"><Icon name="truck" /></span>Wholesale &amp;<br />Bulk</div>
          <div><span className="perk-icon"><Icon name="package" /></span>Private<br />Label</div>
          <div><span className="perk-icon"><Icon name="globe" /></span>Export<br />Enquiries</div>
        </div>
      </section>
      <section className="cravings shell" id="cravings" aria-labelledby="cravings-title">
        <header className="cravings-heading">
          <StickerHeading id="cravings-title" kicker="Makhana · Puffs · Freeze-dried fruits"
            rows={[[{ text: 'Our', tone: 'lime' }], [{ text: 'Categories', tone: 'red' }]]} />
        </header>
        <div className="cravings-picks">
          <CategoryGrid />
        </div>
      </section>
      <HomeStats />
      <PuffsFlow />
      <Lineup />
      <section className="shell bundle-shell" id="build" aria-labelledby="bundle-title">
        <div className="bundle">
          <div className="bundle-copy">
            <StickerHeading id="bundle-title" size="md" align="start" onDark kicker="One enquiry, many products"
              rows={[[{ text: 'Mix', tone: 'lime' }, { text: 'your', tone: 'pink', small: true }], [{ text: 'Range', tone: 'yellow' }]]} />
            <p>Add makhana, puffs and freeze-dried fruits to one enquiry, and we will quote for the full list together.</p>
            <a className="button yellow" href="#enquiry">Start an Enquiry <Icon name="arrow" /></a>
          </div>
          <div className="bundle-art" data-reveal aria-hidden="true">
            <div className="bundle-circle"></div>
            <ProductCollage />
          </div>
        </div>
      </section>
      {/* About (Paper design, 2026-11-13). Copy from .agent/client/company-profile.md only. */}
      <section className="about-section shell" id="story" aria-labelledby="story-title">
        <div className="about-copy">
          <StickerHeading id="story-title" size="md" align="start" rays={false}
            rows={[[{ text: 'About', tone: 'pink' }], [{ text: APP_CONFIG.shortName, tone: 'purple' }]]} />
          <p className="about-lead">Bridging the gap between quality snack manufacturers and the businesses that sell them.</p>
          <div className="about-body">
            <p><strong>{APP_CONFIG.name}</strong> is a {APP_CONFIG.address.city}-based trading and wholesale company specialising in premium-quality healthy snacks: raw and flavoured makhana (fox nuts), roasted puffs and freeze-dried fruits.</p>
            <p>We offer end-to-end B2B sourcing, bulk supply and private-label solutions for distributors, retail chains, food brands, HORECA and importers, built on product quality, transparency, reliability and long-term business relationships.</p>
          </div>
          <a className="text-link about-link" href="#products">See the range <Icon name="arrow" /></a>
        </div>
        <div className="about-photo about-collage" role="img" aria-label="Lifestyle collage showing people enjoying makhana and using freeze-dried mango and black jamun in everyday meals">
          <span className="about-collage-cell photo-makhana" aria-hidden="true">
            <img src="/assets/about/lifestyle-makhana.webp" width={900} height={900} alt="" loading="lazy" decoding="async" />
          </span>
          <span className="about-collage-cell shape-lime" aria-hidden="true" />
          <span className="about-collage-cell shape-blue" aria-hidden="true" />
          <span className="about-collage-cell shape-purple" aria-hidden="true" />
          <span className="about-collage-cell photo-mango" aria-hidden="true">
            <img src="/assets/about/lifestyle-mango.webp" width={900} height={900} alt="" loading="lazy" decoding="async" />
          </span>
          <span className="about-collage-cell photo-jamun" aria-hidden="true">
            <img src="/assets/about/lifestyle-black-jamun.webp" width={900} height={900} alt="" loading="lazy" decoding="async" />
          </span>
          <span className="about-collage-cell shape-orange" aria-hidden="true" />
        </div>
      </section>

      {/* 1. Customer Reviews Section */}
      <WhySaatvik />
      <HomeReviews />

      {/* 2. Minimal Homepage FAQ Section */}
      <HomeFaq />

      {/* 3. Trade & Distributorship Enquiry Section (Lahori Zeera Inspired) */}
      <HomeTradeEnquiry />
    </main>
  );
}
