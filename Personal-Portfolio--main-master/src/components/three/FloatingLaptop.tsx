import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, useTexture } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState, type MutableRefObject } from 'react';
import { ClampToEdgeWrapping, LinearFilter, SRGBColorSpace } from 'three';
import type { Group, MeshBasicMaterial } from 'three';
import furniro from '@/assets/project-screens/furniro-furniture-website-screenshot.webp';
import logistic from '@/assets/project-screens/logistics-website-screenshot.webp';
import studyscyn from '@/assets/project-screens/studysync-education-website-screenshot.webp';
import clothing from '@/assets/project-screens/clothing-io-fashion-website-screenshot.webp';

const SHOTS = [
  { url: furniro, title: 'Furniro' },
  { url: studyscyn, title: 'StudySync' },
  { url: logistic, title: 'Logistic' },
  { url: clothing, title: 'Clothing IO' },
];

const SHOT_URLS = SHOTS.map((shot) => shot.url);

function ProjectScreen({ width, height }: { width: number; height: number }) {
  const textures = useTexture(SHOT_URLS);
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const fade = useRef(1);
  const currentMaterial = useRef<MeshBasicMaterial>(null);
  const previousMaterial = useRef<MeshBasicMaterial>(null);

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = SRGBColorSpace;
      texture.wrapS = ClampToEdgeWrapping;
      texture.wrapT = ClampToEdgeWrapping;
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;

      const image = texture.image as { width?: number; height?: number } | undefined;
      const imageWidth = image?.width ?? 0;
      const imageHeight = image?.height ?? 0;

      if (imageWidth > 0 && imageHeight > 0) {
        const imageAspect = imageWidth / imageHeight;
        const screenAspect = width / height;

        if (imageAspect > screenAspect) {
          const repeatX = screenAspect / imageAspect;
          texture.repeat.set(repeatX, 1);
          texture.offset.set((1 - repeatX) / 2, 0);
        } else {
          const repeatY = imageAspect / screenAspect;
          texture.repeat.set(1, repeatY);
          texture.offset.set(0, (1 - repeatY) / 2);
        }
      }

      texture.needsUpdate = true;
    });
  }, [height, textures, width]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIdx((current) => {
        setPrevIdx(current);
        fade.current = 0;
        return (current + 1) % SHOTS.length;
      });
    }, 3000);

    return () => window.clearInterval(id);
  }, []);

  useFrame((_, delta) => {
    fade.current = Math.min(1, fade.current + delta * 2.2);
    if (currentMaterial.current) currentMaterial.current.opacity = fade.current;
    if (previousMaterial.current) previousMaterial.current.opacity = 1 - fade.current;
  });

  return (
    <group>
      <mesh position={[0, 0, 0.019]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial ref={previousMaterial} map={textures[prevIdx]} transparent opacity={0} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.021]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial ref={currentMaterial} map={textures[idx]} transparent opacity={1} toneMapped={false} />
      </mesh>
    </group>
  );
}

/**
 * Realistic MacBook-like laptop.
 * Rotation is driven by CLICK + DRAG (pointer down on the canvas).
 * Screen shows an auto-scrolling horizontal marquee of project images.
 */
