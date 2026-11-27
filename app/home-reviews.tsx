import { visibleTestimonials } from '@/content/testimonials';
import { buyerSegments } from '@/content/buyer-segments';
import { StickerHeading } from './sticker-heading';
import { CardSlider, TestimonialSlider } from './testimonial-slider';
import { Icon } from './visuals';

// Testimonials section (DESIGN.md style). Content and its publishing rules: content/testimonials.ts.
// Until real, approved buyer quotes exist, the same slot shows "Who we supply" (content/buyer-segments.ts):
// factual buyer types and what they order, never quotes.
export function HomeReviews() {
  const items = visibleTestimonials();

  if (items.length > 0) {
    return (
      <section className="testimonials-section shell" id="reviews" aria-labelledby="reviews-title">
        <header className="section-header">
          <StickerHeading id="reviews-title" kicker="From the businesses we supply"
            rows={[[{ text: 'Kind', tone: 'lime' }], [{ text: 'Words', tone: 'red' }]]} />
        </header>
        <TestimonialSlider items={items} />
      </section>
    );
  }

  const cards = buyerSegments.map(segment => ({
    id: segment.id,
    content: (
      <article className="testimonial-figure buyer-card">
        <span className="buyer-card-icon" aria-hidden="true"><Icon name={segment.icon} /></span>
        <h3 className="buyer-card-title">{segment.title}</h3>
        <p className="buyer-card-text">{segment.text}</p>
        <ul className="buyer-card-points">
          {segment.orders.map(order => <li key={order}>{order}</li>)}
        </ul>
        <span className="testimonial-topic">{segment.topic}</span>
      </article>
    ),
  }));

  return (
    <section className="testimonials-section shell" id="reviews" aria-labelledby="reviews-title">
      <header className="section-header">
        <StickerHeading id="reviews-title" kicker="One supplier for every kind of buyer"
          rows={[[{ text: 'Who we', tone: 'lime' }], [{ text: 'Supply', tone: 'red' }]]} />
      </header>
      <CardSlider cards={cards} label="Buyer types we supply" itemName="buyer type" />
    </section>
  );
}
