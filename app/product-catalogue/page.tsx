import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { CSSProperties, ReactNode } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { categories, categoryOf, products } from '@/content/catalogue';
import { certifications } from '@/content/certifications';
import { founder } from '@/content/company-media';
import { gradeSizeLabel, makhanaGradeNote } from '@/content/makhana-grades';
import { freezeDryingIntro, freezeDryingSteps, productDetail, themeFor } from '@/content/product-details';
import { corporateSegments, packagingFormats, packagingPromises, privateLabel } from '@/content/services';
import { PageHero } from '../page-hero';
import { StickerHeading } from '../sticker-heading';
import { Icon } from '../visuals';
import { reasons } from '../why-saatvik';
import { PrintButton } from './print-button';

// Downloadable product catalogue. One A4 sheet per section: cover, about, one sheet per product,
// packing, services and contact. On screen the sheets stack as a preview; in print (and in the PDF)
// each sheet is exactly one A4 page. All content comes from the same files as the product pages,
// so the catalogue never says anything the site does not.
//
// The PDF at PDF_PATH is generated from this page: start the site, then run `npm run catalogue:pdf`.
// Regenerate it whenever products, flavours, packing or contact details change.

export const metadata: Metadata = {
  title: APP_CONFIG.pageTitle('Product Catalogue'),
  description: `Download the ${APP_CONFIG.name} product catalogue: makhana grades and flavours, millet-based puffs, freeze-dried fruits, packing options and services.`,
  alternates: { canonical: '/product-catalogue' },
};

const PDF_PATH = '/downloads/saatvik-international-product-catalogue.pdf';
/** Month the catalogue content was last reviewed. Update it when you regenerate the PDF after a content change. */
const EDITION = 'November 2026';

// Page numbers: cover, about, one per product, packing, services, contact.
const FIRST_PRODUCT_PAGE = 3;
const PACKING_PAGE = FIRST_PRODUCT_PAGE + products.length;
const SERVICES_PAGE = PACKING_PAGE + 1;
const CONTACT_PAGE = SERVICES_PAGE + 1;
const TOTAL_PAGES = CONTACT_PAGE;

/** Only print the website once it is on a public domain (the card's domain is not live yet, Q1). */
const publicSite = !/localhost|127\.0\.0\.1/.test(APP_CONFIG.siteUrl);

