import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const s = photographerInfo.socialLinks;

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground font-light tracking-wide">
            © {currentYear} {photographerInfo.name}. Built with React, Vite & Tailwind.
          </p>
          <div className="flex items-center gap-6">
            {s.github && (
              <a href={s.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="size-5" />
              </a>
            )}
            {s.linkedin && (
              <a href={s.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="size-5" />
              </a>
            )}
            {s.instagram && (
              <a href={s.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="size-5" />
              </a>
            )}
            <a href={`mailto:${photographerInfo.email}`} aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
