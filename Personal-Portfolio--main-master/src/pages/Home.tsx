import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus, Minus, MapPin, ArrowDown, Menu, CalendarDays, Clock } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { getFeaturedProjects } from '@/data/projects';
import { getFeaturedPosts } from '@/data/posts';
import { getAverageRating } from '@/data/reviews';
import { ReviewList, ReviewStats } from '@/components/reviews/ReviewList';
import { ReviewForm } from '@/components/forms/ReviewForm';
import { SEOHead } from '@/components/seo/SEOHead';
import heroCharacter from '@/assets/rukhsar-ahmad-desk-setup.webp';
import personalPhoto from '@/assets/rukhsar-ahmad-photo.webp';
import furniroShot from '@/assets/project-screens/furniro-furniture-website-screenshot.webp';
import studysyncShot from '@/assets/project-screens/studysync-education-website-screenshot.webp';
import logisticShot from '@/assets/project-screens/logistics-website-screenshot.webp';
import clothingShot from '@/assets/project-screens/clothing-io-fashion-website-screenshot.webp';
import { LaptopStage } from '@/components/three/LaptopStage';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SpotlightNegative } from '@/components/effects/SpotlightNegative';
import { SITE_URL, absoluteUrl } from '@/lib/siteConfig';

/* ---------- helpers ---------- */

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

/* ---------- building blocks ---------- */

function Marquee({ children, duration = 30, reverse = false }: { children: React.ReactNode; duration?: number; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden py-2">
      <motion.div
        className="flex items-center gap-16 whitespace-nowrap will-change-transform"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-16 shrink-0">{children}</div>
        ))}
      </motion.div>
    </div>
  );
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- data ---------- */

const services = [
  {
    n: '01',
    title: 'AI & Full-Stack Systems',
    copy: 'LLM-powered features, intelligent search and AI workflows wired into production-ready Node / MongoDB backends.',
    tags: ['OpenAI', 'LangChain', 'Node.js', 'Express', 'MongoDB', 'Vector Search'],
  },
  {
    n: '02',
    title: 'MERN & Next.js Development',
    copy: 'Responsive, modern sites with clean code, scalable architecture and seamless functionality — tuned to your product.',
    tags: ['MERN Stack', 'Next.js', 'React', 'REST APIs', 'Performance', 'Responsive Design'],
  },
  {
    n: '03',
    title: 'CMS & No-Code Builds',
    copy: 'Ship fast with WordPress, Shopify, Webflow and GoHighLevel — custom themes, integrations and automations.',
    tags: ['WordPress', 'Shopify', 'Webflow', 'GoHighLevel', 'Integrations', 'Automation'],
  },
  {
    n: '04',
    title: 'Design & Motion',
    copy: 'Figma design systems and considered motion — the small details that make a product feel premium and alive.',
    tags: ['Figma', 'Design Systems', 'Framer Motion', 'Tailwind', 'Micro-interactions', 'Prototyping'],
  },
];

