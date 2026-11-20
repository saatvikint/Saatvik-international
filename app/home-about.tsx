import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { Icon } from './visuals';
import { StickerHeading } from './sticker-heading';
import { CompactAboutArt } from './compact-about-art';
import { founder } from '@/content/company-media';

export function HomeAbout() {
  return (
    <section className="home-about-section shell" id="story" aria-labelledby="home-about-title">
      <div className="home-about-copy">
        <StickerHeading id="home-about-title" size="md" align="start" rays={false}
          kicker="Pune · B2B · Wholesale · Export"
          rows={[[{ text: 'About', tone: 'pink' }, { text: 'Us', tone: 'purple' }]]} />
        <p className="home-about-lead">{APP_CONFIG.tagline}.</p>
        <div className="home-about-body">
          <p><strong>{APP_CONFIG.name}</strong> was founded with a vision to connect quality food products with markets across the globe. With over 4 years of experience in the healthy snacking industry, we supply makhana, roasted snacks, millet-based puffs and freeze-dried fruits.</p>
          <p>We focus on reliable sourcing, consistent quality and strong business partnerships, supplying distributors, wholesalers, retailers, food brands, corporate buyers, HORECA and importers.</p>
          {founder && <p className="home-about-founder"><strong>{founder.name}</strong>, {founder.role}</p>}
        </div>
        <div className="home-about-actions">
          <Link className="button yellow" href="/our-story">More about us <Icon name="arrow" /></Link>
          <Link className="text-link" href="/contact">Get a quote <Icon name="arrow" /></Link>
        </div>
      </div>

      <CompactAboutArt className="home-about-art" />
    </section>
  );
}
