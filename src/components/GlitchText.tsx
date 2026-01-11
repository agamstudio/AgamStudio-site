import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main text */}
      <span className="relative z-10">{text}</span>
      
      {/* Glitch layers */}
      <motion.span
        className="absolute inset-0 text-neon-cyan opacity-0"
        style={{ clipPath: "inset(40% 0 60% 0)" }}
        animate={{
          opacity: [0, 0.8, 0],
          x: [-2, 2, -2],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear",
        }}
      >
        {text}
      </motion.span>
      
      <motion.span
        className="absolute inset-0 text-neon-pink opacity-0"
        style={{ clipPath: "inset(10% 0 85% 0)" }}
        animate={{
          opacity: [0, 0.8, 0],
          x: [2, -2, 2],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: 4,
          delay: 0.1,
          ease: "linear",
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

export default GlitchText;
