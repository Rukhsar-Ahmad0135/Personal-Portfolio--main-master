import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { CountdownLoader } from './CountdownLoader';
import { StaticLaptopPreview } from './StaticLaptopPreview';
import furniro from '@/assets/project-screens/furniro-furniture-website-screenshot.webp';
import furniroFull from '@/assets/project-screens/furniro-furniture-website-screenshot.webp';
import studysync from '@/assets/project-screens/studysync-education-website-screenshot.webp';
import logistic from '@/assets/project-screens/logistics-website-screenshot.webp';
import clothing from '@/assets/project-screens/clothing-io-fashion-website-screenshot.webp';

// The 3D scene pulls in react-three-fiber + drei + three. Code-split so it
// doesn't block the initial page load — only fetch when the section is
// approaching the viewport so we don't pay the cost on users who bounce.
const FloatingLaptop = lazy(() =>
  import('./FloatingLaptop').then((m) => ({ default: m.FloatingLaptop })),
);

const SCREEN_SRCS = [furniroFull, studysync, logistic, clothing];

async function decodeAll(srcs: string[]): Promise<void> {
  await Promise.all(
    srcs.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = 'async';
          img.src = src;
          const done = () => resolve();
          img
            .decode?.()
            .then(done)
            .catch(done) ?? img.addEventListener('load', done);
          img.addEventListener('error', done);
        }),
    ),
  );
}

/**
 * Renders the laptop section with a countdown loader overlaid on the
 * screen area. When the countdown hits 100%, the 3D laptop appears.
 */
export function LaptopStage() {
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const chunkPromise = import('./FloatingLaptop');
    const texturesPromise = decodeAll(SCREEN_SRCS);
    Promise.all([chunkPromise, texturesPromise]).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [inView]);

  return (
    <div ref={wrapRef} className="relative w-full">
      {!ready ? (
        <CountdownLoader duration={3000} onComplete={() => setReady(true)} />
      ) : (
        <Suspense fallback={<CountdownLoader duration={3000} />}>
          <FloatingLaptop />
        </Suspense>
      )}
    </div>
  );
}

// Re-export for potential preloading elsewhere.
export { furniroFull as laptopPreviewImage };
export const laptopWebpSrcset = furniro;
