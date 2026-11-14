const pieces = [
  { name: 'raw-makhana', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'mango-cube', src: '/assets/decor/single-mango-cube.webp', width: 412, height: 420 },
  { name: 'puff-curl', src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  { name: 'strawberry-slice', src: '/assets/decor/single-strawberry-slice.webp', width: 420, height: 410 },
  { name: 'flavoured-makhana', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'black-jamun', src: '/assets/decor/single-black-jamun.webp', width: 420, height: 336 },
  { name: 'puff-cube', src: '/assets/decor/single-puff-cube.webp', width: 383, height: 420 },
  { name: 'banana-slice', src: '/assets/decor/single-banana-slice.webp', width: 420, height: 419 },
  { name: 'puff-disc', src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  { name: 'pineapple-ring', src: '/assets/decor/single-pineapple-ring.webp', width: 420, height: 415 },
  { name: 'raw-makhana-2', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'strawberry-slice-2', src: '/assets/decor/single-strawberry-slice.webp', width: 420, height: 410 },
  { name: 'puff-cube-2', src: '/assets/decor/single-puff-cube.webp', width: 383, height: 420 },
  { name: 'mango-cube-2', src: '/assets/decor/single-mango-cube.webp', width: 412, height: 420 },
  { name: 'flavoured-makhana-2', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'banana-slice-2', src: '/assets/decor/single-banana-slice.webp', width: 420, height: 419 },
  { name: 'puff-curl-2', src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  { name: 'black-jamun-2', src: '/assets/decor/single-black-jamun.webp', width: 420, height: 336 },
  { name: 'pineapple-ring-2', src: '/assets/decor/single-pineapple-ring.webp', width: 420, height: 415 },
  { name: 'puff-disc-2', src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  { name: 'raw-makhana-3', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'mango-cube-3', src: '/assets/decor/single-mango-cube.webp', width: 412, height: 420 },
  { name: 'puff-curl-3', src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  { name: 'black-jamun-3', src: '/assets/decor/single-black-jamun.webp', width: 420, height: 336 },
  { name: 'banana-slice-3', src: '/assets/decor/single-banana-slice.webp', width: 420, height: 419 },
  { name: 'flavoured-makhana-3', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'puff-disc-3', src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  { name: 'pineapple-ring-3', src: '/assets/decor/single-pineapple-ring.webp', width: 420, height: 415 },
  { name: 'strawberry-slice-3', src: '/assets/decor/single-strawberry-slice.webp', width: 420, height: 410 },
  { name: 'puff-cube-3', src: '/assets/decor/single-puff-cube.webp', width: 383, height: 420 },
  { name: 'raw-makhana-4', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'mango-cube-4', src: '/assets/decor/single-mango-cube.webp', width: 412, height: 420 },
  { name: 'black-jamun-4', src: '/assets/decor/single-black-jamun.webp', width: 420, height: 336 },
  { name: 'puff-curl-4', src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  { name: 'banana-slice-4', src: '/assets/decor/single-banana-slice.webp', width: 420, height: 419 },
  { name: 'flavoured-makhana-4', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'pineapple-ring-4', src: '/assets/decor/single-pineapple-ring.webp', width: 420, height: 415 },
  { name: 'puff-disc-4', src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  { name: 'strawberry-slice-4', src: '/assets/decor/single-strawberry-slice.webp', width: 420, height: 410 },
  { name: 'raw-makhana-5', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
  { name: 'mango-cube-5', src: '/assets/decor/single-mango-cube.webp', width: 412, height: 420 },
  { name: 'black-jamun-5', src: '/assets/decor/single-black-jamun.webp', width: 420, height: 336 },
  { name: 'puff-cube-4', src: '/assets/decor/single-puff-cube.webp', width: 383, height: 420 },
  { name: 'banana-slice-5', src: '/assets/decor/single-banana-slice.webp', width: 420, height: 419 },
  { name: 'flavoured-makhana-5', src: '/assets/decor/single-flavoured-makhana.webp', width: 420, height: 405 },
  { name: 'puff-curl-5', src: '/assets/decor/single-puff-curl.webp', width: 420, height: 272 },
  { name: 'pineapple-ring-5', src: '/assets/decor/single-pineapple-ring.webp', width: 420, height: 415 },
  { name: 'strawberry-slice-5', src: '/assets/decor/single-strawberry-slice.webp', width: 420, height: 410 },
  { name: 'puff-disc-5', src: '/assets/decor/single-puff-disc.webp', width: 420, height: 369 },
  { name: 'raw-makhana-6', src: '/assets/decor/single-raw-makhana.webp', width: 420, height: 371 },
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
