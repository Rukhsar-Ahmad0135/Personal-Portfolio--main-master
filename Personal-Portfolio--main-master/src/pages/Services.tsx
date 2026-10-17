import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';
import { SEOHead } from '@/components/seo/SEOHead';
import { SITE_URL } from '@/lib/siteConfig';

export default function Services() {
  return (
    <>
      <SEOHead
        title="Web Development Services | MERN, Next.js, WordPress & Shopify — Rukhsar Ahmad"
        description="Web development services by Rukhsar Ahmad — MERN stack development, Next.js, AI integration, WordPress, Shopify, Webflow, GoHighLevel and UI/UX design. Real projects, honest process, remote-friendly."
        faqs={[
          {
            q: 'What services does Rukhsar Ahmad offer?',
            a: 'She offers MERN stack development, Next.js development, AI integration (Gemini/OpenAI APIs), WordPress development, Shopify development, Webflow development, GoHighLevel development, and UI/UX design services — all grounded in real shipped projects.',
          },
          {
            q: 'Can Rukhsar Ahmad build an AI-powered e-commerce site?',
            a: 'Yes — her ZYRA project demonstrates a MERN e-commerce platform with an AI Fashion Stylist using Gemini API and Pinecone vector search, grounded in the real product catalog.',
          },
          {
            q: 'Does she handle both design and development?',
            a: 'Yes, Rukhsar designs in Figma and builds in React, keeping the implementation cost realistic from the start and eliminating design-to-code handoff loss.',
          },
          {
            q: 'Is she available for remote work?',
            a: 'She is based in Lahore, Pakistan and works remotely with clients worldwide for freelance, contract, and full-time engagements.',
          },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            url: `${SITE_URL}/services`,
            name: 'Web Development Services — Rukhsar Ahmad',
            hasPart: services.map((s) => ({
              '@type': 'Service',
              name: s.name,
              url: `${SITE_URL}/services/${s.slug}`,
              description: s.description,
              provider: { '@id': `${SITE_URL}/#person` },
              areaServed: 'Worldwide',
            })),
          },
        ]}
      />

      <div className="bg-[#f4f4f2] text-black selection:bg-black selection:text-white">
        {/* HERO */}
        <section className="relative min-h-[60vh] px-5 sm:px-6 lg:px-10 pt-28 sm:pt-32 md:pt-40 pb-14 sm:pb-16 md:pb-24 border-b border-black/10 overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xl md:text-3xl font-light text-black/70"
          >
            <span className="mr-2">⚙</span> How I can <span className="italic">help</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[16vw] md:text-[12vw] font-light tracking-[-0.05em] leading-[0.85]"
          >
            SERVICES
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="mt-2 text-[8vw] md:text-[4vw] italic font-light tracking-[-0.04em] leading-[0.9] text-black/70"
          >
            built &amp; shipped, not just promised
          </motion.h2>

          <p className="mt-8 max-w-2xl text-base md:text-lg font-light text-black/60 leading-relaxed">
            I build full-stack web applications, e-commerce websites, AI-powered web
            experiences, business websites and custom digital products — using the
            MERN stack, Next.js, WordPress, Shopify, Webflow, GoHighLevel, Figma and
            AI APIs. Every service below links to real work.
          </p>
        </section>

        {/* SERVICE LIST */}
        <section className="px-5 sm:px-6 lg:px-10 py-16 md:py-24 border-b border-black/10">
          <div className="max-w-4xl mx-auto">
            {services.map((service, i) => (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-black/10 py-10 md:py-12"
              >
                <Link to={`/services/${service.slug}`} className="group block">
                  <span className="text-xs font-light text-black/40 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-2 text-2xl md:text-4xl font-light tracking-tight leading-tight group-hover:text-black/70 transition-colors">
                    {service.headline}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm md:text-base font-light text-black/60 leading-relaxed">
                    {service.intro[0]}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-2">
                      {service.stack.slice(0, 5).map((t) => (
                        <li
                          key={t}
                          className="text-xs font-light text-black/70 border border-black/15 rounded-full px-3 py-1"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1.5 text-sm font-light text-black">
                      View service
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <h2 className="text-[12vw] md:text-[8vw] font-light tracking-[-0.04em] leading-[0.85] max-w-4xl">
              Not sure which fits? <span className="italic text-black/70">Let&apos;s talk.</span>
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-black text-white text-sm md:text-base font-light hover:bg-black/80 transition-colors shrink-0"
            >
              Get in touch <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
