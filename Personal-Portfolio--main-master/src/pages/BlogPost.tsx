import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock } from 'lucide-react';
import { getPostBySlug, getRelatedPosts, generateToc } from '@/data/posts';
import type { PostBlock } from '@/data/posts';
import { photographerInfo } from '@/data/photographer';
import { SEOHead } from '@/components/seo/SEOHead';
import { SITE_URL, OG_IMAGE, absoluteUrl } from '@/lib/siteConfig';

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

function PostImage({ block }: { block: Extract<PostBlock, { type: 'image' }> }) {
  const align = block.align || 'center';
  const alignClass = align === 'left' ? 'ml-0 mr-auto' : align === 'right' ? 'mr-0 ml-auto' : 'mx-auto';
  const widthClass = align === 'center' ? 'max-w-3xl' : 'max-w-sm';
  return (
    <figure className={`my-8 ${alignClass} ${widthClass}`}>
      <img
        src={block.src}
        alt={block.alt}
        className="w-full h-auto rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        loading="lazy"
        decoding="async"
      />
      {block.caption && (
        <figcaption className="mt-3 text-center text-sm font-light text-black/50">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

function PostTable({ block }: { block: Extract<PostBlock, { type: 'table' }> }) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-black/10 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-black/5 border-b border-black/10">
            {block.headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-light text-xs uppercase tracking-wider text-black/70">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i} className={i % 2 ? 'bg-black/2' : ''}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 font-light text-black/70">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PostBlockquote({ block }: { block: Extract<PostBlock, { type: 'blockquote' }> }) {
  return (
    <blockquote className="my-8 border-l-4 border-black pl-6 py-1">
      <p className="text-xl md:text-2xl font-light italic text-black/80 leading-relaxed">
        {block.text}
      </p>
      {block.cite && (
        <footer className="mt-2 text-sm font-light text-black/50">— {block.cite}</footer>
      )}
    </blockquote>
  );
}

function PostCallout({ block, type }: { block: Extract<PostBlock, { type: 'note' | 'tip' | 'warning' }>; type: 'note' | 'tip' | 'warning' }) {
  const configs = {
    note: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'i' },
    tip: { bg: 'bg-amber-50', border: 'border-amber-200', icon: '' },
    warning: { bg: 'bg-rose-50', border: 'border-rose-200', icon: '!' },
  };
  const cfg = configs[type];
  return (
    <div className={`my-6 rounded-xl ${cfg.bg} ${cfg.border} border p-5`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 size-5 rounded-full bg-${cfg.icon === 'i' ? 'blue' : cfg.icon === '!' ? 'rose' : 'amber'}-100 flex items-center justify-center text-xs font-bold text-${cfg.icon === 'i' ? 'blue' : cfg.icon === '!' ? 'rose' : 'amber'}-700 flex-shrink-0`}>
          {cfg.icon}
        </div>
        <div>
          <h4 className="font-light text-sm uppercase tracking-wider text-black/60 mb-1">{block.title}</h4>
          <p className="text-sm md:text-base font-light text-black/70 leading-relaxed">{block.text}</p>
        </div>
      </div>
    </div>
  );
}

function PostHeading({ block, level }: { block: Extract<PostBlock, { type: 'h2' | 'h3' }>; level: number }) {
  const isH2 = level === 2;
  return (
    <h2
      className={`${
        isH2
          ? 'mt-12 text-2xl md:text-3xl font-light tracking-tight'
          : 'mt-8 text-xl md:text-2xl font-light tracking-tight text-black/80'
      }`}
    >
      {block.text}
    </h2>
  );
}

function renderPostBlock(block: PostBlock, i: number) {
  switch (block.type) {
    case 'p':
      return (
        <p key={i} className="text-base md:text-lg font-light text-black/70 leading-relaxed">
          {block.text}
        </p>
      );
    case 'h2':
    case 'h3':
      return <PostHeading key={i} block={block} level={block.type === 'h2' ? 2 : 3} />;
    case 'list':
      return (
        <ul key={i} className="space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-base md:text-lg font-light leading-relaxed text-black/70"
            >
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-black/40" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <div key={i} className="overflow-x-auto rounded-xl bg-black text-white/90">
          <div className="flex items-center justify-between px-4 pt-3 text-[11px] uppercase tracking-widest text-white/40">
            <span>{block.lang}</span>
          </div>
          <pre className="px-4 pb-4 pt-1 text-xs md:text-sm font-light leading-relaxed">
            <code>{block.code}</code>
          </pre>
        </div>
      );
    case 'blockquote':
      return <PostBlockquote key={i} block={block} />;
    case 'image':
      return <PostImage key={i} block={block} />;
    case 'table':
      return <PostTable key={i} block={block} />;
    case 'note':
    case 'tip':
    case 'warning':
      return <PostCallout key={i} block={block} type={block.type} />;
    default:
      return null;
  }
}

function Toc({ blocks }: { blocks: PostBlock[] }) {
  const toc = generateToc(blocks);
  if (toc.length === 0) return null;
  return (
    <nav className="mb-12" aria-label="Table of contents">
      <p className="text-xs font-light tracking-[0.25em] uppercase text-black/40 mb-4">Contents</p>
      <ul className="space-y-2 pl-4 border-l border-black/10">
        {toc.map((item, i) => {
          const href = `#toc-${i}`;
          return (
            <li key={href}>
              <a
                href={href}
                className={`${
                  item.level === 2 ? 'ml-0 font-medium text-black/80' : 'ml-4 text-sm text-black/60'
                } block py-1 text-sm font-light hover:text-black hover:underline underline-offset-2 transition-colors`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/404" replace />;
  const relatedPosts = getRelatedPosts(post.slug);

  const headerImage = post.coverImage || OG_IMAGE;

  return (
    <>
      <SEOHead
        title={`${post.title} — Rukhsar Ahmad`}
        description={post.description}
        image={headerImage}
        type="article"
        keywords={[...post.tags, 'Rukhsar Ahmad'].join(', ')}
        article={{
          headline: post.title,
          datePublished: post.date,
          dateModified: post.date,
        }}
        faqs={
          post.tags.includes('SEO') || post.tags.includes('AI Integration')
            ? [
                {
                  q: `What is the key takeaway from "${post.title}"?`,
                  a: post.intro,
                },
                {
                  q: `How does Rukhsar Ahmad approach ${post.tags.join(' and ')}?`,
                  a: `She focuses on grounded, production-ready patterns: real data over generated output, validation before display, and keeping AI off the critical path. See the full walkthrough in "${post.title}".`,
                },
              ]
            : undefined
        }
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            url: `${SITE_URL}/blog/${post.slug}`,
            datePublished: post.date,
            dateModified: post.date,
            image: absoluteUrl(headerImage),
            articleSection: post.tags.join(', '),
            wordCount: post.blocks.reduce(
              (n, b) =>
                n +
                (b.type === 'p' || b.type === 'h2' || b.type === 'h3'
                  ? b.text?.split(/\s+/).length ?? 0
                  : 0),
              0,
            ),
            author: {
              '@type': 'Person',
              name: photographerInfo.name,
              jobTitle: 'Full-Stack Web Developer',
              url: `${SITE_URL}/about`,
              sameAs: Object.values(photographerInfo.socialLinks).filter(Boolean),
            },
            publisher: { '@id': `${SITE_URL}/#person` },
            mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['h1', 'h2', '.article-intro', '.article-content'],
            },
          },
        ]}
      />

      <div className="bg-[#f4f4f2] text-black selection:bg-black selection:text-white">
        {/* HEADER */}
        <section className="px-5 sm:px-6 lg:px-10 pt-28 sm:pt-32 md:pt-36 pb-10 border-b border-black/10">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-light text-black/50"
          >
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span aria-hidden>/</span>
            <Link to="/blog" className="hover:text-black transition-colors">Blog</Link>
            <span aria-hidden>/</span>
            <span className="text-black/70 truncate max-w-[16rem] md:max-w-sm">{post.title}</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-4xl text-3xl sm:text-4xl md:text-6xl font-light tracking-[-0.03em] leading-[1.05]"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm font-light text-black/50"
          >
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {post.readingTime}
            </span>
            <span>
              By <Link to="/about" className="text-black hover:underline underline-offset-4">{photographerInfo.name}</Link>
            </span>
          </motion.div>
        </section>

        {/* ARTICLE */}
        <article className="px-5 sm:px-6 lg:px-10 py-12 md:py-16">
          <div className="max-w-3xl mx-auto article-content">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-lg md:text-xl font-light text-black/75 leading-relaxed article-intro"
            >
              {post.intro}
            </motion.p>

            <div className="mt-10 space-y-6">
              {post.blocks.map((block, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.05 }}
                >
                  {renderPostBlock(block, i)}
                </motion.div>
              ))}
            </div>

            {/* AUTHOR BOX */}
            <div className="mt-16 border-t border-black/10 pt-8">
              <p className="text-xs font-light tracking-[0.25em] uppercase text-black/40 mb-4">
                About the author
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="space-y-1">
                  <p className="text-lg font-light">{photographerInfo.name}</p>
                  <p className="text-sm font-light text-black/60">
                    Full-Stack Web Developer — MERN · Next.js · AI Integration.
                  </p>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-1.5 text-sm font-light text-black hover:underline underline-offset-4 mt-1"
                  >
                    More about me <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* RELATED */}
            <div className="mt-12 border-t border-black/10 pt-8">
              <p className="text-xs font-light tracking-[0.25em] uppercase text-black/40 mb-4">
                Related work
              </p>
              <div className="flex flex-wrap gap-3">
                {post.related.map((r) => (
                  <Link
                    key={r.href}
                    to={r.href}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 text-sm font-light hover:bg-black hover:text-white transition"
                  >
                    {r.label} <ArrowUpRight className="size-3.5" />
                  </Link>
                ))}
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 text-sm font-light hover:bg-black hover:text-white transition"
                  >
                    {p.title.length > 44 ? `${p.title.slice(0, 44)}…` : p.title}
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-light text-black/60 hover:text-black transition-colors"
              >
                <ArrowLeft className="size-4" /> All articles
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
