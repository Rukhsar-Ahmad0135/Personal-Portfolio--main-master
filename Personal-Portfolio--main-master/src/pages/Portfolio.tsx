import { projects } from '@/data/projects';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SITE_URL, absoluteUrl } from '@/lib/siteConfig';

export default function Portfolio() {
  return (
    <>
      <SEOHead
        title="Portfolio — MERN & AI Case Studies"
        description="Selected projects — AI-powered web apps, MERN builds, and interactive interfaces crafted by Rukhsar Ahmad."
        faqs={[
          {
            q: "What projects are in Rukhsar Ahmad's portfolio?",
            a: "Her portfolio includes ZYRA (AI-powered MERN e-commerce with Gemini API recommendations), Craft PC (full-stack e-commerce with compatibility-validating PC builder), EcoBazar (grocery storefront), Furniro (furniture showcase), StudySync (education platform), Logistic (transport tracking), Food Hut (restaurant site), Clothing IO (fashion storefront), and an IT services agency site.",
          },
          {
            q: 'Does Rukhsar Ahmad have AI-powered project examples?',
            a: 'Yes — ZYRA features an AI Fashion Stylist using Gemini API and Pinecone vector search, grounded in the real product catalog. The blog covers the AI integration architecture in detail.',
          },
          {
            q: 'Can I see live demos of the portfolio projects?',
            a: 'Several projects have live demos linked from their case study pages. Source code is available on GitHub for projects that include a repository link.',
          },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${SITE_URL}/portfolio` },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            url: `${SITE_URL}/portfolio`,
            name: 'Portfolio — Rukhsar Ahmad',
            hasPart: projects.map((p) => ({
              '@type': 'CreativeWork',
              name: p.title,
              url: `${SITE_URL}/project/${p.slug}`,
              image: absoluteUrl(p.coverImage),
              dateCreated: p.year,
              genre: p.category,
            })),
          },
        ]}
      />

      <div className="bg-[#f4f4f2] text-black selection:bg-black selection:text-white">
        {/* HERO */}
        <section className="relative min-h-[80vh] px-5 sm:px-6 lg:px-10 pt-28 sm:pt-32 md:pt-40 pb-14 sm:pb-16 md:pb-24 border-b border-black/10 overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xl md:text-3xl font-light text-black/70"
          >
            <span className="mr-2">✦</span> Selected <span className="italic">work</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[18vw] md:text-[13vw] font-light tracking-[-0.05em] leading-[0.85]"
          >
            PORTFOLIO
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="mt-2 text-[10vw] md:text-[5vw] italic font-light tracking-[-0.04em] leading-[0.9] text-black/70"
          >
            things I&apos;ve shipped
          </motion.h2>

          <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-6 text-sm md:text-base font-light">
            <div>
              <p className="text-black/50">Focus</p>
              <p className="text-black">Web · AI · MERN</p>
            </div>
            <div>
              <p className="text-black/50">Projects</p>
              <p className="text-black">{projects.length} case studies</p>
            </div>
            <div>
              <p className="text-black/50 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Status
              </p>
              <p className="text-black">Available for new work</p>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="px-2 md:px-4 py-16 md:py-24 border-b border-black/10">
          <PortfolioGrid projects={projects} />
        </section>

        {/* CTA */}
        <section className="px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <h2 className="text-[12vw] md:text-[8vw] font-light tracking-[-0.04em] leading-[0.85] max-w-4xl">
              Got a project? <span className="italic text-black/70">Let&apos;s talk.</span>
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-black text-white text-sm md:text-base font-light hover:bg-black/80 transition-colors shrink-0"
            >
              Start a project <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
