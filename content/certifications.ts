export interface Certification {
  id: 'gst' | 'msme' | 'iec' | 'apeda' | 'fssai' | 'startup-india';
  shortName: string;
  name: string;
  authority: string;
  logo: string;
  logoAlt: string;
  officialUrl: string;
  assetSourceUrl: string;
}

/**
 * Registrations confirmed by the client on 2026-11-16.
 * Logo files are unmodified downloads from the linked government authority sources.
 * Registration numbers are not published until the client supplies the certificate copies.
 */
export const certifications: readonly Certification[] = [
  {
    id: 'gst',
    shortName: 'GST',
    name: 'Goods and Services Tax',
    authority: 'Goods and Services Tax Network',
    logo: '/assets/certifications/gst.png',
    logoAlt: 'Official Goods and Services Tax logo',
    officialUrl: 'https://www.gst.gov.in/',
    assetSourceUrl: 'https://cdn-prod-dgft.s3.ap-south-1.amazonaws.com/DGFT_Images/mini-slider/gst-partner.png',
  },
  {
    id: 'msme',
    shortName: 'MSME',
    name: 'MSME / Udyam Registration',
    authority: 'Ministry of Micro, Small & Medium Enterprises',
    logo: '/assets/certifications/msme.png',
    logoAlt: 'Official Ministry of Micro, Small and Medium Enterprises logo',
    officialUrl: 'https://udyamregistration.gov.in/',
    assetSourceUrl: 'https://udyamregistration.gov.in/assets/img/msmelogo.png',
  },
  {
    id: 'iec',
    shortName: 'IEC',
    name: 'Importer Exporter Code',
    authority: 'Directorate General of Foreign Trade',
    logo: '/assets/certifications/iec-dgft.png',
    logoAlt: 'Government of India emblem used by the Directorate General of Foreign Trade',
    officialUrl: 'https://www.dgft.gov.in/CP/',
    assetSourceUrl: 'https://www.dgft.gov.in/CP/images/img/emblem.png',
  },
  {
    id: 'apeda',
    shortName: 'APEDA',
    name: 'APEDA Registration',
    authority: 'Agricultural and Processed Food Products Export Development Authority',
    logo: '/assets/certifications/apeda.png',
    logoAlt: 'Official APEDA logo',
    officialUrl: 'https://apeda.gov.in/',
    assetSourceUrl: 'https://apeda.gov.in/themes/custom/apedals/assets/images/logo.png',
  },
  {
    id: 'fssai',
    shortName: 'FSSAI',
    name: 'Food Business Registration',
    authority: 'Food Safety and Standards Authority of India',
    logo: '/assets/certifications/fssai.png',
    logoAlt: 'Official FSSAI logo',
    officialUrl: 'https://fssai.gov.in/',
    assetSourceUrl: 'https://fssai.gov.in/images/fssai-logo-footer.png',
  },
  {
    id: 'startup-india',
    shortName: 'Startup India',
    name: 'Startup India Recognition',
    authority: 'Department for Promotion of Industry and Internal Trade',
    logo: '/assets/certifications/startup-india.png',
    logoAlt: 'Official Startup India logo',
    officialUrl: 'https://www.startupindia.gov.in/',
    assetSourceUrl: 'https://www.startupindia.gov.in/content/dam/invest-india/newhomepage/Logo1.png',
  },
] as const;
