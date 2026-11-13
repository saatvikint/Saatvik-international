'use client';

import { useId, useState, type ReactNode } from 'react';
import { Icon } from './visuals';
import { StickerHeading } from './sticker-heading';
import { APP_CONFIG } from '@/config/APP_CONFIG';

// FAQ "folder" accordion (Paper design, 2026-11-12).
// Answers use only facts from .agent/client/. Run skills/review-claims.md before changing them.

interface FaqItem {
  id: string;
  question: string;
  answer: ReactNode;
  cta?: { label: string; href: string };
}

const faqItems: FaqItem[] = [
  {
    id: 'who',
    question: 'Who do you supply?',
    answer: (
      <>
        <p>We are a <strong>B2B supplier</strong>: distributors and wholesalers, supermarkets and retail chains, food brands and startups, private-label owners, corporate buyers, <strong>HORECA</strong> and institutional buyers, and importers.</p>
        <p>We do not sell individual retail packs on this website.</p>
      </>
    ),
  },
  {
    id: 'what',
    question: 'What products can I enquire about?',
    answer: (
      <p><strong>Makhana</strong>: raw in sizes 4, 5 and 6, and roasted or flavoured. <strong>Puffs</strong>: millet, jowar, quinoa and chickpea. <strong>Freeze-dried fruits</strong>: black jamun, strawberry, banana, mango and pineapple.</p>
    ),
    cta: { label: 'See the range', href: '/catalog' },
  },
  {
    id: 'private-label',
    question: 'Can you supply under our own brand?',
    answer: (
      <p>Yes. Our <strong>private-label</strong> service covers product sourcing, manufacturing coordination and <strong>customised packaging</strong>, so you can launch snacks under your own brand.</p>
    ),
    cta: { label: 'Start an enquiry', href: '#enquiry' },
  },
  {
    id: 'flavours',
    question: 'Can flavours be customised?',
    answer: (
      <p>Yes, flavours for roasted makhana can be <strong>customised</strong>. Tell us your flavour preferences, packaging needs and quantities, and we will work out the product with you.</p>
    ),
  },
  {
    id: 'pricing',
    question: 'What are your prices and minimum order?',
    answer: (
      <p>Prices and minimum quantities depend on the <strong>product, size, packaging and volume</strong>, so we quote for each enquiry. Add the products you need to one enquiry and we will reply with a quotation.</p>
    ),
    cta: { label: 'Request a quote', href: '#enquiry' },
  },
  {
    id: 'export',
    question: 'Do you work with international buyers?',
    answer: (
      <p>We serve businesses across India and are building relationships with <strong>international buyers and importers</strong>. Include your destination country in your enquiry and we will tell you what we can supply.</p>
    ),
  },
];

function FaqFolder({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const buttonId = `${baseId}-button`;
  return (
    <div className={open ? 'faq-folder is-open' : 'faq-folder'}>
      <h3 className="faq-folder-heading">
        <button id={buttonId} type="button" className="faq-folder-tab" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          <span>{item.question}</span>
          <span className="faq-folder-icon"><Icon name="plus" strokeWidth={2} /></span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} className="faq-folder-panel" inert={!open}>
        <div className="faq-folder-panel-inner">
          <div className="faq-paper">
            {item.answer}
            {item.cta && <a className="button primary faq-paper-cta" href={item.cta.href}>{item.cta.label} <Icon name="arrow" /></a>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeFaq() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0].id);

  return (
    <section className="faq-folders-section shell" id="faq" aria-labelledby="home-faq-title">
      <header className="faq-folders-header">
        <StickerHeading id="home-faq-title" size="md" kicker="Frequently asked questions"
          rows={[[{ text: 'Got', tone: 'pink' }], [{ text: 'Questions?', tone: 'purple' }]]} />
      </header>
      <div className="faq-folders-layout">
        <div className="faq-folders-photo">
          <img className="is-illustrative" src="/assets/faq/model-holding-makhana.webp" width={900} height={1004} alt="Illustrative visual of a model holding a bowl of flavoured makhana, with the face outside the frame" loading="lazy" decoding="async" />
          <small className="faq-visual-note">Illustrative product visual</small>
        </div>
        <div className="faq-folders-list">
          {faqItems.map(item => (
            <FaqFolder key={item.id} item={item} open={openId === item.id} onToggle={() => setOpenId(current => current === item.id ? null : item.id)} />
          ))}
          <p className="faq-folders-more">
            Another question? Call <a href={APP_CONFIG.telHref}>{APP_CONFIG.phone.display}</a> or email <a href={APP_CONFIG.mailtoHref()}>{APP_CONFIG.email}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
