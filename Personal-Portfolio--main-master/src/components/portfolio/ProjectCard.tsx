import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  showCategory?: boolean;
  index?: number;
}

/**
 * Project card with 3D flip on hover — front shows the cover image,
 * back reveals the project title, year and a "View Website" CTA.
 */
export function ProjectCard({
  project,
  aspectRatio,
  showCategory = true,
  index = 0,
}: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const ratio = aspectRatio || 'landscape';

  const aspectRatioClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[3/2]',
    square: 'aspect-square',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn('group relative w-full', aspectRatioClasses[ratio])}
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:rotateY(180deg)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT — cover image */}
        <Link
          to={`/project/${project.slug}`}
          className="absolute inset-0 block overflow-hidden rounded-sm bg-muted"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {!isLoaded && <div className="absolute inset-0 bg-muted" />}
          <img
            src={project.coverImage}
            alt={project.images[0]?.alt || `${project.title} — project cover`}
            className={cn(
              'absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0',
              isLoaded ? 'opacity-100' : 'opacity-0',
            )}
            loading={index < 3 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'auto'}
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-transparent" />
        </Link>

        {/* BACK — title, year, view website CTA */}
        <div
          className="absolute inset-0 rounded-sm bg-black text-white p-6 md:p-8 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex items-start justify-between gap-4">
            {showCategory && (
              <span className="text-xs uppercase tracking-[0.25em] font-light text-white/60">
                {project.category}
              </span>
            )}
            <span className="text-xs uppercase tracking-[0.25em] font-light text-white/60">
              {project.year}
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-light tracking-tight leading-tight">
              {project.title}
            </h3>

            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs md:text-sm font-light hover:bg-white/90 transition-colors"
                >
                  View Website <ArrowUpRight className="size-3.5" />
                </a>
              )}
              <Link
                to={`/project/${project.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-xs md:text-sm font-light hover:bg-white hover:text-black transition-colors"
              >
                Case Study
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
