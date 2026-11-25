import { saveEnquiry } from '../../../lib/enquiry-store';
import { cell, sendToSheet, sheetConfigured } from '../../../lib/enquiry-sheet';

export const runtime = 'nodejs';

interface CorporateEnquiryRequest {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  city?: string;
  quantity?: string;
  occasion?: string;
  customBranding?: boolean;
  deliveryDate?: string;
  flavours?: string[];
  message?: string;
  id?: string;
}

function json(body: unknown, status: number) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  try {
    const data = await request.json() as CorporateEnquiryRequest;
    const {
      name,
      company,
      email,
      phone,
      city,
      quantity,
      occasion,
      customBranding,
      deliveryDate,
      flavours,
      message,
      id,
    } = data;

    if (!name || !email || !company || !id) {
      return json({ error: 'Please enter your name, company name, and work email.' }, 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Please enter a valid work email address.' }, 400);
    }

    const corporatePayload = {
      type: 'corporate_enquiry',
      company: company.trim(),
      quantity: quantity || '100-250',
      occasion: occasion || 'B2B Supply Enquiry',
      customBranding: Boolean(customBranding),
      deliveryDate: deliveryDate || 'Flexible',
      selectedProducts: Array.isArray(flavours) ? flavours.filter(item => typeof item === 'string').slice(0, 20) : [],
      notes: message ? message.trim() : '',
    };

    const details = {
      name: `${name.trim()} (${company.trim()})`,
      email: email.trim(),
      phone: phone ? phone.trim() : 'N/A',
      city: city ? city.trim() : 'N/A',
      message: `[CORPORATE ENQUIRY - ${quantity} jars for ${occasion}] ${message || 'Requesting corporate quotation and sample kit.'}`,
    };

    // Google Sheet first (the client's inbox), local SQLite as a backup. Fail only if both fail.
    const sheetOk = await sendToSheet({
      id: cell(id, 40),
      form: cell(occasion, 120) || 'Enquiry',
      name: cell(name, 100),
      company: cell(company, 150),
      email: cell(email, 150),
      phone: cell(phone, 30),
      location: cell(city, 100),
      products: corporatePayload.selectedProducts.join(', ').slice(0, 500),
      volume: cell(quantity, 120),
      message: cell(message, 1000),
      page: cell(request.headers.get('Referer'), 300),
    });
    let storeOk = false;
    try {
      saveEnquiry(id, details, corporatePayload);
      storeOk = true;
    } catch (error) {
      console.error('Enquiry backup store failed:', error);
    }
    if (!sheetOk && !storeOk) {
      return json({ error: 'Your enquiry could not be sent right now. Please call or email us.' }, 503);
    }
    if (sheetConfigured() && !sheetOk) console.error(`Enquiry ${id} saved locally only: the Google Sheet did not accept it.`);

    return json({ success: true, id, company: company.trim() }, 201);
  } catch (error) {
    console.error('Corporate enquiry error:', error);
    return json({ error: 'Could not process corporate enquiry. Please try again.' }, 500);
  }
}

