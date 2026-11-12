import { categories, products } from '@/content/catalogue';

// "What you get" stats band (Paper design, 2026-11-12).
// Every figure must be verifiable from .agent/client/. Counts are derived from the catalogue
// so they stay correct. Do not add invented numbers (clients, tonnes, years) until the client confirms them.

type BadgeTone = 'blue' | 'orange' | 'pink' | 'purple';

interface Stat {
  badge: string;
  tone: BadgeTone;
  wide?: boolean;
  label: string;
  note?: string;
}

const stats: Stat[] = [
  { badge: String(categories.length), tone: 'blue', label: 'Product categories: makhana, puffs & freeze-dried fruits' },
  { badge: String(products.length), tone: 'orange', label: 'Products you can mix in a single enquiry' },
  { badge: 'GST', tone: 'pink', wide: true, label: 'GST-registered business, based in Pune', note: 'GSTIN 27AFCFS6285E1ZR' },
  { badge: 'B2B', tone: 'purple', wide: true, label: 'Wholesale, private label & export supply' },
];

export function HomeStats() {
  return (
    <section className="stats-band" aria-labelledby="stats-title">
      <h2 id="stats-title" className="stats-title">One enquiry gets you:</h2>
      <ul className="stats-grid">
        {stats.map(stat => (
          <li key={stat.label} className="stat-card">
            <span className={`stat-badge tone-${stat.tone}${stat.wide ? ' is-wide' : ''}`}>{stat.badge}</span>
            <span className="stat-copy">
              <span className="stat-label">{stat.label}</span>
              {stat.note && <span className="stat-note">{stat.note}</span>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
