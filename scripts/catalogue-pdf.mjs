// Builds the downloadable product catalogue PDF from the /product-catalogue page, using a local
// Chrome or Edge in headless mode (no extra npm packages).
//
//   1. Start the site with `npm run dev`. (A production build only sees new image copies after a
//      rebuild, so with `npm run start` run this script twice with a rebuild in between.)
//   2. Run: `npm run catalogue:pdf`
//
// Output: public/downloads/saatvik-international-product-catalogue.pdf (commit it with the content change).
// Options (environment variables):
//   CATALOGUE_URL  page to print, default http://localhost:3000/product-catalogue
//   CHROME_PATH    path to chrome / msedge / chromium if it is not found automatically

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'public', 'downloads', 'saatvik-international-product-catalogue.pdf');
const url = process.env.CATALOGUE_URL ?? 'http://localhost:3000/product-catalogue';

const candidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe'),
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

const browser = candidates.find(path => existsSync(path));
if (!browser) {
  console.error('No Chrome, Edge or Chromium found. Set CHROME_PATH to the browser executable.');
  process.exit(1);
}

// Fail early with a clear message if the site is not running.
let html = '';
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  html = await response.text();
} catch (error) {
  console.error(`Cannot open ${url} (${error.message}). Start the site first with \`npm run dev\` or \`npm run start\`.`);
  process.exit(1);
}

// Small image copies keep the PDF light: Chrome embeds PNGs losslessly but passes JPEGs through.
// The page lists what it needs in #pc-images; sharp ships with Next.js.
const manifest = html.match(/<script type="application\/json" id="pc-images">([\s\S]*?)<\/script>/);
const copies = manifest ? JSON.parse(manifest[1]) : [];
let sharp = null;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('sharp is not installed: the PDF will use full-size images and be much larger.');
}
if (sharp && copies.length) {
  for (const copy of copies) {
    const input = join(root, 'public', copy.src);
    const out = join(root, 'public', copy.out);
    mkdirSync(dirname(out), { recursive: true });
    let image = sharp(input).resize({ width: copy.width, height: copy.width, fit: 'inside', withoutEnlargement: true });
    image = copy.background
      ? image.flatten({ background: copy.background }).jpeg({ quality: 82, mozjpeg: true })
      : image.png({ compressionLevel: 9, palette: true });
    await image.toFile(out);
  }
  console.log(`Prepared ${copies.length} catalogue images in public/assets/catalogue/`);
}

mkdirSync(dirname(output), { recursive: true });
// A throwaway profile, so this works while your normal browser is open.
const profile = mkdtempSync(join(tmpdir(), 'catalogue-pdf-'));
try {
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profile}`,
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=20000',
    `--print-to-pdf=${output}`,
    url,
  ], { stdio: 'inherit', timeout: 120_000 });
} finally {
  rmSync(profile, { recursive: true, force: true });
}

if (!existsSync(output)) {
  console.error('The browser finished without writing a PDF.');
  process.exit(1);
}
const kb = Math.round(statSync(output).size / 1024);
console.log(`Catalogue PDF written: ${output} (${kb} KB)`);
