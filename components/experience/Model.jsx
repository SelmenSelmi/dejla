"use client";

import { Float, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

function LuxuryEstateFallback() {
  const windows = useMemo(() => {
    const items = [];
    for (let floor = 0; floor < 3; floor += 1) {
      for (let i = 0; i < 7; i += 1) {
        items.push({ x: -1.15 + i * 0.38, y: 0.05 + floor * 0.36 });
      }
    }
    return items;
  }, []);

  const palms = useMemo(
    () => [
      [-2.4, -0.55, 0.65],
      [2.45, -0.55, 0.55],
      [-2.8, -0.55, -0.75],
      [2.8, -0.55, -0.65],
    ],
    [],
  );

  return (
    <group>
      <mesh receiveShadow position={[0, -0.72, 0]}>
        <boxGeometry args={[5.9, 0.16, 3.45]} />
        <meshStandardMaterial color="#d8c9ad" roughness={0.58} />
      </mesh>

      <mesh
        receiveShadow
        position={[0, -0.62, 1.08]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[3.35, 0.92, 32, 8]} />
        <meshPhysicalMaterial
          color="#4bb7cf"
          roughness={0.06}
          metalness={0.02}
          transmission={0.18}
          transparent
          opacity={0.78}
          clearcoat={1}
        />
      </mesh>

      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.9, 1.35, 1.62]} />
        <meshPhysicalMaterial
          color="#f3efe6"
          roughness={0.2}
          metalness={0.02}
          clearcoat={0.85}
          clearcoatRoughness={0.16}
        />
      </mesh>
      <mesh castShadow position={[0, 0.78, 0]}>
        <boxGeometry args={[3.18, 0.18, 1.86]} />
        <meshStandardMaterial
          color="#171717"
          roughness={0.24}
          metalness={0.42}
        />
      </mesh>

      <mesh castShadow receiveShadow position={[1.85, -0.16, -0.08]}>
        <boxGeometry args={[1.35, 1.0, 1.28]} />
        <meshPhysicalMaterial
          color="#fbf8ef"
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>
      <mesh castShadow position={[1.85, 0.45, -0.08]}>
        <boxGeometry args={[1.56, 0.15, 1.45]} />
        <meshStandardMaterial
          color="#141414"
          roughness={0.28}
          metalness={0.48}
        />
      </mesh>

      <mesh castShadow receiveShadow position={[-1.72, -0.22, -0.18]}>
        <boxGeometry args={[1.12, 0.86, 1.18]} />
        <meshPhysicalMaterial
          color="#eee5d6"
          roughness={0.24}
          clearcoat={0.72}
        />
      </mesh>
      <mesh castShadow position={[-1.72, 0.32, -0.18]}>
        <boxGeometry args={[1.32, 0.14, 1.34]} />
        <meshStandardMaterial
          color="#151515"
          roughness={0.26}
          metalness={0.44}
        />
      </mesh>

      {windows.map((window, index) => (
        <mesh key={index} position={[window.x, window.y, 0.824]}>
          <boxGeometry args={[0.2, 0.22, 0.025]} />
          <meshPhysicalMaterial
            color="#bfe6ff"
            roughness={0.03}
            metalness={0.08}
            transmission={0.28}
            transparent
            opacity={0.72}
            clearcoat={1}
          />
        </mesh>
      ))}

      <mesh castShadow position={[0, -0.18, 0.86]}>
        <boxGeometry args={[0.42, 0.72, 0.035]} />
        <meshPhysicalMaterial
          color="#332211"
          roughness={0.2}
          metalness={0.16}
          clearcoat={0.6}
        />
      </mesh>

      <group position={[0, -0.54, 1.05]}>
        <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.74, 1.8, 96]} />
          <meshStandardMaterial
            color="#d9b765"
            roughness={0.2}
            metalness={0.36}
          />
        </mesh>
      </group>

      {palms.map(([x, y, z], index) => (
        <group
          key={`${x}-${z}`}
          position={[x, y, z]}
          rotation={[0, index * 0.3, 0]}
        >
          <mesh castShadow position={[0, 0.42, 0]}>
            <cylinderGeometry args={[0.035, 0.06, 0.9, 8]} />
            <meshStandardMaterial color="#805735" roughness={0.75} />
          </mesh>
          {[0, 1, 2, 3, 4].map((leaf) => (
            <mesh
              key={leaf}
              castShadow
              position={[0, 0.93, 0]}
              rotation={[0.32, (leaf / 5) * Math.PI * 2, 0.85]}
            >
              <coneGeometry args={[0.07, 0.62, 6]} />
              <meshStandardMaterial
                color={leaf % 2 ? "#405f3f" : "#5c7c42"}
                roughness={0.72}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function GLBModel({ url = "/models/main.glb" }) {
  const { scene } = useGLTF(url);
  const clone = useMemo(() => scene.clone(true), [scene]);

  return <primitive object={clone} dispose={null} />;
}

export const Model = forwardRef(function Model({ useFallback = true }, ref) {
  const group = useRef(null);
  const inner = useRef(null);

  useImperativeHandle(ref, () => group.current, []);

  useFrame(({ clock }) => {
    if (!inner.current) return;
    inner.current.rotation.y += 0.0018;
    inner.current.position.y = Math.sin(clock.elapsedTime * 0.72) * 0.035;
  });

  return (
    <group ref={group} position={[0, -0.05, 0]}>
      <Float speed={1.1} floatIntensity={0.11} rotationIntensity={0.05}>
        <group ref={inner} scale={1.22}>
          {useFallback ? <LuxuryEstateFallback /> : <GLBModel />}
        </group>
      </Float>
    </group>
  );
});
