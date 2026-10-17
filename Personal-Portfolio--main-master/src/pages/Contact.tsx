import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { ContactForm } from '@/components/forms/ContactForm';
import { SEOHead } from '@/components/seo/SEOHead';
import { SITE_URL } from '@/lib/siteConfig';

export default function Contact() {
  const s = photographerInfo.socialLinks;

  return (
    <>
      <SEOHead
        title="Contact — Hire an AI Full-Stack Engineer"
        description={`Get in touch with ${photographerInfo.name} for AI, MERN and full-stack projects. ${photographerInfo.availability}`}
        faqs={[
          {
            q: 'How do I hire Rukhsar Ahmad for a project?',
            a: `Send a message through the contact form or email directly at ${photographerInfo.email}. Include a brief project overview — what the product does, your timeline, and any technical requirements. Responses come within 24–48 hours.`,
          },
          {
            q: 'What is the best way to reach Rukhsar Ahmad?',
            a: `For project inquiries, the contact form or email (${photographerInfo.email}) is best. For code and open-source work, find her on GitHub at ${photographerInfo.socialLinks.github}.`,
          },
          {
            q: 'Does Rukhsar work with international clients?',
            a: `Yes — she is based in Lahore, Pakistan, and works remotely with clients worldwide. Available for full-time, contract, and freelance engagements.`,
          },
          {
            q: 'What project types does Rukhsar take on?',
            a: 'She specializes in full-stack MERN applications, Next.js sites with SEO, AI-powered features (Gemini/OpenAI integration), and e-commerce on Shopify, WordPress, and Webflow.',
          },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: `${SITE_URL}/contact`,
            mainEntity: {
              '@type': 'Person',
              name: photographerInfo.name,
              email: `mailto:${photographerInfo.email}`,
              telephone: photographerInfo.phone,
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'business inquiries',
                email: photographerInfo.email,
                telephone: photographerInfo.phone,
                areaServed: 'Worldwide',
                availableLanguage: ['English', 'Urdu'],
              },
            },
          },
        ]}
      />

      <div className="bg-[#f4f4f2] text-black selection:bg-black selection:text-white">
        {/* HERO */}
        <section className="relative min-h-[70vh] px-5 sm:px-6 lg:px-10 pt-28 sm:pt-32 md:pt-40 pb-14 sm:pb-16 md:pb-24 border-b border-black/10 overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xl md:text-3xl font-light text-black/70"
          >
            <span className="mr-2">✉︎</span> Say <span className="italic">hello</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[18vw] md:text-[13vw] font-light tracking-[-0.05em] leading-[0.85]"
          >
            CONTACT
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="mt-2 text-[10vw] md:text-[5vw] italic font-light tracking-[-0.04em] leading-[0.9] text-black/70"
          >
            let&apos;s build together
          </motion.h2>

          <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-6 text-sm md:text-base font-light">
            <div>
              <p className="text-black/50 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Availability
              </p>
              <p className="text-black">Open to new projects</p>
            </div>
            <div>
              <p className="text-black/50">Response time</p>
              <p className="text-black">Within 24–48 hours</p>
            </div>
            <div>
              <p className="text-black/50">Based in</p>
              <p className="text-black">{photographerInfo.location}</p>
            </div>
          </div>
        </section>

        {/* MAIN */}
        <section className="px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 border-b border-black/10">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            {/* Info column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="md:col-span-5 space-y-10"
            >
              <div>
                <p className="text-xs font-light tracking-[0.25em] uppercase text-black/40 mb-4">Direct</p>
                <div className="space-y-6">
                  <a href={`mailto:${photographerInfo.email}`} className="group flex items-start gap-4">
                    <span className="mt-1 size-10 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <Mail className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-black/50">Email</span>
                      <span className="block text-lg md:text-xl font-light break-all">{photographerInfo.email}</span>
                    </span>
                  </a>
                  <a href={`tel:${photographerInfo.phone}`} className="group flex items-start gap-4">
                    <span className="mt-1 size-10 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <Phone className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-black/50">Phone</span>
                      <span className="block text-lg md:text-xl font-light">{photographerInfo.phone}</span>
                    </span>
                  </a>
                  <div className="flex items-start gap-4">
                    <span className="mt-1 size-10 rounded-full border border-black/20 flex items-center justify-center">
                      <MapPin className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-black/50">Location</span>
                      <span className="block text-lg md:text-xl font-light">{photographerInfo.location}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-light tracking-[0.25em] uppercase text-black/40 mb-4">Elsewhere</p>
                <div className="flex items-center gap-3">
                  {s.github && (
                    <a href={s.github} target="_blank" rel="noreferrer" aria-label="GitHub"
                      className="size-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                      <Github className="size-4" />
                    </a>
                  )}
                  {s.linkedin && (
                    <a href={s.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
                      className="size-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                      <Linkedin className="size-4" />
                    </a>
                  )}
                  {s.instagram && (
                    <a href={s.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
                      className="size-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                      <Instagram className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Form column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="md:col-span-7"
            >
              <p className="text-xs font-light tracking-[0.25em] uppercase text-black/40 mb-6">Send a message</p>
              <div className="bg-white/60 backdrop-blur-sm border border-black/10 rounded-2xl p-6 md:p-10">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Big closer */}
        <section className="px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-32">
          <h2 className="text-[14vw] md:text-[10vw] font-light tracking-[-0.05em] leading-[0.85]">
            LET&apos;S <span className="italic text-black/70">TALK.</span>
          </h2>
        </section>
      </div>
    </>
  );
}
