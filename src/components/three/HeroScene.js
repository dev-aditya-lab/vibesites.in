"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import Canvas3DErrorBoundary from "./Canvas3DErrorBoundary";

/** Procedural, brand-toned abstract sculpture — no external model dependency. */
function Sculpture() {
  const group = useRef(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    // Gentle parallax toward pointer, damped — never hijacks scroll or clicks.
    target.current.x = state.pointer.x * 0.25;
    target.current.y = state.pointer.y * 0.15;
    if (group.current) {
      group.current.rotation.y += (target.current.x - group.current.rotation.y) * 0.03;
      group.current.rotation.x += (-target.current.y - group.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
        <mesh position={[0, 0, 0]} castShadow>
          <icosahedronGeometry args={[1.05, 1]} />
          <MeshDistortMaterial
            color="#1f7e72"
            roughness={0.4}
            metalness={0.25}
            distort={0.22}
            speed={1.6}
            flatShading
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1} floatIntensity={1.6}>
        <mesh position={[1.7, 1.1, -0.6]} rotation={[0.4, 0.2, 0]}>
          <torusGeometry args={[0.42, 0.13, 24, 80]} />
          <meshStandardMaterial color="#a97b2e" roughness={0.3} metalness={0.5} />
        </mesh>
      </Float>

      <Float speed={2.1} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[-1.6, -0.9, -0.3]}>
          <icosahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial color="#14110c" roughness={0.6} metalness={0.1} wireframe />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.2}>
        <mesh position={[-1.1, 1.3, -0.8]}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#1f7e72" roughness={0.2} metalness={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

/** Fully procedural lighting rig — no environment map / remote HDRI fetch, so
 *  the scene never depends on third-party network resources to render. */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 4, 3]} intensity={1.3} />
      <directionalLight position={[-3, 1, 2]} intensity={0.4} color="#fdf3ee" />
      <pointLight position={[-3, -2, -2]} intensity={1} color="#a97b2e" />
      <pointLight position={[2, -3, 2]} intensity={0.5} color="#1f7e72" />
    </>
  );
}

export default function HeroScene({ className }) {
  const dpr = useMemo(() => (typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1), []);

  return (
    <div className={className} aria-hidden="true">
      <Canvas3DErrorBoundary>
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0, 6.4], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ pointerEvents: "none" }}
        >
          <Lights />
          <Sculpture />
        </Canvas>
      </Canvas3DErrorBoundary>
    </div>
  );
}
