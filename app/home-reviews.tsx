'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from './visuals';
import { StickerHeading } from './sticker-heading';

const reviewsData = [
  {
    id: 'rev-1',
    name: 'Pooja Kulkarni',
    city: 'Mumbai',
    avatar: '/assets/avatars/avatar-1.jpg',
    initials: 'PK',
    rating: 5,
    flavourId: 'masala',
    flavourName: 'Desi AF Masala',
    badgeClass: 'badge-masala',
    title: 'Killed my 4 PM fried chips addiction.',
    text: 'Honestly didn’t expect makhana to taste this punchy. It has the authentic street-masala tang without any greasy oil on my fingers or keyboard while working.',
    date: '2 days ago',
    verifiedText: 'Verified Buyer',
  },
  {
    id: 'rev-2',
    name: 'Aarav Mehta',
    city: 'Bengaluru',
    avatar: '/assets/avatars/avatar-2.jpg',
    initials: 'AM',
    rating: 5,
    flavourId: 'cheese',
    flavourName: 'Sigma Chad Cheese',
    badgeClass: 'badge-cheese',
    title: 'The cheddar flavour is dangerously addictive.',
    text: 'Ordered a 3-pack for work from home snacking. The jar was finished within 48 hours. Super light, satisfying crunch and 0 guilt afterwards.',
    date: '4 days ago',
    verifiedText: 'Verified Buyer',
  },
  {
    id: 'rev-3',
    name: 'Rohan Sharma',
    city: 'New Delhi',
    avatar: '/assets/avatars/avatar-3.jpg',
    initials: 'RS',
    rating: 5,
    flavourId: 'peri',
    flavourName: 'Goated Peri Peri',
    badgeClass: 'badge-peri',
    title: 'Legit spicy kick! Not sweet at all.',
    text: 'Most brands claim peri peri and deliver sweet paprika. This one actually brings real chilli heat that pairs perfectly with my evening chai break.',
    date: '1 week ago',
    verifiedText: 'Verified Buyer',
  },
  {
    id: 'rev-4',
    name: 'Sneha Talreja',
    city: 'Pune',
    avatar: '/assets/avatars/avatar-4.jpg',
    initials: 'ST',
    rating: 5,
    flavourId: 'onion',
    flavourName: 'No Cap Cream N’ Onion',
    badgeClass: 'badge-onion',
    title: 'Mellow, savoury, and perfectly roasted.',
    text: 'My kids love sour cream & onion chips, but this is 1000x healthier. Jumbo Bihar Grade-A fox nuts with zero palm oil. Subscribed for a monthly pack.',
    date: '1 week ago',
    verifiedText: 'Verified Buyer',
  },
  {
    id: 'rev-5',
    name: 'Vikramaditya Pant',
    city: 'Hyderabad',
    avatar: '/assets/avatars/avatar-5.jpg',
    initials: 'VP',
    rating: 5,
    flavourId: 'corporate',
    flavourName: 'Corporate Gifting Pack',
    badgeClass: 'badge-gold',
    title: 'Ordered 60 jars for our tech team hackathon.',
    text: 'Swapped out traditional heavy sweets for Saatvik makhana jars. The team went crazy over them. Custom company sleeves looked super sharp.',
    date: '2 weeks ago',
    verifiedText: 'Verified Corporate Order',
  },
  {
    id: 'rev-6',
    name: 'Ananya Deb',
    city: 'Kolkata',
    avatar: '/assets/avatars/avatar-6.jpg',
    initials: 'AD',
    rating: 5,
    flavourId: 'cheese',
    flavourName: 'Sigma Chad Cheese',
    badgeClass: 'badge-cheese',
    title: 'Induction sealed freshness is real.',
    text: 'Even during humid monsoon days, the crunch remained totally crisp right out of the sealed jar. Best quality roasted makhana on the market without a doubt.',
    date: '2 weeks ago',
    verifiedText: 'Verified Buyer',
  },
  {
    id: 'rev-7',
    name: 'Kabir Nair',
    city: 'Kochi',
    avatar: '/assets/avatars/avatar-7.jpg',
    initials: 'KN',
    rating: 5,
    flavourId: 'peri',
    flavourName: 'Goated Peri Peri',
    badgeClass: 'badge-peri',
    title: 'Best movie night companion ever.',
    text: 'Ditched heavy butter popcorn for Goated Peri Peri. Zero palm oil, incredible fiery crunch, and doesn’t leave you feeling bloated or greasy afterwards.',
    date: '3 weeks ago',
    verifiedText: 'Verified Buyer',
  },
  {
    id: 'rev-8',
    name: 'Dr. Ritu Verma',
    city: 'Chandigarh',
    avatar: '/assets/avatars/avatar-8.jpg',
    initials: 'RV',
    rating: 5,
    flavourId: 'masala',
    flavourName: 'Desi AF Masala',
    badgeClass: 'badge-masala',
    title: 'Recommending this to all my nutrition clients.',
    text: 'As a clinical nutritionist, finding truly slow-roasted snacks with zero palm oil and zero trans fat in India is rare. Saatvik nailed the taste and purity.',
    date: '3 weeks ago',
    verifiedText: 'Verified Nutritionist',
  },
  {
    id: 'rev-9',
    name: 'Siddharth Joshi',
    city: 'Ahmedabad',
    avatar: '/assets/avatars/avatar-9.jpg',
    initials: 'SJ',
    rating: 5,
    flavourId: 'masala',
    flavourName: 'Variety 4-Flavour Pack',
    badgeClass: 'badge-gold',
    title: 'All 4 flavours have distinct personality.',
    text: 'Usually in multi-packs one flavour is boring. Here, every jar is a hit. The Desi Masala and Cream N’ Onion fight for the #1 spot in our house.',
    date: '1 month ago',
    verifiedText: 'Verified Buyer',
  },
  {
    id: 'rev-10',
    name: 'Meera Sen',
    city: 'Chennai',
    avatar: '/assets/avatars/avatar-10.jpg',
    initials: 'MS',
    rating: 5,
    flavourId: 'onion',
    flavourName: 'No Cap Cream N’ Onion',
    badgeClass: 'badge-onion',
    title: 'Zero artificial aftertaste. Just pure crunch.',
    text: 'The herbs and spring onion notes taste super fresh. Not overly salted like commercial chips. Perfect midday work snack with my iced cold brew.',
    date: '1 month ago',
    verifiedText: 'Verified Buyer',
  },
  {
    id: 'rev-11',
    name: 'Aditya Rawat',
    city: 'Dehradun',
    avatar: '/assets/avatars/avatar-11.jpg',
    initials: 'AR',
    rating: 5,
    flavourId: 'masala',
    flavourName: 'Desi AF Masala',
    badgeClass: 'badge-masala',
    title: 'My daily post-workout protein crunch.',
    text: 'Makhana has great clean plant micronutrients. Having 100% air-roasted makhana ready in a resealable jar makes clean eating completely effortless.',
    date: '1 month ago',
    verifiedText: 'Verified Buyer',
  },
  {
    id: 'rev-12',
    name: 'Tanvi Chawla',
    city: 'Gurugram',
    avatar: '/assets/avatars/avatar-12.jpg',
    initials: 'TC',
    rating: 5,
    flavourId: 'corporate',
    flavourName: 'Corporate Gifting Pack',
    badgeClass: 'badge-gold',
    title: 'HR favourite for employee milestone hampers.',
    text: 'We ordered 200 custom jars for our annual employee awards. Flawless packaging, doorstep logistics, and everyone in our office asked where to buy more.',
    date: '1 month ago',
    verifiedText: 'Verified Corporate Order',
  },
  {
    id: 'rev-13',
    name: 'Harsh Vardhan',
    city: 'Jaipur',
    avatar: '/assets/avatars/avatar-13.jpg',
    initials: 'HV',
    rating: 5,
    flavourId: 'peri',
    flavourName: 'Goated Peri Peri',
    badgeClass: 'badge-peri',
    title: 'Actual Fox Nuts, not broken crumbs.',
    text: 'Every jar is packed to the brim with giant whole makhana balls. Roasted to golden perfection with full seasoning coverage on every single bite.',
    date: '1 month ago',
    verifiedText: 'Verified Buyer',
  },
  {
    id: 'rev-14',
    name: 'Divya Menon',
    city: 'Coimbatore',
    avatar: '/assets/avatars/avatar-14.jpg',
    initials: 'DM',
    rating: 5,
    flavourId: 'cheese',
    flavourName: 'Sigma Chad Cheese',
    badgeClass: 'badge-cheese',
    title: 'My 7-year old refuses regular chips now!',
    text: 'Finding clean snacks for picky kids is a nightmare. Sigma Chad Cheese solved it in one afternoon. Now buying the 6-jar refill bundle regularly.',
    date: '2 months ago',
    verifiedText: 'Verified Buyer',
  },
];

