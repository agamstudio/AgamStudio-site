import { useState, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { X, User, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import * as THREE from "three";

// Minecraft Steve skin texture (base64 encoded simple version)
const SkinModel = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle idle animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  const skinColor = "#3a7d44";
  const shirtColor = "#1a1a2e";
  const pantsColor = "#16213e";
  const skinTone = "#c69c6d";

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* Head */}
      <mesh position={[0, 1.9, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={skinTone} />
      </mesh>
      
      {/* Hair/Hat */}
      <mesh position={[0, 2.15, 0]}>
        <boxGeometry args={[0.52, 0.1, 0.52]} />
        <meshStandardMaterial color={skinColor} emissive={skinColor} emissiveIntensity={0.3} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[0.5, 0.75, 0.25]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.375, 1.25, 0]}>
        <boxGeometry args={[0.25, 0.75, 0.25]} />
        <meshStandardMaterial color={skinTone} />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.375, 1.25, 0]}>
        <boxGeometry args={[0.25, 0.75, 0.25]} />
        <meshStandardMaterial color={skinTone} />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.125, 0.45, 0]}>
        <boxGeometry args={[0.25, 0.9, 0.25]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.125, 0.45, 0]}>
        <boxGeometry args={[0.25, 0.9, 0.25]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>

      {/* Cyber glow effect */}
      <pointLight position={[0, 1.5, 1]} intensity={0.5} color="#00ff9f" />
    </group>
  );
};

const SkinViewer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-strong rounded-xl px-6 py-3 border border-border/30 hover:border-neon-cyan/50 transition-all duration-300 group flex items-center gap-3"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <User className="w-5 h-5 text-neon-cyan group-hover:text-neon-green transition-colors" />
        <span className="font-display text-sm font-semibold text-foreground">Agam's Lab</span>
      </motion.button>

      {/* Skin Viewer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative glass-strong rounded-2xl border border-neon-cyan/30 w-full max-w-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="p-6 border-b border-border/30">
                <h2 className="font-display text-3xl font-bold text-center">
                  <span className="text-neon-cyan neon-text-cyan">AGAM'S</span>
                  <span className="text-foreground"> LAB</span>
                </h2>
                <p className="text-center text-muted-foreground text-sm mt-2">
                  3D Character Viewer • Drag to rotate
                </p>
              </div>

              {/* 3D Canvas */}
              <div className="h-[400px] w-full bg-gradient-to-b from-muted/20 to-background relative">
                {/* Grid floor effect */}
                <div className="absolute inset-0 cyber-grid opacity-10" />
                
                <Canvas
                  camera={{ position: [0, 0, 4], fov: 50 }}
                  gl={{ antialias: true, alpha: true }}
                >
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[5, 5, 5]} intensity={0.8} />
                    <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#00d4ff" />
                    
                    <SkinModel />
                    
                    <OrbitControls
                      enableZoom={true}
                      enablePan={false}
                      minDistance={2}
                      maxDistance={8}
                      minPolarAngle={Math.PI / 4}
                      maxPolarAngle={Math.PI / 1.5}
                    />
                    
                    <Environment preset="night" />
                  </Suspense>
                </Canvas>

                {/* Glow effect overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
              </div>

              {/* Controls */}
              <div className="p-4 border-t border-border/30 flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ZoomIn className="w-4 h-4" />
                  <span>Scroll to zoom</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <RotateCcw className="w-4 h-4" />
                  <span>Drag to rotate</span>
                </div>
              </div>

              {/* Character Info */}
              <div className="p-4 bg-muted/20 border-t border-border/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-primary">Agam</h3>
                    <p className="text-xs text-muted-foreground">Developer • Creator • Gamer</p>
                  </div>
                  <a
                    href="https://namemc.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/20 transition-all"
                  >
                    View on NameMC
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SkinViewer;
