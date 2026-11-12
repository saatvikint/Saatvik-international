import type { CSSProperties } from 'react';

// Section heading style from the Paper design (2026-11-12): each word sits on a tilted,
// rounded colour block, with an optional uppercase kicker line and hand-drawn rays.

export type StickerTone = 'lime' | 'purple' | 'red' | 'pink' | 'yellow';

export interface StickerWord {
  text: string;
  tone: StickerTone;
  /** Connector words such as "&" or "the" render smaller. */
  small?: boolean;
}

interface StickerHeadingProps {
  as?: 'h1' | 'h2';
  id?: string;
  rows: StickerWord[][];
  kicker?: string;
  align?: 'center' | 'start';
  size?: 'lg' | 'md';
  /** Light kicker and rays for dark section backgrounds. */
  onDark?: boolean;
  rays?: boolean;
  className?: string;
}

const tilt = [-4, 3, -1.5, 2, -3, 1];

function Rays({ side }: { side: 'left' | 'right' }) {
  return (
    <svg className={`sticker-rays sticker-rays-${side}`} viewBox="0 0 64 72" aria-hidden="true" focusable="false">
      <path d="M8 6 30 30M38 4l1 20M6 54l21-3" />
    </svg>
  );
}

export function StickerHeading({
  as: Tag = 'h2', id, rows, kicker, align = 'center', size = 'lg', onDark = false, rays = true, className,
}: StickerHeadingProps) {
  let index = 0;
  const classes = ['sticker-heading-wrap', `is-${align}`, `is-${size}`, onDark && 'on-dark', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <div className="sticker-heading-stage">
        {rays && <Rays side="left" />}
        <Tag id={id} className="sticker-heading">
          {rows.map((row, rowIndex) => (
            <span key={rowIndex} className="sticker-row">
              {row.map(word => {
                const style = { '--tilt': `${tilt[index++ % tilt.length]}deg` } as CSSProperties;
                return (
                  <span key={word.text} className={`sticker-word tone-${word.tone}${word.small ? ' is-small' : ''}`} style={style}>
                    {word.text}{' '}
                  </span>
                );
              })}
            </span>
          ))}
        </Tag>
        {rays && <Rays side="right" />}
      </div>
      {kicker && <p className="sticker-kicker">{kicker}</p>}
    </div>
  );
}
