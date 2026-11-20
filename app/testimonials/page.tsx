import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { visibleTestimonials } from '@/content/testimonials';
import { PageHero } from '../page-hero';
import { Icon } from '../visuals';
import { TestimonialSlider } from '../testimonial-slider';

export const metadata: Metadata = {
  title: APP_CONFIG.pageTitle('Testimonials'),
  description: 'Buyer feedback about sourcing makhana, puffs, freeze-dried fruits and B2B snack supply.',
};

export default function TestimonialsPage() {
  const items = visibleTestimonials();
  return (
    <main id="main" className="content-page testimonials-page shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Testimonials</span></nav>
      <PageHero id="testimonials-title" tone="orange" kicker="From the businesses we supply"
        rows={[[{ text: 'Buyer', tone: 'lime' }], [{ text: 'Stories', tone: 'red' }]]}
        intro={<p>Feedback about product sourcing, wholesale supply and working with our team.</p>}
        actions={<Link className="button primary" href="/contact">Work with us <Icon name="arrow" /></Link>} />
      {items.length > 0 ? <section aria-labelledby="testimonials-title"><TestimonialSlider items={items} /></section> : <section className="empty-testimonials"><h2>Buyer stories are being prepared.</h2><p>Approved testimonials will appear here once the buyer quotes and photographs are confirmed for publication.</p><Link className="button yellow" href="/contact">Contact our team</Link></section>}
    </main>
  );
}