const stack = [
  { name: 'React', slug: 'react', color: '61DAFB' },
  { name: 'Next.js', slug: 'nextdotjs', color: '000000' },
  { name: 'Express', slug: 'express', color: '000000' },
  { name: 'Node.js', slug: 'nodedotjs', color: '5FA04E' },
  { name: 'MongoDB', slug: 'mongodb', color: '47A248' },
  { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
  { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
  { name: 'HTML5', slug: 'html5', color: 'E34F26' },
  { name: 'CSS3', slug: 'css', color: '1572B6' },
  { name: 'Tailwind', slug: 'tailwindcss', color: '06B6D4' },
  { name: 'Bootstrap', slug: 'bootstrap', color: '7952B3' },
  { name: 'Git', slug: 'git', color: 'F05032' },
  { name: 'GitHub', slug: 'github', color: '000000' },
  { name: 'Figma', slug: 'figma', color: 'F24E1E' },
  { name: 'SQL', slug: 'mysql', color: '4479A1' },
  { name: 'Firebase', slug: 'firebase', color: 'FFCA28' },
  { name: 'Netlify', slug: 'netlify', color: '00C7B7' },
  { name: 'Vercel', slug: 'vercel', color: '000000' },
  { name: 'WordPress', slug: 'wordpress', color: '21759B' },
  { name: 'Shopify', slug: 'shopify', color: '96BF48' },
  { name: 'Webflow', slug: 'webflow', color: '146EF5' },
  { name: 'Framer', slug: 'framer', color: '0055FF' },
];

const testimonials = [
  {
    quote: 'Rukhsar translated a complex product into a clear, polished experience that our customers understood immediately.',
    name: 'Ayesha Khan',
    role: 'Founder, Northstar Labs',
  },
  {
    quote: 'Thoughtful, fast and incredibly reliable. Every detail felt intentional, from the first wireframe to launch day.',
    name: 'Hamza Malik',
    role: 'Product Lead, Orbit Commerce',
  },
  {
    quote: 'The rare developer who cares equally about the experience, the architecture and the result for the business.',
    name: 'Sara Ahmed',
    role: 'Director, Studio Sora',
  },
  {
    quote: 'Our new site feels like us now — confident, modern and effortless to use on every screen.',
    name: 'Omar Farooq',
    role: 'Co-founder, Fieldnote',
  },
  {
    quote: 'Clear communication, sharp execution and a genuine eye for the details that make a product memorable.',
    name: 'Mariam Iqbal',
    role: 'Marketing Director, Lumen',
  },
  {
    quote: 'From idea to a working product, Rukhsar made the process feel calm, collaborative and surprisingly simple.',
    name: 'Bilal Shah',
    role: 'Founder, Common Ground',
  },
];

/* ---------- service accordion ---------- */

function ServiceRow({ s, open, onToggle }: { s: typeof services[number]; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-black/10">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-8 md:py-10 text-left group">
        <div className="flex items-baseline gap-6 md:gap-12">
          <span className="text-sm md:text-base font-light text-black/40 tabular-nums">{s.n}</span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-black group-hover:text-black/60 transition-colors">
            {s.title}
          </h3>
        </div>
        <span className="ml-4 shrink-0 size-10 md:size-12 rounded-full border border-black/20 flex items-center justify-center text-black/80 group-hover:bg-black group-hover:text-white transition-colors">
          {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="pb-10 pl-0 md:pl-24 max-w-3xl">
          <p className="text-base md:text-lg font-light text-black/60 leading-relaxed">{s.copy}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {s.tags.map((t) => (
              <li key={t} className="text-xs md:text-sm font-light text-black/70 border border-black/15 rounded-full px-3 py-1">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[number] }) {
  return (
    <article className="w-[min(78vw,21rem)] sm:w-[21rem] shrink-0 min-h-[15.5rem] rounded-[1.25rem] border border-black/10 bg-white/75 p-6 sm:p-7 flex flex-col justify-between shadow-[0_12px_35px_rgba(0,0,0,0.04)]">
      <div>
        <span className="block text-4xl leading-none text-indigo-600/80" aria-hidden="true">“</span>
        <p className="mt-2 text-base leading-relaxed font-light text-black/75">{testimonial.quote}</p>
      </div>
      <div className="mt-7 flex items-center gap-3">
        <span className="size-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-light">
          {testimonial.name.split(' ').map((part) => part[0]).join('')}
        </span>
        <div>
          <p className="text-sm font-medium">{testimonial.name}</p>
          <p className="text-xs font-light text-black/45">{testimonial.role}</p>
        </div>
      </div>
    </article>
  );
}

function Testimonials({ reducedMotion }: { reducedMotion: boolean }) {
  const rows = [testimonials.slice(0, 3), testimonials.slice(3)];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white px-4 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20"
    >
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="text-xs font-light uppercase tracking-[0.3em] text-indigo-600">Client notes</p>
        <h2 id="testimonials-heading" className="mt-5 text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Good work is remembered.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-sm font-light leading-relaxed text-black/55 sm:text-base">
          A few words from the people and teams I&apos;ve had the pleasure of building with.
        </p>
      </div>

      <div className="relative mt-12 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] sm:mt-16">
        {rows.map((row, rowIndex) => {
          const loopedRow = [...row, ...row];
          return (
            <motion.div
              key={rowIndex}
              className="flex w-max gap-4"
              animate={reducedMotion ? undefined : { x: rowIndex === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
              transition={reducedMotion ? undefined : { duration: rowIndex === 0 ? 28 : 32, ease: 'linear', repeat: Infinity }}
            >
              {loopedRow.map((testimonial, index) => (
                <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
              ))}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- hero character: body still, head follows cursor ---------- */

function HeroCharacter() {
  return (
    <div className="relative w-full will-change-transform">
      <img
        src={heroCharacter}
        alt="Rukhsar Ahmad — full-stack web developer at her NZXT desk setup"
        width={2048}
        height={2048}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)] select-none pointer-events-none"
        draggable={false}
      />
    </div>
  );
}

/* ---------- page ---------- */

export default function Home() {
  const featured = getFeaturedProjects();
  const [openService, setOpenService] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Preload hero image + warm-decode so the character (and its second vertical monitor)
  // paint instantly and don't jank during scroll.
  useEffect(() => {
    const heroLink = document.createElement('link');
    heroLink.rel = 'preload';
    heroLink.as = 'image';
    heroLink.href = heroCharacter;
    heroLink.fetchPriority = 'high';
    document.head.appendChild(heroLink);

    const heroImg = new Image();
    heroImg.src = heroCharacter;
    heroImg.decoding = 'async';
    heroImg.decode?.().catch(() => {});

    // Warm-load the laptop screen textures while the user is still on the hero,
    // so the 3D laptop renders instantly once they scroll to it.
    const laptopShots = [furniroShot, studysyncShot, logisticShot, clothingShot];
    const laptopLinks: HTMLLinkElement[] = laptopShots.map((src) => {
      const l = document.createElement('link');
      l.rel = 'prefetch';
      l.as = 'image';
      l.href = src;
      document.head.appendChild(l);
      const im = new Image();
      im.src = src;
      im.decoding = 'async';
      im.decode?.().catch(() => {});
      return l;
    });

    return () => {
      document.head.removeChild(heroLink);
      laptopLinks.forEach((l) => document.head.removeChild(l));
    };
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  // Reduced motion: minimize parallax/fade so it barely animates.
  const heroYRaw = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ['0%', '0%'] : ['0%', '20%']);
  const heroOpacityRaw = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 0]);
  const heroY = useSpring(heroYRaw, { stiffness: 120, damping: 30, mass: 0.4 });
  const heroOpacity = useSpring(heroOpacityRaw, { stiffness: 140, damping: 30, mass: 0.3 });

  // RUKHSAR text — scrolls up with page, slides behind the character and fades out.
  const nameYRaw = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '-120%'],
  );
  const nameOpacityRaw = useTransform(
    scrollYProgress,
    [0, 0.45, 0.75],
    prefersReducedMotion ? [1, 1, 0.9] : [1, 0.35, 0],
  );
  const nameY = useSpring(nameYRaw, { stiffness: 90, damping: 28, mass: 0.6 });
  const nameOpacity = useSpring(nameOpacityRaw, { stiffness: 110, damping: 30, mass: 0.4 });

  // scroll-driven stack banner
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stackProgress } = useScroll({ target: stackRef, offset: ['start end', 'end start'] });
  const stackX = useTransform(stackProgress, [0, 1], ['20%', '-30%']);
  const stackScale = useTransform(stackProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);

  return (
    <>
      <SEOHead
        title="MERN Stack Developer & AI Integration Specialist | Rukhsar Ahmad"
        description="Rukhsar Ahmad is a full-stack web developer specializing in MERN, Next.js and AI integration — building web applications, e-commerce websites and AI-powered web experiences with React, Node.js, MongoDB, WordPress and Shopify."
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: photographerInfo.name,
            description: photographerInfo.heroIntroduction,
            inLanguage: 'en',
            publisher: { '@id': `${SITE_URL}/#person` },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: photographerInfo.name,
            jobTitle: 'Full-Stack Web Developer',
            description: photographerInfo.heroIntroduction,
            knowsAbout: photographerInfo.clients,
            email: `mailto:${photographerInfo.email}`,
            telephone: photographerInfo.phone,
            url: `${SITE_URL}/`,
            image: absoluteUrl(photographerInfo.portraitImage),
            address: {
              '@type': 'PostalAddress',
              addressLocality: photographerInfo.location,
              addressCountry: 'PK',
            },
            sameAs: Object.values(photographerInfo.socialLinks).filter(Boolean),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            url: `${SITE_URL}/`,
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Who is Rukhsar Ahmad?',
                acceptedAnswer: { '@type': 'Answer', text: `Rukhsar Ahmad is a full-stack web developer based in ${photographerInfo.location}, specializing in building web applications, e-commerce websites and AI-powered web experiences using the MERN stack, Next.js, and AI APIs like Gemini and OpenAI.` },
              },
              {
                '@type': 'Question',
                name: 'What technologies does Rukhsar Ahmad use?',
                acceptedAnswer: { '@type': 'Answer', text: `She works with React, Next.js, Node.js, Express, MongoDB, TypeScript, Tailwind CSS, Figma for UI/UX, and AI APIs including Gemini and OpenAI. She also builds on WordPress, Shopify, Webflow, and GoHighLevel.` },
              },
              {
                '@type': 'Question',
                name: 'Does Rukhsar Ahmad build AI-powered websites?',
                acceptedAnswer: { '@type': 'Answer', text: 'Yes. Her featured project ZYRA is an AI-powered MERN e-commerce platform with an AI Fashion Stylist that uses Gemini API and Pinecone vector search, grounded in the real product catalog so recommendations never suggest products that don\'t exist.' },
              },
              {
                '@type': 'Question',
                name: 'Is Rukhsar Ahmad available for freelance work?',
                acceptedAnswer: { '@type': 'Answer', text: `${photographerInfo.availability} The fastest way to reach her is through the contact page.` },
              },
            ],
          },
        ]}
      />

      <div className="bg-[#f4f4f2] text-black selection:bg-black selection:text-white">
        {/* TOP STATUS BAR */}
        <div className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[#f4f4f2]/70 border-b border-black/5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-10 py-3 sm:py-4 text-[11px] sm:text-xs md:text-sm font-light">
            <div>
              <p className="text-black/50">Pakistan Based</p>
              <p className="text-black">Working internationally</p>
            </div>
            <div className="hidden md:block">
              <p className="text-black/50">AI Engineer at</p>
              <p className="text-black">Dark Field Tech Lab</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-black/50 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for freelance
              </p>
              <p className="text-black">2022 — Onwards</p>
            </div>
            <nav className="hidden lg:flex justify-center items-center gap-6 text-sm font-light">
              <Link to="/portfolio" className="text-black/70 hover:text-black transition-colors">Portfolio</Link>
              <Link to="/services" className="text-black/70 hover:text-black transition-colors">Services</Link>
              <Link to="/blog" className="text-black/70 hover:text-black transition-colors">Blog</Link>
              <Link to="/about" className="text-black/70 hover:text-black transition-colors">About</Link>
              <Link to="/contact" className="text-black/70 hover:text-black transition-colors">Contact</Link>
            </nav>
            <div className="flex justify-end items-center gap-2">
              {/* Mobile / tablet menu — the homepage renders its own top bar,
                  so the shared Header hamburger doesn't appear here. */}
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open menu"
                    className="lg:hidden size-9 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white transition"
                  >
                    <Menu className="size-4" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-80 bg-[#f4f4f2] text-black border-l border-black/10">
                  <nav className="flex flex-col gap-6 mt-10" aria-label="Main menu">
                    {[
                      { name: 'Home', path: '/' },
                      { name: 'Portfolio', path: '/portfolio' },
                      { name: 'Services', path: '/services' },
                      { name: 'Blog', path: '/blog' },
                      { name: 'About', path: '/about' },
                      { name: 'Contact', path: '/contact' },
                    ].map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className="text-2xl font-light tracking-tight text-black hover:text-black/60 transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link
                      to="/contact"
                      onClick={() => setMenuOpen(false)}
                      className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black text-white text-sm font-light hover:bg-black/80 transition"
                    >
                      Get in touch
                    </Link>
                    <div className="mt-6 pt-6 border-t border-black/10 space-y-2 text-sm font-light">
                      <a href={`mailto:${photographerInfo.email}`} className="block text-black/70 hover:text-black break-all transition-colors">
                        {photographerInfo.email}
                      </a>
                      <div className="flex gap-4 pt-2">
                        <a href={photographerInfo.socialLinks.github} target="_blank" rel="noreferrer" className="text-black/70 hover:text-black transition-colors">GitHub</a>
                        <a href={photographerInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-black/70 hover:text-black transition-colors">LinkedIn</a>
                        <a href={photographerInfo.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-black/70 hover:text-black transition-colors">Instagram</a>
                      </div>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-black text-white text-[11px] sm:text-sm font-light hover:bg-black/80 transition whitespace-nowrap"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>

        {/* HERO */}
        <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden pt-24 sm:pt-28 md:pt-24">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative">
            {/* greeting */}
            <div className="px-5 sm:px-6 lg:px-10 mt-4 sm:mt-6 md:mt-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-2xl md:text-4xl font-light text-black/80"
              >
                <span className="mr-2">👋</span> Hola! , I&apos;m
              </motion.p>
            </div>

            {/* RUKHSAR — in normal flow, spaced below greeting. Scrolls up & fades behind character. */}
            <motion.h1
              style={{ y: nameY, opacity: nameOpacity, willChange: 'transform, opacity' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none relative z-0 mt-10 md:mt-14 text-center text-[20vw] md:text-[16vw] font-semibold tracking-[-0.05em] leading-[0.85] text-black"
            >
              RUKHSAR
              <span className="sr-only">
                {' '}Ahmad — Full-Stack Web Developer building modern, AI-powered web applications with MERN, Next.js and AI integration
              </span>
            </motion.h1>

            {/* Character sits IN FRONT — pulled up with negative margin so RUKHSAR passes behind it on scroll */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full flex justify-center px-2 -mt-[10vw] md:-mt-[8vw]"
              >
                <div className="w-[95vw] md:w-[92vw] max-w-[1600px]">
                  <HeroCharacter />
                </div>
              </motion.div>

              {/* Role line below character */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="px-6 lg:px-10 mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
              >
                <h2 className="text-[10vw] md:text-[5vw] font-light tracking-[-0.04em] leading-[0.9] text-black">
                  AI FULL <span className="italic text-black/70">STACK DEV</span>
                </h2>
                <p className="text-base md:text-lg font-light text-black/60 italic md:text-right">
                  Crafting Your Digital<br />Universe
                </p>
              </motion.div>
            </div>



            {/* Footer strip */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-6 lg:px-10 mt-14 md:mt-8 pb-10 text-sm font-light">
              <div>
                <p className="text-black/50">Let&apos;s connect</p>
                <a href={`mailto:${photographerInfo.email}`} className="text-black hover:underline break-all">
                  {photographerInfo.email}
                </a>
                <p className="mt-2 text-black/50 flex items-center gap-1"><MapPin className="size-3" /> Based in Pakistan</p>
              </div>
              <div className="hidden md:flex justify-center items-end">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
                  className="size-12 rounded-full border border-black/30 flex items-center justify-center"
                >
                  <ArrowDown className="size-4" />
                </motion.div>
              </div>
              <div className="text-right space-y-1">
                <div className="flex gap-4 justify-end text-black/70">
                  <a href={photographerInfo.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-black">GitHub</a>
                  <a href={photographerInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-black">LinkedIn</a>
                </div>
                <p className="text-black/50">Available for freelance</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* HIGHLY SKILLED MARQUEE */}
        <section className="py-10 md:py-16 border-t border-black/10">
          <Marquee duration={35}>
            {['A', 'HIGHLY', 'SKILLED', '★', 'AI', 'FULL-STACK', 'ENGINEER', '★'].map((w, i) => (
              <span key={i} className="text-[16vw] md:text-[11vw] font-light tracking-tight leading-none text-black">
                {w}
              </span>
            ))}
          </Marquee>
        </section>

        {/* MODERN TECH STACK — text-only intro with scroll transition */}
        <section ref={stackRef} className="relative py-24 md:py-40 border-t border-black/10 overflow-hidden">
          <motion.div style={{ x: stackX, scale: stackScale }} className="whitespace-nowrap will-change-transform">
            <h2 className="text-[22vw] md:text-[17vw] font-light tracking-[-0.06em] leading-[0.85] text-black">
              MODERN
            </h2>
            <h2 className="text-[22vw] md:text-[17vw] font-light italic tracking-[-0.06em] leading-[0.85] text-black/80 -mt-4">
              TECH STACK
            </h2>
          </motion.div>
          <div className="px-6 lg:px-10 mt-10 flex justify-end">
            <p className="max-w-md text-base md:text-lg font-light text-black/60 leading-relaxed">
              A curated toolkit refined across years of shipping products — modern, fast, and built to scale.
            </p>
          </div>
        </section>

        {/* FLOATING LAPTOP — projects live inside the screen, 360° follows cursor */}
        <section className="relative border-t border-black/10 overflow-hidden bg-[#f4f4f2] pb-16 sm:pb-24 md:pb-32">
          <div className="px-5 sm:px-6 lg:px-10 pt-12 sm:pt-16 md:pt-24 pb-6 sm:pb-8 md:pb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight leading-[0.9]">
              Inside the <span className="italic">machine</span>
            </h2>
            <p className="hidden md:block max-w-xs text-sm font-light text-black/50 text-right">
              Move your cursor — the laptop follows. Real projects rendered live inside the screen.
            </p>
          </div>
          <div className="w-full flex justify-center">
            <LaptopStage />
          </div>
        </section>

        {/* WORK '25 */}
        <section className="px-5 sm:px-6 lg:px-10 py-14 sm:py-16 md:py-24 border-t border-black/10">

          <Reveal>
            <div className="flex items-start justify-between mb-10 md:mb-16">
              <h2 className="text-[18vw] md:text-[13vw] font-light tracking-[-0.04em] leading-[0.85]">WORK</h2>
              <span className="text-[10vw] md:text-[8vw] font-light tracking-tight leading-[0.85] text-black">&apos;25</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={i % 3 === 0 ? 'md:mt-24' : ''}
              >
                <Link to={`/project/${p.slug}`} className="block group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black/5">
                    <motion.img
                      src={p.coverImage}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover grayscale"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div className="absolute inset-0 bg-black/25" />
                    <div className="absolute top-4 right-4 size-10 rounded-full bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="text-xl md:text-2xl font-light tracking-tight">{p.title}</h3>
                    <span className="text-xs md:text-sm font-light text-black/40 uppercase tracking-widest shrink-0">
                      {p.category} · {p.year}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/20 text-sm font-light hover:bg-black hover:text-white transition"
            >
              Discover More
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>

        {/* FEATURED ARTICLES */}
        <section className="px-5 sm:px-6 lg:px-10 py-20 sm:py-24 md:py-32 border-t border-black/10">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-2">From the <span className="italic">journal</span></h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg font-light text-black/55">
              Grounded write-ups on MERN development, AI integration, UI/UX workflows
              and technical SEO — the patterns that keep projects shipping fast.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
            {getFeaturedPosts(3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  {post.coverImage && (
                    <div className="overflow-hidden rounded-xl border border-black/10 mb-4">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-40 object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-light text-black/50 mb-3">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-light tracking-tight leading-tight group-hover:text-black/70 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base font-light text-black/55 leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-light text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    Read article
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/20 text-sm font-light hover:bg-black hover:text-white transition"
            >
              View all articles
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>

        {/* SERVICES */}
        <section className="px-5 sm:px-6 lg:px-10 py-20 sm:py-24 md:py-32 border-t border-black/10">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <h2 className="md:col-span-4 text-5xl md:text-7xl font-light tracking-tight">Services</h2>
            <p className="md:col-span-7 md:col-start-6 text-lg md:text-xl font-light text-black/60 leading-relaxed">
              I build full-stack web applications, e-commerce websites, AI-powered web
              experiences, business websites and custom digital products — using the
              MERN stack, Next.js, WordPress, Shopify, Webflow, GoHighLevel, Figma and
              AI APIs. One developer, end to end, from the data model to the deployed product.
            </p>
          </div>
          <div>
            {services.map((s, i) => (
              <ServiceRow key={s.n} s={s} open={openService === i} onToggle={() => setOpenService(openService === i ? -1 : i)} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/20 text-sm font-light hover:bg-black hover:text-white transition"
            >
              Explore all services in detail
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>

        {/* TECH GRID */}
        <section className="px-5 sm:px-6 lg:px-10 pt-20 sm:pt-24 md:pt-32 border-t border-black/10">
          <p className="text-center text-xs font-light tracking-[0.3em] uppercase text-black/50 mb-10">
            Professional at
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 border-t border-l border-black/10">
            {stack.map((t) => (
              <div
                key={t.name}
                className="group relative aspect-[4/3] border-r border-b border-black/10 flex flex-col items-center justify-center gap-4 hover:bg-black hover:text-white transition-colors overflow-hidden"
              >
                <img
                  src={`https://cdn.simpleicons.org/${t.slug}/${t.color}`}
                  alt={t.name}
                  className="h-14 md:h-20 w-auto opacity-90 group-hover:opacity-0 group-hover:scale-90 transition-all duration-300"
                  loading="lazy"
                />
                <img
                  src={`https://cdn.simpleicons.org/${t.slug}/FFFFFF`}
                  alt=""
                  aria-hidden
                  className="absolute h-14 md:h-20 w-auto opacity-0 group-hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
                <span className="text-sm md:text-base font-light tracking-wide">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="px-5 sm:px-6 lg:px-10 py-20 sm:py-24 md:py-32 border-t border-black/10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {[
              { k: '3+', v: 'Years shipping products' },
              { k: '20+', v: 'Projects completed' },
              { k: '100%', v: 'Client satisfaction' },
            ].map((s) => (
              <div key={s.v} className="space-y-3">
                <p className="text-6xl md:text-8xl font-light tracking-tight">{s.k}</p>
                <p className="text-sm md:text-base font-light text-black/50">{s.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* REVIEWS */}
        <section className="px-5 sm:px-6 lg:px-10 py-20 sm:py-24 md:py-32 border-t border-black/10">
          <Reveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
                What <span className="italic">clients say</span>
              </h2>
              <p className="mt-4 text-lg font-light text-black/55 max-w-2xl mx-auto mb-8">
                Real feedback from people I&apos;ve built products with — from
                AI-powered e-commerce to full MERN applications.
              </p>
              <div className="flex justify-center">
                <ReviewStats />
              </div>
            </div>
          </Reveal>

          <div className="mt-12 max-w-5xl mx-auto">
            <ReviewList />
          </div>

          <Reveal delay={0.2}>
            <div className="mt-16 max-w-2xl mx-auto">
              <p className="text-xs font-light tracking-[0.25em] uppercase text-black/40 text-center mb-6">
                Share your experience
              </p>
              <div className="bg-white border border-black/10 rounded-2xl p-6 md:p-10">
                <ReviewForm />
              </div>
            </div>
          </Reveal>
        </section>

        {/* GET IN TOUCH */}
        <section className="relative px-5 sm:px-6 lg:px-10 py-20 sm:py-24 md:py-32 border-t border-black/10 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="text-6xl md:text-8xl font-light tracking-tight leading-[0.95]">
                Get in <span className="italic">Touch</span>
              </h2>
              <p className="mt-6 text-base md:text-lg font-light text-black/60 max-w-lg mx-auto">
                Interested in working together or have a project in mind? Let&apos;s connect and discuss
                how we can bring your ideas to life.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <a
                  href={`mailto:${photographerInfo.email}`}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-light hover:bg-black/80 transition"
                >
                  Email Me
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/20 text-sm font-light hover:bg-black hover:text-white transition"
                >
                  View My Work
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Big centered personal photo with "Based in Pakistan" overlaid at left-center */}
          <div className="mt-16 relative z-10 flex justify-center">
            <div className="relative">
              <SpotlightNegative
                src={personalPhoto}
                alt="Rukhsar Ahmad, full-stack web developer"
                className="w-[16rem] md:w-[22rem] lg:w-[28rem] xl:w-[32rem]"
              />
              <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-40 lg:-translate-x-56 xl:-translate-x-72 text-left pointer-events-none">
                <p className="text-2xl md:text-3xl font-light">Based in</p>
                <p className="text-2xl md:text-3xl font-light flex items-center gap-2">
                  <span className="text-rose-500">📍</span> Pakistan
                </p>
                <p className="text-xs text-black/50 mt-1">Available for remote work worldwide</p>
              </div>

              {/* Socials — near the right hand area of the image */}
              <div className="hidden md:flex absolute right-0 translate-x-32 lg:translate-x-48 xl:translate-x-60 top-[62%] flex-row items-center gap-3 text-sm md:text-base font-light z-20">
                <a
                  href={photographerInfo.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#f4f4f2]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-black/10 transition-all duration-300 hover:bg-black hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href={photographerInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#f4f4f2]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-black/10 transition-all duration-300 hover:bg-black hover:text-white"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Mobile fallback */}
          <div className="mt-10 md:hidden text-center relative z-10 space-y-4">
            <div>
              <p className="text-2xl font-light">Based in</p>
              <p className="text-2xl font-light flex items-center gap-2 justify-center">
                <span className="text-rose-500">📍</span> Pakistan
              </p>
              <p className="text-xs text-black/50 mt-1">Available for remote work worldwide</p>
            </div>
            <div className="flex gap-4 justify-center items-center text-lg font-light">
              <a href={photographerInfo.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-black">GitHub</a>
              <a href={photographerInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-black">LinkedIn</a>
            </div>
          </div>



          <p className="mt-24 text-center text-xs font-light tracking-[0.3em] uppercase text-black/40">
            © {new Date().getFullYear()} Rukhsar Ahmad — Crafted with care
          </p>
        </section>
      </div>
    </>
  );
}
