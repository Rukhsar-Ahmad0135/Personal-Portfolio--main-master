/**
 * Site-wide SEO / canonical configuration.
 * SITE_URL is the canonical production origin used in sitemap.xml,
 * robots.txt, JSON-LD @id fields, canonical links, and social preview URLs.
 * Update this once you publish to a custom domain — every canonical,
 * sitemap and structured-data URL derives from it, so nothing else
 * needs to change.
 */
export const SITE_URL = 'https://www.rukhsarahmad.dev';

export const SITE_NAME = 'Rukhsar Ahmad — Full-Stack Web Developer';

/** Default social sharing image (1200×630) served from /public/images. */
export const OG_IMAGE = '/images/og-image.jpg';

export const GSC_VERIFICATION = 'google19b06204af9d8cc5';
export const GA_MEASUREMENT_ID = 'G-ES76H25QS8';

export const DEFAULT_KEYWORDS =
  'Rukhsar Ahmad, MERN Stack Developer, Full Stack Web Developer, AI Web Developer, AI Integration Developer, Next.js Developer, React Developer, Node.js Developer, WordPress Developer, Shopify Developer, Webflow Developer, GoHighLevel Developer, E-commerce Development, Lahore';

export const absoluteUrl = (path = '/') => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${clean === '/' ? '' : clean}`;
};
