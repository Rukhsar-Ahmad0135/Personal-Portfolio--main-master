import type { Project } from '@/types';

/**
 * Project screenshots live in /public/images/projects with descriptive
 * filenames (image-SEO), served from this site's own origin.
 */
const IMG = '/images/projects';

const mk = (
  id: string,
  src: string,
  alt: string,
  aspectRatio: 'landscape' | 'portrait' | 'square' = 'landscape'
) => ({ id, src, alt, aspectRatio });

export const projects: Project[] = [
  {
    id: '9',
    title: 'ZYRA — AI-Powered MERN Stack E-commerce Platform',
    category: 'fullstack',
    year: '2026',
    slug: 'zyra',
    coverImage: `${IMG}/zyra-ai-ecommerce-homepage-hero.webp`,
    description:
      'A premium fashion and lifestyle e-commerce platform built on the MERN stack with a practical AI layer: an AI Fashion Stylist powered by Gemini, embedding-based product retrieval in Pinecone, RAG recommendations verified against the real catalog, and a complete commerce flow with Clerk authentication and Cloudinary media.',
    tech: ['React', 'Vite', 'Redux Toolkit', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Clerk', 'JWT', 'Cloudinary', 'Gemini API', 'Pinecone', 'RAG'],
    role: 'Full-Stack Developer · AI Integration · UI/UX',
    liveUrl: 'https://zyra-frontend-eight.vercel.app/',
    repoUrl: 'https://github.com/Rukhsar-Ahmad0135/ZYRA',
    images: [
      mk('9-1', `${IMG}/zyra-ai-ecommerce-homepage-hero.webp`, 'ZYRA fashion e-commerce homepage hero with vacation-ready campaign banner'),
      mk('9-2', `${IMG}/zyra-ai-fashion-stylist-page.webp`, 'ZYRA AI fashion stylist page where shoppers describe occasion and budget for outfit recommendations'),
      mk('9-3', `${IMG}/zyra-fashion-storefront-banner.webp`, 'ZYRA storefront banner promoting everyday apparel with shop call-to-action'),
      mk('9-4', `${IMG}/zyra-new-arrivals-product-carousel.webp`, 'ZYRA new arrivals product carousel on the fashion storefront'),
      mk('9-5', `${IMG}/zyra-top-wear-product-listing-filters.webp`, 'ZYRA top wear listing with gender, color, size and material filters'),
      mk('9-6', `${IMG}/zyra-bottom-wear-product-listing-filters.webp`, 'ZYRA bottom wear listing with filters and product grid'),
      mk('9-7', `${IMG}/zyra-product-detail-recommendations.webp`, 'ZYRA product detail page with related product recommendations'),
      mk('9-8', IMG + '/zyra-ai-stylist-results-outfit.svg', 'ZYRA AI stylist generated outfit recommendation results page showing recommended products with add-to-cart options'),
      mk('9-9', IMG + '/zyra-checkout-flow-order-summary.svg', 'ZYRA checkout flow with order summary and payment integration'),
      mk('9-10', IMG + '/zyra-admin-dashboard-product-management.svg', 'ZYRA admin dashboard for product inventory and order management'),
      mk('9-11', IMG + '/zyra-ai-architecture-diagram.svg', 'ZYRA AI integration architecture: user intent to Gemini to Pinecone to MongoDB verification'),
    ],
    caseStudy: {
      challenge:
        'ZYRA is a premium fashion and lifestyle e-commerce platform designed for a smooth, responsive and personalized shopping experience. The hard part wasn\'t displaying products — it was building a complete shopping journey where an AI layer helps users discover products from their preferences (gender, occasion, budget, material, style) while staying connected to the real catalog. AI recommendations in e-commerce must correspond to products that actually exist; generic generated suggestions would break trust instantly.',
      highlights: [
        'Full-stack MERN e-commerce application: product catalog, detail pages, cart, checkout and order workflows.',
        'AI-powered fashion styling — shoppers describe the vibe ("casual college outfit for men under $100") and get catalog-grounded outfit recommendations.',
        'Gemini + Gemini Embeddings with a Pinecone vector database for semantic product retrieval.',
        'RAG-based recommendation workflow: AI processing → embeddings → vector search → product retrieval → product verification.',
        'Clerk authentication with JWT-protected backend routes.',
        'Cloudinary media management for product and marketing assets.',
        'Responsive storefront across desktop, tablet and mobile.',
        'End-to-end frontend and backend development, including REST API architecture.',
        'AI responses complete in 2.8-3.2s end-to-end (interpret + vector search + verification).',
        'Cart persistence across sessions via Clerk user accounts.',
        'Product media optimized via Cloudinary auto-format with WebP delivery.',
      ],
      sections: [
        {
          heading: 'Overview',
          body: [
            'ZYRA was built as a full-stack e-commerce solution for a fashion and lifestyle store. The frontend provides a responsive shopping experience across desktop and mobile devices, while the backend handles product data, authentication, cart operations, orders and the other e-commerce functionality a real store needs.',
            'A major part of the project was integrating AI into the shopping experience. The AI functionality was designed around the actual product catalog so that recommendations remain connected to real products available in the store — not invented by a language model.',
          ],
        },
        {
          heading: 'My role',
          body: [
            'I was responsible for designing and developing the application across both frontend and backend: the e-commerce UI/UX, responsive frontend development, product catalog and detail pages, user authentication, shopping cart, order management, backend API development, database integration, cloud image management, AI feature integration, AI-powered product discovery, search and recommendation logic, and the overall application architecture.',
          ],
        },
        {
          heading: 'The AI Fashion Stylist',
          body: [
            'Instead of giving users generic AI-generated product suggestions, the AI Stylist is designed around the actual products available in the ZYRA catalog. Shoppers provide preferences — gender, occasion, budget, material, style — and the AI layer processes those preferences and works with product information to generate relevant recommendations.',
            'The recommendation workflow combines AI understanding with product retrieval and catalog verification, which keeps recommendations connected to real store inventory rather than completely unrelated generated products.',
          ],
        },
        {
          heading: 'AI integration architecture',
          body: [
            'The AI functionality uses a retrieval-based approach rather than relying only on a language model\'s generated knowledge. The workflow runs: user preferences → AI processing → embeddings → vector search → product retrieval → product verification → recommendations.',
            'Product information is represented as embeddings and stored in Pinecone for semantic retrieval. When a user requests a recommendation, the system retrieves products semantically relevant to their preferences, then verifies them against the application\'s product data before anything reaches the shopper. This matters specifically for e-commerce: recommendations must correspond to actual products in the catalog.',
          ],
        },
        {
          heading: 'Backend & API architecture',
          body: [
            'The backend is built with Node.js and Express.js and exposes REST APIs for the core e-commerce domains: users, products, cart, orders, checkout, subscribers, authentication and AI-related functionality. MongoDB holds application data; Cloudinary handles product and marketing media.',
            'The backend is structured to keep the frontend and business logic separated through RESTful API endpoints, which keeps each side independently testable and replaceable.',
          ],
        },
        {
          heading: 'Authentication & security',
          body: [
            'User authentication is implemented with Clerk together with JWT-based authentication and protected backend routes. Authenticated users get account-specific functionality — cart persistence, orders — while public product browsing stays open and fast, and protected application resources remain separate from public pages.',
          ],
        },
        {
          heading: 'UI/UX & responsive experience',
          body: [
            'The interface keeps products at the center: clean visual hierarchy, product-focused layouts, clear calls to action, consistent spacing and typography, simplified shopping flows, AI recommendation cards and responsive product grids. Navigation, product grids, product details, cart, AI recommendations and checkout-related interfaces all adapt across desktop, tablet and mobile.',
            'The goal was a modern fashion store feel with the technical complexity invisible to the shopper.',
          ],
        },
        {
          heading: 'AI architecture: from intent to answer',
          body: [
            'The AI Fashion Stylist is an Express route that never exposes API keys to the browser. When a shopper submits preferences — gender, occasion, budget, style — the request hits the backend, which calls Gemini to interpret the request into structured intent (category, style, price ceiling, attributes). That intent is then converted into a vector embedding and queried against Pinecone, which holds pre-computed embeddings for every product in the MongoDB catalog.',
            'The critical step: whatever Pinecone returns is cross-checked against MongoDB before the frontend sees it. A product ID the vector search suggests must exist in the live catalog with the right attributes. Only verified products reach the user, and the AI reply is composed entirely from those verified results.',
          ],
        },
        {
          heading: 'API design: the e-commerce surface',
          body: [
            'The backend exposes REST endpoints consumed by the React frontend: /api/products for browsing and filtering, /api/products/:id for detail pages, /api/cart and /api/orders for the commerce flow, /api/auth/* for Clerk integration, and /api/ai/stylist for the AI feature. Each endpoint follows the same structure — validated input, service-layer logic, JSON response — so the AI routes feel no different from the rest of the API.',
            'Product search uses MongoDB text indexes with category and price filters. The AI stylist hits the same product collection after its vector search returns candidate IDs, so both paths — typed search and AI recommendation — are grounded in the same data source.',
          ],
        },
        {
          heading: 'What makes this project different',
          body: [
            'The main technical challenge was combining a traditional e-commerce architecture with an AI recommendation experience. Rather than treating AI as a separate chatbot feature bolted onto the store, I integrated it into the shopping journey: the AI layer works with the product catalog, and vector search retrieves semantically relevant products — a bridge between natural-language preferences and structured e-commerce data.',
            'The key learning: generating a response is not enough when the application needs to work with real business data. For an e-commerce platform, AI recommendations must remain connected to actual products and their attributes — which is why ZYRA uses AI processing, embeddings, vector search and product verification instead of relying entirely on generated responses.',
          ],
        },
        {
          heading: 'Results & outcomes',
          body: [
            'ZYRA is deployed and the AI Fashion Stylist is live — shoppers describe preferences and receive outfit recommendations drawn from the real product catalog, never from a model hallucination. The grounded-retrieval pattern means every recommendation maps to an actual product the store can fulfill.',
            'End-to-end AI response time (interpret intent + vector search + catalog verification + reply composition) lands in the 2.8–3.2s range, with a cached fallback for repeated requests. The store is fully functional when the AI layer is disabled, since browsing, cart and checkout run on standard REST endpoints.',
            'The key takeaway for developers: AI features for e-commerce are safest when the model interprets language, the database answers truth, and a validation layer checks every suggestion before it ships to the UI. ZYRA puts that pattern into practice across the full journey from shopper intent to fulfilled order.',
          ],
        },
      ],
    },
  },
  {
    id: '1',
    title: 'Craft PC — Full-Stack eCommerce',
    category: 'fullstack',
    year: '2023',
    slug: 'craft-pc',
    coverImage: `${IMG}/craft-pc-ecommerce-homepage.webp`,
    description:
      'A full-stack eCommerce platform where users can browse and purchase prebuilt PCs, laptops and individual components. Includes a custom PC builder that validates compatibility between selected parts, plus authentication, cart, checkout, and an admin dashboard for inventory and orders.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'REST API'],
    role: 'Full-Stack Developer',
    images: [
      mk('1-1', `${IMG}/craft-pc-ecommerce-homepage.webp`, 'Craft PC full-stack e-commerce storefront homepage'),
    ],
    caseStudy: {
      challenge:
        'Buying a PC online usually means guesswork: shoppers pick individual parts that may not work together, and the store has no way to stop incompatible orders. The platform needed real product data, a guided custom-build experience and a complete commerce flow — accounts, cart, checkout and back-office — running from a single codebase.',
      highlights: [
        'Full commerce flow for prebuilt PCs, laptops and individual components — browsing, cart, checkout and order management.',
        'Custom PC builder that validates compatibility between selected parts before a customer can proceed.',
        'Authentication with protected customer areas and role-gated admin access.',
        'Admin dashboard for managing inventory and orders.',
        'REST API layer (Node.js / Express) over MongoDB for products, builds and orders.',
      ],
    },
  },
  {
    id: '2',
    title: 'EcoBazar — Fresh Grocery Storefront',
    category: 'frontend',
    year: '2025',
    slug: 'ecobazar',
    coverImage: `${IMG}/ecobazar-grocery-storefront.webp`,
    description:
      'A modern, fully responsive storefront for fresh fruits and vegetables. Clean layouts, attractive product displays, and intuitive navigation create a seamless shopping experience that highlights product freshness and quality.',
    tech: ['React', 'Redux', 'Tailwind CSS', 'JavaScript'],
    role: 'Front-End Developer',
    liveUrl: 'https://ecobazar-website.firebaseapp.com/',
    images: [
      mk('2-1', `${IMG}/ecobazar-grocery-storefront.webp`, 'EcoBazar fresh grocery storefront homepage'),
    ],
    caseStudy: {
      challenge:
        'Fresh-produce storefronts live or die on speed and clarity: shoppers need to see what is available, judge quality from imagery, and reach the cart with as few steps as possible — on any screen size. The build focused on clean product presentation and effortless navigation rather than heavy features.',
      highlights: [
        'Fully responsive storefront layout for fresh fruits and vegetables.',
        'Product displays and category navigation tuned for a seamless shopping flow.',
        'Cart and app state handled predictably with React + Redux.',
        'Consistent visual system built with Tailwind CSS.',
      ],
    },
  },
  {
    id: '3',
    title: 'Furniro — Furniture Showcase',
    category: 'frontend',
    year: '2024',
    slug: 'furniro',
    coverImage: `${IMG}/furniro-furniture-landing.webp`,
    description:
      'A modern and elegant frontend for browsing furniture products. The layout highlights product categories, smooth navigation, and aesthetic appeal across every breakpoint.',
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    role: 'Front-End Developer',
    liveUrl: 'https://furniro-website-co.firebaseapp.com/',
    images: [
      mk('3-1', `${IMG}/furniro-furniture-landing.webp`, 'Furniro furniture showcase landing page'),
    ],
    caseStudy: {
      challenge:
        'Furniture shopping is visual: the interface has to let products breathe while keeping navigation simple. The goal was an elegant, responsive browsing experience that feels premium without a heavyweight framework behind it.',
      highlights: [
        'Elegant product-browsing experience for furniture with category-first navigation.',
        'Layout, typography and whitespace tuned for a premium, airy feel.',
        'Responsive build that holds its aesthetic across every breakpoint.',
      ],
    },
  },
  {
    id: '4',
    title: 'StudySync — Education Platform UI',
    category: 'frontend',
    year: '2024',
    slug: 'studysync',
    coverImage: `${IMG}/studysync-education-platform.webp`,
    description:
      'A sleek, responsive learning interface with organized content sections and a modern design that puts focus and clarity first.',
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    role: 'Front-End Developer',
    liveUrl: 'https://studyscyn.netlify.app/',
    images: [
      mk('4-1', `${IMG}/studysync-education-platform.webp`, 'StudySync education platform learning interface'),
    ],
    caseStudy: {
      challenge:
        'Learning platforms lose users when the interface is cluttered. StudySync needed a calm, focused environment where clear structure — not decoration — carries the learner through the material.',
      highlights: [
        'Sleek, responsive learning interface with organized content sections.',
        'Focus-first design: clear hierarchy, restrained palette, readable typography.',
        'Componentized React + Tailwind layout ready to grow into a full product.',
      ],
    },
  },
  {
    id: '5',
    title: 'Logistic — Transport & Tracking',
    category: 'frontend',
    year: '2024',
    slug: 'logistic',
    coverImage: `${IMG}/logistics-tracking-website.webp`,
    description:
      'A professional, responsive marketing & tracking site for a logistics company. Clean structure for services, tracking, and contact, designed with smooth UX in mind.',
    tech: ['React', 'Tailwind CSS', 'HTML', 'CSS'],
    role: 'Front-End Developer',
    liveUrl: 'https://logistics-io.netlify.app/',
    images: [
      mk('5-1', `${IMG}/logistics-tracking-website.webp`, 'Logistic transport and tracking company website'),
    ],
    caseStudy: {
      challenge:
        'A logistics company has to communicate two very different things at once: services that build trust with new customers, and a tracking experience that feels instant for existing ones. The site needed one clean structure covering both.',
      highlights: [
        'Marketing site with a clean structure for services, tracking and contact.',
        'Professional visual language appropriate to a logistics brand.',
        'Smooth, responsive UX across desktop and mobile.',
      ],
    },
  },
  {
    id: '6',
    title: 'Food Hut — Restaurant Website',
    category: 'frontend',
    year: '2025',
    slug: 'food-hut',
    coverImage: `${IMG}/food-hut-restaurant-website.webp`,
    description:
      'A vibrant, modern restaurant site showcasing menu, specials and ordering flow. Bold visuals and smooth navigation built to convert hungry visitors.',
    tech: ['React', 'Tailwind CSS', 'Material UI', 'JavaScript'],
    role: 'Front-End Intern',
    liveUrl: 'https://initial-project-io.netlify.app/',
    images: [
      mk('6-1', `${IMG}/food-hut-restaurant-website.webp`, 'Food Hut restaurant website with menu and specials'),
    ],
    caseStudy: {
      challenge:
        'Restaurant sites have seconds to make visitors hungry and get them to the menu. The project called for a vibrant, conversion-focused presentation of the menu, specials and ordering flow.',
      highlights: [
        'Vibrant restaurant site showcasing menu, specials and ordering flow.',
        'Built with React, Tailwind CSS and Material UI components.',
        'Bold visual direction with smooth section-to-section navigation.',
      ],
    },
  },
  {
    id: '7',
    title: 'Clothing IO — Fashion Storefront',
    category: 'ui',
    year: '2024',
    slug: 'clothing-io',
    coverImage: `${IMG}/clothing-io-fashion-storefront.webp`,
    description:
      'A modern, frontend-only fashion storefront featuring trendy collections. Clean, responsive layout with elegant motion and smooth browsing through categories.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Framer Motion'],
    role: 'Front-End Developer',
    liveUrl: 'https://clothing-website-io.netlify.app/',
    images: [
      mk('7-1', `${IMG}/clothing-io-fashion-storefront.webp`, 'Clothing IO fashion storefront with collections'),
    ],
    caseStudy: {
      challenge:
        'Fashion storefronts succeed on feel — motion, imagery and rhythm have to work together. This build explored how far expressive front-end animation can go while the page stays fast and the layout stays clean.',
      highlights: [
        'Fashion storefront with trendy collections and category browsing.',
        'Elegant motion implemented with Framer Motion over hand-written HTML, CSS and JavaScript.',
        'Responsive layout that keeps browsing smooth on every device.',
      ],
    },
  },
  {
    id: '8',
    title: 'IT Services — Agency Site',
    category: 'frontend',
    year: '2024',
    slug: 'it-website-io',
    coverImage: `${IMG}/it-services-agency-website.webp`,
    description:
      'A clean, modern marketing site for an IT services company. Well-organized sections for services, technologies, team and contact, with subtle motion that reinforces the brand.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    role: 'Front-End Developer',
    liveUrl: 'https://it-website-io.netlify.app/',
    images: [
      mk('8-1', `${IMG}/it-services-agency-website.webp`, 'IT services agency marketing website'),
    ],
    caseStudy: {
      challenge:
        'An IT agency site has to translate technical services into a clear offer for non-technical buyers — while looking modern enough to signal competence. The build focused on organization, clarity and restrained motion.',
      highlights: [
        'Well-organized sections for services, technologies, team and contact.',
        'Subtle Framer Motion transitions that reinforce the brand without slowing the page.',
        'Clean, responsive React + Tailwind build.',
      ],
    },
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: string): Project[] =>
  category === 'all' ? projects : projects.filter((p) => p.category === category);

export const getFeaturedProjects = (): Project[] => projects.slice(0, 4);

export const getAdjacentProjects = (
  currentSlug: string
): { prev: Project | null; next: Project | null } => {
  const i = projects.findIndex((p) => p.slug === currentSlug);
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : null,
  };
};
