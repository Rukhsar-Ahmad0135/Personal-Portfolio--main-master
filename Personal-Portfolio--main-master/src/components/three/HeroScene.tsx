import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron, TorusKnot, Sphere, Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import type { Mesh } from 'three';

function Blob() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1.35, 4]}>
        <MeshDistortMaterial
          color="#f59e0b"
          emissive="#7c2d12"
          emissiveIntensity={0.25}
          distort={0.45}
          speed={1.6}
          roughness={0.15}
          metalness={0.85}
        />
      </Icosahedron>
    </Float>
  );
}

function Orbiters() {
  return (
    <>
      <Float speed={2.2} rotationIntensity={1} floatIntensity={2}>
        <TorusKnot args={[0.35, 0.11, 128, 16]} position={[2, 1.1, -0.5]}>
          <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.9} />
        </TorusKnot>
      </Float>
      <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.6}>
        <Sphere args={[0.28, 32, 32]} position={[-2.1, -0.9, 0.4]}>
          <meshStandardMaterial color="#6366f1" roughness={0.1} metalness={1} />
        </Sphere>
      </Float>
      <Float speed={1.9} rotationIntensity={0.5} floatIntensity={1.4}>
        <Icosahedron args={[0.32, 0]} position={[-1.8, 1.6, -0.4]}>
          <meshStandardMaterial color="#10b981" roughness={0.25} metalness={0.7} flatShading />
        </Icosahedron>
      </Float>
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -3, -3]} intensity={0.6} color="#ec4899" />
        <Blob />
        <Orbiters />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
