import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { Icon } from './visuals';
import { StickerHeading } from './sticker-heading';
import { CompactAboutArt } from './compact-about-art';

export function HomeAbout() {
  return (
    <section className="home-about-section shell" id="story" aria-labelledby="home-about-title">
      <div className="home-about-copy">
        <StickerHeading id="home-about-title" size="md" align="start" rays={false}
          kicker="Pune · B2B · Wholesale · Export"
          rows={[[{ text: 'About', tone: 'pink' }, { text: 'Saatvik', tone: 'purple' }]]} />
        <p className="home-about-lead">Leading Supplier of Healthy Snacks in India.</p>
        <div className="home-about-body">
          <p><strong>{APP_CONFIG.name}</strong> is a Pune-based trading and wholesale business supplying makhana, roasted puffs and freeze-dried fruits.</p>
          <p>We handle B2B sourcing enquiries for distributors, wholesalers, retailers, food brands, corporate buyers, HORECA, institutional buyers and importers.</p>
        </div>
        <div className="home-about-actions">
          <Link className="button yellow" href="/our-story">Read our story <Icon name="arrow" /></Link>
          <Link className="text-link" href="/export-query">Get a quote <Icon name="arrow" /></Link>
        </div>
      </div>

      <CompactAboutArt className="home-about-art" />
    </section>
  );
}
