'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { useShop } from '../../shop';
import { Icon } from '../../visuals';
import type { Product } from '@/content/catalogue';
import { enquiryTypes } from '@/content/product-details';

export interface OptionItem {
  id: string;
  label: string;
  /** Short form used in the quote details, e.g. "6 Sutta". */
  short: string;
  /** Dot colour shown in the select (flavours). */
  colour?: string;
  /** Short description shown under the select for the chosen item (flavour taste note). */
  note?: string;
}

export interface ProductOption {
  id: string;
  label: string;
  items: OptionItem[];
  initial?: string;
}

interface Props {
  product: Product;
  options: ProductOption[];
  /** Packing formats offered for this product's category. */
  packing: string[];
}

/**
 * Right-hand enquiry panel (team reference: option selects, purchase-type radio cards, main CTA).
 * Adapted for enquiry: no price or cart. Choices travel to the quote form as URL parameters.
 */
export function ProductEnquiry({ product, options, packing: packingFormats }: Props) {
  const { addToList, cart } = useShop();
  const [added, setAdded] = useState(false);
  const inList = cart[product.id] ?? 0;
  const id = useId();
  const [choices, setChoices] = useState<Record<string, string>>(
    () => Object.fromEntries(options.map(option => [option.id, option.initial ?? option.items[0]?.id ?? ''])),
  );
  const [packing, setPacking] = useState<string>(packingFormats[0]);
  const [type, setType] = useState<string>(enquiryTypes[0].id);

  const chosen = options.map(option => option.items.find(item => item.id === choices[option.id]));
  const typeLabel = enquiryTypes.find(item => item.id === type)?.label ?? '';
  const details = [...chosen.map(item => item?.short), packing, typeLabel].filter(Boolean).join(' · ');
  // Client 2026-11-20: product quotes go to Contact Us; the form pre-fills the product and choices.
  const quoteHref = `/contact?${new URLSearchParams({ product: product.id, details })}#contact-form`;
  const hasGrade = options.some(option => option.id === 'grade');

  return (
    <div className="pdp-enquiry">
      {options.map((option, index) => (
        <div key={option.id} className="pdp-select-group">
          <label className="pdp-select">
            <span className="pdp-select-label">{option.label}</span>
            <span className="pdp-select-dot" aria-hidden="true" style={chosen[index]?.colour ? { background: chosen[index]?.colour } : undefined} />
            <select
              value={choices[option.id]}
              aria-describedby={chosen[index]?.note ? `${id}-${option.id}-note` : undefined}
              onChange={event => setChoices(current => ({ ...current, [option.id]: event.target.value }))}
            >
              {option.items.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
            <Icon name="chevron-down" className="icon pdp-select-chevron" />
          </label>
          {chosen[index]?.note && <p id={`${id}-${option.id}-note`} className="pdp-select-note" aria-live="polite">{chosen[index]?.note}</p>}
        </div>
      ))}
      <label className="pdp-select">
        <span className="pdp-select-label">Packing</span>
        <span className="pdp-select-dot is-packing" aria-hidden="true" />
        <select value={packing} onChange={event => setPacking(event.target.value)}>
          {packingFormats.map(format => <option key={format} value={format}>{format}</option>)}
        </select>
        <Icon name="chevron-down" className="icon pdp-select-chevron" />
      </label>

      <fieldset className="pdp-types">
        <legend className="sr-only">Enquiry type</legend>
        {enquiryTypes.map(option => (
          <label key={option.id} className={type === option.id ? 'pdp-type is-selected' : 'pdp-type'}>
            <input type="radio" name={`${id}-type`} value={option.id} checked={type === option.id} onChange={() => setType(option.id)} />
            <span className="pdp-type-radio" aria-hidden="true" />
            <span className="pdp-type-label">{option.label}</span>
            <span className="pdp-type-detail">{option.detail}</span>
          </label>
        ))}
      </fieldset>

      <div className="pdp-actions">
        <button type="button" className="pdp-add" onClick={() => { addToList(product); setAdded(true); }}>
          <Icon name={added ? 'check' : 'chat'} /> {added ? 'Added to enquiry' : 'Add to enquiry'}
        </button>
        <Link className="pdp-quote" href={quoteHref}>Request a quote for this product <Icon name="arrow" /></Link>
      </div>
      <p className="pdp-added" role="status">
        {added && <>{product.name} is on your enquiry list{inList > 1 ? ` (${inList})` : ''}. <Link href={quoteHref}>Send your enquiry</Link></>}
      </p>
      <p className="pdp-price-note"><Icon name="receipt" /> Price on request: quotes depend on {hasGrade ? 'grade, ' : ''}packing and volume.</p>
    </div>
  );
}
