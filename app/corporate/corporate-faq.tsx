'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Icon, type IconName } from '../visuals';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { SOCIAL_CONFIG } from '@/config/SOCIAL_CONFIG';

const corporateFaqData = [
  {
    category: 'orders',
    categoryLabel: 'Orders & Gifting',
    iconName: 'building' as IconName,
    items: [
      {
        id: 'corp-faq-moq',
        question: 'What is the Minimum Order Quantity (MOQ) and tiered bulk discounts?',
        badge: '15% – 35% OFF',
        answer: (
          <div className="faq-rich-answer">
            <p>Our tiered volume pricing is built to reward team sizes of every scale with direct factory-rate savings:</p>
            <ul className="faq-bullet-list">
              <li><strong>Tier 1 (50 – 150 Jars):</strong> 15% Discount — Ideal for team milestones, monthly pantry stashes, and onboarding kits.</li>
              <li><strong>Tier 2 (151 – 500 Jars):</strong> 25% Discount — Includes personalized leadership greeting cards placed inside every pack.</li>
              <li><strong>Tier 3 (500+ Jars):</strong> 35% Discount — Bespoke co-branded full-wrap sleeves and luxury gift packaging.</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'corp-faq-branding',
        question: 'What custom co-branding options can we add to employee hampers?',
        badge: 'CUSTOM SLEEVES',
        answer: (
          <div className="faq-rich-answer">
            <p>We provide full white-glove corporate customization so your brand stays front and center:</p>
            <ul className="faq-bullet-list">
              <li><strong>Company Logo Sleeves:</strong> Premium full-color printed outer sleeves wrapped around every jar.</li>
              <li><strong>CEO / HR Greeting Cards:</strong> Personalized message cards on matte-textured cardstock.</li>
              <li><strong>Custom Gift Boxes:</strong> Gold-foiled or luxury matte hamper gift boxes with branded ribbon ties.</li>
              <li><strong>Flavour Customization:</strong> Handpick your team’s favorite flavour split with zero restrictions.</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'corp-faq-flavour-mix',
        question: 'Can we customize the flavour split inside our bulk order?',
        badge: 'ANY RATIO',
        answer: (
          <div className="faq-rich-answer">
            <p>100% yes! You have complete freedom over the ratio of flavours in your dispatch:</p>
            <ul className="faq-bullet-list">
              <li>Choose equal quarters across all 4 flavours: <em>Desi AF Masala</em>, <em>Sigma Chad Cheese</em>, <em>Goated Peri Peri</em>, and <em>No Cap Cream N’ Onion</em>.</li>
              <li>Or customize specific ratios (e.g. 60% Cheese &amp; 40% Peri Peri) for specific teams. No extra handling surcharge.</li>
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    category: 'tasting',
    categoryLabel: 'Free Tasting & Quality',
    iconName: 'gift' as IconName,
    items: [
      {
        id: 'corp-faq-sample-box',
        question: 'Can our review committee receive a complimentary tasting box before ordering?',
        badge: 'FREE SAMPLE KIT',
        answer: (
          <div className="faq-rich-answer">
            <p><strong>Yes, absolutely!</strong> We know corporate review committees need to taste and approve before committing.</p>
            <ul className="faq-bullet-list">
              <li>For all corporate enquiries above 100 jars, we courier a <strong>complimentary 4-jar tasting box</strong> directly to your office within 48 hours.</li>
              <li>Includes all 4 flavours in full 75g retail jars with sample custom sleeve mockups.</li>
              <li>No upfront cost, no advance payment, and zero obligation to purchase.</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'corp-faq-quality',
        question: 'What is the shelf life, roasting process, and ingredient guarantee?',
        badge: 'ZERO PALM OIL',
        answer: (
          <div className="faq-rich-answer">
            <p>We hold our snacks to the highest artisanal and health standards in India:</p>
            <ul className="faq-bullet-list">
              <li><strong>100% Slow Air-Roasted:</strong> Zero palm oil, zero trans fat, and zero cholesterol. Never deep-fried.</li>
              <li><strong>9-Month Freshness:</strong> Every jar is nitrogen-flushed and hermetically induction-sealed to keep humidity away.</li>
              <li><strong>Certified Sourcing:</strong> Jumbo Grade-A fox nuts sustainably sourced directly from Bihar wetland farming belts.</li>
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    category: 'logistics',
    categoryLabel: 'Pan-India Logistics',
    iconName: 'truck' as IconName,
    items: [
      {
        id: 'corp-faq-wfh-drops',
        question: 'Can you deliver hampers individually to remote employees’ home addresses?',
        badge: 'WFH READY',
        answer: (
          <div className="faq-rich-answer">
            <p>Yes! We specialize in decentralized multi-city corporate gifting across 19,000+ pin codes in India:</p>
            <ul className="faq-bullet-list">
              <li>Simply share an Excel sheet with your team’s delivery addresses and phone numbers.</li>
              <li>We pack individual hampers in secure crush-proof courier cartons.</li>
              <li>Automated live SMS &amp; WhatsApp tracking is sent directly to each employee upon dispatch.</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'corp-faq-turnaround',
        question: 'What is the dispatch turnaround time for urgent events or summits?',
        badge: '48-HR RUSH',
        answer: (
          <div className="faq-rich-answer">
            <p>We understand that corporate event timelines can be tight:</p>
            <ul className="faq-bullet-list">
              <li><strong>Standard Bulk Dispatch:</strong> 3 to 5 business days from quotation confirmation.</li>
              <li><strong>Expedited Rush (48 Hours):</strong> Available for conference lots, investor summits, and hackathons in metro hubs (Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Pune).</li>
              <li>Direct venue or hotel drop logistics available on request.</li>
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    category: 'billing',
    categoryLabel: 'GST & Payment Terms',
    iconName: 'receipt' as IconName,
    items: [
      {
        id: 'corp-faq-gst',
        question: 'Do you provide official B2B GST tax invoices for input tax credit (ITC)?',
        badge: '100% ITC CLAIM',
        answer: (
          <div className="faq-rich-answer">
            <p><strong>100% Yes.</strong> Every single bulk and corporate dispatch comes with an official GST tax invoice.</p>
            <ul className="faq-bullet-list">
              <li>We record your company’s legal entity name and registered GSTIN for seamless input tax credit filing.</li>
              <li>Digital tax invoices are emailed immediately upon dispatch, and physical copies accompany the delivery consignment.</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'corp-faq-payment',
        question: 'What payment methods and credit terms do you support for procurement?',
        badge: 'NET-15 / NET-30',
        answer: (
          <div className="faq-rich-answer">
            <p>We offer flexible procurement and finance options for registered companies:</p>
            <ul className="faq-bullet-list">
              <li><strong>Instant Modes:</strong> Corporate Credit Cards, NEFT / RTGS bank transfer, and verified UPI.</li>
              <li><strong>Enterprise Credit:</strong> Net-15 and Net-30 payment terms available for approved corporate Purchase Orders (POs) and recurring monthly pantry replenishment accounts.</li>
            </ul>
          </div>
        ),
      },
    ],
  },
];

export function CorporateFaq() {
  const [activeTab, setActiveTab] = useState('orders');
  const [openIds, setOpenIds] = useState(() => new Set<string>(['corp-faq-moq', 'corp-faq-sample-box']));

  function toggleItem(id: string) {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const currentCategory = corporateFaqData.find(c => c.category === activeTab) || corporateFaqData[0];

  return (
    <section className="corporate-faq-redesign shell" aria-labelledby="corporate-faq-main-heading">
      {/* Section Header */}
      <header className="faq-redesign-header">
        <div className="faq-header-left">
          <span className="eyebrow">CLEAR ANSWERS &amp; TRANSPARENCY</span>
          <h2 id="corporate-faq-main-heading" className="faq-main-title">
            Corporate &amp; Bulk FAQ
          </h2>
          <p className="faq-main-subtitle">
            Everything your HR, admin, and leadership team need to know about custom hampers, tiered volume pricing, free tasting kits, and pan-India logistics.
          </p>
        </div>

        <div className="faq-header-right">
          <Link href="/faq" className="button yellow faq-helpdesk-btn">
            Full FAQ Knowledge Base <Icon name="arrow" />
          </Link>
        </div>
      </header>

      {/* Category Pills Tabs */}
      <div className="corporate-faq-tabs" role="tablist" aria-label="Corporate FAQ categories">
        {corporateFaqData.map(tab => {
          const isActive = activeTab === tab.category;
          return (
            <button
              key={tab.category}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`faq-tab-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.category)}
            >
              <span className="tab-icon"><Icon name={tab.iconName} /></span>
              <span className="tab-text">{tab.categoryLabel}</span>
              <span className="tab-count">{tab.items.length}</span>
            </button>
          );
        })}
      </div>

      {/* Split Layout: Accordion on Left + Direct Concierge on Right */}
      <div className="corporate-faq-split-grid">
        {/* Left Column: Interactive Accordion Cards */}
        <div className="corporate-faq-accordion-col" role="region" aria-label={`${currentCategory.categoryLabel} Questions`}>
          {currentCategory.items.map((item, idx) => {
            const isOpen = openIds.has(item.id);
            return (
              <article
                key={item.id}
                className={`corp-faq-card ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="corp-faq-question-btn"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <div className="corp-faq-q-left">
                    <div className="corp-faq-badges-row">
                      <span className="corp-faq-num">Q{idx + 1}</span>
                      <span className="corp-faq-tag">{item.badge}</span>
                    </div>
                    <h3 className="corp-faq-q-text">{item.question}</h3>
                  </div>

                  <span className="corp-faq-toggle-circle" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="corp-faq-answer-block">
                    {item.answer}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Right Column: Direct Corporate Gifting Concierge Card */}
        <aside className="corporate-concierge-card" aria-label="Direct corporate support concierge">
          <span className="sticker concierge-sticker">B2B Support Desk</span>
          
          <h3 className="concierge-title">Need a Formal Quote in 2 Hours?</h3>
          <p className="concierge-desc">
            Skip the back-and-forth. Talk directly with our corporate gifting lead for custom branding mockups, tiered volume quotes, and free tasting boxes.
          </p>

          <div className="concierge-contact-list">
            <a
              href={SOCIAL_CONFIG.whatsappHref(`Hi ${APP_CONFIG.name}, I need a corporate bulk enquiry quote.`)}
              target="_blank"
              rel="noreferrer"
              className="concierge-btn whatsapp"
            >
              <span className="btn-icon"><Icon name="chat" /></span>
              <span>Chat on WhatsApp</span>
              <Icon name="arrow" />
            </a>

            <a
              href={APP_CONFIG.mailtoHref('Corporate enquiry')}
              className="concierge-contact-item"
            >
              <div className="contact-icon" aria-hidden="true"><Icon name="mail" /></div>
              <div className="contact-text">
                <strong>{APP_CONFIG.email}</strong>
                <span className="contact-sub">Email our team</span>
              </div>
            </a>

            <a
              href="tel:+919876543210"
              className="concierge-contact-item"
            >
              <div className="contact-icon" aria-hidden="true"><Icon name="phone" /></div>
              <div className="contact-text">
                <strong>+91 98765 43210</strong>
                <span className="contact-sub">Mon–Sat, 9:00 AM – 8:00 PM IST</span>
              </div>
            </a>
          </div>

          <div className="concierge-perks-box">
            <div className="concierge-perk-row">
              <span className="perk-check"><Icon name="check" /></span>
              <span>Free 4-jar sample kit dispatched in 48h</span>
            </div>
            <div className="concierge-perk-row">
              <span className="perk-check"><Icon name="check" /></span>
              <span>100% Roasted Makhana (Zero Palm Oil)</span>
            </div>
            <div className="concierge-perk-row">
              <span className="perk-check"><Icon name="check" /></span>
              <span>Full GST input tax credit invoices</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
