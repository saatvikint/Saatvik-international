import Link from 'next/link';
import { Lineup } from '../lineup';
import { products } from '../products';
import { PanelButton } from '../shop';
import { Icon } from '../visuals';
import { StickerHeading } from '../sticker-heading';

export const metadata = {
  title: 'Product Catalogue | Saatvik International',
  description: 'Makhana, roasted puffs and freeze-dried fruits from Saatvik International. Wholesale, private label and export enquiries.',
};

const bannerIds = ['freeze-dried-mango-cubes', 'freeze-dried-black-jamun', 'freeze-dried-banana-slices', 'freeze-dried-pineapple-slices'];

export default function Page() {
  const banner = products.filter(product => product.image && bannerIds.includes(product.id));
  return (
    <main id="main" className="collection-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Products</span>
        </nav>
        <div className="collection-banner photo-strip" aria-hidden="true">
          {banner.map((product, index) => product.image && (
            <img key={product.id} src={product.image.src} width={product.image.width} height={product.image.height} alt=""
              fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" />
          ))}
        </div>
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
