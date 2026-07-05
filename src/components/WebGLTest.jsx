import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function SpinningCube() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#0055ff" wireframe />
    </mesh>
  );
}

export default function WebGLTest() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#111111] flex flex-col items-center justify-center">
      <h1 className="text-white text-3xl font-bold mb-4 tracking-tighter">WebGL Diagnostics Test</h1>
      <p className="text-white/70 mb-12 max-w-md text-center text-sm leading-relaxed">
        If you can see a spinning blue wireframe cube below, WebGL is successfully enabled on your machine and we can proceed with the full 3D R3F rewrite!
      </p>
      
      <div className="w-[400px] h-[400px] bg-black/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <SpinningCube />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </div>
  );
}
