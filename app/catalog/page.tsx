import Link from 'next/link';
import { Lineup } from '../lineup';
import { PanelButton } from '../shop';
import { Icon } from '../visuals';
import { StickerHeading } from '../sticker-heading';
import { APP_CONFIG } from '@/config/APP_CONFIG';

export const metadata = {
  title: APP_CONFIG.pageTitle('All Products'),
  description: 'Makhana, roasted puffs and freeze-dried fruits from Saatvik International. Wholesale, private label and export enquiries.',
};

export default function Page() {
  return (
    <main id="main" className="collection-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">All products</span>
        </nav>
      </div>
      <Lineup collection />
      <div className="shell collection-cta">
        <div>
          <StickerHeading size="md" align="start" rays={false} kicker="One enquiry, many products"
            rows={[[{ text: 'Mix', tone: 'lime' }, { text: '&', tone: 'purple', small: true }], [{ text: 'Match', tone: 'pink' }]]} />
        </div>
        <PanelButton className="button primary" panel="builder">
          Build a mixed enquiry <Icon name="arrow" />
        </PanelButton>
      </div>
    </main>
  );
}
