import type { ReactNode } from 'react';
import { StickerHeading, type StickerWord } from './sticker-heading';
import { Icon, type IconName } from './visuals';

// Inner-page hero (client 2026-11-20: pages looked "very basic and blank" with too much empty space).
// Coloured panel: sticker heading, intro, actions and fact chips on the left; a product collage
// (or a page-specific visual) on the right. Stacks on phones.

export type HeroTone = 'lime' | 'pink' | 'yellow' | 'blue' | 'orange';

interface PageHeroProps {
  id: string;
  rows: StickerWord[][];
  kicker: string;
  intro: ReactNode;
  tone?: HeroTone;
  actions?: ReactNode;
  facts?: { icon: IconName; label: string }[];
  visual?: ReactNode;
  as?: 'h1' | 'h2';
}

const bowls = [
  { src: '/assets/products/bowls/flavoured-makhana.png', alt: '' },
  { src: '/assets/products/bowls/jowar-puffs.png', alt: '' },
  { src: '/assets/products/bowls/freeze-dried-mango-cubes.png', alt: '' },
];

/** Default hero visual: three illustrative bowls, one per category, on coloured discs. */
export function HeroCollage({ label = 'Makhana · Puffs · Freeze-dried' }: { label?: string }) {
  return (
    <div className="hero-collage" aria-hidden="true">
      <span className="hero-collage-disc" />
      {bowls.map((bowl, index) => (
        <img key={bowl.src} className={`hero-collage-bowl is-${index + 1}`} src={bowl.src} width={900} height={900} alt={bowl.alt} decoding="async" />
      ))}
      <span className="hero-collage-sticker">{label}</span>
    </div>
  );
}

export function PageHero({ id, rows, kicker, intro, tone = 'lime', actions, facts, visual, as = 'h1' }: PageHeroProps) {
  return (
    <header className={`page-hero tone-${tone}`}>
      <div className="page-hero-copy">
        <StickerHeading as={as} id={id} size="md" align="start" rays={false} kicker={kicker} rows={rows} />
        <div className="page-hero-intro">{intro}</div>
        {actions && <div className="page-hero-actions">{actions}</div>}
        {facts && facts.length > 0 && (
          <ul className="page-hero-facts">
            {facts.map(fact => <li key={fact.label}><Icon name={fact.icon} /> {fact.label}</li>)}
          </ul>
        )}
      </div>
      <div className="page-hero-visual">{visual ?? <HeroCollage />}</div>
    </header>
  );
}