function pdfInfo(): { href: string; sizeLabel: string } | null {
  const file = join(process.cwd(), 'public', PDF_PATH);
  if (!existsSync(file)) return null;
  const mb = statSync(file).size / (1024 * 1024);
  return { href: PDF_PATH, sizeLabel: mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(mb * 1024))} KB` };
}

/**
 * Small catalogue copies of images keep the PDF light enough to forward. `npm run catalogue:pdf` reads
 * the list from the page (#pc-images), writes the copies to /assets/catalogue/ with sharp, then prints.
 * PNGs with a `background` become flattened JPEGs (the tile colour is solid, so they look identical);
 * without one they stay PNG, just smaller. Until the copies exist the originals are used.
 */
interface CatalogueImage { src: string; out: string; width: number; background?: string }

function imageCopies() {
  const list = new Map<string, CatalogueImage>();
  const use = (src: string, width: number, background?: string): string => {
    const base = src.split('/').pop()!.replace(/\.\w+$/, '');
    const out = background
      ? `/assets/catalogue/${base}-${background.replace('#', '')}.jpg`
      : `/assets/catalogue/${base}-${width}.png`;
    list.set(out, { src, out, width, background });
    return existsSync(join(process.cwd(), 'public', out)) ? out : src;
  };
  return { use, manifest: () => JSON.stringify([...list.values()]) };
}

/** Plain card colour behind product bowls (client 2026-11-25), same as the website product cards (--surface). */
const PLAIN_TILE = '#fdf6ea';

const LOGO_SMALL = '/assets/catalogue/saatvik-logo-560.png';
const logoSrc = () => (existsSync(join(process.cwd(), 'public', LOGO_SMALL)) ? LOGO_SMALL : APP_CONFIG.logo.src);

function Sheet({ id, page, label, className, style, children }: { id: string; page: number; label: string; className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <section id={id} className={['pc-page', className].filter(Boolean).join(' ')} style={style} aria-label={`Page ${page}: ${label}`}>
      <header className="pc-page-head">
        <img src={logoSrc()} width={APP_CONFIG.logo.width} height={APP_CONFIG.logo.height} alt={APP_CONFIG.name} />
        <span>{label}</span>
      </header>
      <div className="pc-page-body">{children}</div>
      <footer className="pc-page-foot">
        <span>{APP_CONFIG.phone.display} · {APP_CONFIG.email}</span>
        <span>{page} / {TOTAL_PAGES}</span>
      </footer>
    </section>
  );
}

export default function ProductCataloguePage() {
  const pdf = pdfInfo();
  const images = imageCopies();
  const coverTile: Record<string, string> = { makhana: '#ffaaf1', puffs: '#d2e796', 'freeze-dried-fruits': '#b8defa' };
  const productCount = products.length;

  return (
    <main id="main" className="pc-main">
      <div className="shell pc-screen-only">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span>
          <Link href="/catalog">Products</Link><span aria-hidden="true">/</span>
          <span aria-current="page">Product catalogue</span>
        </nav>
        <PageHero id="pc-hero-title" tone="yellow"
          rows={[[{ text: 'Product', tone: 'lime' }], [{ text: 'Catalogue', tone: 'pink' }]]}
          kicker={`${productCount} products · ${TOTAL_PAGES} pages · A4`}
          intro={<p>Every product with its grades, flavours and packing in one document. Download the PDF to share with your purchase team or forward on WhatsApp.</p>}
          actions={<>
            {pdf
              ? <a className="button primary" href={pdf.href} download>Download PDF <Icon name="download" /></a>
              : <PrintButton className="button primary">Download PDF <Icon name="download" /></PrintButton>}
            <PrintButton className="button yellow"><Icon name="printer" /> Print</PrintButton>
          </>}
          facts={[
            { icon: 'book', label: `${TOTAL_PAGES} pages` },
            { icon: 'package', label: `${productCount} products` },
            ...(pdf ? [{ icon: 'download' as const, label: `PDF · ${pdf.sizeLabel}` }] : []),
            { icon: 'clock', label: `Updated ${EDITION}` },
          ]} />
        <p className="pc-preview-label"><Icon name="book" /> Catalogue preview</p>
      </div>

      <div className="pc-doc">
        {/* 1. Cover */}
        <section id="pc-cover" className="pc-page pc-cover" aria-label="Page 1: Cover">
          <img className="pc-cover-logo" src={images.use(APP_CONFIG.logo.src, 560)} width={APP_CONFIG.logo.width} height={APP_CONFIG.logo.height} alt={APP_CONFIG.name} />
          <StickerHeading as="h2" id="pc-title" size="lg" align="start" rays={false} onDark kicker={APP_CONFIG.tagline}
            rows={[[{ text: 'Product', tone: 'lime' }], [{ text: 'Catalogue', tone: 'pink' }]]} />
          <p className="pc-cover-lead">Makhana, millet-based puffs and freeze-dried fruits for wholesale, private-label, corporate and export buyers.</p>
          <ul className="pc-cover-cats">
            {categories.map(category => {
              const count = products.filter(product => product.category === category.id).length;
              return (
                <li key={category.id} className={`pc-cover-cat is-${category.id}`}>
                  {category.image && <img src={images.use(category.image.src, 640, coverTile[category.id])} width={category.image.width} height={category.image.height} alt="" />}
                  <strong>{category.name}</strong>
                  <span>{count} {count === 1 ? 'product' : 'products'}</span>
                </li>
              );
            })}
          </ul>
          <ul className="pc-chips pc-cover-services" aria-label="Services">
            {APP_CONFIG.services.map(service => <li key={service}>{service}</li>)}
          </ul>
          <div className="pc-cover-foot">
            <p><strong>{APP_CONFIG.phone.display}</strong> · {APP_CONFIG.email}{publicSite && <> · {APP_CONFIG.siteUrl.replace(/^https?:\/\//, '')}</>}</p>
            <p>{APP_CONFIG.address.city}, {APP_CONFIG.address.country} · Edition {EDITION} · Product visuals are illustrative</p>
          </div>
        </section>

        {/* 2. About, why us and contents */}
        <Sheet id="pc-about" page={2} label="About us" className="pc-about">
          <div className="pc-about-grid">
            <div>
              <h2 className="pc-h2">About {APP_CONFIG.name}</h2>
              <p className="pc-lead">{APP_CONFIG.description}</p>
              <p>Over 4 years in the healthy snacking industry. Services: {APP_CONFIG.services.join(', ')}. Every pack is food grade and nitrogen flushed.</p>
              <ul className="pc-chips">
                <li className="is-hero"><Icon name="leaf" /> No palm oil</li>
                <li><Icon name="check" /> Nitrogen flushed</li>
                <li><Icon name="check" /> Food-grade packing</li>
              </ul>
            </div>
            <nav className="pc-contents" aria-label="Catalogue contents">
              <h2 className="pc-h3">Contents</h2>
              <ol>
                {categories.map(category => (
                  <li key={category.id}>
                    <strong>{category.name}</strong>
                    <ol>
                      {products.map((product, index) => product.category === category.id && (
                        <li key={product.id}><a href={`#pc-${product.id}`}><span>{product.name}</span><span>{FIRST_PRODUCT_PAGE + index}</span></a></li>
                      ))}
                    </ol>
                  </li>
                ))}
                <li><a href="#pc-packing"><strong>Packing options</strong><span>{PACKING_PAGE}</span></a></li>
                <li><a href="#pc-services"><strong>Services</strong><span>{SERVICES_PAGE}</span></a></li>
                <li><a href="#pc-contact"><strong>Registrations & contact</strong><span>{CONTACT_PAGE}</span></a></li>
              </ol>
            </nav>
          </div>

          <h2 className="pc-h3">Why choose us</h2>
          <ul className="pc-reasons">
            {reasons.map(reason => (
              <li key={reason.title} className={`tone-${reason.tone}`}>
                <Icon name={reason.icon} />
                <strong>{reason.title}</strong>
                <p>{reason.body}</p>
              </li>
            ))}
          </ul>

          <h2 className="pc-h3">How to order</h2>
          <ol className="pc-steps is-row">
            <li><strong>Choose</strong> products, grades or flavours, and a pack format from this catalogue.</li>
            <li><strong>Enquire</strong> by phone, WhatsApp or email with quantities and delivery location.</li>
            <li><strong>Get a quotation</strong> with minimum quantity, pack sizes and price.</li>
            <li><strong>Receive supply</strong> in food-grade, nitrogen-flushed packing.</li>
          </ol>
        </Sheet>

        {/* 3. One sheet per product */}
        {products.map((product, index) => {
          const category = categoryOf(product);
          const detail = productDetail(product);
          const theme = themeFor(product.id);
          const style = { '--pc-bg': theme.bg, '--pc-tile': theme.tile, '--pc-title': theme.title, '--pc-on-tile': theme.onTile } as CSSProperties;
          // Client photos exist for freeze-dried fruits and the puffs range; makhana only has a lifestyle image.
          const photo = product.category !== 'makhana' ? detail.photo : undefined;
          return (
            <Sheet key={product.id} id={`pc-${product.id}`} page={FIRST_PRODUCT_PAGE + index} label={category.name} className={`pc-product is-${product.category}`} style={style}>
              <div className="pc-product-top">
                <div className="pc-product-visuals">
                  <figure className="pc-product-tile">
                    {product.image && <img src={images.use(product.image.src, 640, PLAIN_TILE)} width={product.image.width} height={product.image.height} alt={product.image.alt} />}
                  </figure>
                  {photo && (
                    <figure className="pc-product-photo">
                      <img src={images.use(photo.src, 640, '#ffffff')} width={photo.width} height={photo.height} alt={photo.alt} />
                    </figure>
                  )}
                </div>
                <div className="pc-product-intro">
                  <p className="pc-product-cat">{category.name}</p>
                  <h2 className="pc-product-name">{product.name}</h2>
                  <p className="pc-product-sub">{detail.subtitle} · Price on request</p>
                  <ul className="pc-chips">{detail.badges.map(badge => <li key={badge}>{badge}</li>)}</ul>
                  {detail.description.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>

              {detail.grades && (
                <div className="pc-block">
                  <h3 className="pc-h3">Grades</h3>
                  <table className="pc-table">
                    <thead><tr><th scope="col">Grade</th><th scope="col">Kernel size</th><th scope="col">Approx. diameter</th><th scope="col">Best for</th></tr></thead>
                    <tbody>
                      {detail.grades.map(grade => (
                        <tr key={grade.id}><th scope="row">{grade.sutta} Sutta</th><td>{grade.grade}</td><td>{gradeSizeLabel(grade)}</td><td>{grade.use}</td></tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="pc-small">{makhanaGradeNote}</p>
                </div>
              )}

              {detail.flavours && (
                <div className="pc-block">
                  <h3 className="pc-h3">Flavours</h3>
                  <ul className="pc-flavours">
                    {detail.flavours.map(flavour => (
                      <li key={flavour.id}>
                        <span className="pc-flavour-dot" style={{ background: flavour.colour }} aria-hidden="true" />
                        <strong>{flavour.name}</strong>
                        <p>{flavour.taste}</p>
                      </li>
                    ))}
                  </ul>
                  {detail.flavourNote && <p className="pc-small">{detail.flavourNote}</p>}
                </div>
              )}

              {detail.freezeDried && (
                <div className="pc-block">
                  <h3 className="pc-h3">How freeze-drying works</h3>
                  <p>{freezeDryingIntro}</p>
                  <ol className="pc-process">
                    {freezeDryingSteps.map((step, stepIndex) => <li key={step.title}><span>{stepIndex + 1}</span><strong>{step.title}</strong> {step.text}</li>)}
                  </ol>
                </div>
              )}

              <div className="pc-product-facts">
                <div>
                  <h3 className="pc-h3">Packing</h3>
                  <ul className="pc-chips is-plain">{detail.packing.map(format => <li key={format}>{format}</li>)}</ul>
                  <p className="pc-small">All food-grade, nitrogen-flushed packing. Pack sizes are confirmed for each enquiry.</p>
                </div>
                <div>
                  <h3 className="pc-h3">Ordering</h3>
                  <ul className="pc-ticks">
                    <li><Icon name="check" /> Low MOQ, confirmed in your quotation</li>
                    <li><Icon name="check" /> Bulk, private-label, corporate and export</li>
                    <li><Icon name="check" /> Combine products from every category</li>
                  </ul>
                  {publicSite && <p className="pc-small">Details online: <a href={APP_CONFIG.absoluteUrl(`/products/${product.id}`)}>{APP_CONFIG.absoluteUrl(`/products/${product.id}`).replace(/^https?:\/\//, '')}</a></p>}
                </div>
              </div>
            </Sheet>
          );
        })}

        {/* Packing options */}
        <Sheet id="pc-packing" page={PACKING_PAGE} label="Packing options" className="pc-packing">
          <h2 className="pc-h2">Packing options</h2>
          <p className="pc-lead">Five pack formats for retail, gifting, food service and bulk. Every pack is nitrogen flushed and food grade.</p>
          <ul className="pc-chips">{packagingPromises.map(promise => <li key={promise}><Icon name="check" /> {promise}</li>)}</ul>
          <ul className="pc-packs">
            {packagingFormats.map(format => (
              <li key={format.id}>
                {existsSync(join(process.cwd(), 'public', format.image.src)) && <img src={format.image.src} alt={format.image.alt} />}
                <strong><Icon name={format.icon} /> {format.name}</strong>
                <p>{format.text}</p>
                <p className="pc-small"><b>Best for:</b> {format.bestFor}{format.note && <> · {format.note}</>}</p>
              </li>
            ))}
          </ul>
        </Sheet>

        {/* Services */}
        <Sheet id="pc-services" page={SERVICES_PAGE} label="Services" className="pc-services">
          <h2 className="pc-h2">Private labelling</h2>
          <p className="pc-lead">{privateLabel.intro}</p>
          <ul className="pc-offers">
            {privateLabel.offers.map(offer => <li key={offer.title}><strong>{offer.title}</strong><p>{offer.text}</p></li>)}
          </ul>
          <ol className="pc-steps is-row">
            {privateLabel.steps.map(step => <li key={step.title}><strong>{step.title}</strong> {step.text}</li>)}
          </ol>
          <h2 className="pc-h2">Corporate & bulk supply</h2>
          <ul className="pc-segments">
            {corporateSegments.map(segment => (
              <li key={segment.id}><strong><Icon name={segment.icon} /> {segment.title}</strong><p>{segment.text}</p></li>
            ))}
          </ul>
        </Sheet>

        {/* Registrations and contact */}
        <Sheet id="pc-contact" page={CONTACT_PAGE} label="Contact" className="pc-contact">
          <h2 className="pc-h2">Registrations</h2>
          <ul className="pc-certs">
            {certifications.map(cert => (
              <li key={cert.id}><img src={cert.logo} alt={cert.logoAlt} /><strong>{cert.shortName}</strong><span>{cert.name}</span></li>
            ))}
          </ul>
          <p className="pc-small">GSTIN {APP_CONFIG.gstin}. Certificate copies are shared on request.</p>

          <div className="pc-block">
            <h2 className="pc-h3">What to include in your enquiry</h2>
            <ul className="pc-ticks is-grid">
              <li><Icon name="check" /> Products, with grades or flavours</li>
              <li><Icon name="check" /> Estimated quantity per product</li>
              <li><Icon name="check" /> Preferred pack format</li>
              <li><Icon name="check" /> Bulk, private label, corporate or export</li>
              <li><Icon name="check" /> Delivery city or destination country</li>
              <li><Icon name="check" /> Your company name and contact</li>
            </ul>
          </div>

          <div className="pc-contact-card">
            <StickerHeading as="h2" size="md" align="start" rays={false} onDark kicker="Send us your product list for a quotation"
              rows={[[{ text: "Let's", tone: 'yellow' }, { text: 'talk', tone: 'lime' }]]} />
            <dl className="pc-contact-list">
              {founder && <><dt>Contact</dt><dd>{founder.name}, {founder.role}</dd></>}
              <dt>Phone & WhatsApp</dt><dd><a href={APP_CONFIG.telHref}>{APP_CONFIG.phone.display}</a></dd>
              <dt>Email</dt><dd><a href={APP_CONFIG.mailtoHref('Catalogue enquiry')}>{APP_CONFIG.email}</a></dd>
              {publicSite && <><dt>Website</dt><dd><a href={APP_CONFIG.siteUrl}>{APP_CONFIG.siteUrl.replace(/^https?:\/\//, '')}</a></dd></>}
              <dt>Office</dt><dd>{APP_CONFIG.addressOneLine}, {APP_CONFIG.address.region}, {APP_CONFIG.address.country}</dd>
            </dl>
          </div>
          <p className="pc-small pc-disclaimer">Product visuals are illustrative and may differ from supplied stock. Grades, flavours, pack formats, pack sizes, minimum quantities and prices are confirmed in each quotation. Edition {EDITION}.</p>
        </Sheet>
      </div>
      <script type="application/json" id="pc-images" dangerouslySetInnerHTML={{ __html: images.manifest() }} />
    </main>
  );
}
