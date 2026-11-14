import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { Icon } from '../visuals';
import { StickerHeading } from '../sticker-heading';
import { CompactAboutArt } from '../compact-about-art';

export const metadata: Metadata = {
  title: APP_CONFIG.pageTitle('Our Story'),
  description: 'Meet Saatvik International, a Pune-based B2B sourcing and wholesale partner for makhana, puffs and freeze-dried fruits.',
};

export default function OurStoryPage() {
  return (
    <main id="main" className="content-page story-page shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Our Story</span>
      </nav>

      <section className="content-hero story-hero" aria-labelledby="story-page-title">
        <div className="about-copy">
          <StickerHeading id="story-page-title" size="md" align="start" rays={false}
            kicker={APP_CONFIG.tagline}
            rows={[[{ text: 'Our', tone: 'pink' }], [{ text: 'Story', tone: 'purple' }]]} />
          <p className="about-lead">Bridging the gap between quality snack manufacturers and the businesses that sell them.</p>
          <div className="about-body">
            <p><strong>{APP_CONFIG.name}</strong> is a {APP_CONFIG.address.city}-based trading and wholesale company specialising in premium-quality healthy snacks: raw and flavoured makhana, roasted puffs and freeze-dried fruits.</p>
            <p>We provide end-to-end B2B sourcing, bulk supply and private-label solutions for distributors, retail chains, food brands, HORECA and importers.</p>
          </div>
          <Link className="button yellow content-hero-cta" href="/catalog">Explore our products <Icon name="arrow" /></Link>
        </div>
        <CompactAboutArt className="story-about-art" />
      </section>

      <section className="story-values" aria-labelledby="story-values-title">
        <header className="content-section-heading">
          <p className="eyebrow">HOW WE WORK</p>
          <h2 id="story-values-title">Built for long-term business relationships.</h2>
        </header>
        <div className="content-card-grid three-up">
          <article className="content-card tone-lime"><span className="content-card-number">01</span><h3>Reliable sourcing</h3><p>We connect manufacturers and businesses with a focus on quality, competitive B2B pricing and consistent supply.</p></article>
          <article className="content-card tone-pink"><span className="content-card-number">02</span><h3>Flexible supply</h3><p>We review wholesale, corporate, private-labelling and export enquiries against the products and quantities required.</p></article>
          <article className="content-card tone-blue"><span className="content-card-number">03</span><h3>Responsive partnership</h3><p>Transparency, dependable communication and customer satisfaction guide how we build every relationship.</p></article>
        </div>
      </section>

      <section className="vision-mission-grid" aria-label="Vision and mission">
        <article className="statement-card is-vision"><p className="eyebrow">OUR VISION</p><h2>A trusted name in healthy snacking.</h2><p>To deliver quality products, create strong business partnerships and expand our presence across domestic and international markets.</p></article>
        <article className="statement-card is-mission"><p className="eyebrow">OUR MISSION</p><h2>Make quality snacks accessible to businesses.</h2><p>Through reliable sourcing, competitive pricing, innovative products and dependable supply solutions.</p></article>
      </section>
    </main>
  );
}
