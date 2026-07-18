"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Real 3D "M" — extruded geometry with a glossy metallic-blue material,
 * lit like a Blender studio render (self-contained, no external HDRI).
 * Rotates a full 360° around the X axis (tumbling forward).
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

function MMesh({ spin }: { spin: boolean }) {
  const ref = React.useRef<THREE.Mesh>(null);
  const geometry = React.useMemo(buildMGeometry, []);

  React.useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, dt) => {
    if (ref.current && spin) {
      // full 360° rotation around the X axis (tumble forward)
      ref.current.rotation.x += dt * 0.9;
    }
  });

  return (
    <mesh ref={ref} geometry={geometry} scale={0.9}>
      <meshStandardMaterial
        color="#15294c"
        metalness={0.95}
        roughness={0.22}
        envMapIntensity={1.35}
      />
    </mesh>
  );
}

export type Logo3DProps = {
  className?: string;
  /** continuous X-axis rotation */
  spin?: boolean;
  /** gentle floating bob */
  float?: boolean;
};

export function Logo3D({ className, spin = true, float = true }: Logo3DProps) {
  const content = (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 6, 5]} intensity={2.4} color="#cfe0ff" />
      <directionalLight position={[-6, -3, -4]} intensity={0.9} color="#1d4ed8" />
      <pointLight position={[0, 2, 5]} intensity={26} color="#60a5fa" />

      {/* Self-contained studio reflections (no external assets) */}
      <Environment resolution={128}>
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
          <MMesh spin={spin} />
        </Float>
      ) : (
        <MMesh spin={spin} />
      )}
    </>
  );

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        {content}
      </Canvas>
    </div>
  );
}

export default Logo3D;
