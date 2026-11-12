import { CategoryGrid, Lineup } from './lineup';
import { ProductCollage } from './product-collage';
import { FlavourHero } from './hero';
import { Icon } from './visuals';
import { HomeReviews } from './home-reviews';
import { HomeFaq } from './home-faq';
import { HomeTradeEnquiry } from './home-trade-enquiry';
import { StickerHeading } from './sticker-heading';
import { HomeStats } from './home-stats';

export default function Page() {
  return (
    <main id="main">
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
      <section className="story shell" id="story" aria-labelledby="story-title">
        <div className="story-image" data-reveal>
          <img src="/assets/products/freeze-dried-mango-cubes.webp" width="1200" height="900" alt="Freeze-dried mango cubes in a glass bowl" loading="lazy" />
          <span className="sticker">Premium Healthy Snacking Solutions</span>
        </div>
        <div className="story-copy">
          <StickerHeading id="story-title" size="md" align="start" kicker="Reliable sourcing & supply"
            rows={[[{ text: 'Quality', tone: 'purple' }], [{ text: 'Snacks', tone: 'lime' }]]} />
          <p>Saatvik International is a trading and wholesale company for healthy snacks: makhana (fox nuts), roasted puffs and freeze-dried fruits.</p>
          <p>We connect quality snack manufacturers with distributors, retailers, food brands and importers, with bulk supply and private-label solutions.</p>
          <a className="text-link" href="#products">See the range <Icon name="arrow" /></a>
        </div>
      </section>

      {/* 1. Customer Reviews Section */}
      <HomeReviews />

      {/* 2. Minimal Homepage FAQ Section */}
      <HomeFaq />

      {/* 3. Trade & Distributorship Enquiry Section (Lahori Zeera Inspired) */}
      <HomeTradeEnquiry />
    </main>
  );
}
