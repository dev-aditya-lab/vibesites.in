"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import Canvas3DErrorBoundary from "./Canvas3DErrorBoundary";

function SpinningShard() {
  const mesh = useRef(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.5;
    mesh.current.rotation.y += delta * 0.7;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.15, 1]} />
      <MeshDistortMaterial color="#1f7e72" roughness={0.35} metalness={0.3} distort={0.3} speed={2.2} flatShading />
    </mesh>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 3, 3]} intensity={1.4} />
      <pointLight position={[-2, -1, 2]} intensity={0.9} color="#a97b2e" />
    </>
  );
}

/** Small, self-contained loader centerpiece — no remote assets, safe to fail silently. */
export default function LoaderScene({ className }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas3DErrorBoundary>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ pointerEvents: "none" }}
        >
          <Lights />
          <SpinningShard />
        </Canvas>
      </Canvas3DErrorBoundary>
    </div>
  );
}
