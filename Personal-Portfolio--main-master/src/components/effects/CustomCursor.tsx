import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Minimal custom cursor:
 * - small solid dot that tracks precisely
 * - large soft ring that lags behind (spring)
 * - grows on hover over links/buttons via [data-cursor="hover"] or a/button
 * Hidden on touch devices.
 */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 25, stiffness: 250, mass: 0.6 });
  const ringY = useSpring(y, { damping: 25, stiffness: 250, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const isInteractive = !!t?.closest('a, button, [role="button"], [data-cursor="hover"]');
      setHover(isInteractive);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 size-2 rounded-full bg-white mix-blend-difference"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hover ? 1.8 : 1, opacity: hover ? 0.8 : 0.35 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -ml-5 -mt-5 size-10 rounded-full border border-white mix-blend-difference"
      />
    </>
  );
}
