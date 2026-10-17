import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react';
import { posts, getFeaturedPosts } from '@/data/posts';
import { photographerInfo } from '@/data/photographer';
import { SEOHead } from '@/components/seo/SEOHead';
import { SITE_URL, absoluteUrl } from '@/lib/siteConfig';

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export default function Blog() {
  const featuredPosts = getFeaturedPosts(3);

  return (
    <>
      <SEOHead
        title="Rukhsar Ahmad | Web Development, AI & UI/UX Blog"
        description="Practical articles on MERN and full-stack development, AI integrations, UI/UX workflows and technical SEO for React — written from real projects by Rukhsar Ahmad."
        faqs={[
          {
            q: 'What topics does Rukhsar Ahmad write about on her blog?',
            a: 'She writes about MERN stack development, Next.js, AI API integration (Gemini/OpenAI), UI/UX design workflows from Figma to React, e-commerce development, and technical SEO for React SPAs — all from real projects she has built.',
          },
          {
            q: 'Are the blog articles on this site practical guides?',
            a: 'Yes — every article is a first-hand write-up grounded in real work, including code snippets, architecture decisions, and lessons learned from projects like ZYRA (AI e-commerce) and Craft PC (MERN e-commerce).',
          },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            url: `${SITE_URL}/blog`,
            name: 'Web Development, AI & UI/UX Blog — Rukhsar Ahmad',
            description: 'Practical articles on MERN and full-stack development, AI integrations, UI/UX workflows and technical SEO for React.',
            blogPost: posts.map((p) => ({
              '@type': 'BlogPosting',
              headline: p.title,
              description: p.description,
              url: `${SITE_URL}/blog/${p.slug}`,
              datePublished: p.date,
              author: {
                '@type': 'Person',
                name: photographerInfo.name,
              },
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
            <span className="mr-2">✎</span> Notes from <span className="italic">real projects</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[18vw] md:text-[13vw] font-light tracking-[-0.05em] leading-[0.85]"
          >
            BLOG
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="mt-2 text-[8vw] md:text-[4vw] italic font-light tracking-[-0.04em] leading-[0.9] text-black/70"
          >
            what I&apos;ve built &amp; learned
          </motion.h2>

          <p className="mt-8 max-w-xl text-base md:text-lg font-light text-black/60 leading-relaxed">
            First-hand write-ups on MERN and full-stack development, AI-powered
            features, UI/UX workflow and technical SEO — always grounded in
            projects I actually shipped.
          </p>
        </section>

        {/* FEATURED POST */}
        <section className="px-5 sm:px-6 lg:px-10 py-16 md:py-24 border-b border-black/10">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-light tracking-[0.25em] uppercase text-black/40 mb-4">
              Featured article
            </p>
            {featuredPosts.length > 0 && (
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={`/blog/${featuredPosts[0].slug}`} className="group block">
                  {featuredPosts[0].coverImage && (
                    <div className="overflow-hidden rounded-xl border border-black/10 mb-6">
                      <img
                        src={featuredPosts[0].coverImage}
                        alt={featuredPosts[0].title}
                        className="w-full h-64 md:h-80 object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-light text-black/50">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />
                      {formatDate(featuredPosts[0].date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {featuredPosts[0].readingTime}
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl md:text-4xl font-light tracking-tight leading-tight group-hover:text-black/70 transition-colors">
                    {featuredPosts[0].title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm md:text-base font-light text-black/60 leading-relaxed">
                    {featuredPosts[0].description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-2">
                      {featuredPosts[0].tags.map((t) => (
                        <li
                          key={t}
                          className="text-xs font-light text-black/70 border border-black/15 rounded-full px-3 py-1"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1.5 text-sm font-light text-black">
                      Read article
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            )}
          </div>
        </section>

        {/* POST LIST */}
        <section className="px-5 sm:px-6 lg:px-10 py-16 md:py-24 border-b border-black/10">
          <div className="max-w-4xl mx-auto">
            {posts.slice(1).map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-black/10 first:border-t-0 py-10 md:py-12"
              >
                <Link to={`/blog/${post.slug}`} className="group block">
                  {post.coverImage && (
                    <div className="overflow-hidden rounded-xl border border-black/10 mb-5">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-48 md:h-56 object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-light text-black/50">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl md:text-4xl font-light tracking-tight leading-tight group-hover:text-black/70 transition-colors">
                    {post.title}
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm md:text-base font-light text-black/60 leading-relaxed">
                    {post.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-2">
                      {post.tags.map((t) => (
                        <li
                          key={t}
                          className="text-xs font-light text-black/70 border border-black/15 rounded-full px-3 py-1"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1.5 text-sm font-light text-black">
                      Read article
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
              Have a project? <span className="italic text-black/70">Let&apos;s build it.</span>
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
