import type React from 'react';
// Mostly makhana and puffs (client feedback 2026-11-16: more makhana and puff elements); fruit is one in ~7.
const pieces = [
  { name: 'raw-makhana-1', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-curl-1', src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  { name: 'flavoured-makhana-1', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'puff-disc-1', src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  { name: 'raw-makhana-2', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-cube-1', src: '/assets/decor/single-puff-cube.webp', width: 383, height: 420 },
  { name: 'mango-cube-1', src: '/assets/decor/single-mango-cube.webp', width: 412, height: 420 },
  { name: 'flavoured-makhana-2', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'puff-curl-2', src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  { name: 'raw-makhana-3', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-disc-2', src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  { name: 'strawberry-slice-1', src: '/assets/decor/single-strawberry-slice.webp', width: 420, height: 410 },
  { name: 'flavoured-makhana-3', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'puff-cube-2', src: '/assets/decor/single-puff-cube.webp', width: 383, height: 420 },
  { name: 'raw-makhana-4', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-curl-3', src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  { name: 'black-jamun-1', src: '/assets/decor/single-black-jamun.webp', width: 420, height: 336 },
  { name: 'flavoured-makhana-4', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'puff-disc-3', src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  { name: 'raw-makhana-5', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-cube-3', src: '/assets/decor/single-puff-cube.webp', width: 383, height: 420 },
  { name: 'pineapple-ring-1', src: '/assets/decor/single-pineapple-ring.webp', width: 420, height: 415 },
  { name: 'raw-makhana-6', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-curl-4', src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  { name: 'flavoured-makhana-5', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'puff-disc-4', src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  { name: 'raw-makhana-7', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-cube-4', src: '/assets/decor/single-puff-cube.webp', width: 383, height: 420 },
  { name: 'mango-cube-2', src: '/assets/decor/single-mango-cube.webp', width: 412, height: 420 },
  { name: 'flavoured-makhana-6', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'puff-curl-5', src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  { name: 'raw-makhana-8', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-disc-5', src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  { name: 'strawberry-slice-2', src: '/assets/decor/single-strawberry-slice.webp', width: 420, height: 410 },
  { name: 'flavoured-makhana-7', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'puff-cube-5', src: '/assets/decor/single-puff-cube.webp', width: 383, height: 420 },
  { name: 'raw-makhana-9', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-curl-6', src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  { name: 'black-jamun-2', src: '/assets/decor/single-black-jamun.webp', width: 420, height: 336 },
  { name: 'flavoured-makhana-8', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'puff-disc-6', src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  { name: 'raw-makhana-10', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-cube-6', src: '/assets/decor/single-puff-cube.webp', width: 383, height: 420 },
  { name: 'pineapple-ring-2', src: '/assets/decor/single-pineapple-ring.webp', width: 420, height: 415 },
  { name: 'raw-makhana-11', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-curl-7', src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  { name: 'flavoured-makhana-9', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'puff-disc-7', src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  { name: 'raw-makhana-12', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-cube-7', src: '/assets/decor/single-puff-cube.webp', width: 383, height: 420 },
  { name: 'mango-cube-3', src: '/assets/decor/single-mango-cube.webp', width: 412, height: 420 },
  { name: 'flavoured-makhana-10', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'puff-curl-8', src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  { name: 'raw-makhana-13', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-disc-8', src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  { name: 'strawberry-slice-3', src: '/assets/decor/single-strawberry-slice.webp', width: 420, height: 410 },
  { name: 'flavoured-makhana-11', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'puff-cube-8', src: '/assets/decor/single-puff-cube.webp', width: 383, height: 420 },
  { name: 'raw-makhana-14', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-curl-9', src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  { name: 'black-jamun-3', src: '/assets/decor/single-black-jamun.webp', width: 420, height: 336 },
  { name: 'flavoured-makhana-12', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'puff-disc-9', src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  { name: 'raw-makhana-15', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'puff-cube-9', src: '/assets/decor/single-puff-cube.webp', width: 383, height: 420 },
  { name: 'pineapple-ring-3', src: '/assets/decor/single-pineapple-ring.webp', width: 420, height: 415 },
] as const;

const shapes = {
  'raw-makhana': { src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  'flavoured-makhana': { src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  'puff-curl': { src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  'puff-disc': { src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  'puff-cube': { src: '/assets/decor/single-puff-cube.webp', width: 383, height: 420 },
  'mango-cube': { src: '/assets/decor/single-mango-cube.webp', width: 412, height: 420 },
  'strawberry-slice': { src: '/assets/decor/single-strawberry-slice.webp', width: 420, height: 410 },
} as const;

// Client 2026-11-26: more floating elements. Extra pieces fill the gaps between the hand-placed 66,
// on a fixed pattern (no randomness, so server and client render the same).
const extraOrder: (keyof typeof shapes)[] = [
  'raw-makhana', 'puff-curl', 'flavoured-makhana', 'puff-disc', 'raw-makhana', 'puff-cube',
  'flavoured-makhana', 'raw-makhana', 'puff-curl', 'mango-cube', 'raw-makhana', 'puff-disc',
  'flavoured-makhana', 'puff-cube', 'raw-makhana', 'puff-curl', 'flavoured-makhana', 'raw-makhana',
  'puff-disc', 'strawberry-slice', 'raw-makhana', 'puff-cube',
];
const EXTRA = 44;
const extras = Array.from({ length: EXTRA }, (_, i) => {
  const shape = extraOrder[i % extraOrder.length];
  const wave = (n: number) => (Math.sin((i + 1) * n) + 1) / 2; // 0..1, deterministic
  const side = i % 2 === 0 ? 'left' : 'right';
  const top = ((i + 0.5) / EXTRA) * 97 + 1 + (wave(2.3) - 0.5) * 1.6;
  const offset = Math.round(-14 + wave(3.7) * 64);
  const style = {
    top: `${top.toFixed(1)}%`,
    [side]: `max(4px,calc(var(--rail-offset) + ${offset}px))`,
    '--drift-x': `${side === 'left' ? 1 : -1}${Math.round(6 + wave(5.1) * 4)}px`,
    '--piece-scale': (0.72 + wave(7.9) * 0.34).toFixed(2),
    '--tilt': `${Math.round(-32 + wave(1.7) * 64)}deg`,
    '--drift-time': `${(8.4 + wave(4.3) * 2.6).toFixed(1)}s`,
    '--drift-delay': `-${(wave(6.1) * 8).toFixed(1)}s`,
  } as React.CSSProperties;
  return { name: `${shape}-extra-${i + 1}`, ...shapes[shape], style };
});

export function FloatingSnackDecor() {
  return (
    <div className="snack-side-decor" aria-hidden="true">
      {pieces.map((piece, index) => (
        <img
          key={piece.name}
          className={`snack-side-piece snack-side-piece-${index + 1}`}
          src={piece.src}
          width={piece.width}
          height={piece.height}
          alt=""
          loading="lazy"
          decoding="async"
        />
      ))}
      {extras.map(piece => (
        <img
          key={piece.name}
          className="snack-side-piece"
          src={piece.src}
          width={piece.width}
          height={piece.height}
          style={piece.style}
          alt=""
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
}
