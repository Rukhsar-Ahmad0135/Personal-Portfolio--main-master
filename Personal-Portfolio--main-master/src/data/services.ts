/**
 * Service pages for Rukhsar Ahmad — Full-Stack Web Developer specializing in
 * MERN, Next.js and AI Integration.
 *
 * Content rules: every claim must be backed by the real profile
 * (src/data/photographer.ts), real projects (src/data/projects.ts) or real
 * work (blog). No invented clients, results or statistics. Keywords appear
 * naturally, once where they belong — never stuffed.
 */

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  /** Nav / card label */
  name: string;
  /** SEO title (used verbatim — keep the name inside) */
  seoTitle: string;
  /** Meta description */
  description: string;
  /** On-page headline */
  headline: string;
  intro: string[];
  included: string[];
  process: { step: string; detail: string }[];
  stack: string[];
  /** Internal links to real project pages */
  relatedProjects: { label: string; href: string }[];
  /** Internal links to real blog articles */
  relatedPosts?: { label: string; href: string }[];
  faqs: ServiceFaq[];
}

export const services: Service[] = [
  {
    slug: 'mern-stack-development',
    name: 'MERN Development',
    seoTitle: 'MERN Stack Developer | React, Node.js & MongoDB Development — Rukhsar Ahmad',
    description:
      'MERN stack development by Rukhsar Ahmad — full-stack web applications built with React, Node.js, Express and MongoDB, from data model to deployment. See real MERN projects and how I work.',
    headline: 'MERN stack development, from data model to deployment',
    intro: [
      'I build web applications on the MERN stack — MongoDB, Express, React and Node.js — which means one language (JavaScript/TypeScript) across the whole product, one person able to own a feature end-to-end, and no translation loss between the database and the interface.',
      'My MERN work runs from a full e-commerce platform with a compatibility-validating PC builder (Craft PC) to the commerce core of ZYRA, an AI-powered fashion store. I care about the unglamorous parts: a data model that won\'t fight you in six months, APIs that validate input, and authentication that\'s enforced in middleware, not just hidden in the UI.',
    ],
    included: [
      'Full-stack web applications — React front end, Node.js/Express REST API, MongoDB data layer.',
      'E-commerce builds: catalog, cart, checkout, orders and admin dashboards.',
      'Authentication and roles (JWT) enforced server-side.',
      'REST API design with validation and sensible error handling.',
      'Deployment to Firebase, Vercel or Netlify with proper caching.',
    ],
    process: [
      { step: 'Model', detail: 'Design the MongoDB schema around how the app will actually be queried — attributes, relations and validation up front.' },
      { step: 'Build the API', detail: 'Express routes with input validation, consistent error shapes and auth middleware before any UI depends on them.' },
      { step: 'Build the UI', detail: 'React components keyed to the real API shapes — no mock-first drift — with Tailwind for a consistent visual system.' },
      { step: 'Ship & measure', detail: 'Deploy, verify Core Web Vitals, and keep bundles lean with route-level code splitting.' },
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'JWT', 'Tailwind CSS', 'REST APIs'],
    relatedProjects: [
      { label: 'Craft PC — full-stack e-commerce', href: '/project/craft-pc' },
      { label: 'ZYRA — AI-powered MERN e-commerce', href: '/project/zyra' },
    ],
    relatedPosts: [
      { label: 'How I Built a Full-Stack E-commerce Application with MERN', href: '/blog/mern-ecommerce-full-stack' },
      { label: 'Technical SEO Checklist for React Websites', href: '/blog/react-technical-seo-checklist' },
    ],
    faqs: [
      {
        q: 'Why choose the MERN stack for a web application?',
        a: 'One language across front end and back end, a flexible document database, and a huge ecosystem. For products that need fast iteration — stores, dashboards, platforms — it lets a small team move quickly without losing structure.',
      },
      {
        q: 'Do you work alone or with a team?',
        a: 'Both. I currently work as an AI Engineer at Dark Field Tech Lab and take freelance and contract work alongside it. I\'m comfortable owning a feature end-to-end or slotting into an existing codebase.',
      },
      {
        q: 'How do we start a MERN project with you?',
        a: 'Send a short brief through the contact page — what the product does and any deadlines. I\'ll reply within 24–48 hours with how I\'d approach it and what it would take.',
      },
    ],
  },
  {
    slug: 'nextjs-development',
    name: 'Next.js Development',
    seoTitle: 'Next.js Developer | Modern React Applications — Rukhsar Ahmad',
    description:
      'Next.js development by Rukhsar Ahmad — fast, SEO-ready React applications with server rendering, image optimization and clean routing. Built on real production experience with the MERN + Next.js stack.',
    headline: 'Next.js applications that load fast and rank',
    intro: [
      'Next.js is React with the boring-but-critical parts solved: server rendering when SEO matters, image optimization by default, file-based routing and sensible data fetching. I use it when a product needs to be found on Google as well as loved by users.',
      'My Next.js experience spans production front-end work (a Next.js internship at Carbonrepo) and everyday use across the MERN + Next.js stack I work in. When a client needs a marketing site that ranks or an app with real SEO requirements, Next.js is my default recommendation over a plain React SPA.',
    ],
    included: [
      'Next.js applications with App Router, server components and clean data fetching.',
      'SEO-critical builds: metadata API, structured data, sitemaps and Core Web Vitals tuning.',
      'Migration advice: when a React SPA should move to Next.js (and when it shouldn\'t).',
      'Integration with headless CMSs and existing REST APIs.',
    ],
    process: [
      { step: 'Decide the rendering strategy', detail: 'Static, server-rendered or client — per route, based on how the content is consumed.' },
      { step: 'Build', detail: 'App Router with server components by default and client components only where interaction demands them.' },
      { step: 'Tune', detail: 'Image optimization, font strategy, bundle analysis and Lighthouse pass before launch.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Vercel'],
    relatedProjects: [
      { label: 'Portfolio — a fully optimized React build', href: '/portfolio' },
    ],
    relatedPosts: [
      { label: 'Technical SEO Checklist for React Websites', href: '/blog/react-technical-seo-checklist' },
    ],
    faqs: [
      {
        q: 'When should a project use Next.js instead of plain React?',
        a: 'When search visibility, first-paint performance or many distinct pages matter. For a private dashboard behind a login, a React SPA is often simpler. For anything that needs to be found on Google, Next.js pays for itself.',
      },
      {
        q: 'Do you build marketing sites or web apps with Next.js?',
        a: 'Both — marketing sites where SEO is the point, and application features where server rendering improves load times.',
      },
      {
        q: 'Can you migrate an existing React site to Next.js?',
        a: 'Yes — I\'d start with an audit of routes, data fetching and SEO impact, then migrate incrementally rather than rewriting in one jump.',
      },
    ],
  },
  {
    slug: 'ai-integration',
    name: 'AI Integration',
    seoTitle: 'AI Integration Developer | AI-Powered Web Applications — Rukhsar Ahmad',
    description:
      'AI integration for websites and e-commerce by Rukhsar Ahmad — Gemini API and OpenAI API integration, AI shopping assistants and product recommendations grounded in your real product data.',
    headline: 'Practical AI integration for real products',
    intro: [
      'I integrate AI into web applications the way it actually pays off: a language model interpreting what the user wants, and your own data deciding what the answer is. My work covers Gemini API and OpenAI API integration, conversational shopping assistants, and recommendation features that stay connected to the real catalog.',
      'The pattern comes from building ZYRA, an AI-powered fashion store: the AI layer sits on top of a solid commerce core, and every product an AI feature mentions is verified against the database before a shopper sees it. AI that hallucinates products isn\'t a feature — it\'s a support ticket generator.',
    ],
    included: [
      'Gemini API and OpenAI API integration in web applications.',
      'Conversational assistants (shopping assistants, support bots) grounded in your own data.',
      'AI product recommendations connected to the real catalog.',
      'Prompt design, response validation and graceful fallbacks when a model call fails.',
      'Cost and latency discipline: AI on the paths where it adds value, never blocking checkout.',
    ],
    process: [
      { step: 'Find the real use case', detail: 'Where do users currently drop off or ask for help? AI earns its place there — not everywhere.' },
      { step: 'Ground it in your data', detail: 'Model output is constrained to your database or catalog, with validation before anything reaches the user.' },
      { step: 'Ship with fallbacks', detail: 'The product works with AI off. Model calls fail gracefully and never block core flows.' },
    ],
    stack: ['Gemini API', 'OpenAI API', 'Node.js', 'React', 'MongoDB', 'REST APIs'],
    relatedProjects: [
      { label: 'ZYRA — AI-powered MERN e-commerce platform', href: '/project/zyra' },
    ],
    relatedPosts: [
      { label: 'AI API Integration: A Practical Guide for Web Developers', href: '/blog/ai-api-integration-guide' },
      { label: 'How to Add AI Features to a MERN Stack Application', href: '/blog/add-ai-features-mern' },
    ],
    faqs: [
      {
        q: 'Which AI APIs do you work with?',
        a: 'Primarily the Gemini API and OpenAI API. The integration pattern — grounding, validation, fallbacks — matters more than the provider, and both are solid choices.',
      },
      {
        q: 'Will the AI recommend products that don\'t exist in my store?',
        a: 'Not in my implementations. AI output is verified against your real catalog before display — in ZYRA, a suggested product that isn\'t in MongoDB simply doesn\'t render.',
      },
      {
        q: 'Can AI features be added to an existing website?',
        a: 'Yes — most integrations are additive: an API route that talks to the model, a UI surface for it, and validation against your data. An audit of your current stack comes first.',
      },
    ],
  },
  {
    slug: 'wordpress-development',
    name: 'WordPress Development',
    seoTitle: 'WordPress Developer | Custom WordPress Websites — Rukhsar Ahmad',
    description:
      'WordPress development by Rukhsar Ahmad — custom themes, clean builds and integrations for business websites. Based in Lahore, Pakistan, working with clients remotely worldwide.',
    headline: 'Custom WordPress websites without the plugin bloat',
    intro: [
      'WordPress is still the fastest route to a website a non-technical team can actually run. I build custom WordPress sites with the theme doing the work and plugins kept to the few that earn their place — which is what keeps a WordPress site fast two years after launch.',
      'I\'m a WordPress developer based in Lahore, Pakistan, and I work with clients remotely worldwide. Typical builds: business websites, service company sites and content-driven sites where the owner needs to edit pages themselves without breaking the design.',
    ],
    included: [
      'Custom WordPress theme development (or a carefully configured premium theme).',
      'Business and service websites with editable, structured content.',
      'Performance pass: caching, image handling and plugin diet.',
      'Integrations: forms, CRMs, analytics and GoHighLevel workflows.',
    ],
    process: [
      { step: 'Scope', detail: 'Map the pages, who edits what, and which features are genuinely needed.' },
      { step: 'Build', detail: 'Theme or block-based build with a clean template hierarchy and reusable patterns.' },
      { step: 'Harden', detail: 'Performance, security basics and an editing walkthrough so the team can run the site confidently.' },
    ],
    stack: ['WordPress', 'PHP', 'Custom themes', 'Elementor where it helps', 'GoHighLevel', 'SEO basics'],
    relatedProjects: [
      { label: 'IT Services — agency marketing site', href: '/project/it-website-io' },
    ],
    faqs: [
      {
        q: 'Are you a WordPress developer in Lahore?',
        a: 'Yes — I\'m based in Lahore, Pakistan, and work with clients in Lahore and remotely worldwide. Location doesn\'t change the process: clear scope, staged builds, and a site you can edit yourself.',
      },
      {
        q: 'WordPress or Shopify for an online store?',
        a: 'For stores where commerce is the whole business, Shopify usually wins on maintenance. For content-heavy sites with a smaller shop, WordPress with WooCommerce fits better. I build on both — happy to advise per case.',
      },
      {
        q: 'Will I be able to update the site myself?',
        a: 'That\'s the point of WordPress. I structure content so common edits (text, images, pages) are safe, and walk you through them at handover.',
      },
    ],
  },
  {
    slug: 'shopify-development',
    name: 'Shopify Development',
    seoTitle: 'Shopify Developer | Shopify Store Setup & Customization — Rukhsar Ahmad',
    description:
      'Shopify development by Rukhsar Ahmad — store setup, theme customization and conversion-focused storefronts. Clean, fast Shopify builds without unnecessary apps.',
    headline: 'Shopify stores that load fast and sell clearly',
    intro: [
      'Shopify handles the hard commerce plumbing — payments, inventory, security — so the work that differentiates a store is the storefront itself. As a Shopify developer I focus there: theme customization, a product page that answers objections, and an app stack kept deliberately small because every app taxes speed.',
      'A slow, cluttered Shopify store loses more money than it saves from whatever the extra apps promised. My builds start from a fast theme, add only the sections the brand needs, and get measured on load time and checkout clarity.',
    ],
    included: [
      'Store setup and configuration from scratch, or rescue of an overloaded one.',
      'Theme customization to match brand — layouts, product pages, collections.',
      'Conversion-focused product pages: clear media, honest copy structure, friction-free path to checkout.',
      'App audits: keep what pays for itself, replace the rest with theme work.',
    ],
    process: [
      { step: 'Audit', detail: 'Current theme, app list and speed score — decide what stays.' },
      { step: 'Customize', detail: 'Theme sections and templates shaped around the catalog and the buyer\'s decision path.' },
      { step: 'Launch lean', detail: 'Speed check on real devices, mobile-first review, and a handover so the team can run the store.' },
    ],
    stack: ['Shopify', 'Liquid', 'Theme customization', 'Shopify apps', 'Conversion UX'],
    relatedProjects: [
      { label: 'EcoBazar — grocery storefront UX', href: '/project/ecobazar' },
      { label: 'Clothing IO — fashion storefront', href: '/project/clothing-io' },
    ],
    relatedPosts: [
      { label: 'When Should a Business Choose Shopify vs WordPress?', href: '/blog/shopify-vs-wordpress' },
    ],
    faqs: [
      {
        q: 'Do you work with existing Shopify stores or only new ones?',
        a: 'Both. Existing stores often benefit most — an app and speed audit usually pays for itself before any redesign.',
      },
      {
        q: 'Will my Shopify store be mobile-fast?',
        a: 'That\'s a design constraint, not an afterthought: lean theme sections, lazy-loaded media and a minimal app stack, checked on real mid-range phones.',
      },
      {
        q: 'Can you connect Shopify to other tools?',
        a: 'Yes — email, CRM and GoHighLevel automations are common requests and part of my setup work.',
      },
    ],
  },
  {
    slug: 'webflow-development',
    name: 'Webflow Development',
    seoTitle: 'Webflow Developer | Custom Webflow Websites — Rukhsar Ahmad',
    description:
      'Webflow development by Rukhsar Ahmad — pixel-accurate marketing sites with clean interactions, CMS collections and fast hosting, without a maintenance pile of plugins.',
    headline: 'Webflow sites that look like the design file',
    intro: [
      'Webflow sits in a sweet spot: design freedom close to what Figma allows, hosting and CMS included, and no server maintenance. As a Webflow developer I build marketing and business sites that match the design precisely, load fast, and leave the client a CMS they can actually use.',
      'Where Webflow wins is teams that want to iterate on content and layout themselves without filing a dev ticket for every headline. I structure classes, symbols and CMS collections so the site stays clean as it grows.',
    ],
    included: [
      'Custom Webflow builds from Figma designs (or refining an existing site).',
      'CMS collections structured for the content team.',
      'Interactions and micro-animations that don\'t wreck performance.',
      'Migration from WordPress or static HTML where Webflow is the better home.',
    ],
    process: [
      { step: 'Structure first', detail: 'Class naming, breakpoints and CMS collections decided before pixel work.' },
      { step: 'Build', detail: 'Design implemented responsively, with interactions reviewed against load performance.' },
      { step: 'Editor training', detail: 'A walkthrough so the team can publish confidently without breaking layout.' },
    ],
    stack: ['Webflow', 'Figma', 'Webflow CMS', 'Interactions', 'SEO settings'],
    relatedProjects: [
      { label: 'Furniro — furniture showcase', href: '/project/furniro' },
    ],
    faqs: [
      {
        q: 'Webflow or WordPress for a business site?',
        a: 'Webflow when design control and hosting simplicity matter most and the content team is small; WordPress when you need its plugin ecosystem or complex editorial workflows. I build on both and will say honestly which fits.',
      },
      {
        q: 'Can you rebuild my Figma design in Webflow?',
        a: 'That\'s the most common request — yes. I\'ll flag anything in the design that would hurt performance or responsiveness before building it.',
      },
      {
        q: 'Is Webflow good for SEO?',
        a: 'For marketing sites, yes — clean semantic output, easy metadata control and fast hosting cover the technical basics.',
      },
    ],
  },
  {
    slug: 'gohighlevel-development',
    name: 'GoHighLevel Development',
    seoTitle: 'GoHighLevel Developer | Funnels, Automations & Integrations — Rukhsar Ahmad',
    description:
      'GoHighLevel development by Rukhsar Ahmad — funnels, pipelines, automations and website integration for agencies and service businesses, built to match how the business actually runs.',
    headline: 'GoHighLevel funnels and automations that match your process',
    intro: [
      'GoHighLevel is powerful and easy to tangle. As a GoHighLevel developer I set up funnels, pipelines and automations that mirror how a business actually operates — leads land in the right pipeline, follow-ups fire on real triggers, and the website, forms and CRM speak the same language.',
      'Most GHL messes I see come from automations built feature-first instead of process-first. The fix is boring and effective: map the pipeline first, then wire the automations, then test the whole journey like a real lead would experience it.',
    ],
    included: [
      'Funnel and website builds inside GoHighLevel.',
      'Pipeline and opportunity structure mapped to the sales process.',
      'Automations: follow-up sequences, appointment reminders, internal notifications.',
      'Integration between GHL and external sites (WordPress, Shopify, custom apps) via webhooks and forms.',
    ],
    process: [
      { step: 'Map', detail: 'Document the lead journey end-to-end before touching the builder.' },
      { step: 'Build', detail: 'Funnels, forms and automations wired to that map, with naming that a human can maintain.' },
      { step: 'Test like a lead', detail: 'Run a real test lead through every branch and fix what silently breaks.' },
    ],
    stack: ['GoHighLevel', 'Funnels', 'Workflows', 'Webhooks', 'WordPress', 'Shopify'],
    relatedProjects: [
      { label: 'IT Services — agency site', href: '/project/it-website-io' },
    ],
    faqs: [
      {
        q: 'Do you build inside an existing GoHighLevel account?',
        a: 'Yes — including cleaning up accounts with overlapping automations, which is the usual starting point.',
      },
      {
        q: 'Can GoHighLevel connect to my website?',
        a: 'Yes — forms, calendars and webhooks connect GHL to WordPress, Shopify or custom-built sites so leads flow into one pipeline.',
      },
      {
        q: 'How long does a GHL setup take?',
        a: 'A single funnel with automations is typically days; a full agency setup with pipelines and follow-up sequences depends on how many branches the process has.',
      },
    ],
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    seoTitle: 'UI/UX Designer | Figma Design & Design-to-Code — Rukhsar Ahmad',
    description:
      'UI/UX design by Rukhsar Ahmad — Figma design systems, wireframes and design-to-code workflows for web products. Designed by someone who also builds what she designs.',
    headline: 'UI/UX design by someone who ships the code too',
    intro: [
      'I design in Figma and build in React — which changes what I design. Every component I draw has a realistic implementation cost attached, every state (empty, loading, error) gets designed, and the handoff gap between design and code is close to zero because it\'s the same person.',
      'My UI/UX work covers product interfaces, e-commerce browsing experiences and marketing sites — from Rehab Lab\'s healthcare interface to storefronts like Furniro and Clothing IO. The goal is always the same: clarity first, then delight.',
    ],
    included: [
      'Figma design systems: tokens, components and variants your developers can actually use.',
      'Wireframes and flows for new features before pixels.',
      'Design-to-code implementation (Figma → React/Tailwind) as one continuous workflow.',
      'UX reviews of existing products with concrete, prioritized fixes.',
    ],
    process: [
      { step: 'Understand', detail: 'Who uses it, on what device, and what decision they\'re trying to make.' },
      { step: 'Design', detail: 'Wireframes for structure, then high-fidelity components with all states in Figma.' },
      { step: 'Build or hand off', detail: 'Either I implement it (most clients choose this) or hand off a componentized file with specs.' },
    ],
    stack: ['Figma', 'Design systems', 'Prototyping', 'React', 'Tailwind CSS', 'Framer Motion'],
    relatedProjects: [
      { label: 'Clothing IO — fashion storefront', href: '/project/clothing-io' },
      { label: 'StudySync — education platform UI', href: '/project/studysync' },
    ],
    relatedPosts: [
      { label: 'From Figma to React: My UI/UX Development Workflow', href: '/blog/figma-to-react-workflow' },
    ],
    faqs: [
      {
        q: 'Do you only design, or also develop?',
        a: 'Both, and usually together — designing what I\'ll build keeps the result honest to the platform and removes handoff loss entirely.',
      },
      {
        q: 'Can you review my existing product\'s UX?',
        a: 'Yes — I\'ll walk the key flows, note where users lose clarity, and return a prioritized list of concrete fixes rather than general advice.',
      },
      {
        q: 'What do I get at handover if someone else codes it?',
        a: 'A componentized Figma file with variants, states and spacing tokens, plus notes on behavior — the file your developer wishes they had.',
      },
    ],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
