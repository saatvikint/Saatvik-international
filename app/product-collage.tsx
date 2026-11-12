import { products } from './products';

const collageIds = ['freeze-dried-mango-cubes', 'freeze-dried-black-jamun', 'freeze-dried-banana-slices', 'freeze-dried-pineapple-slices'];

/** Decorative grid of real product photos. Callers mark the container aria-hidden. */
export function ProductCollage() {
  const photos = products.filter(product => product.image && collageIds.includes(product.id));
  return (
    <div className="photo-collage">
      {photos.map(product => product.image && (
        <img key={product.id} src={product.image.src} width={product.image.width} height={product.image.height} alt="" loading="lazy" decoding="async" />
      ))}
    </div>
  );
}
