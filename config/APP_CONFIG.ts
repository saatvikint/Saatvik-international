/**
 * APP_CONFIG: single source of truth for business, contact and site constants.
 *
 * Every value must come from the client (see .agent/client/facts.md). Never add an
 * unconfirmed fact here: certifications, MOQs, years in business, etc. go in only
 * once the client supplies them. Import as: `import { APP_CONFIG } from '@/config/APP_CONFIG'`.
 */

export interface PhoneNumber {
  /** E.164 format, used for tel: and WhatsApp links. */
  readonly e164: string;
  /** Human-readable format shown on the page. */
  readonly display: string;
}

export interface PostalAddress {
  readonly line1: string;
  readonly line2: string;
  readonly street: string;
  readonly city: string;
  readonly region: string;
  readonly postalCode: string;
  readonly country: string;
  readonly countryCode: string;
}

class AppConfig {
  // Brand
  readonly name = 'Saatvik International';
  readonly shortName = 'Saatvik';
  readonly tagline = 'Leading Supplier of Healthy Snacks in India';
  readonly description =
    'Saatvik International is a leading supplier of healthy snacks in India, handling wholesale, private-labelling, corporate supply and export enquiries.';
  readonly locale = 'en-IN';
  readonly themeColor = '#fff6e8';
  readonly logo = { src: '/assets/saatvik-logo.png', width: 2048, height: 522 } as const;

  // Site
  /**
   * Public URL of the site. The domain printed on the business card
   * (saatvikinternational.com) is not registered yet (open question Q1), so set
   * NEXT_PUBLIC_SITE_URL per environment instead of hard-coding it.
   */
  readonly siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
  readonly domainOnCard = 'www.saatvikinternational.com';

  // Contact
  readonly contactPerson = 'Sahil Jain';
  readonly phone: PhoneNumber = { e164: '+919370012306', display: '+91 93700 12306' };
  readonly email = 'saatvikinternational9@gmail.com';
  readonly address: PostalAddress = {
    line1: 'Office no-104, The Grid Business Hub',
    line2: 'Near Chordiya Corner',
    street: 'Gangadham-Shatrunjay Road',
    city: 'Pune',
    region: 'Maharashtra',
    postalCode: '411046',
    country: 'India',
    countryCode: 'IN',
  };

  // Legal
  readonly gstin = '27AFCFS6285E1ZR';

  // Business
  /** Services as printed on the business card. */
  readonly services = ['B2B Supply', 'Wholesale', 'Private Label', 'Export'] as const;

  /** Default text for a new WhatsApp chat. */
  readonly defaultEnquiryMessage = 'Hi Saatvik International, I would like to enquire about bulk supply.';

  // Derived helpers
  get telHref(): string {
    return `tel:${this.phone.e164}`;
  }

  mailtoHref(subject?: string): string {
    return subject ? `mailto:${this.email}?subject=${encodeURIComponent(subject)}` : `mailto:${this.email}`;
  }

  /** One-line address for footers and contact blocks. */
  get addressOneLine(): string {
    const a = this.address;
    return `${a.line1}, ${a.line2}, ${a.street}, ${a.city}-${a.postalCode}`;
  }

  /** "Page | Saatvik International" title format used in metadata. */
  pageTitle(title?: string): string {
    return title ? `${title} | ${this.name}` : `${this.name} | ${this.tagline}`;
  }

  /** Absolute URL for a site path, for canonical links, Open Graph and sitemaps. */
  absoluteUrl(path = '/'): string {
    return `${this.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }

  /** Copyright line with the current year. */
  copyright(year = new Date().getFullYear()): string {
    return `© ${year} ${this.name}. All rights reserved.`;
  }
}

export const APP_CONFIG: Readonly<AppConfig> = Object.freeze(new AppConfig());
export type { AppConfig };
