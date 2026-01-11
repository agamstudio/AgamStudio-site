import { motion } from "framer-motion";
import { GitCommit, Sparkles, Bug, Zap } from "lucide-react";

const changelog = [
  {
    version: "v2.1.0",
    date: "Jan 2026",
    type: "feature",
    icon: Sparkles,
    title: "Full Site Redesign",
    description: "Complete overhaul with cyber-futuristic design, new animations, and 3D effects.",
  },
  {
    version: "v2.0.0",
    date: "Dec 2025",
    type: "major",
    icon: Zap,
    title: "Portfolio Launch",
    description: "Added plugins showcase, project cards, and holographic UI elements.",
  },
  {
    version: "v1.5.2",
    date: "Nov 2025",
    type: "fix",
    icon: Bug,
    title: "Performance Boost",
    description: "Optimized animations and reduced bundle size by 40%.",
  },
  {
    version: "v1.5.0",
    date: "Oct 2025",
    type: "feature",
    icon: GitCommit,
    title: "Music Player Added",
    description: "Integrated floating music player with visualizer.",
  },
];

const typeColors = {
  feature: "text-neon-green border-neon-green/30 bg-neon-green/10",
  major: "text-neon-purple border-neon-purple/30 bg-neon-purple/10",
  fix: "text-neon-orange border-neon-orange/30 bg-neon-orange/10",
};

const ChangelogSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Update </span>
            <span className="text-secondary neon-text-cyan">Log</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Track the evolution of Agam Studio through version history
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent" />

          {changelog.map((item, index) => {
            const Icon = item.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.version}
                className={`relative flex items-center gap-8 mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-background border-2 border-primary z-10">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] glass rounded-xl p-6 border border-border/30 hover:border-primary/30 transition-all duration-300 ${
                  isLeft ? "md:mr-auto" : "md:ml-auto"
                }`}>
                  {/* Version badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono border ${typeColors[item.type as keyof typeof typeColors]}`}>
                      {item.version}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChangelogSection;
