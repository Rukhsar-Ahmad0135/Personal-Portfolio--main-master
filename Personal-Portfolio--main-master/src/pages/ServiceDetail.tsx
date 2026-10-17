import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { getServiceBySlug } from '@/data/services';
import { SEOHead } from '@/components/seo/SEOHead';
import { SITE_URL } from '@/lib/siteConfig';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) return <Navigate to="/404" replace />;

  return (
    <>
      <SEOHead
        title={service.seoTitle}
        description={service.description}
        keywords={[...service.stack, 'Rukhsar Ahmad'].join(', ')}
        faqs={service.faqs}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
              { '@type': 'ListItem', position: 3, name: service.name, item: `${SITE_URL}/services/${service.slug}` },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `${service.name} — Rukhsar Ahmad`,
            description: service.description,
            url: `${SITE_URL}/services/${service.slug}`,
            serviceType: service.name,
            provider: {
              '@type': 'Person',
              '@id': `${SITE_URL}/#person`,
              name: 'Rukhsar Ahmad',
              jobTitle: 'Full-Stack Web Developer',
            },
            areaServed: 'Worldwide',
          },
        ]}
      />

      <div className="bg-[#f4f4f2] text-black selection:bg-black selection:text-white">
        {/* HEADER */}
        <section className="px-5 sm:px-6 lg:px-10 pt-28 sm:pt-32 md:pt-36 pb-12 border-b border-black/10">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-light text-black/50"
          >
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span aria-hidden>/</span>
            <Link to="/services" className="hover:text-black transition-colors">Services</Link>
            <span aria-hidden>/</span>
            <span className="text-black/70">{service.name}</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-4xl text-3xl sm:text-4xl md:text-6xl font-light tracking-[-0.03em] leading-[1.05]"
          >
            {service.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 max-w-2xl text-sm md:text-base font-light text-black/50"
          >
            Rukhsar Ahmad — Full-Stack Web Developer · MERN · Next.js · AI Integration
          </motion.p>
        </section>

        {/* INTRO + INCLUDED */}
        <section className="px-5 sm:px-6 lg:px-10 py-12 md:py-16 border-b border-black/10">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-5">
              {service.intro.map((p) => (
                <p key={p.slice(0, 32)} className="text-base md:text-lg font-light text-black/70 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <div>
              <p className="text-xs font-light tracking-[0.25em] uppercase text-black/40 mb-5">What&apos;s included</p>
              <ul className="space-y-3">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm md:text-base font-light leading-relaxed text-black/70">
                    <Check className="mt-1 size-4 shrink-0 text-emerald-600" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs font-light tracking-[0.25em] uppercase text-black/40 mt-8 mb-4">Stack</p>
              <ul className="flex flex-wrap gap-2">
                {service.stack.map((t) => (
                  <li key={t} className="text-xs font-light text-black/70 border border-black/15 rounded-full px-3 py-1">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="px-5 sm:px-6 lg:px-10 py-12 md:py-16 border-b border-black/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-10">How I work</h2>
            <ol className="space-y-8">
              {service.process.map((p, i) => (
                <li key={p.step} className="flex items-start gap-6">
                  <span className="text-sm md:text-base font-light text-black/40 tabular-nums w-10 shrink-0 pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg md:text-xl font-light tracking-tight">{p.step}</h3>
                    <p className="mt-2 text-sm md:text-base font-light text-black/60 leading-relaxed">{p.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* RELATED WORK & WRITING */}
        <section className="px-5 sm:px-6 lg:px-10 py-12 md:py-16 border-b border-black/10">
          <div className="max-w-4xl mx-auto space-y-10">
            <div>
              <p className="text-xs font-light tracking-[0.25em] uppercase text-black/40 mb-5">Real work in this area</p>
              <div className="flex flex-wrap gap-3">
                {service.relatedProjects.map((r) => (
                  <Link
                    key={r.href}
                    to={r.href}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 text-sm font-light hover:bg-black hover:text-white transition"
                  >
                    {r.label} <ArrowUpRight className="size-3.5" />
                  </Link>
                ))}
              </div>
            </div>
            {service.relatedPosts && (
              <div>
                <p className="text-xs font-light tracking-[0.25em] uppercase text-black/40 mb-5">On the blog</p>
                <div className="flex flex-wrap gap-3">
                  {service.relatedPosts.map((r) => (
                    <Link
                      key={r.href}
                      to={r.href}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 text-sm font-light hover:bg-black hover:text-white transition"
                    >
                      {r.label} <ArrowUpRight className="size-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 sm:px-6 lg:px-10 py-12 md:py-16 border-b border-black/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-8">Common questions</h2>
            <div>
              {service.faqs.map((f) => (
                <details key={f.q} className="group border-b border-black/10 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base md:text-lg font-light tracking-tight text-black [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden
                      className="shrink-0 text-2xl font-light text-black/40 transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 pr-10 text-sm md:text-base font-light leading-relaxed text-black/60">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + back */}
        <section className="px-5 sm:px-6 lg:px-10 py-14 md:py-20">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-light text-black/60 hover:text-black transition-colors"
            >
              <ArrowLeft className="size-4" /> All services
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-black text-white text-sm md:text-base font-light hover:bg-black/80 transition-colors"
            >
              Start a project <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
