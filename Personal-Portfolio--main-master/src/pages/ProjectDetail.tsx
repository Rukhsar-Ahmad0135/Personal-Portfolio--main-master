import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Github, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getProjectBySlug, getAdjacentProjects } from '@/data/projects';
import { ImageWithLightbox } from '@/components/portfolio/ImageWithLightbox';
import { Lightbox } from '@/components/portfolio/Lightbox';
import { photographerInfo } from '@/data/photographer';
import { SITE_URL, absoluteUrl } from '@/lib/siteConfig';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return <Navigate to="/404" replace />;
  const { prev, next } = getAdjacentProjects(project.slug);

  const openLightbox = (i: number) => {
    setCurrentImageIndex(i);
    setLightboxOpen(true);
  };

  return (
    <>
      <SEOHead
        title={`${project.title} — Case Study`}
        description={project.description}
        image={project.coverImage}
        type="article"
        keywords={[project.title, project.category, ...project.tech, 'Rukhsar Ahmad', 'case study'].join(', ')}
        faqs={[
          {
            q: `What is ${project.title}?`,
            a: `${project.title} is a ${project.category} project built by Rukhsar Ahmad in ${project.year}. ${project.description}`,
          },
          {
            q: `What technologies were used in ${project.title}?`,
            a: `This project was built using: ${project.tech.join(', ')}.`,
          },
          {
            q: `Is ${project.title} available for live viewing?`,
            a: project.liveUrl
              ? 'Yes, you can view the live demo. Source code is also available on GitHub.'
              : 'The project is available with source code on GitHub.',
          },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${SITE_URL}/portfolio` },
              { '@type': 'ListItem', position: 3, name: project.title, item: `${SITE_URL}/project/${project.slug}` },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            headline: project.title,
            description: project.description,
            image: absoluteUrl(project.coverImage),
            url: `${SITE_URL}/project/${project.slug}`,
            dateCreated: project.year,
            genre: project.category,
            keywords: project.tech.join(', '),
            author: {
              '@type': 'Person',
              name: photographerInfo.name,
              url: `${SITE_URL}/about`,
            },
            creator: {
              '@type': 'Person',
              name: photographerInfo.name,
            },
          },
        ]}
      />
      <div className="min-h-screen">
        <motion.div
          className="relative w-full h-[70vh] overflow-hidden bg-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </motion.div>

        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-light">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  <span>{project.year}</span>
                </div>
                <span>•</span>
                <span className="capitalize">{project.category}</span>
                {project.role && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <User className="size-4" />
                      <span>{project.role}</span>
                    </div>
                  </>
                )}
                {project.location && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      <span>{project.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Separator />

            <p className="text-lg md:text-xl font-light leading-relaxed text-foreground">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 border border-border rounded-full text-xs font-light tracking-wide"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-light hover:opacity-90 transition"
                >
                  <ExternalLink className="size-4" /> Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-light hover:bg-accent transition"
                >
                  <Github className="size-4" /> Source
                </a>
              )}
            </div>
          </motion.div>
        </section>

        {project.caseStudy && (
          <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16 border-t border-border space-y-12">
            <ScrollReveal>
              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight">The challenge</h2>
                <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                  {project.caseStudy.challenge}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight">What I built</h2>
                <ul className="space-y-3">
                  {project.caseStudy.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 text-base md:text-lg font-light leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-foreground/40" aria-hidden />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            {project.caseStudy.sections?.map((s) => (
              <ScrollReveal key={s.heading}>
                <div className="space-y-5">
                  <h2 className="text-2xl md:text-3xl font-light tracking-tight">{s.heading}</h2>
                  {s.body.map((p) => (
                    <p key={p.slice(0, 32)} className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </section>
        )}

        <section className="py-12 md:py-16">
          <div className="space-y-8 md:space-y-12">
            {project.images.map((image, index) => (
              <ScrollReveal key={image.id} delay={index * 0.1}>
                <ImageWithLightbox
                  image={image}
                  onClick={() => openLightbox(index)}
                  priority={index === 0}
                  index={0}
                  className="w-full"
                />
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 border-t border-border">
          <div className="flex justify-between items-center gap-4">
            {prev ? (
              <Link
                to={`/project/${prev.slug}`}
                className="group inline-flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
                <span>{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link
                to={`/project/${next.slug}`}
                className="group inline-flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-foreground transition-colors text-right"
              >
                <span>{next.title}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : <span />}
          </div>
        </section>

        <Lightbox
          images={project.images}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
        />
      </div>
    </>
  );
}
