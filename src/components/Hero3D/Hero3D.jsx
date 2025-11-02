import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Torus, MeshDistortMaterial, Sphere, Float, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import styles from './Hero3D.module.css';

const AnimatedTorus = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
      
      if (hovered) {
        meshRef.current.rotation.y += 0.02;
      }
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <Torus
        ref={meshRef}
        args={[1.8, 0.4, 32, 100]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <MeshDistortMaterial
          color="#667eea"
          attach="material"
          distort={hovered ? 0.6 : 0.4}
          speed={hovered ? 4 : 2}
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Torus>
    </Float>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef();

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 50 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.05, 16, 16]}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
        >
          <meshBasicMaterial
            color={i % 3 === 0 ? "#667eea" : i % 3 === 1 ? "#764ba2" : "#f093fb"}
            transparent
            opacity={0.6}
          />
        </Sphere>
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={2}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#667eea" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#f093fb" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#764ba2"
        castShadow
      />
      
      <Stars 
        radius={100}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <FloatingParticles />
      
      <AnimatedTorus />
      
      {/* Additional decorative spheres */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
        <Sphere args={[0.3, 16, 16]} position={[3, 2, 0]}>
          <meshBasicMaterial color="#f093fb" transparent opacity={0.6} />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
        <Sphere args={[0.2, 16, 16]} position={[-3, -1, 0]}>
          <meshBasicMaterial color="#667eea" transparent opacity={0.6} />
        </Sphere>
      </Float>
    </>
  );
};

const Hero3D = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div 
      className={styles.canvasContainer}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading ECHO Universe...</p>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        onCreated={() => setIsLoading(false)}
        className={styles.canvas}
      >
        <Scene />
      </Canvas>
      
      
    </motion.div>
  );
};

export default Hero3D;