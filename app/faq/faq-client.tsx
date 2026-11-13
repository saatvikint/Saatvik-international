'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import { allFaqs, faqCategories, type FaqItemData } from './faq-data';
import { Icon } from '../visuals';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { SOCIAL_CONFIG } from '@/config/SOCIAL_CONFIG';

function FaqItem({ item, isOpen, onToggle }: { item: FaqItemData; isOpen: boolean; onToggle: () => void }) {
  const contentId = useId();

  return (
    <div className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="faq-accordion-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <div className="faq-trigger-content">
          <div className="faq-meta-tags">
            <span className="faq-category-tag">{item.categoryLabel}</span>
            {item.badge && <span className="faq-badge-tag">{item.badge}</span>}
          </div>
          <h3 className="faq-question-text">{item.question}</h3>
        </div>
        <span className="faq-toggle-icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <div
        id={contentId}
        className="faq-accordion-body"
        hidden={!isOpen}
        role="region"
      >
        <div className="faq-answer-inner">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState(() => new Set<string>(['moq-bulk', 'free-tasting-box']));

  function toggleItem(id: string) {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function expandAll() {
    setOpenItems(new Set(allFaqs.map(f => f.id)));
  }

  function collapseAll() {
    setOpenItems(new Set<string>());
  }

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allFaqs.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="faq-container">
      {/* Search and Filters Bar */}
      <section className="faq-controls-bar" aria-label="FAQ filters and search">
        <div className="faq-search-wrapper">
          <span className="faq-search-icon" aria-hidden="true">
            <Icon name="search-icon" />
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. MOQ, free tasting box, GST invoice, shelf life)..."
            className="faq-search-input"
            aria-label="Search frequently asked questions"
          />
          {searchQuery && (
            <button
              type="button"
              className="faq-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="faq-category-pills" role="tablist" aria-label="Question categories">
          {faqCategories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`faq-cat-pill ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="pill-icon"><Icon name={cat.iconName} /></span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* FAQs List Header & Bulk Controls */}
      <div className="faq-results-header">
        <span className="faq-count-text">
          Showing <strong>{filteredFaqs.length}</strong> {filteredFaqs.length === 1 ? 'question' : 'questions'}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        <div className="faq-expand-controls">
          <button type="button" onClick={expandAll} className="faq-action-link">
            Expand All
          </button>
          <span className="action-sep" aria-hidden="true">·</span>
          <button type="button" onClick={collapseAll} className="faq-action-link">
            Collapse All
          </button>
        </div>
      </div>

      {/* Main Accordion List */}
      {filteredFaqs.length > 0 ? (
        <div className="faq-accordion-list" role="feed" aria-label="Frequently asked questions list">
          {filteredFaqs.map(item => (
            <FaqItem
              key={item.id}
              item={item}
              isOpen={openItems.has(item.id)}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="faq-empty-state">
          <span className="empty-icon-wrap"><Icon name="search-icon" /></span>
          <h3>No matching questions found</h3>
          <p>We couldn’t find any questions matching "{searchQuery}". Try a different keyword or reach out directly to our team below!</p>
          <button
            type="button"
            className="button primary"
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Corporate Dedicated Spotlight Box */}
      <section className="faq-corporate-spotlight" aria-labelledby="corporate-spotlight-title">
        <div className="spotlight-content">
          <span className="sticker spotlight-sticker">Need Custom Hamper Pricing?</span>
          <h2 id="corporate-spotlight-title">Planning Team Gifting or Diwali Hampers?</h2>
          <p>
            Get custom company logo sleeves, free 4-jar tasting box dispatch within 48 hours, tiered bulk savings from 15% to 35% off, and direct GST input credit invoices.
          </p>
          <div className="spotlight-actions">
            <Link href="/corporate" className="button yellow">
              Build Corporate Pack <Icon name="arrow" />
            </Link>
            <Link href="/catalog" className="button primary">
              Explore All 4 Flavours
            </Link>
          </div>
        </div>
      </section>

      {/* Support & Contact Channels Box */}
      <section className="faq-support-box" aria-labelledby="faq-support-title">
        <div className="support-header">
          <span className="eyebrow">STILL HAVE QUESTIONS?</span>
          <h2 id="faq-support-title">We’re Here for You &amp; Your Team</h2>
          <p>
            Can’t find what you are looking for? Speak directly with our founders or corporate gifting leads. Average response time under 2 hours.
          </p>
        </div>

        <div className="support-channels-grid">
          <a
            href={SOCIAL_CONFIG.whatsappHref(`Hi ${APP_CONFIG.name}, I have a question about your products.`)}
            target="_blank"
            rel="noreferrer"
            className="support-channel-card"
          >
            <div className="channel-icon-wrap" style={{ background: '#e1f7e3', color: '#166534' }}>
              <Icon name="chat" />
            </div>
            <strong>WhatsApp Hotline</strong>
            <span>Chat with our team</span>
            <span className="channel-cta-text">Chat with us →</span>
          </a>

          <a
            href={APP_CONFIG.mailtoHref('Question')}
            className="support-channel-card"
          >
            <div className="channel-icon-wrap" style={{ background: '#fce7eb', color: '#7c172e' }}>
              <Icon name="mail" />
            </div>
            <strong>Email Support</strong>
            <span>{APP_CONFIG.email}</span>
            <span className="channel-cta-text">Send an email →</span>
          </a>

          <a
            href="tel:+919876543210"
            className="support-channel-card"
          >
            <div className="channel-icon-wrap" style={{ background: '#fff5d6', color: '#854d0e' }}>
              <Icon name="phone" />
            </div>
            <strong>Call Direct</strong>
            <span>+91 98765 43210 (Mon–Sat, 9AM–8PM)</span>
            <span className="channel-cta-text">Call now →</span>
          </a>
        </div>
      </section>
    </div>
  );
}

