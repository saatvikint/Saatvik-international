import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { Icon } from '../visuals';
import { StickerHeading } from '../sticker-heading';
import { CompactAboutArt } from '../compact-about-art';
import { StoryVideos } from './story-videos';
import { founder, manufacturingVideos, showDraftSlots } from '@/content/company-media';

// About Us / Our Story. Copy supplied verbatim by the client on 2026-11-16 (.agent/client/2026-11-16-our-story.md).

export const metadata: Metadata = {
  title: APP_CONFIG.pageTitle('About Us'),
  description: 'Saatvik International: over 4 years in healthy snacking, supplying makhana, roasted snacks, millet-based puffs and freeze-dried fruits to domestic and international buyers.',
};

const values = [
  { title: 'Integrity', text: 'Building every business relationship on honesty, transparency and mutual trust.', tone: 'tone-lime' },
  { title: 'Quality Commitment', text: 'Maintaining high standards across sourcing, products and supply.', tone: 'tone-pink' },
  { title: 'Reliability', text: 'Delivering consistency, accountability and dependable business solutions.', tone: 'tone-blue' },
  { title: 'Customer Focus', text: 'Understanding buyer requirements and providing flexible, value-driven solutions.', tone: 'tone-yellow' },
  { title: 'Long-Term Partnerships', text: 'Creating lasting relationships through collaboration, respect and shared growth.', tone: 'tone-teal' },
] as const;

export default function OurStoryPage() {
  const founderPhoto = founder?.photo && existsSync(join(process.cwd(), 'public', founder.photo.src)) ? founder.photo : undefined;
  return (
    <main id="main" className="content-page story-page shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">About Us</span>
      </nav>

      <section className="content-hero story-hero" aria-labelledby="story-page-title">
        <div className="about-copy">
          <StickerHeading as="h1" id="story-page-title" size="md" align="start" rays={false}
            kicker="Our story"
            rows={[[{ text: 'About', tone: 'pink' }], [{ text: 'Us', tone: 'purple' }]]} />
          <p className="about-lead">Built on Trust. Driven by Quality.</p>
          <div className="about-body">
            <p><strong>{APP_CONFIG.name}</strong> was founded with a vision to connect quality food products with markets across the globe. With over 4 years of experience in the healthy snacking industry, we bring together a growing portfolio of makhana, roasted snacks, millet-based puffs and freeze-dried fruits.</p>
            <p>We focus on reliable sourcing, consistent quality and strong business partnerships, offering flexible solutions to meet diverse domestic and international requirements.</p>
          </div>
          <Link className="button yellow content-hero-cta" href="/catalog">Explore our products <Icon name="arrow" /></Link>
        </div>
        <CompactAboutArt className="story-about-art" />
      </section>

      {founder && (
        <section className="founder-card is-portrait" aria-labelledby="founder-title">
          <div className="founder-photo" aria-hidden={!founderPhoto}>
            {founderPhoto
              ? <img src={founderPhoto.src} width={founderPhoto.width} height={founderPhoto.height} alt={`${founder.name}, ${founder.role} of ${APP_CONFIG.name}`} loading="lazy" decoding="async" />
              : <span>{founder.name.split(' ').map(part => part[0]).join('')}</span>}
          </div>
          <div className="founder-copy">
            <p className="eyebrow">MEET THE FOUNDER</p>
            <h2 id="founder-title">{founder.name}</h2>
            <p className="founder-role">{founder.role}, {APP_CONFIG.name}</p>
            <ul className="founder-facts">
              <li><strong>4+ years</strong><span>in the healthy snacking industry</span></li>
              <li><strong>3 categories</strong><span>makhana, puffs and freeze-dried fruits</span></li>
            </ul>
            {founder.message && <p className="founder-message">“{founder.message}”</p>}
            <Link className="button primary" href="/contact">Talk to our team <Icon name="arrow" /></Link>
          </div>
        </section>
      )}

      <section className="vision-mission-grid" aria-label="Mission and vision">
        <article className="statement-card is-mission"><p className="eyebrow">OUR MISSION</p><h2>Dependable supply, lasting relationships.</h2><p>To deliver quality food products through dependable supply, transparent business practices and efficient supply solutions, while building lasting relationships with our customers and partners.</p></article>
        <article className="statement-card is-vision"><p className="eyebrow">OUR VISION</p><h2>A trusted name, worldwide.</h2><p>To establish Saatvik International as a trusted name in the global food and healthy snacking industry by creating meaningful connections between quality and reliability in markets worldwide.</p></article>
      </section>

      <section className="story-values" aria-labelledby="story-values-title">
        <header className="content-section-heading">
          <p className="eyebrow">OUR CORE VALUES</p>
          <h2 id="story-values-title">What every partnership stands on.</h2>
        </header>
        <div className="content-card-grid values-grid">
          {values.map((value, index) => (
            <article key={value.title} className={`content-card ${value.tone}`}>
              <span className="content-card-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      {(manufacturingVideos.length > 0 || showDraftSlots) && (
        <section className="story-videos" aria-labelledby="story-videos-title">
          <header className="content-section-heading">
            <p className="eyebrow">FROM SOURCE TO PACK</p>
            <h2 id="story-videos-title">How our snacks are made.</h2>
          </header>
          {manufacturingVideos.length > 0 ? <StoryVideos videos={manufacturingVideos} /> : (
            <div className="story-video-grid">
              {['Makhana processing', 'Puff making', 'Packing line'].map(title => (
                <figure key={title} className="story-video is-draft-slot">
                  <div className="story-video-placeholder"><Icon name="play-circle" /><span>Video awaiting client</span></div>
                  <figcaption>{title}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
