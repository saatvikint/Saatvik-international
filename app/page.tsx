import { CategoryGrid, Lineup } from './lineup';
import { ProductCollage } from './product-collage';
import { FlavourHero } from './hero';
import { Icon } from './visuals';
import { HomeReviews } from './home-reviews';
import { HomeFaq } from './home-faq';
import { HomeTradeEnquiry } from './home-trade-enquiry';
import { StickerHeading } from './sticker-heading';
import { HomeAbout } from './home-about';
import { WhySaatvik } from './why-saatvik';
import { PuffsFlow } from './puffs-flow';
import { FloatingSnackDecor } from './floating-snack-decor';

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
      <HomeAbout />
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
