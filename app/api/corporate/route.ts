import { saveEnquiry } from '../../../lib/enquiry-store';

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
      occasion: occasion || 'Corporate Gifting',
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

    saveEnquiry(id, details, corporatePayload);

    return json({ success: true, id, company: company.trim() }, 201);
  } catch (error) {
    console.error('Corporate enquiry error:', error);
    return json({ error: 'Could not process corporate enquiry. Please try again.' }, 500);
  }
}

