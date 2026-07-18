"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Real, live 3D "M" — extruded geometry with a glossy metallic-blue material,
 * lit like a Blender studio render (self-contained, no external HDRI).
 *
 * Rendered with WebGL so it stays razor-sharp at any size / device-pixel-ratio,
 * and animates on every device (unlike the old alpha-WebM, which iOS can't play
 * and which fell back to a jaggy transparent GIF on mobile).
 */

// Outline of a bold, angular "M" (clockwise, single closed path).
const M_POINTS: [number, number][] = [
  [-2.2, -1.6], // bottom-left outer
  [-2.2, 1.6], // top-left outer
  [-1.0, 1.6], // left column inner top
  [0.0, -0.15], // center top valley
  [1.0, 1.6], // right column inner top
  [2.2, 1.6], // top-right outer
  [2.2, -1.6], // bottom-right outer
  [1.15, -1.6], // right foot inner
  [1.15, 0.55], // right column inner
  [0.0, -0.95], // center bottom valley
  [-1.15, 0.55], // left column inner
  [-1.15, -1.6], // left foot inner
];

function buildMGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(M_POINTS[0][0], M_POINTS[0][1]);
  for (let i = 1; i < M_POINTS.length; i++) {
    shape.lineTo(M_POINTS[i][0], M_POINTS[i][1]);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.95,
    bevelEnabled: true,
    bevelThickness: 0.16,
    bevelSize: 0.14,
    bevelSegments: 5,
    curveSegments: 8,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

/** Tracks the pointer as a normalised (-1..1) target, viewport-relative. */
function usePointerTarget(enabled: boolean) {
  const target = React.useRef({ x: 0, y: 0 });
  React.useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);
  return target;
}

function MMesh({
  spin,
  interactive,
  autoRotate,
}: {
  spin: boolean;
  interactive: boolean;
  autoRotate: number;
}) {
  const group = React.useRef<THREE.Group>(null);
  const mesh = React.useRef<THREE.Mesh>(null);
  const geometry = React.useMemo(buildMGeometry, []);
  const pointer = usePointerTarget(interactive);

  React.useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, dt) => {
    const m = mesh.current;
    if (!m) return;

    if (spin) {
      // Full 360° tumble around the X axis (used for big hero-style renders).
      m.rotation.x += dt * 0.9;
      return;
    }

    // Continuous slow turntable on the outer group (hero centerpiece).
    if (group.current && autoRotate) group.current.rotation.y += autoRotate * dt;

    // Idle mode: keeps the "M" always legible — a gentle rock + float, with an
    // extra tilt toward the cursor on pointer devices. Framerate-independent.
    const t = state.clock.elapsedTime;
    const idleY = autoRotate ? 0 : Math.sin(t * 0.5) * 0.28;
    const idleX = Math.sin(t * 0.7) * 0.05;
    const targetY = idleY + (interactive ? pointer.current.x * 0.5 : 0);
    const targetX = idleX + (interactive ? pointer.current.y * 0.35 : 0);
    m.rotation.y = THREE.MathUtils.damp(m.rotation.y, targetY, 4, dt);
    m.rotation.x = THREE.MathUtils.damp(m.rotation.x, targetX, 4, dt);
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} geometry={geometry} scale={0.9}>
        <meshStandardMaterial
          color="#15294c"
          metalness={0.95}
          roughness={0.22}
          envMapIntensity={1.35}
        />
      </mesh>
    </group>
  );
}

export type Logo3DProps = {
  className?: string;
  /** continuous X-axis tumble (big renders). Off = gentle, legible idle motion. */
  spin?: boolean;
  /** gentle floating bob */
  float?: boolean;
  /** tilt toward the pointer (desktop). Ignored on touch — falls back to idle. */
  interactive?: boolean;
  /** continuous Y-axis turntable speed (rad/s). 0 = gentle rock only. */
  autoRotate?: number;
  /** fired once the WebGL context is created and drawing. */
  onReady?: () => void;
};

export function Logo3D({
  className,
  spin = false,
  float = true,
  interactive = false,
  autoRotate = 0,
  onReady,
}: Logo3DProps) {
  // Lighter settings on phones: fewer environment texels + a lower DPR ceiling
  // keep a small always-on canvas cheap without any visible quality loss.
  const quality = React.useMemo(() => {
    if (typeof window === "undefined") {
      return { dpr: [1, 2] as [number, number], env: 128 };
    }
    const mobile =
      window.matchMedia("(max-width: 768px)").matches ||
      (navigator.maxTouchPoints ?? 0) > 0;
    return mobile
      ? { dpr: [1, 1.75] as [number, number], env: 64 }
      : { dpr: [1, 2] as [number, number], env: 128 };
  }, []);

  const content = (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 6, 5]} intensity={2.4} color="#cfe0ff" />
      <directionalLight position={[-6, -3, -4]} intensity={0.9} color="#1d4ed8" />
      <pointLight position={[0, 2, 5]} intensity={26} color="#60a5fa" />

      {/* Self-contained studio reflections (no external assets) */}
      <Environment resolution={quality.env}>
        <Lightformer
          intensity={2.2}
          position={[0, 2, 4]}
          scale={[7, 7, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={1.4}
          position={[-4, -1, 3]}
          scale={[5, 5, 1]}
          color="#3b82f6"
        />
        <Lightformer
          intensity={1.1}
          position={[4, 1, -3]}
          scale={[5, 5, 1]}
          color="#22d3ee"
        />
      </Environment>

      {float ? (
        <Float speed={2} rotationIntensity={0.15} floatIntensity={0.8}>
          <MMesh spin={spin} interactive={interactive} autoRotate={autoRotate} />
        </Float>
      ) : (
        <MMesh spin={spin} interactive={interactive} autoRotate={autoRotate} />
      )}
    </>
  );

  return (
    <div className={className}>
      <Canvas
        dpr={quality.dpr}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", pointerEvents: "none" }}
        onCreated={() => onReady?.()}
      >
        {content}
      </Canvas>
    </div>
  );
}

export default Logo3D;
