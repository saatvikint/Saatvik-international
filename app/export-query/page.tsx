import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { HomeTradeEnquiry } from '../home-trade-enquiry';
import { PageHero } from '../page-hero';
import { Icon } from '../visuals';

export const metadata: Metadata = {
  title: APP_CONFIG.pageTitle('Export Query'),
  description: 'Send an export sourcing enquiry for makhana, puffs or freeze-dried fruits from India.',
};

export default function ExportQueryPage() {
  return (
    <main id="main" className="content-page export-query-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Export Query</span></nav>
        <PageHero id="export-query-title" tone="blue" kicker="International sourcing enquiries"
          rows={[[{ text: 'Export', tone: 'lime' }], [{ text: 'Query', tone: 'red' }]]}
          intro={<p>Share the products, quantities, destination market and documentation your procurement process requires. We will review the details and confirm the next steps.</p>}
          actions={<a className="button primary" href="#enquiry">Start your export query <Icon name="arrow" /></a>}
          facts={[{ icon: 'ship', label: 'Export enquiries' }, { icon: 'certificate', label: 'IEC & APEDA registered' }, { icon: 'package-check', label: 'Nitrogen-flushed packing' }]} />
      </div>
      <HomeTradeEnquiry />
    </main>
  );
}
