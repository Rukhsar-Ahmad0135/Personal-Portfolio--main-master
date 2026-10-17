import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { photographerInfo } from '@/data/photographer';
import { SEOHead } from '@/components/seo/SEOHead';
import { SpotlightNegative } from '@/components/effects/SpotlightNegative';
import { SITE_URL, absoluteUrl } from '@/lib/siteConfig';

/**
 * Factual Q&A about Rukhsar Ahmad — answers the "who is / what does she do /
 * where is she based" questions that both people and AI search systems ask.
 * Keep every answer grounded in the real profile data above.
 */
const faqs = [
  {
    q: 'Who is Rukhsar Ahmad?',
    a: 'Rukhsar Ahmad is a full-stack web developer based in Lahore, Pakistan, specializing in the MERN stack (MongoDB, Express, React, Node.js), Next.js and practical AI integration. She currently works as an AI Engineer at Dark Field Tech Lab and takes freelance and contract work alongside it.',
  },
  {
    q: 'What does Rukhsar Ahmad specialize in?',
    a: 'She specializes in building complete web products: full-stack applications with React, Next.js, Node.js and MongoDB, e-commerce websites, and AI-powered features like shopping assistants and product recommendations integrated through APIs such as Gemini and OpenAI.',
  },
  {
    q: 'What technologies does Rukhsar Ahmad use?',
    a: 'Her everyday stack includes React, Next.js, Node.js, Express, MongoDB, MySQL, TypeScript, Tailwind CSS, Firebase and Git, plus Figma for design and WordPress, Shopify, Webflow and GoHighLevel for CMS, e-commerce and automation work.',
  },
  {
    q: 'Does Rukhsar Ahmad build AI-powered websites?',
    a: 'Yes — she builds AI-powered web applications where the AI layer is grounded in real product data. Her ZYRA case study covers an AI Stylist shopping assistant powered by the Gemini API that only ever recommends products that exist in the store\'s MongoDB catalog.',
  },
  {
    q: 'Does Rukhsar Ahmad develop Shopify or WordPress websites?',
    a: 'Both. She builds custom WordPress sites for business and content-driven websites, and works on Shopify stores with a focus on fast, conversion-focused storefronts — choosing the platform honestly per project rather than by default.',
  },
  {
    q: 'What projects has Rukhsar Ahmad built?',
    a: 'Selected work includes ZYRA, an AI-powered MERN e-commerce platform; Craft PC, a full-stack e-commerce platform with a compatibility-validating custom PC builder; and storefronts and marketing sites such as EcoBazar, Furniro, StudySync, Logistic, Food Hut, Clothing IO and an IT services agency site.',
  },
  {
    q: 'Where is she based, and does she work with international clients?',
    a: 'She is based in Lahore, Pakistan, and works remotely with clients worldwide. Response time for new inquiries is typically within 24–48 hours.',
  },
  {
    q: 'Is Rukhsar Ahmad available for freelance or full-time work?',
    a: 'Yes — she is open to full-time, contract and freelance work. The fastest way to reach her is the contact page or the email listed there.',
  },
];

