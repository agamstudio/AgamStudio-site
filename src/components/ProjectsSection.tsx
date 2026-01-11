import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "LuckyDrop",
    description: "Configurable loot drop system with custom particles, sounds, and rarity tiers. Make drops exciting again!",
    tags: ["Java", "Paper", "YAML Config"],
    icon: "🎁",
  },
  {
    title: "SuperDuels",
    description: "Advanced 1v1 dueling plugin with ELO ranking, custom arenas, and spectator mode. Battle-tested on premium servers.",
    tags: ["Java", "Spigot", "MySQL", "Redis"],
    icon: "⚔️",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >


          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-primary neon-text uppercase tracking-tighter">
            My Creations
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A collection of custom Minecraft plugins and development projects. Each crafted with precision and passion.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              delay={index * 0.1}
            />
          ))}
        </div>


      </div>
    </section>
  );
};

export default ProjectsSection;
