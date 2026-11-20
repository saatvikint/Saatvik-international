import type { IconName } from '../visuals';

export const faqCategories: { id: string; label: string; iconName: IconName }[] = [
  { id: 'all', label: 'All Questions', iconName: 'sparkle' },
  { id: 'products', label: 'Products', iconName: 'package' },
  { id: 'orders', label: 'Enquiries & Quotes', iconName: 'receipt' },
  { id: 'supply', label: 'B2B Supply', iconName: 'building' },
  { id: 'export', label: 'Export', iconName: 'globe' },
];

export const allFaqs = [
  { id: 'who-we-supply', category: 'supply', categoryLabel: 'B2B Supply', question: 'Who do you supply?', answer: 'We handle enquiries from distributors, wholesalers, retailers, supermarket chains, food brands, corporate buyers, HORECA, institutional buyers and importers. This website does not sell individual retail packs.', badge: 'B2B' },
  { id: 'product-range', category: 'products', categoryLabel: 'Products', question: 'Which products can I enquire about?', answer: 'The current range includes raw, roasted and flavoured makhana; millet-based jowar, chickpea and quinoa puffs in 11 flavours; and freeze-dried black jamun, strawberry, banana, mango and pineapple.', badge: 'Product Range' },
  { id: 'request-quote', category: 'orders', categoryLabel: 'Quotations', question: 'How do I request a quotation?', answer: 'Use the Get a Quote button and share the products, estimated quantity, company details and destination. Our team will review the requirement and respond with the applicable information.', badge: 'Get a Quote' },
  { id: 'moq-bulk', category: 'orders', categoryLabel: 'Order Quantity', question: 'What is the minimum order quantity?', answer: 'Minimum quantities have not been published because they can vary by product and requirement. Share the product and expected volume in your enquiry so the team can confirm the applicable quantity.' },
  { id: 'private-label', category: 'supply', categoryLabel: 'Private Labelling', question: 'Do you accept private-labelling enquiries?', answer: 'Yes. Private labelling is one of the business services offered. Share your company, product and quantity requirements, and the available scope will be confirmed for that enquiry.' },
  { id: 'gst-registration', category: 'orders', categoryLabel: 'Business Details', question: 'Is Saatvik International GST registered?', answer: 'Yes. Saatvik International is GST registered under GSTIN 27AFCFS6285E1ZR.', badge: 'Confirmed' },
  { id: 'export-enquiry', category: 'export', categoryLabel: 'Export', question: 'Can international buyers send an enquiry?', answer: 'Yes. International buyers and importers can use the Export Query page. Include the destination country, products, quantities and procurement-document requirements for review.' },
  { id: 'certificates', category: 'export', categoryLabel: 'Documents', question: 'Which certificates and documents are available?', answer: 'The client has confirmed GST, MSME, IEC, APEDA, FSSAI and Startup India registrations. The GSTIN is published on the website; registration numbers and copies for the other documents are shared after verification for the relevant enquiry.' },
];

export type FaqItemData = typeof allFaqs[number];
