import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  icon: string;
  delay?: number;
}

const ProjectCard = ({ title, description, tags, icon, delay = 0 }: ProjectCardProps) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl glass border border-border/30 hover:border-primary/30 transition-all duration-500"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 0 40px hsl(var(--primary) / 0.2)",
      }}
    >
      {/* Holographic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
        style={{ height: "30%" }}
        initial={{ top: "-30%" }}
        animate={{ top: "130%" }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />

      <div className="relative z-10 p-6">
        {/* Icon */}
        <div className="w-16 h-16 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center mb-4 text-3xl group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
          {icon}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono rounded bg-muted/50 text-primary border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute -top-10 -right-10 w-24 h-24 border border-primary/10 rotate-45 group-hover:border-primary/30 transition-colors duration-500" />
    </motion.div>
  );
};

export default ProjectCard;
