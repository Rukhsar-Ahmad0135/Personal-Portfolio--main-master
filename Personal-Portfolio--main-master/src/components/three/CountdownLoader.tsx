import { useEffect, useState } from 'react';

interface CountdownLoaderProps {
  duration?: number;
  onComplete?: () => void;
}

/**
 * Full-page countdown loader (0-100%) inspired by Spasoje Perovic's
 * dot-matrix loading animation. Shows a large dot-grid percentage
 * number with a subtle arrow and "FAKE LOADING..." label.
 */
export function CountdownLoader({ duration = 3000, onComplete }: CountdownLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        onComplete?.();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, onComplete]);

  // Dot-matrix digits (0-9) — each is a 5x7 grid of dots
  const DIGITS: Record<string, string[]> = {
    '0': [
      '█████',
      '█   █',
      '█   █',
      '█   █',
      '█   █',
      '█   █',
      '█████',
    ],
    '1': [
      '  ██ ',
      '  ██ ',
      '  ██ ',
      '  ██ ',
      '  ██ ',
      '  ██ ',
      '  ██ ',
    ],
    '2': [
      '█████',
      '    █',
      '    █',
      '█████',
      '█    ',
      '█    ',
      '█████',
    ],
    '3': [
      '█████',
      '    █',
      '    █',
      '  ███',
      '    █',
      '    █',
      '█████',
    ],
    '4': [
      '█   █',
      '█   █',
      '█   █',
      '█████',
      '    █',
      '    █',
      '    █',
    ],
    '5': [
      '█████',
      '█    ',
      '█    ',
      '█████',
      '    █',
      '    █',
      '█████',
    ],
    '6': [
      '█████',
      '█    ',
      '█    ',
      '█████',
      '█   █',
      '█   █',
      '█████',
    ],
    '7': [
      '█████',
      '    █',
      '    █',
      '   █ ',
      '  █  ',
      '  █  ',
      '  █  ',
    ],
    '8': [
      '█████',
      '█   █',
      '█   █',
      '█████',
      '█   █',
      '█   █',
      '█████',
    ],
    '9': [
      '█████',
      '█   █',
      '█   █',
      '█████',
      '    █',
      '    █',
      '█████',
    ],
    '%': [
      '██  █',
      '█  ██',
      '  ██ ',
      '  ██ ',
      '  ██ ',
      '█  ██',
      '██  █',
    ],
  };

  const digits = String(progress).padStart(2, '0').split('').concat(['%']);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#f4f4f2] rounded-2xl">
      <div className="flex flex-col items-center gap-8">
        {/* FAKE LOADING label - top right */}
        <p className="absolute top-6 right-6 text-[10px] tracking-[0.3em] uppercase text-black/40">
          FAKE LOADING...
        </p>

        {/* Dot-matrix percentage - center */}
        <div className="flex items-start gap-4">
          {digits.map((d, i) => (
            <div key={i} className="flex flex-col items-center">
              {DIGITS[d]?.map((row, r) => (
                <div key={r} className="flex gap-1.5">
                  {row.split('').map((dot, c) => (
                    <span
                      key={c}
                      className={`size-2 rounded-full transition-colors duration-300 ${
                        dot === '█' ? 'bg-black' : 'bg-black/15'
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Dotted arrow - bottom left */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2 text-black/40">
          <div className="flex items-center">
            <span className="size-2 rounded-full bg-black/40" />
            <span className="size-2 rounded-full bg-black/40 mx-1" />
            <span className="size-2 rounded-full bg-black/40" />
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase">SP•DEV</span>
        </div>
      </div>
    </div>
  );
}