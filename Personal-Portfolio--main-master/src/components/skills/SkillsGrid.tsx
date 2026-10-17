import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * Floating 3D-rotating skill icons — no cards, no borders, no backgrounds.
 * Each icon continuously rotates in 3D space and reacts to cursor tilt.
 */
type Skill = { name: string; icon: string; color: string };

const SI = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`;

const SKILLS: Skill[] = [
  { name: 'React', icon: SI('react', '#61DAFB'), color: '#61DAFB' },
  { name: 'Next.js', icon: SI('nextdotjs', '#ffffff'), color: '#ffffff' },
  { name: 'TypeScript', icon: SI('typescript', '#3178C6'), color: '#3178C6' },
  { name: 'Node.js', icon: SI('nodedotjs', '#539E43'), color: '#539E43' },
  { name: 'Express', icon: SI('express', '#ffffff'), color: '#ffffff' },
  { name: 'MongoDB', icon: SI('mongodb', '#47A248'), color: '#47A248' },
  { name: 'Tailwind', icon: SI('tailwindcss', '#38BDF8'), color: '#38BDF8' },
  { name: 'Redux', icon: SI('redux', '#764ABC'), color: '#764ABC' },
  { name: 'Firebase', icon: SI('firebase', '#FFCA28'), color: '#FFCA28' },
  { name: 'Python', icon: SI('python', '#3776AB'), color: '#3776AB' },
  { name: 'Figma', icon: SI('figma', '#F24E1E'), color: '#F24E1E' },
  { name: 'WordPress', icon: SI('wordpress', '#21759B'), color: '#21759B' },
  { name: 'Shopify', icon: SI('shopify', '#96BF48'), color: '#96BF48' },
  { name: 'Webflow', icon: SI('webflow', '#4353FF'), color: '#4353FF' },
  { name: 'GoHighLevel', icon: SI('leadpages', '#0284C7'), color: '#0EA5E9' },
  { name: 'Git', icon: SI('git', '#F05032'), color: '#F05032' },
  { name: 'GitHub', icon: SI('github', '#ffffff'), color: '#ffffff' },
  { name: 'Postman', icon: SI('postman', '#FF6C37'), color: '#FF6C37' },
];

function FloatingIcon({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-50, 50], [20, -20]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-20, 20]), {
    stiffness: 150,
    damping: 15,
  });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  // Stagger a continuous Y-axis rotation per icon so the grid feels alive.
  const spinDuration = 8 + (index % 5) * 1.5;
  const floatDelay = (index % 6) * 0.3;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ perspective: 1000 }}
      className="group flex flex-col items-center justify-center gap-3"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* Continuous floating + spin */}
        <motion.div
          animate={{
            rotateY: [0, 360],
            y: [0, -8, 0],
          }}
          transition={{
            rotateY: { duration: spinDuration, repeat: Infinity, ease: 'linear' },
            y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
          }}
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.25 }}
          className="relative"
        >
          {/* Colored glow behind the icon */}
          <div
            aria-hidden
            className="absolute inset-0 blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-500"
            style={{ backgroundColor: skill.color, borderRadius: '50%' }}
          />
          <img
            src={skill.icon}
            alt={skill.name}
            loading="lazy"
            decoding="async"
            className="relative w-14 h-14 md:w-16 md:h-16"
            style={{
              filter: `drop-shadow(0 8px 16px ${skill.color}55) drop-shadow(0 0 4px ${skill.color}88)`,
            }}
          />
        </motion.div>
      </motion.div>
      <span className="text-xs md:text-sm font-light tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">
        {skill.name}
      </span>
    </motion.div>
  );
}

export function SkillsGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 md:gap-10 py-6">
      {SKILLS.map((s, i) => (
        <FloatingIcon key={s.name} skill={s} index={i} />
      ))}
    </div>
  );
}
