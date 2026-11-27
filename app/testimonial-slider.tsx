'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Testimonial } from '@/content/testimonials';
import { Icon } from './visuals';

const cardTones = ['pink', 'sky', 'lime', 'yellow'] as const;

export interface SliderCard {
  id: string;
  content: ReactNode;
}

/** Buyer testimonials in the card slider. */
export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const cards = items.map(item => ({
    id: item.id,
    content: (
      <figure className="testimonial-figure">
        <span className="testimonial-mark" aria-hidden="true">“</span>
        <blockquote className="testimonial-quote"><p>{item.quote}</p></blockquote>
        <figcaption className="testimonial-caption">
          {item.avatar && <img className="testimonial-avatar" src={item.avatar} width={84} height={84} alt="" loading="lazy" decoding="async" />}
          <span className="testimonial-person">
            <span className="testimonial-name">{item.name}</span>
            <span className="testimonial-role">{[item.role, item.company].filter(Boolean).join(', ')}{item.city ? ` · ${item.city}` : ''}</span>
          </span>
          {item.topic && <span className="testimonial-topic">{item.topic}</span>}
        </figcaption>
      </figure>
    ),
  }));
  return <CardSlider cards={cards} label="Buyer testimonials" itemName="testimonial" />;
}

/** Scroll-snap slider: native swipe/scroll, prev/next buttons, no autoplay. */
export function CardSlider({ cards: items, label, itemName }: { cards: SliderCard[]; label: string; itemName: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [position, setPosition] = useState(1);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0') : el.clientWidth;
    setPosition(Math.min(items.length, Math.round(el.scrollLeft / step) + 1));
  }, [items.length]);

  useEffect(() => {
    update();
    const el = track.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  function move(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0') : el.clientWidth;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction * step, behavior: smooth ? 'smooth' : 'auto' });
  }

  return (
    <div className="testimonial-slider">
      <ul ref={track} className="testimonial-track" tabIndex={0} aria-label={`${label}, scroll horizontally`}>
        {items.map((item, index) => (
          <li key={item.id} className={`testimonial-card tone-card-${cardTones[index % cardTones.length]}`}
            aria-label={`${itemName[0].toUpperCase()}${itemName.slice(1)} ${index + 1} of ${items.length}`}>
            {item.content}
          </li>
        ))}
      </ul>
      <div className="testimonial-controls">
        <span className="testimonial-count" aria-live="polite">{position} / {items.length}</span>
        <div className="testimonial-buttons">
          <button type="button" className="slider-button is-prev" onClick={() => move(-1)} disabled={atStart} aria-label={`Previous ${itemName}`}>
            <Icon name="arrow" />
          </button>
          <button type="button" className="slider-button" onClick={() => move(1)} disabled={atEnd} aria-label={`Next ${itemName}`}>
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
