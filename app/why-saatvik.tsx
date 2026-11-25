import { Icon, type IconName } from './visuals';
import { StickerHeading } from './sticker-heading';

// "Why Choose Us" (client feedback 2026-11-16): replaces "Better for business".
// The four points and "No palm oil" were supplied by the client on 2026-11-16 (see
// .agent/client/facts.md). Do not add numbers (MOQ quantities, test counts) until the client confirms them.

interface Reason {
  icon: IconName;
  title: string;
  body: string;
  tone: 'yellow' | 'pink' | 'lime' | 'sky';
}

/** Also used by the downloadable product catalogue (app/product-catalogue). */
export const reasons: Reason[] = [
  {
    icon: 'scale',
    title: 'Low MOQ',
    body: 'Start with a manageable first order. Minimum quantities are confirmed per product in your quotation.',
    tone: 'yellow',
  },
  {
    icon: 'plant',
    title: 'Quality ingredients, clean label',
    body: 'Makhana, puffs and freeze-dried fruits made from quality ingredients, with no palm oil.',
    tone: 'lime',
  },
  {
    icon: 'quality-check',
    title: 'Quality checked',
    body: 'Products are checked for quality before they are packed and dispatched to your business.',
    tone: 'pink',
  },
  {
    icon: 'handshake',
    title: 'Reliable partnerships',
    body: 'Consistent supply and responsive support, built for long-term business relationships.',
    tone: 'sky',
  },
];

export function WhySaatvik() {
  return (
    <section className="why-section shell" id="why-saatvik" aria-labelledby="why-title">
      <header className="section-header">
        <StickerHeading id="why-title" kicker="What you get with Saatvik"
          rows={[[{ text: 'Why', tone: 'yellow' }, { text: 'Choose', tone: 'pink' }], [{ text: 'Us', tone: 'lime' }]]} />
      </header>
      <p className="why-badges" aria-label="Product promises">
        <span className="why-badge is-teal"><Icon name="leaf" strokeWidth={2} /> No palm oil</span>
        <span className="why-badge is-purple"><Icon name="plant" strokeWidth={2} /> Clean label</span>
        <span className="why-badge is-blue"><Icon name="quality-check" strokeWidth={2} /> Quality checked</span>
      </p>
      <ul className="why-grid">
        {reasons.map(reason => (
          <li key={reason.title} className={`why-item why-tone-${reason.tone}`}>
            <span className="why-icon" aria-hidden="true"><Icon name={reason.icon} strokeWidth={1.6} /></span>
            <h3 className="why-item-title">{reason.title}</h3>
            <p>{reason.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
