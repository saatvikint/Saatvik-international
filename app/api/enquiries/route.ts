import { saveEnquiry } from '../../../lib/enquiry-store';
import type { EnquiryDetails } from '../../../lib/enquiry-store';
import { productIds } from '../../../content/catalogue';

export const runtime = 'nodejs';

const fieldLimits = { name: 100, email: 150, phone: 30, city: 100, message: 1000 };
const requestIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function json(body: unknown, status: number) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');
  const fetchSite = request.headers.get('Sec-Fetch-Site');
  const publicOrigin = process.env.ENQUIRY_PUBLIC_ORIGIN;
  // The browser's same-origin signal survives HTTPS proxies that rewrite the request URL.
  if (fetchSite !== 'same-origin' && origin && origin !== url.origin && origin !== publicOrigin) {
    return json({ error: 'Invalid request origin.' }, 403);
  }
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json({ error: 'Expected enquiry details.' }, 415);
  if (Number(request.headers.get('Content-Length')) > 8192) return json({ error: 'The enquiry is too long.' }, 413);

  let data: Record<string, unknown>;
  try {
    const body = await request.text();
    if (body.length > 8192) return json({ error: 'The enquiry is too long.' }, 413);
    data = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return json({ error: 'Could not read the enquiry.' }, 400);
  }
  if (typeof data?.id !== 'string' || !requestIdPattern.test(data.id)) {
    return json({ error: 'Invalid enquiry reference. Refresh and try again.' }, 400);
  }

  const details = {} as EnquiryDetails;
  for (const field of Object.keys(fieldLimits) as Array<keyof typeof fieldLimits>) {
    const limit = fieldLimits[field];
    const value = data[field];
    if (typeof value !== 'string' || value.trim().length > limit) {
      return json({ error: 'Please check the length of your details.' }, 400);
    }
    details[field] = value.trim();
  }
  if (!details.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
    return json({ error: 'Enter your name and a valid email address.' }, 400);
  }
  if (!data.items || typeof data.items !== 'object' || Array.isArray(data.items)) {
    return json({ error: 'Add at least one product to your enquiry.' }, 400);
  }

  const items = Object.entries(data.items as Record<string, unknown>);
  if (!items.length || items.some(([id, quantity]) => !productIds.has(id) || typeof quantity !== 'number' || !Number.isSafeInteger(quantity) || quantity < 1)) {
    return json({ error: 'Please check your enquiry quantities.' }, 400);
  }

  try {
    saveEnquiry(data.id, details, data.items);
    return json({ id: data.id }, 201);
  } catch {
    return json({ error: 'Your enquiry could not be saved right now. Please try again.' }, 503);
  }
}
