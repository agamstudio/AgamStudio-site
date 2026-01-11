import { motion } from "framer-motion";
import SocialCard from "./SocialCard";
import { Github, Youtube, User, Music } from "lucide-react";

const socials = [
  {
    icon: Github,
    title: "GitHub",
    description: "Open source projects, plugins, and code repositories. Star my work!",
    href: "https://github.com",
    color: "green" as const,
  },
  {
    icon: Youtube,
    title: "YouTube",
    description: "Tutorials, gameplay, and dev vlogs. Subscribe for updates!",
    href: "https://youtube.com/@The_Crazy_Agam-2",
    color: "pink" as const,
  },
  {
    icon: User,
    title: "NameMC",
    description: "Check out my Minecraft skin profile and history.",
    href: "https://namemc.com/profile/The_Crazy_Agam",
    color: "cyan" as const,
  },
  {
    icon: Music,
    title: "Spotify",
    description: "My coding playlists and music vibes. Lo-fi beats to code to.",
    href: "https://open.spotify.com/playlist/35BZWr9mhdSVgB1DiQLz3I?si=2cdb40ae4a9a4799",
    color: "green" as const,
  },
];

const SocialGrid = () => {
  return (
    <section id="connect" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-primary neon-text uppercase tracking-tighter">
            Connect Hub
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Find me across the digital universe. Each platform is a portal to different content.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto auto-rows-fr">
          {socials.map((social, index) => (
            <SocialCard
              key={social.title}
              {...social}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialGrid;
