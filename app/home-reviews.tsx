import { sampleTestimonials, showDraftContent, visibleTestimonials } from '@/content/testimonials';
import { StickerHeading } from './sticker-heading';
import { TestimonialSlider } from './testimonial-slider';

// Testimonials section (DESIGN.md style). Content and its publishing rules: content/testimonials.ts.
// Real (confirmed) quotes show as they are. Until there are some, the live site shows the drafts as
// clearly labelled samples without names, cities or photos (client 2026-11-27).
export function HomeReviews() {
  const confirmed = visibleTestimonials().filter(item => item.status === 'confirmed');
  const isSample = confirmed.length === 0 && !showDraftContent;
  const items = isSample ? sampleTestimonials() : visibleTestimonials();
  if (items.length === 0) return null;

  return (
    <section className="testimonials-section shell" id="reviews" aria-labelledby="reviews-title">
      <header className="section-header">
        <StickerHeading id="reviews-title" kicker={isSample ? 'What buyers look for in a supplier' : 'From the businesses we supply'}
          rows={[[{ text: 'Kind', tone: 'lime' }], [{ text: 'Words', tone: 'red' }]]} />
      </header>
      
      <TestimonialSlider items={items} />
    </section>
  );
}
