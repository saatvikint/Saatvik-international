import Link from 'next/link';
import { Lineup } from '../lineup';
import { PanelButton } from '../shop';
import { Icon } from '../visuals';

export const metadata = {
  title: 'Roasted Makhana Catalog | Saatvik International',
  description: 'Explore the full roasted makhana catalogue. Wholesale and bulk enquiry for Desi Masala, Cheese, Peri Peri, and Cream N’ Onion.',
};

export default function Page() {
  return (
    <main id="main" className="collection-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Catalog</span>
        </nav>
        <div className="collection-banner">
          <img
            src="/assets/collection-banner.webp"
            width="2048"
            height="682"
            alt="Saatvik International Roasted Makhana Catalog, featuring Desi AF Masala, Sigma Chad Cheese, Goated Peri Peri and No Cap Cream N’ Onion"
            fetchPriority="high"
          />
        </div>
      </div>
      <Lineup collection />
      <div className="shell collection-cta">
        <div>
          <span className="eyebrow">MIX, MATCH, MUNCH</span>
          <h2>Can’t pick just one?</h2>
        </div>
        <PanelButton className="button primary" panel="builder">
          Build a 3-pack <Icon name="arrow" />
        </PanelButton>
      </div>
    </main>
  );
}

