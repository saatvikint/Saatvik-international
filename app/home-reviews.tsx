import { testimonialDisplay } from '@/content/testimonials';
import { StickerHeading } from './sticker-heading';
import { TestimonialSlider } from './testimonial-slider';

// Testimonials section (DESIGN.md style). Content and its publishing rules: content/testimonials.ts.
// Real (confirmed) quotes show as they are. Until there are some, the live site shows the drafts as
// clearly labelled samples without names, cities or photos (client 2026-11-27).
export function HomeReviews() {
  const { items, isSample } = testimonialDisplay();
  if (items.length === 0) return null;

  return (
    <section className="testimonials-section shell" id="reviews" aria-labelledby="reviews-title">
      <header className="section-header">
        <StickerHeading id="reviews-title" kicker={isSample ? 'What buyers look for in a supplier' : 'From the businesses we supply'}
          rows={[[{ text: 'Kind', tone: 'lime' }], [{ text: 'Words', tone: 'red' }]]} />
      </header>
      {isSample && <p className="testimonial-sample-note">Sample testimonials, shown for illustration only. They are not reviews from named customers.</p>}
      <TestimonialSlider items={items} />
    </section>
  );
}
