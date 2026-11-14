import { Icon, type IconName } from './visuals';

// "Better for business" section (team reference, 2026-11-13): a tilted white panel with an
// oversized headline and three staggered reasons. Copy comes from the "Why choose Saatvik
// International?" list in .agent/client/company-profile.md. No health or nutrition claims.

interface Reason {
  icon: IconName;
  title: string;
  body: string;
}

const reasons: Reason[] = [
  {
    icon: 'truck',
    title: 'Reliable sourcing',
    body: 'A sourcing network for makhana, puffs and freeze-dried fruits, with a focus on quality and consistency across orders.',
  },
  {
    icon: 'package',
    title: 'Private label',
    body: 'Private-labelling enquiries are reviewed against the products, quantities and business requirements shared with us.',
  },
  {
    icon: 'sparkle',
    title: 'Bulk supply',
    body: 'B2B quotations for distributors, retailers, food businesses, corporate buyers, HORECA and importers.',
  },
];

export function WhySaatvik() {
  return (
    <section className="why-section shell" id="why-saatvik" aria-labelledby="why-title">
      <div className="why-panel">
        <h2 id="why-title" className="why-title">Better for business</h2>
        <ul className="why-grid">
          {reasons.map(reason => (
            <li key={reason.title} className="why-item">
              <span className="why-icon" aria-hidden="true"><Icon name={reason.icon} strokeWidth={1.6} /></span>
              <h3 className="why-item-title">{reason.title}</h3>
              <p>{reason.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
