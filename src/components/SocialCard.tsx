import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SocialCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  color: "green" | "cyan" | "purple" | "pink" | "orange";
  delay?: number;
}

const colorMap = {
  green: {
    border: "hover:border-neon-green/50",
    shadow: "hover:shadow-[0_0_30px_hsl(var(--neon-green)/0.3)]",
    text: "group-hover:text-neon-green",
    bg: "group-hover:bg-neon-green/10",
  },
  cyan: {
    border: "hover:border-neon-cyan/50",
    shadow: "hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.3)]",
    text: "group-hover:text-neon-cyan",
    bg: "group-hover:bg-neon-cyan/10",
  },
  purple: {
    border: "hover:border-neon-purple/50",
    shadow: "hover:shadow-[0_0_30px_hsl(var(--neon-purple)/0.3)]",
    text: "group-hover:text-neon-purple",
    bg: "group-hover:bg-neon-purple/10",
  },
  pink: {
    border: "hover:border-neon-pink/50",
    shadow: "hover:shadow-[0_0_30px_hsl(var(--neon-pink)/0.3)]",
    text: "group-hover:text-neon-pink",
    bg: "group-hover:bg-neon-pink/10",
  },
  orange: {
    border: "hover:border-neon-orange/50",
    shadow: "hover:shadow-[0_0_30px_hsl(var(--neon-orange)/0.3)]",
    text: "group-hover:text-neon-orange",
    bg: "group-hover:bg-neon-orange/10",
  },
};

const SocialCard = ({ icon: Icon, title, description, href, color, delay = 0 }: SocialCardProps) => {
  const colors = colorMap[color];

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block p-6 glass rounded-xl border border-border/30 transition-all duration-500 h-full flex flex-col justify-between ${colors.border} ${colors.shadow}`}
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -8,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.bg}`} />

      {/* Content */}
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 bg-muted/50 border border-border/50 transition-all duration-300 ${colors.bg} ${colors.text}`}>
          <Icon className="w-7 h-7 transition-colors duration-300" />
        </div>

        <h3 className={`font-display text-xl font-semibold mb-2 transition-colors duration-300 ${colors.text}`}>
          {title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl">
        <div className={`absolute -top-8 -right-8 w-16 h-16 rotate-45 bg-gradient-to-b from-transparent ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </div>
    </motion.a>
  );
};

export default SocialCard;
