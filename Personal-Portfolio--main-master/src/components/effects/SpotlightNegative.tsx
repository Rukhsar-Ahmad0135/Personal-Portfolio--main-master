import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface SpotlightNegativeProps {
  src: string;
  alt: string;
  className?: string;
  radius?: number;
}

/**
 * Image with a cursor-follow "negative lens" reveal.
 * Shared between the Home hero photo and the About portrait.
 */
export function SpotlightNegative({
  src,
  alt,
  className = 'w-[30rem] md:w-[48rem] lg:w-[62rem] xl:w-[72rem]',
  radius = 60,
}: SpotlightNegativeProps) {
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const sx = useSpring(mx, { stiffness: 300, damping: 30, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 300, damping: 30, mass: 0.4 });

  const mask = useTransform(
    [sx, sy] as never,
    ([x, y]: number[]) =>
      `radial-gradient(circle ${radius}px at ${x}px ${y}px, #000 0%, #000 60%, transparent 100%)`,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseLeave={() => {
        mx.set(-9999);
        my.set(-9999);
      }}
      className={`relative select-none mx-auto ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-auto object-contain drop-shadow-xl pointer-events-none"
        draggable={false}
      />
      <motion.img
        src={src}
        aria-hidden
        style={{
          WebkitMaskImage: mask as unknown as string,
          maskImage: mask as unknown as string,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          filter: 'invert(1) hue-rotate(180deg)',
        }}
        className="absolute inset-0 w-full h-auto object-contain pointer-events-none"
        draggable={false}
      />
    </motion.div>
  );
}
