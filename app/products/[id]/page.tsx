import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { categoryOf, products } from '@/content/catalogue';
import { gradeSizeLabel, makhanaGradeNote } from '@/content/makhana-grades';
import { freezeDryingIntro, freezeDryingSteps, packingPromises, productDetail, themeFor, type ProductTheme } from '@/content/product-details';
import { Icon } from '../../visuals';
import { ProductCard } from '../../lineup';
import { ProductEnquiry, type ProductOption } from './product-enquiry';

const themeStyle = (theme: ProductTheme) => ({ '--pdp-bg': theme.bg, '--pdp-tile': theme.tile, '--pdp-title': theme.title, '--pdp-on-tile': theme.onTile }) as CSSProperties;

// Product detail page, one per catalogue product (team reference 2026-11-16: gallery + badge circles
// on the left, big title and option selects on the right, accordions below). Enquiry, not e-commerce.

export function generateStaticParams() {
  return products.map(product => ({ id: product.id }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const product = products.find(item => item.id === id);
  if (!product) return {};
  const detail = productDetail(product);
  return {
    title: APP_CONFIG.pageTitle(product.name),
    description: `${detail.description[0]} Bulk, private-label and export enquiries from ${APP_CONFIG.name}.`,
    alternates: { canonical: `/products/${product.id}` },
  };
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const product = products.find(item => item.id === id);
  if (!product) notFound();
  const category = categoryOf(product);
  const detail = productDetail(product);
  // Same-category products first, then others: 3 cards on desktop (as on All Products), 4 on 2-column screens.
  const related = [
    ...products.filter(item => item.category === product.category && item.id !== product.id),
    ...products.filter(item => item.category !== product.category),
  ].slice(0, 4);
  const options: ProductOption[] = [];
  if (detail.grades) options.push({ id: 'grade', label: 'Grade', initial: '5-sutta', items: detail.grades.map(grade => ({ id: grade.id, label: `${grade.sutta} Sutta · ${grade.grade} (${gradeSizeLabel(grade)})`, short: `${grade.sutta} Sutta` })) });
  if (detail.flavours) options.push({ id: 'flavour', label: 'Flavour', items: detail.flavours.map(flavour => ({ id: flavour.id, label: flavour.name, short: flavour.name, colour: flavour.colour, note: flavour.taste })) });

  return (
    <main id="main" className={`pdp-page pdp-${product.category}`} style={themeStyle(themeFor(product.id))}>
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span>
          <Link href="/catalog">Products</Link><span aria-hidden="true">/</span>
          <Link href={`/catalog#category-${category.id}`}>{category.name}</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <article className="pdp" aria-labelledby="pdp-title">
          <div className="pdp-gallery">
            <figure className="pdp-tile pdp-main">
              {product.image && <img src={product.image.src} width={product.image.width} height={product.image.height} alt={product.image.alt} fetchPriority="high" decoding="async" />}
              <span className="pdp-main-sticker" aria-hidden="true">{category.shortName}</span>
            </figure>
            <ul className="pdp-badges" aria-label="Highlights">
              {detail.badges.map((badge, index) => (
                <li key={badge} className="pdp-badge">
                  <span>{badge}</span>
                  {index === 2 && (
                    <svg className="pdp-badge-ring" viewBox="0 0 200 200" aria-hidden="true">
                      <defs><path id={`ring-${product.id}`} d="M100 100 m-88 0 a88 88 0 1 0 176 0 a88 88 0 1 0 -176 0" /></defs>
                      <text><textPath href={`#ring-${product.id}`} startOffset="2%">FOOD-GRADE PACKING · BETTER SHELF LIFE</textPath></text>
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="pdp-info">
            <h1 id="pdp-title" className="pdp-title">{product.name}</h1>
            <p className="pdp-subtitle"><span>{detail.subtitle}</span><span>Price on request</span></p>
            <div className="pdp-description">
              {detail.description.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <ProductEnquiry product={product} options={options} packing={detail.packing} />

            <div className="pdp-accordions">
              {detail.grades && (
                <details className="pdp-accordion" open>
                  <summary>Grades <span className="pdp-accordion-icon" aria-hidden="true"><Icon name="chevron-down" /></span></summary>
                  <ul className="pdp-grade-list">
                    {detail.grades.map(grade => (
                      <li key={grade.id}><strong>{grade.sutta} Sutta · {grade.grade}</strong><span>{gradeSizeLabel(grade)}</span><p>{grade.use}</p></li>
                    ))}
                  </ul>
                  <p className="pdp-small-print">{makhanaGradeNote} <Link href="/catalog#makhana-grades">Compare grades</Link></p>
                </details>
              )}
              {detail.flavours && (
                <details className="pdp-accordion" open>
                  <summary>Flavours <span className="pdp-accordion-icon" aria-hidden="true"><Icon name="chevron-down" /></span></summary>
                  <ul className="pdp-flavours">
                    {detail.flavours.map(flavour => (
                      <li key={flavour.id}>
                        <span className="pdp-flavour-dot" style={{ background: flavour.colour }} aria-hidden="true" />
                        <strong>{flavour.name}</strong>
                        <p>{flavour.taste}</p>
                      </li>
                    ))}
                  </ul>
                  {detail.flavourNote && <p>{detail.flavourNote}</p>}
                </details>
              )}
              {detail.freezeDried && (
                <details className="pdp-accordion" open>
                  <summary>How freeze-drying works <span className="pdp-accordion-icon" aria-hidden="true"><Icon name="chevron-down" /></span></summary>
                  <p>{freezeDryingIntro}</p>
                  <ol className="pdp-steps">
                    {freezeDryingSteps.map(step => <li key={step.title}><strong>{step.title}</strong> {step.text}</li>)}
                  </ol>
                </details>
              )}
              <details className="pdp-accordion">
                <summary>Packing <span className="pdp-accordion-icon" aria-hidden="true"><Icon name="chevron-down" /></span></summary>
                <ul className="pdp-ticks">{packingPromises.map(item => <li key={item}><Icon name="check" /> {item}</li>)}</ul>
                <p>Formats: {detail.packing.join(', ')}. Pack sizes are confirmed for each enquiry.</p>
              </details>
              <details className="pdp-accordion">
                <summary>Ordering <span className="pdp-accordion-icon" aria-hidden="true"><Icon name="chevron-down" /></span></summary>
                <ul className="pdp-ticks">
                  <li><Icon name="check" /> Low MOQ: minimum quantities are confirmed in your quotation</li>
                  <li><Icon name="check" /> Bulk, private-label, corporate and export enquiries</li>
                  <li><Icon name="check" /> Combine products from every category in one enquiry</li>
                </ul>
              </details>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="pdp-related collection-lineup" aria-labelledby="pdp-related-title">
            <h2 id="pdp-related-title">You may also like</h2>
            <div className="product-grid">
              {related.map(item => <ProductCard key={item.id} product={item} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
