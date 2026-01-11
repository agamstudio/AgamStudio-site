import { motion } from "framer-motion";

const shapes = [
  { id: 1, size: 200, x: "10%", y: "20%", delay: 0, duration: 8 },
  { id: 2, size: 150, x: "80%", y: "15%", delay: 1, duration: 10 },
  { id: 3, size: 100, x: "70%", y: "60%", delay: 2, duration: 7 },
  { id: 4, size: 180, x: "20%", y: "70%", delay: 0.5, duration: 9 },
  { id: 5, size: 120, x: "50%", y: "40%", delay: 1.5, duration: 11 },
  { id: 6, size: 80, x: "90%", y: "80%", delay: 2.5, duration: 6 },
];

const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient orbs */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full opacity-20"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: `radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Geometric shapes */}
      <motion.div
        className="absolute w-32 h-32 border border-primary/20"
        style={{ left: "15%", top: "30%", transform: "rotate(45deg)" }}
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute w-24 h-24 border border-secondary/20"
        style={{ right: "20%", top: "25%" }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute w-40 h-40 border border-accent/10 rounded-full"
        style={{ left: "60%", bottom: "20%" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scan lines overlay */}
      <div className="absolute inset-0 scanline opacity-30" />

      {/* Cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
    </div>
  );
};

export default FloatingShapes;