const categoryTabs = [
  { id: 'all', label: 'All Reviews (14)' },
  { id: 'masala', label: 'Desi Masala (4)' },
  { id: 'cheese', label: 'Sigma Cheese (3)' },
  { id: 'peri', label: 'Goated Peri Peri (3)' },
  { id: 'onion', label: 'Cream N’ Onion (2)' },
  { id: 'corporate', label: 'Corporate Packs (2)' },
];

export function HomeReviews() {
  const [activeTab, setActiveTab] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredReviews = activeTab === 'all'
    ? reviewsData
    : reviewsData.filter((r) => r.flavourId === activeTab);

  function scroll(direction: 'next' | 'prev') {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const card = track.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth : 340;
    const gap = 20;
    const step = cardWidth + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (direction === 'next') {
      if (track.scrollLeft >= maxScroll - 15) {
        // Continuous Loop: smoothly scroll back to the start
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: step, behavior: 'smooth' });
      }
    } else {
      if (track.scrollLeft <= 15) {
        // Continuous Loop: smoothly scroll to the end
        track.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: -step, behavior: 'smooth' });
      }
    }
  }

  // Automatic looping: smoothly advances every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      scroll('next');
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, filteredReviews]);

  function handleManualScroll(direction: 'next' | 'prev') {
    // When user manually clicks next/prev, scroll immediately and pause auto-scroll briefly
    setIsPaused(true);
    scroll(direction);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 6000);
  }

  function handleFilterClick(tabId: string) {
    setActiveTab(tabId);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }

  return (
    <section className="home-reviews-section shell" id="reviews" aria-labelledby="reviews-title">
      {/* Header with Title and Trust Scorecard */}
      <div className="home-reviews-header">
        <div className="reviews-header-left">
          <StickerHeading id="reviews-title" size="md" align="start" kicker="Testimonials"
            rows={[[{ text: 'Kind', tone: 'lime' }], [{ text: 'Words', tone: 'red' }]]} />
          <p className="reviews-subtitle">
            Over 15,000+ daily snackers, gym-goers, and office desks munching on 100% slow-roasted makhana across India.
          </p>
        </div>

        {/* Rating Scorecard Banner */}
        <div className="reviews-scorecard-card">
          <div className="scorecard-top">
            <span className="scorecard-rating-num">4.92</span>
            <div className="scorecard-stars" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star-icon-wrap">
                  <Icon name="star" />
                </span>
              ))}
            </div>
          </div>
          <div className="scorecard-meta">
            <strong>1,420+ Verified Customer Ratings</strong>
            <span>100% Roasted Makhana • Zero Palm Oil</span>
          </div>
        </div>
      </div>

      {/* Filter Category Pills + Carousel Navigation Bar */}
      <div className="reviews-controls-bar">
        <div className="review-filter-tabs" role="tablist" aria-label="Review flavours filter">
          {categoryTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`review-tab-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => handleFilterClick(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Carousel Arrow Buttons (Loop Enabled, Counter Removed) */}
        <div className="carousel-nav-controls" aria-label="Reviews slider controls">
          <button
            type="button"
            className="carousel-arrow-btn prev"
            onClick={() => handleManualScroll('prev')}
            aria-label="Previous review"
          >
            <Icon name="arrow" />
          </button>
          <button
            type="button"
            className="carousel-arrow-btn next"
            onClick={() => handleManualScroll('next')}
            aria-label="Next review"
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>

      {/* Smooth Carousel Track Container */}
      <div
        className="reviews-carousel-track"
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer review cards"
        tabIndex={0}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {filteredReviews.map((rev, idx) => (
          <article
            key={rev.id}
            className="review-item-card carousel-slide"
            aria-roledescription="slide"
            aria-label={`Review ${idx + 1} of ${filteredReviews.length}`}
          >
            {/* Card Header: Real Profile Avatar & Reviewer info */}
            <div className="review-card-top">
              <div className="reviewer-info">
                <img
                  src={rev.avatar}
                  alt={`${rev.name}'s profile photo`}
                  className="reviewer-avatar-img"
                  width="44"
                  height="44"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to initials avatar if image error
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="reviewer-avatar-fallback" aria-hidden="true" style={{ display: 'none' }}>
                  {rev.initials}
                </div>

                <div className="reviewer-details">
                  <h3 className="reviewer-name">{rev.name}</h3>
                  <span className="reviewer-city">{rev.city}</span>
                </div>
              </div>

              {/* 5 Stars Row */}
              <div className="card-stars-row" aria-label={`${rev.rating} stars`}>
                {[...Array(rev.rating)].map((_, i) => (
                  <span key={i} className="star-icon-wrap small">
                    <Icon name="star" />
                  </span>
                ))}
              </div>
            </div>

            {/* Flavour Tag & Verified Pill */}
            <div className="review-tags-row">
              <span className={`flavour-pill-tag ${rev.badgeClass}`}>
                {rev.flavourName}
              </span>
              <span className="verified-buyer-pill">
                <span className="verified-check"><Icon name="check" /></span>
                <span>{rev.verifiedText}</span>
              </span>
            </div>

            {/* Review Title & Body */}
            <h4 className="review-quote-title">“{rev.title}”</h4>
            <p className="review-quote-text">{rev.text}</p>

            {/* Card Footer: Verified date */}
            <div className="review-card-footer">
              <span className="review-date">{rev.date}</span>
              <span className="review-guarantee">Verified Purchase</span>
            </div>
          </article>
        ))}
      </div>

      {/* Brand Trust Metrics Strip */}
      <div className="reviews-trust-strip" aria-label="Brand performance metrics">
        <div className="trust-metric-col">
          <span className="metric-val">15,000+</span>
          <span className="metric-lbl">Happy Crunchers</span>
        </div>
        <div className="trust-metric-divider" aria-hidden="true" />
        <div className="trust-metric-col">
          <span className="metric-val">0%</span>
          <span className="metric-lbl">Palm Oil or Trans Fat</span>
        </div>
        <div className="trust-metric-divider" aria-hidden="true" />
        <div className="trust-metric-col">
          <span className="metric-val">4.92 ★</span>
          <span className="metric-lbl">Average Rating</span>
        </div>
        <div className="trust-metric-divider" aria-hidden="true" />
        <div className="trust-metric-col">
          <span className="metric-val">48 Hrs</span>
          <span className="metric-lbl">Pan-India Dispatch</span>
        </div>
      </div>
    </section>
  );
}