export default function About() {
  const s = photographerInfo.socialLinks;

  return (
    <>
      <SEOHead
        title="About — Full-Stack Web Developer | MERN, Next.js & AI Integration"
        description={`About ${photographerInfo.name}, ${photographerInfo.tagline}. ${photographerInfo.biography.split('\n\n')[0]}`}
        image={photographerInfo.portraitImage}
        type="profile"
        faqs={faqs}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            url: `${SITE_URL}/about`,
            mainEntity: {
              '@type': 'Person',
              name: photographerInfo.name,
              jobTitle: 'Full-Stack Web Developer',
              description: photographerInfo.biography.split('\n\n')[0],
              image: absoluteUrl(photographerInfo.portraitImage),
              email: `mailto:${photographerInfo.email}`,
              telephone: photographerInfo.phone,
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'NCBA&E University, Lahore',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: photographerInfo.location,
                addressCountry: 'PK',
              },
              knowsAbout: photographerInfo.clients,
              sameAs: Object.values(photographerInfo.socialLinks).filter(Boolean),
            },
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
            <span className="mr-2">👋</span> A little <span className="italic">about me</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[18vw] md:text-[13vw] font-light tracking-[-0.05em] leading-[0.85]"
          >
            ABOUT
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="mt-2 text-[10vw] md:text-[5vw] italic font-light tracking-[-0.04em] leading-[0.9] text-black/70"
          >
            {photographerInfo.name.toLowerCase()}
          </motion.h2>

          <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-6 text-sm md:text-base font-light">
            <div>
              <p className="text-black/50">Role</p>
              <p className="text-black">Full-Stack Web Developer</p>
            </div>
            <div>
              <p className="text-black/50">Based in</p>
              <p className="text-black">{photographerInfo.location}</p>
            </div>
            <div>
              <p className="text-black/50 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Availability
              </p>
              <p className="text-black">Freelance & full-time</p>
            </div>
          </div>
        </section>

        {/* BIO + PORTRAIT */}
        <section className="px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-32 border-b border-black/10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-5 md:sticky md:top-32"
            >
              <SpotlightNegative
                src={photographerInfo.portraitImage}
                alt={`${photographerInfo.name} portrait`}
                className="w-full max-w-md"
                radius={55}
              />

              <div className="mt-6 flex items-center gap-3">
                {s.github && (
                  <a href={s.github} target="_blank" rel="noreferrer" aria-label="GitHub"
                    className="size-11 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                    <Github className="size-4" />
                  </a>
                )}
                {s.linkedin && (
                  <a href={s.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
                    className="size-11 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                    <Linkedin className="size-4" />
                  </a>
                )}
                {s.instagram && (
                  <a href={s.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
                    className="size-11 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                    <Instagram className="size-4" />
                  </a>
                )}
              </div>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="md:col-span-7 space-y-10"
            >
              <div>
                <p className="text-xs font-light tracking-[0.25em] uppercase text-black/40 mb-4">Story</p>
                <div className="space-y-6">
                  {photographerInfo.biography.split('\n\n').map((p, i) => (
                    <p key={i} className="text-lg md:text-xl font-light leading-relaxed text-black/75">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-light tracking-[0.25em] uppercase text-black/40 mb-4">Approach</p>
                <div className="space-y-6">
                  {photographerInfo.approach.split('\n\n').map((p, i) => (
                    <p key={i} className="text-lg md:text-xl font-light leading-relaxed text-black/75">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 border-b border-black/10">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <h2 className="text-[14vw] md:text-[9vw] font-light tracking-[-0.04em] leading-[0.85]">
              EXPERIENCE
            </h2>
            <span className="hidden md:block text-sm font-light text-black/50">/ journey so far</span>
          </div>
          <ul className="border-t border-black/10">
            {photographerInfo.awards.map((a, i) => (
              <motion.li
                key={a}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="border-b border-black/10 py-6 md:py-8 flex items-baseline gap-6 md:gap-12"
              >
                <span className="text-sm md:text-base font-light text-black/40 tabular-nums w-10 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-2xl md:text-4xl font-light tracking-tight">{a}</span>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* STACK */}
        <section className="px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 border-b border-black/10">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <h2 className="text-[14vw] md:text-[9vw] font-light italic tracking-[-0.04em] leading-[0.85]">
              stack
            </h2>
            <span className="hidden md:block text-sm font-light text-black/50">/ everyday tools</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {photographerInfo.clients.map((c) => (
              <span
                key={c}
                className="px-5 py-2 border border-black/20 rounded-full text-sm md:text-base font-light tracking-wide hover:bg-black hover:text-white transition-colors"
              >
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 border-b border-black/10">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <h2 className="text-[14vw] md:text-[9vw] font-light tracking-[-0.04em] leading-[0.85]">
              FAQ
            </h2>
            <span className="hidden md:block text-sm font-light text-black/50">/ quick answers</span>
          </div>
          <div className="max-w-3xl">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-black/10 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg md:text-xl font-light tracking-tight text-black [&::-webkit-details-marker]:hidden">
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
        </section>

        {/* CTA */}
        <section className="px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <h2 className="text-[12vw] md:text-[8vw] font-light tracking-[-0.04em] leading-[0.85] max-w-4xl">
              Have an idea? <span className="italic text-black/70">Let&apos;s build it.</span>
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
