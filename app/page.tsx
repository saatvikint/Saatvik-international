import { CravingGrid, Lineup } from './lineup';
import { FlavourHero } from './hero';
import { PanelButton } from './shop';
import { Icon } from './visuals';
import { HomeReviews } from './home-reviews';
import { HomeFaq } from './home-faq';
import { HomeTradeEnquiry } from './home-trade-enquiry';

export default function Page() {
  return (
    <main id="main">
      <FlavourHero />
      <section className="perks" aria-label="Snack Munch features">
        <div className="shell perks-inner">
          <div><span className="perk-icon"><svg className="icon"><use href="#flame"/></svg></span>Roasted<br />Makhana</div>
          <div><span className="perk-icon"><svg className="icon"><use href="#leaf"/></svg></span>No Palm<br />Oil</div>
          <div><span className="perk-icon"><svg className="icon"><use href="#sun"/></svg></span>Handpicked<br />Makhana</div>
          <div><span className="perk-icon"><svg className="icon"><use href="#crunch"/></svg></span>Light &amp;<br />Crunchy</div>
        </div>
      </section>
      <section className="cravings shell" id="cravings" aria-labelledby="cravings-title">
        <header className="cravings-heading">
          <span className="eyebrow">FIND YOUR FLAVOUR</span>
          <h2 id="cravings-title">Explore<br /> Our Snacks</h2>
        </header>
        <div className="cravings-picks">
          <div className="cravings-sticker" aria-hidden="true">
            <svg viewBox="0 0 40 26"><path d="M37 4C21 2 12 9 7 20m0 0 2-10m-2 10 11-4"/></svg>
            <span className="sticker">Shop by Craving</span>
          </div>
          <CravingGrid />
        </div>
      </section>
      <Lineup />
      <section className="shell bundle-shell" id="build" aria-labelledby="bundle-title">
        <div className="bundle">
          <div className="bundle-copy">
            <span className="eyebrow">MIX, MATCH, MUNCH</span>
            <h2 id="bundle-title">Build your<br /> own pack.</h2>
            <p>Pick any three jars. Double up on a favourite or give three different flavours a go.</p>
            <a className="button yellow" href="#enquiry">Request Custom Pack <Icon name="arrow" /></a>
          </div>
          <div className="bundle-art" data-reveal aria-hidden="true">
            <div className="bundle-circle"></div>
            <svg className="jar bundle-masala"><use href="#jar-masala"/></svg>
            <svg className="jar bundle-cheese"><use href="#jar-cheese"/></svg>
            <svg className="jar bundle-peri"><use href="#jar-peri"/></svg>
            <svg className="jar bundle-onion"><use href="#jar-onion"/></svg>
          </div>
        </div>
      </section>
      <section className="story shell" id="story" aria-labelledby="story-title">
        <div className="story-image" data-reveal>
          <img src="/assets/onion.jpg" width="1536" height="1024" alt="No Cap Cream N’ Onion roasted makhana with spring onions" loading="lazy" />
          <span className="sticker">The good crunch.</span>
        </div>
        <div className="story-copy">
          <span className="eyebrow">THE SNACK MUNCH STORY</span>
          <h2 id="story-title">Little bites.<br />Big personality.</h2>
          <p>We started with makhana, also called fox nuts, and gave it four very different moods. Think punchy desi masala, fiery peri peri, savoury cheese and mellow cream ’n onion.</p>
          <p>Open a jar for your chai break, movie night or that 4 p.m. craving.</p>
          <a className="text-link" href="#flavours">Meet the flavours <svg className="icon"><use href="#arrow"/></svg></a>
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
