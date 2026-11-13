/**
 * SOCIAL_CONFIG: single source of truth for social profiles and chat links.
 *
 * A profile with `url: null` is not shown anywhere on the site. The client has not
 * shared any social profiles yet, so they are all null. Fill in a real URL when the
 * client confirms it; never link to a platform's home page as a placeholder.
 * Import as: `import { SOCIAL_CONFIG } from '@/config/SOCIAL_CONFIG'`.
 */
import { APP_CONFIG } from './APP_CONFIG';

export type SocialPlatform = 'instagram' | 'facebook' | 'linkedin' | 'youtube' | 'x';

export interface SocialProfile {
  readonly platform: SocialPlatform;
  readonly label: string;
  readonly url: string | null;
  readonly handle?: string;
}

class SocialConfig {
  private readonly profiles: Readonly<Record<SocialPlatform, SocialProfile>> = {
    instagram: { platform: 'instagram', label: 'Instagram', url: null },
    facebook: { platform: 'facebook', label: 'Facebook', url: null },
    linkedin: { platform: 'linkedin', label: 'LinkedIn', url: null },
    youtube: { platform: 'youtube', label: 'YouTube', url: null },
    x: { platform: 'x', label: 'X', url: null },
  };

  /**
   * WhatsApp uses the business phone number. Whether that number is on WhatsApp and
   * should be public is still open question Q3; set this to false to hide every
   * WhatsApp link at once.
   */
  readonly whatsappEnabled = true;

  /** Profile for one platform, whether or not it has a URL. */
  get(platform: SocialPlatform): SocialProfile {
    return this.profiles[platform];
  }

  /** Profiles that have a confirmed URL, in display order. */
  get active(): SocialProfile[] {
    return Object.values(this.profiles).filter(profile => profile.url !== null);
  }

  get hasActiveProfiles(): boolean {
    return this.active.length > 0;
  }

  /** wa.me chat link for the business number, with an optional prefilled message. */
  whatsappHref(message: string = APP_CONFIG.defaultEnquiryMessage): string {
    const number = APP_CONFIG.phone.e164.replace(/\D/g, '');
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }

  /** Profile URLs for structured data (schema.org `sameAs`). */
  get sameAs(): string[] {
    return this.active.map(profile => profile.url as string);
  }
}

export const SOCIAL_CONFIG: Readonly<SocialConfig> = Object.freeze(new SocialConfig());
export type { SocialConfig };
