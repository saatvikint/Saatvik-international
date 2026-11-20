import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { showDraftSlots } from '@/content/company-media';
import { Icon } from './visuals';

// Server-only image slot. If the file exists in /public it renders the photo; otherwise an honest
// "photo coming soon" tile (project rule 8). Drop a file at `src` and rebuild: no code change needed.
// Development also prints the expected path on the tile so the right file is easy to add.

export interface SlotImage {
  /** Path under /public, e.g. /assets/services/corporate-pantry.jpg */
  src: string;
  alt: string;
  /** What the photo should show, used on the placeholder. */
  label: string;
  /** Display a disclosure for generated examples. Remove when using verified photography. */
  illustrative?: boolean;
}

export function ImageSlot({ image, className, ratio = '4 / 3' }: { image: SlotImage; className?: string; ratio?: string }) {
  const exists = existsSync(join(process.cwd(), 'public', image.src));
  const classes = ['image-slot', !exists && 'is-empty', className].filter(Boolean).join(' ');
  return (
    <div className={classes} style={{ aspectRatio: ratio }}>
      {exists ? (
        <>
          <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
          {image.illustrative && <small className="image-slot-disclosure">Illustrative image</small>}
        </>
      ) : (
        <div className="image-slot-placeholder" aria-hidden="true">
          <Icon name="image" />
          <span className="image-slot-label">{image.label}</span>
          <span className="image-slot-note">Photo coming soon</span>
          {showDraftSlots && <code>{image.src}</code>}
        </div>
      )}
    </div>
  );
}
