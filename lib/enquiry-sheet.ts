// Sends each enquiry to the client's Google Sheet through a Google Apps Script web app
// (scripts/google-sheet-enquiries.gs, deployed from the sheet). Setup: .agent/developer/enquiry-flow.md.
//
// Env:
//   ENQUIRY_SHEET_WEBHOOK_URL  the web app URL ending in /exec
//   ENQUIRY_SHEET_SECRET       shared secret, must equal SECRET in the Apps Script
// When the URL is not set the sheet step is skipped (the SQLite copy is still written).

export interface SheetEnquiry {
  /** Reference shown to the buyer, e.g. STVK-AB12CD. */
  id: string;
  /** Which form: "Trade enquiry", "Contact page", "Product quote request", "Enquiry list". */
  form: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  products: string;
  volume: string;
  message: string;
  /** Page the form was sent from (Referer), for context. */
  page: string;
}

export const sheetConfigured = () => Boolean(process.env.ENQUIRY_SHEET_WEBHOOK_URL);

/** Returns true when the sheet accepted the row. Never throws. */
export async function sendToSheet(row: SheetEnquiry): Promise<boolean> {
  const url = process.env.ENQUIRY_SHEET_WEBHOOK_URL;
  if (!url) return false;
  try {
    // Apps Script answers POST with a redirect to the result; fetch follows it (as GET), which is expected.
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ secret: process.env.ENQUIRY_SHEET_SECRET ?? '', ...row }),
      redirect: 'follow',
      signal: AbortSignal.timeout(10_000),
      cache: 'no-store',
    });
    const text = await response.text();
    let result: { ok?: boolean; error?: string } = {};
    try { result = JSON.parse(text); } catch { /* HTML error page */ }
    if (!response.ok || !result.ok) {
      console.error('Enquiry sheet rejected the row:', response.status, result.error ?? text.slice(0, 200));
      return false;
    }
    return true;
  } catch (error) {
    console.error('Enquiry sheet unreachable:', error);
    return false;
  }
}

/** Trims and caps a value for the sheet. */
export const cell = (value: unknown, max = 1000): string => (typeof value === 'string' ? value.trim().slice(0, max) : '');
