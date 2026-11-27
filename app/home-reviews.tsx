import { testimonials } from '@/content/testimonials';
import { StickerHeading } from './sticker-heading';
import { TestimonialSlider } from './testimonial-slider';

export function HomeReviews() {
  if (testimonials.length === 0) return null;

  return (
    <section className="testimonials-section shell" id="reviews" aria-labelledby="reviews-title">
      <header className="section-header">
        <StickerHeading id="reviews-title" kicker="From the businesses we supply"
          rows={[[{ text: 'Kind', tone: 'lime' }], [{ text: 'Words', tone: 'red' }]]} />
      </header>
      <TestimonialSlider items={testimonials} />
    </section>
  );
}
