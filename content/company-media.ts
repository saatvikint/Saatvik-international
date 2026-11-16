// Client-supplied people and media for the About Us page and the home FAQ.
// Fill these in only with what the client has sent (see .agent/client/open-questions.md, Q28 to Q30).
// Empty values hide the block in production; development shows a labelled slot so the layout can be reviewed.

export interface Founder {
  name: string;
  /** e.g. "Founder" or "Founder & Director", exactly as the client words it. */
  role: string;
  /** Short message in the founder's words. */
  message?: string;
  photo?: { src: string; width: number; height: number };
}

export interface SiteVideo {
  id: string;
  title: string;
  /** MP4 (H.264) in /public/assets/videos/, kept under ~8 MB; or a YouTube/Vimeo embed URL. */
  src: string;
  poster?: string;
  /** Embed URL instead of a self-hosted file. */
  embed?: boolean;
}

/** Confirmed by the client on 2026-11-16 (Our Story copy). */
export const founder: Founder | null = { name: 'Sahil Jain', role: 'Founder' };

/** Manufacturing videos supplied by the client on 2026-11-16 (originals: IMG_4966, IMG_4967), re-encoded for web. */
export const manufacturingVideos: SiteVideo[] = [
  { id: 'roasting-trays', title: 'Makhana on roasting trays', src: '/assets/videos/makhana-roasting-trays.mp4', poster: '/assets/videos/makhana-roasting-trays.jpg' },
  { id: 'roasting-cabinet', title: 'Makhana in the roasting cabinet', src: '/assets/videos/makhana-roasting-cabinet.mp4', poster: '/assets/videos/makhana-roasting-cabinet.jpg' },
];

/** TODO(client): a short, fun looping video for the home FAQ (Q30). Muted, no sound needed. */
export const faqVideo: SiteVideo | null = null;

export const showDraftSlots =
  process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SHOW_DRAFT_CONTENT === 'true';