function Laptop({ target }: { target: MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<Group>(null);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const k = Math.min(1, dt * 5);
    g.rotation.y += (target.current.x - g.rotation.y) * k;
    g.rotation.x += (target.current.y - g.rotation.x) * k;
  });

  // dimensions
  const W = 3.6;
  const D = 2.5;
  const BASE_H = 0.09;
  const SCR_W = 3.55;
  const SCR_H = 2.22;
  const DISPLAY_W = 3.38;
  const DISPLAY_H = 2.04;

  return (
    <group ref={group}>
      {/* Base (aluminum body) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, BASE_H, D]} />
        <meshStandardMaterial color="#c8ccd1" metalness={0.85} roughness={0.32} />
      </mesh>
      {/* Slightly darker top plate (keyboard deck) */}
      <mesh position={[0, BASE_H / 2 + 0.001, 0]} receiveShadow>
        <boxGeometry args={[W - 0.04, 0.005, D - 0.04]} />
        <meshStandardMaterial color="#b7bcc2" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* Keyboard well (recessed dark area) */}
      <mesh position={[0, BASE_H / 2 + 0.004, -0.15]}>
        <boxGeometry args={[W - 0.5, 0.006, D - 1.1]} />
        <meshStandardMaterial color="#1a1a1c" metalness={0.5} roughness={0.75} />
      </mesh>

      {/* Individual keys — subtle grid */}
      {(() => {
        const rows = 5;
        const cols = 14;
        const kw = 0.18;
        const kh = 0.16;
        const gap = 0.03;
        const gridW = cols * kw + (cols - 1) * gap;
        const gridD = rows * kh + (rows - 1) * gap;
        const startX = -gridW / 2 + kw / 2;
        const startZ = -0.15 - gridD / 2 + kh / 2;
        const keys = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            keys.push(
              <mesh
                key={`${r}-${c}`}
                position={[startX + c * (kw + gap), BASE_H / 2 + 0.012, startZ + r * (kh + gap)]}
              >
                <boxGeometry args={[kw, 0.016, kh]} />
                <meshStandardMaterial color="#111114" metalness={0.35} roughness={0.7} />
              </mesh>
            );
          }
        }
        return keys;
      })()}

      {/* Trackpad */}
      <mesh position={[0, BASE_H / 2 + 0.003, 0.82]}>
        <boxGeometry args={[1.4, 0.006, 0.78]} />
        <meshStandardMaterial color="#9aa0a6" metalness={0.7} roughness={0.28} />
      </mesh>

      {/* Screen assembly — rebuilt so the project image is the actual screen surface */}
      <group position={[0, BASE_H / 2, -D / 2 + 0.03]} rotation={[-0.16, 0, 0]}>
        <group position={[0, SCR_H / 2, 0]}>
          {/* Screen back (aluminum) */}
          <mesh position={[0, 0, -0.04]} castShadow>
            <boxGeometry args={[SCR_W, SCR_H, 0.06]} />
            <meshStandardMaterial color="#c8ccd1" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* Thin black screen frame */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[SCR_W - 0.02, SCR_H - 0.02, 0.02]} />
            <meshStandardMaterial color="#0a0a0c" metalness={0.5} roughness={0.55} />
          </mesh>
          {/* Full display panel */}
          <mesh position={[0, 0, 0.014]}>
            <planeGeometry args={[DISPLAY_W, DISPLAY_H]} />
            <meshBasicMaterial color="#050507" />
          </mesh>

          <ProjectScreen width={DISPLAY_W} height={DISPLAY_H} />

        </group>
      </group>
    </group>
  );
}

export function FloatingLaptop() {
  const target = useRef({ x: 0, y: 0 });
  const drag = useRef({ active: false, lx: 0, ly: 0 });

  return (
    <div
      className="relative w-full h-[70vh] md:h-[85vh] select-none touch-none"
      style={{ cursor: 'grab' }}
      onPointerDown={(e) => {
        drag.current.active = true;
        drag.current.lx = e.clientX;
        drag.current.ly = e.clientY;
        (e.currentTarget as HTMLDivElement).style.cursor = 'grabbing';
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current.active) return;
        const dx = e.clientX - drag.current.lx;
        const dy = e.clientY - drag.current.ly;
        drag.current.lx = e.clientX;
        drag.current.ly = e.clientY;
        target.current.x += dx * 0.008;
        target.current.y += dy * 0.005;
        // clamp tilt
        target.current.y = Math.max(-0.6, Math.min(0.6, target.current.y));
      }}
      onPointerUp={(e) => {
        drag.current.active = false;
        (e.currentTarget as HTMLDivElement).style.cursor = 'grab';
      }}
      onPointerLeave={(e) => {
        drag.current.active = false;
        (e.currentTarget as HTMLDivElement).style.cursor = 'grab';
      }}
    >
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.4, 6], fov: 32 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 7, 4]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-5, 3, -3]} intensity={0.4} color="#a3c1ff" />
        <Suspense fallback={null}>
          <Float speed={1.05} rotationIntensity={0.08} floatIntensity={0.45}>
            <Laptop target={target} />
          </Float>
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.55}
            scale={10}
            blur={2.8}
            far={4}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/50">
        Click &amp; drag to rotate
      </div>
    </div>
  );
}
