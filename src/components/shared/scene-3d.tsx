"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Ambient depth field — a slowly drifting cloud of blue/cyan points rendered in
 * WebGL, sitting behind the whole site. Additive-blended and low-opacity so it
 * reads as soft bokeh depth, never competing with the content.
 */

const PALETTE = [
  new THREE.Color("#3b82f6"),
  new THREE.Color("#22d3ee"),
  new THREE.Color("#60a5fa"),
  new THREE.Color("#a5b4fc"),
];

function Particles({ count }: { count: number }) {
  const ref = React.useRef<THREE.Points>(null);

  const [positions, colors] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread wide on X/Y, shallow depth so parallax stays gentle.
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      const c = PALETTE[(Math.random() * PALETTE.length) | 0];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, dt) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y += dt * 0.02;
    // Very slight tilt toward the pointer for parallax life.
    p.rotation.x = THREE.MathUtils.damp(
      p.rotation.x,
      state.pointer.y * 0.08,
      2,
      dt
    );
    p.rotation.z = THREE.MathUtils.damp(
      p.rotation.z,
      state.pointer.x * -0.05,
      2,
      dt
    );
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function Scene3D({ count = 180 }: { count?: number }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent", pointerEvents: "none" }}
    >
      <Particles count={count} />
    </Canvas>
  );
}

export default Scene3D;
