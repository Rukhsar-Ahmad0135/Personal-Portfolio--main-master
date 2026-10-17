import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { photographerInfo } from '@/data/photographer';
import { SITE_URL, DEFAULT_KEYWORDS, OG_IMAGE } from '@/lib/siteConfig';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  keywords?: string;
  noIndex?: boolean;
  /** JSON-LD structured data object(s) to inject for this route */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Article/blog-specific fields for rich results */
  article?: {
    headline: string;
    datePublished: string;
    dateModified?: string;
    authorName?: string;
    authorUrl?: string;
  };
  faqs?: Array<{ q: string; a: string }>;
}

const JSONLD_ATTR = 'data-seo-jsonld';

function absoluteImage(image: string | undefined, fallback: string): string {
  if (!image) return fallback;
  return image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;
}

export function SEOHead({
  title,
  description,
  image = OG_IMAGE,
  type = 'website',
  keywords,
  noIndex = false,
  jsonLd,
  article,
  faqs,
}: SEOHeadProps) {
  const location = useLocation();

  const fullTitle = title
    ? title.includes(photographerInfo.name)
      ? title
      : `${title} | ${photographerInfo.name}`
    : `${photographerInfo.name} — ${photographerInfo.tagline}`;
  const fullDescription = description || photographerInfo.heroIntroduction;
  const path = location.pathname;
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;
  const absoluteImageUrl = absoluteImage(image, `${SITE_URL}/favicon.png`);

  const faqSchema = faqs && faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url: canonical,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonical,
        },
        headline: article.headline,
        description: fullDescription,
        image: absoluteImageUrl,
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        author: {
          '@type': 'Person',
          name: article.authorName || photographerInfo.name,
          url: article.authorUrl || `${SITE_URL}/about`,
          sameAs: Object.values(photographerInfo.socialLinks).filter(Boolean),
        },
        publisher: {
          '@type': 'Person',
          name: photographerInfo.name,
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: absoluteImage(OG_IMAGE, `${SITE_URL}/favicon.png`),
          },
        },
        wordCount: 0,
      }
    : null;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string, extraAttrs?: Record<string, string>) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
      if (extraAttrs) {
        Object.entries(extraAttrs).forEach(([k, v]) => el.setAttribute(k, v));
      }
    };

    const setMetaIndexed = (name: string, content: string) => {
      const indexed = `${content} | ${fullTitle} by ${photographerInfo.name}, a ${photographerInfo.tagline} based in ${photographerInfo.location}.`;
      setMeta(name, indexed);
    };

    setMeta('description', fullDescription);
    setMetaIndexed('keywords', keywords || DEFAULT_KEYWORDS);
    setMeta('author', photographerInfo.name);
    setMeta('robots', noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large');

    setMeta('og:title', fullTitle, true);
    setMeta('og:description', fullDescription, true);
    setMeta('og:type', type, true);
    setMeta('og:url', canonical, true);
    setMeta('og:image', absoluteImageUrl, true);
    setMeta('og:site_name', photographerInfo.name, true);
    setMeta('og:locale', 'en_US', true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', fullDescription);
    setMeta('twitter:image', absoluteImageUrl);

    setLink('canonical', canonical);
    setLink('manifest', '/manifest.webmanifest');

    // Replace previous route-level JSON-LD blocks
    document.querySelectorAll(`script[${JSONLD_ATTR}]`).forEach((n) => n.remove());

    const schemas: Record<string, unknown>[] = [];
    if (faqSchema) schemas.push(faqSchema);
    if (articleSchema) schemas.push(articleSchema);
    if (jsonLd) {
      const arr = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.push(...arr);
    }

    schemas.forEach((data) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute(JSONLD_ATTR, 'true');
      s.text = JSON.stringify(data, null, 2);
      document.head.appendChild(s);
    });
  }, [fullTitle, fullDescription, canonical, absoluteImageUrl, type, keywords, noIndex, jsonLd, article, faqs]);

  return null;
}
