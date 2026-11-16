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
    </div>
  );
}
