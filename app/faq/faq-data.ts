import type { IconName } from '../visuals';

export const faqCategories: { id: string; label: string; iconName: IconName }[] = [
  { id: 'all', label: 'All Questions', iconName: 'sparkle' },
  { id: 'corporate', label: 'Corporate & Bulk Gifting', iconName: 'building' },
  { id: 'quality', label: 'Quality & Nutrition', iconName: 'flame' },
  { id: 'shipping', label: 'Pan-India Shipping', iconName: 'truck' },
  { id: 'orders', label: 'Custom Branding & GST', iconName: 'receipt' },
];

export const allFaqs = [
  {
    id: 'moq-bulk',
    category: 'corporate',
    categoryLabel: 'Corporate Gifting',
    question: 'What is the Minimum Order Quantity (MOQ) for corporate and bulk orders?',
    answer: 'Our tiered bulk pricing starts at just 50 jars (Tier 1 – 15% discount). For custom-branded company logo sleeves, leadership gift notes, and bespoke packaging ribbons, our MOQ is 150 jars (Tier 2 – 25% discount). For large enterprise orders exceeding 500 jars, we offer up to 35% tiered discount with fully personalized co-branded boxes.',
    badge: 'Popular',
  },
  {
    id: 'free-tasting-box',
    category: 'corporate',
    categoryLabel: 'Corporate Gifting',
    question: 'Can our HR or admin team receive a complimentary tasting box before ordering?',
    answer: 'Yes, 100%! For all verified corporate and bulk enquiries above 100 jars, we courier a complimentary tasting box featuring all four signature flavours (Desi AF Masala, Sigma Chad Cheese, Goated Peri Peri, and No Cap Cream N’ Onion) directly to your office desk within 48 hours. No commitments or advance payments required.',
    badge: 'Free Perk',
  },
  {
    id: 'gst-invoices',
    category: 'orders',
    categoryLabel: 'Billing & GST',
    question: 'Do you provide official GST tax invoices for corporate input tax credit?',
    answer: 'Yes. Every corporate and bulk order is billed under an official B2B GST tax invoice containing your company’s legal entity name and GSTIN. This enables your finance department to claim 100% input tax credit (ITC) seamlessly.',
    badge: 'Tax Compliant',
  },
  {
    id: 'wfh-doorstep-drops',
    category: 'shipping',
    categoryLabel: 'Logistics',
    question: 'Can you deliver hampers individually to remote employees’ home addresses across India?',
    answer: 'Yes! We specialize in decentralized multi-location corporate logistics. Simply provide an Excel sheet with your team members’ home addresses and contact numbers. Our courier partners (BlueDart, Delhivery, DTDC) deliver directly to each employee’s doorstep with automated live SMS and WhatsApp tracking updates.',
    badge: 'WFH Ready',
  },
  {
    id: 'zero-palm-oil',
    category: 'quality',
    categoryLabel: 'Ingredients',
    question: 'Are Snack Munch makhana jars really 100% roasted with zero palm oil?',
    answer: 'Yes, absolutely. Unlike conventional commercial snacks that are deep-fried in low-grade palm oil, all Saatvik International fox nuts are 100% slow air-roasted. We use zero palm oil, zero trans fats, and zero artificial cholesterol. Only wholesome makhana, natural cold-pressed seasoning, and chef-crafted desi spices.',
    badge: 'Health Promise',
  },
  {
    id: 'shelf-life',
    category: 'quality',
    categoryLabel: 'Freshness',
    question: 'What is the shelf life and packaging freshness guarantee of the jars?',
    answer: 'Our makhana jars feature a guaranteed 9-month shelf life from the date of packaging. Each jar is nitrogen-flushed and hermetically induction-sealed before dispatch, locking in the crisp signature crunch and keeping moisture, humidity, and oxidization completely out.',
  },
  {
    id: 'custom-branding-options',
    category: 'orders',
    categoryLabel: 'Customization',
    question: 'What custom co-branding options are available for company hampers?',
    answer: 'We offer end-to-end co-branding: (1) Custom full-wrap jar sleeves with your company logo and brand colours; (2) Personalized CEO / Leadership greeting cards inside every hamper; (3) Luxury gold or matte-finish hamper gift boxes; and (4) Branded tissue paper wraps and satin ribbons.',
  },
  {
    id: 'turnaround-time',
    category: 'shipping',
    categoryLabel: 'Delivery Timelines',
    question: 'How fast can you dispatch corporate orders for upcoming events or summits?',
    answer: 'Standard bulk batches dispatch within 3 to 5 business days from quotation sign-off. For emergency events, leadership retreats, or last-minute Diwali gifting, we have an expedited 48-hour rush dispatch pipeline for select metros including Bengaluru, Mumbai, Delhi-NCR, Hyderabad, and Pune.',
  },
  {
    id: 'vegan-gluten-free',
    category: 'quality',
    categoryLabel: 'Dietary',
    question: 'Are your flavours vegan and gluten-free?',
    answer: 'All four flavours are naturally 100% gluten-free and plant-based. Desi AF Masala and Goated Peri Peri are 100% vegan friendly. Sigma Chad Cheese and No Cap Cream N’ Onion contain wholesome vegetarian dairy milk solids.',
  },
  {
    id: 'sourcing-origin',
    category: 'quality',
    categoryLabel: 'Sourcing',
    question: 'Where do you source your makhana (fox nuts)?',
    answer: 'Our fox nuts (Euryale ferox) are sustainably handpicked by generational farming communities in the wetland ponds of North Bihar, which produces over 85% of the world’s premium makhana. We sort only Grade-A jumbo-sized seeds for even roasting and maximum crispiness.',
  },
  {
    id: 'flavour-mixing-bulk',
    category: 'corporate',
    categoryLabel: 'Custom Mix',
    question: 'Can we customize the flavour split inside our bulk order?',
    answer: 'Yes! You have complete freedom to choose the ratio of flavours. Whether your team wants all spicy Goated Peri Peri, a 50/50 mix of Masala and Cheese, or equal quarters across all 4 flavours, we pack your crates exactly to your specifications.',
  },
  {
    id: 'payment-terms',
    category: 'orders',
    categoryLabel: 'Payment Terms',
    question: 'What payment modes and credit terms do you offer for corporate procurement?',
    answer: 'We accept corporate credit/debit cards, direct NEFT/RTGS bank transfers, and verified UPI. For registered enterprise clients and recurring pantry replenishment contracts, we offer Net-15 and Net-30 payment terms backed by formal Purchase Orders (POs).',
  },
  {
    id: 'office-pantry-subscription',
    category: 'corporate',
    categoryLabel: 'Pantry Stash',
    question: 'Do you offer recurring monthly subscriptions for office snack pantries?',
    answer: 'Yes! Many tech studios and startup hubs subscribe to our monthly pantry replenishment cartons. You set your team’s headcount and preferred flavour split, and we deliver fresh cartons on the 1st of every month at wholesale factory rates with priority dispatch.',
  },
  {
    id: 'transit-damage-policy',
    category: 'shipping',
    categoryLabel: 'Guarantees',
    question: 'What happens if any jars are damaged during transit?',
    answer: 'We pack every order in heavy-duty 5-ply corrugated export cartons with internal honeycomb partitions. In the rare event of transit damage or seal breakage, simply send a photo on WhatsApp, and our team dispatches free instant replacements within 24 hours — zero hassle.',
    badge: '100% Guarantee',
  },
];

export type FaqItemData = typeof allFaqs[number];
