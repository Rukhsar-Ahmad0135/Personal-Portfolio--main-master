/**
 * Lightweight static laptop preview — pure CSS/DOM, no WebGL.
 * Rendered instantly on first paint so the section has a real visual
 * before the 3D scene (react-three-fiber + drei + three) finishes loading
 * and all screen textures finish decoding.
 */
export function StaticLaptopPreview({ screenSrc }: { screenSrc: string }) {
  return (
    <div
      className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-center select-none pointer-events-none"
      aria-hidden
    >
      <div className="relative w-[min(88vw,880px)]">
        {/* Screen */}
        <div className="relative rounded-t-xl bg-[#0a0a0c] p-[10px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-[#050507]">
            <img
              src={screenSrc}
              alt=""
              width={1600}
              height={1000}
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          </div>
        </div>
        {/* Base */}
        <div className="relative mx-auto -mt-[2px] h-[14px] w-[102%] rounded-b-[14px] bg-gradient-to-b from-[#c8ccd1] to-[#9aa0a6]" />
        <div className="mx-auto mt-[1px] h-[6px] w-[22%] rounded-b-[6px] bg-[#7d8288]" />
      </div>
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-black/40">
        Warming up 3D…
      </div>
    </div>
  );
}
