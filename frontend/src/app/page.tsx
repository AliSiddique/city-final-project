"use client"
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

import {vertexShader} from "../components/vertexShader";
import {fragmentShader} from "../components/fragmentShader";
import Navbar from "@/components/Navbar";

const DPR = 1;

const Raymarching = () => {
  const mesh:any = useRef();
  const { viewport } = useThree();

  const uniforms = {
    uTime: new THREE.Uniform(0.0),
    uResolution: new THREE.Uniform(new THREE.Vector2()),
  };
  
  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
    mesh.current.material.uniforms.uResolution.value = new THREE.Vector2(
      window.innerWidth * DPR,
      window.innerHeight * DPR
    );   
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        key={uuidv4()}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const Scene = () => {
  const text = "Codas for computer vision";

  return (
    <div className="">
   <div className="absolute mx-auto left-0 right-0 max-w-lg text-4xl p-1 font-bold leading-6  z-10">
    <Navbar />
  </div>
    <div className="h-screen relative">
   
    <Canvas camera={{ position: [0, 0, 6] }} dpr={DPR} className="absolute inset-0">
      <Suspense fallback={null}>
        <Raymarching />
      </Suspense>
    </Canvas>
    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden p-1 font-bold leading-6 text-white z-10 mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl  tracking-tight text-transparent md:text-7xl">
      {text.match(/./gu)!.map((char, index) => (
        <span
          className="animate-text-reveal inline-block [animation-fill-mode:backwards]"
          key={`${char}-${index}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  </div>
  </div>
  );
};


export default Scene;
