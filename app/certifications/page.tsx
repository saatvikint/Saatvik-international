import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { certifications } from '@/content/certifications';
import { Icon } from '../visuals';
import { PageHero } from '../page-hero';

export const metadata: Metadata = {
  title: APP_CONFIG.pageTitle('Certifications & Business Documents'),
  description: `View confirmed registration details for ${APP_CONFIG.name} and request the documents needed for your B2B enquiry.`,
};

export default function CertificationsPage() {
  return (
    <main id="main" className="content-page certifications-page shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Certifications</span></nav>
      <PageHero id="certifications-title" tone="blue" kicker="Registrations held by Saatvik"
        rows={[[{ text: 'Our', tone: 'pink' }], [{ text: 'Certificates', tone: 'purple' }]]}
        intro={<p>Business and food registrations confirmed by Saatvik International. Official marks are shown in their original form.</p>}
        actions={<><a className="button primary" href="#certificates-grid">View registrations <Icon name="arrow" /></a><Link className="button yellow" href="/contact">Request documents</Link></>}
        facts={[{ icon: 'certificate', label: 'GST · MSME · IEC' }, { icon: 'quality-check', label: 'APEDA · FSSAI' }, { icon: 'sparkle', label: 'Startup India' }]} />

      <section className="certification-grid" id="certificates-grid" aria-label="Saatvik International certifications and registrations">
        {certifications.map(certificate => (
          <article className={`certification-card certification-${certificate.id}`} key={certificate.id}>
            <div className="certification-logo-wrap">
              <img src={certificate.logo} alt={certificate.logoAlt} width={420} height={180} loading="eager" decoding="async" />
            </div>
            <div className="certification-card-copy">
              <p className="certification-short-name">{certificate.shortName}</p>
              <h2>{certificate.name}</h2>
              <p>{certificate.authority}</p>
              {certificate.id === 'gst' && <strong className="certification-number">GSTIN {APP_CONFIG.gstin}</strong>}
              <a className="certification-authority-link" href={certificate.officialUrl} target="_blank" rel="noreferrer">Official authority <Icon name="arrow" /></a>
            </div>
          </article>
        ))}
      </section>

      <section className="document-process" aria-labelledby="document-process-title">
        <header className="content-section-heading"><p className="eyebrow">BUYER DOCUMENT REQUESTS</p><h2 id="document-process-title">Need documents for procurement?</h2><p>Tell us the product, destination market and documents your organisation requires. Our team will confirm what is applicable and available for that enquiry.</p></header>
        <div className="content-card-grid three-up">
          <article className="content-card tone-yellow"><span className="content-card-number">01</span><h3>Share your requirement</h3><p>Include products, quantities, destination and your buyer checklist.</p></article>
          <article className="content-card tone-blue"><span className="content-card-number">02</span><h3>We verify applicability</h3><p>Requirements can differ by order, product and destination market.</p></article>
          <article className="content-card tone-lime"><span className="content-card-number">03</span><h3>Receive confirmation</h3><p>We respond with confirmed information for your specific enquiry.</p></article>
        </div>
        <div className="content-actions"><Link className="button yellow" href="/contact">Request documents <Icon name="arrow" /></Link><Link className="button primary" href="/export-query">Export query</Link></div>
      </section>

      <aside className="certification-note"><Icon name="receipt" /><p>These registrations were confirmed by the client. The GSTIN is published above; other registration numbers and certificate copies will be added after the documents are supplied for verification.</p></aside>
    </main>
  );
}
