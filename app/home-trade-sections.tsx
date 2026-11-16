import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { certifications } from '@/content/certifications';
import { Icon, type IconName } from './visuals';
import { StickerHeading } from './sticker-heading';

// Home sections requested by the client on 2026-11-16: Packing Options, Exports, Certifications.
// Packing formats and the food-grade / nitrogen-flushed promise were supplied by the client on
// 2026-11-16. Certificate types are client-confirmed; numbers/copies remain pending except GST (Q5).

interface PackOption {
  icon: IconName;
  title: string;
  body: string;
  tone: 'purple' | 'teal' | 'blue' | 'sky' | 'pink';
}

export const packingOptions: PackOption[] = [
  { icon: 'pouch', title: 'Pouches', body: 'Flat pouches for retail and private-label packs.', tone: 'purple' },
  { icon: 'standup-pouch', title: 'Stand-up pouches', body: 'Pouches that stand on the shelf, for retail display.', tone: 'teal' },
  { icon: 'pillow-pouch', title: 'Pillow pouches', body: 'Classic snack-pack format, suited to single-serve and vending.', tone: 'blue' },
  { icon: 'jar', title: 'Jars', body: 'Reusable jars for premium retail and gifting.', tone: 'pink' },
  { icon: 'bulk-pack', title: 'Bulk aluminium pouches', body: 'Large aluminium pouches for wholesale, HORECA and manufacturers.', tone: 'sky' },
];

/** Packing promises stated by the client (2026-11-16). */
export const packingPromises: { icon: IconName; text: string }[] = [
  { icon: 'package-check', text: 'All food-grade packing' },
  { icon: 'sparkle', text: 'Nitrogen-flushed' },
  { icon: 'clock', text: 'Better shelf life across product categories' },
];

export function HomePackingOptions() {
  return (
    <section className="packing-section shell" id="packing" aria-labelledby="packing-title">
      <header className="section-header">
        <StickerHeading id="packing-title" kicker="Food-grade · Nitrogen-flushed"
          rows={[[{ text: 'Packing', tone: 'pink' }], [{ text: 'Options', tone: 'yellow' }]]} />
      </header>
      <ul className="packing-promises" aria-label="Packing standards">
        {packingPromises.map(promise => (
          <li key={promise.text}><Icon name={promise.icon} strokeWidth={2} /> {promise.text}</li>
        ))}
      </ul>
      <ul className="packing-grid">
        {packingOptions.map(option => (
          <li key={option.title} className={`packing-card pack-tone-${option.tone}`}>
            <span className="packing-icon" aria-hidden="true"><Icon name={option.icon} strokeWidth={1.6} /></span>
            <h3>{option.title}</h3>
            <p>{option.body}</p>
          </li>
        ))}
      </ul>
      <p className="packing-note">Pack sizes are confirmed for each enquiry. Private-label packs can carry your brand.</p>
      <div className="packing-actions">
        <Link className="button primary" href="/services#packing-options">See packing options <Icon name="arrow" /></Link>
      </div>
    </section>
  );
}

export function HomeExportsAndCertifications() {
  return (
    <section className="trust-pair shell" aria-label="Exports and certifications">
      <article className="trust-panel is-exports" aria-labelledby="exports-title">
        <span className="trust-panel-icon" aria-hidden="true"><Icon name="ship" strokeWidth={1.6} /></span>
        <p className="trust-panel-kicker">Global trade</p>
        <h2 id="exports-title">Exports</h2>
        <p>We work with international buyers and importers. Share your destination country, products and quantities, and we will confirm supply, packing and documentation for that market.</p>
        <ul className="trust-points">
          <li><Icon name="check" /> One quote for makhana, puffs and freeze-dried fruits</li>
          <li><Icon name="check" /> Food-grade, nitrogen-flushed packing</li>
          <li><Icon name="check" /> Documentation confirmed per destination</li>
        </ul>
        <Link className="button yellow" href="/export-query">Send an export query <Icon name="arrow" /></Link>
      </article>
      <article className="trust-panel is-certs" aria-labelledby="certs-title">
        <span className="trust-panel-icon" aria-hidden="true"><Icon name="certificate" strokeWidth={1.6} /></span>
        <p className="trust-panel-kicker">Verified business</p>
        <h2 id="certs-title">Certifications</h2>
        <p>GST, MSME, IEC, APEDA, FSSAI and Startup India registrations, with documents confirmed for each procurement enquiry.</p>
        <ul className="trust-cert-logos" aria-label="Confirmed registrations">
          {certifications.map(certificate => (
            <li key={certificate.id} title={certificate.shortName}>
              <img src={certificate.logo} alt={certificate.logoAlt} width={180} height={80} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
        <div className="trust-cert">
          <span className="trust-cert-label">GST registered</span>
          <span className="trust-cert-value">GSTIN {APP_CONFIG.gstin}</span>
        </div>
        <Link className="button primary" href="/certifications">View certifications <Icon name="arrow" /></Link>
      </article>
    </section>
  );
}
