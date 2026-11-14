import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { HomeTradeEnquiry } from '../home-trade-enquiry';
import { StickerHeading } from '../sticker-heading';

export const metadata: Metadata = {
  title: APP_CONFIG.pageTitle('Export Query'),
  description: 'Send an export sourcing enquiry for makhana, puffs or freeze-dried fruits from India.',
};

export default function ExportQueryPage() {
  return (
    <main id="main" className="content-page export-query-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Export Query</span></nav>
        <header className="content-page-header compact">
          <StickerHeading id="export-query-title" kicker="International sourcing enquiries" rows={[[{ text: 'Export', tone: 'lime' }], [{ text: 'Query', tone: 'red' }]]} />
          <p>Share the products, quantities, destination market and documentation your procurement process requires. We will review the details and confirm the next steps.</p>
        </header>
      </div>
      <HomeTradeEnquiry />
    </main>
  );
}
