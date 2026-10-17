/**
 * Core TypeScript interfaces for Rukhsar Ahmad — Developer Portfolio
 */

export type ProjectCategory = 'fullstack' | 'frontend' | 'ui';

export type AspectRatio = 'portrait' | 'landscape' | 'square';

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio: AspectRatio;
  caption?: string;
}

/**
 * Written case-study content for a project.
 * Only factual, implemented functionality belongs here — no invented metrics.
 */
export interface ProjectCaseStudy {
  /** The problem the project solves and why it was hard. */
  challenge: string;
  /** Bullet points of implemented, shipped functionality. */
  highlights: string[];
  /** Long-form sections for in-depth case studies. */
  sections?: { heading: string; body: string[] }[];
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  coverImage: string;
  images: ProjectImage[];
  description: string;
  tech: string[];
  role?: string;
  liveUrl?: string;
  repoUrl?: string;
  location?: string;
  client?: string;
  camera?: string;
  slug: string;
  caseStudy?: ProjectCaseStudy;
}

export interface PhotographerInfo {
  name: string;
  tagline: string;
  heroIntroduction: string;
  biography: string;
  approach: string;
  awards: string[];
  clients: string[];
  education: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
  portraitImage: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  projectType: 'web' | 'fullstack' | 'aiml' | 'other';
  message: string;
  timestamp: Date;
}
