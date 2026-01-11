import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MagneticCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Custom cursor - simple arrow */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          opacity: isVisible ? 1 : 0,
          zIndex: 9999,
        }}
        transition={{ duration: 0 }}
      >
        {/* Arrow cursor SVG */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: "drop-shadow(0 0 8px rgba(0, 255, 0, 0.6))",
          }}
        >
          {/* Main arrow shape */}
          <path
            d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
            fill="hsl(var(--neon-green))"
            stroke="hsl(var(--neon-green))"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Inner highlight for depth */}
          <path
            d="M5 5L9.5 16.5L11 11L16.5 9.5L5 5Z"
            fill="rgba(255, 255, 255, 0.3)"
          />
        </svg>
      </motion.div>

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default MagneticCursor;
