import { motion } from "framer-motion";
import { ChevronDown, Terminal } from "lucide-react";

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  // keep URL in sync (useful for sharing)
  if (window.location.hash !== `#${id}`) {
    window.history.replaceState(null, "", `#${id}`);
  }
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Central glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">


        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-48 h-48 mx-auto rounded-full p-1 border-4 border-primary/30 overflow-hidden shadow-[0_0_60px_rgba(0,255,255,0.3)] bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Agam Studio"
              className="w-full h-full object-cover scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.classList.add('flex-col');
                const span = document.createElement('span');
                span.innerText = 'AS';
                span.className = 'text-5xl font-black text-primary neon-text';
                target.parentElement!.appendChild(span);
              }}
            />
          </div>
        </motion.div>

        {/* Main Title */}
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight text-primary neon-text uppercase">
          AGAM STUDIO
        </h1>

        {/* Code snippet decoration */}
        <div className="inline-block glass rounded-xl px-6 py-4 mb-12 border border-border/30">
          <code className="font-mono text-sm">
            <span className="text-neon-purple">const</span>{" "}
            <span className="text-neon-cyan">developer</span>{" "}
            <span className="text-foreground">=</span>{" "}
            <span className="text-neon-orange">"Agam"</span>
            <span className="text-muted-foreground">;</span>
            <motion.span
              className="inline-block w-2 h-5 bg-primary ml-1 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </code>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("projects");
            }}
            className="group px-8 py-4 rounded-xl bg-primary/10 border border-primary/50 text-primary font-display font-semibold tracking-wide hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
          >
            Explore Projects
          </a>
          <a
            href="#connect"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("connect");
            }}
            className="group px-8 py-4 rounded-xl glass border border-border/50 text-foreground font-display font-semibold tracking-wide hover:border-secondary/50 hover:text-secondary transition-all duration-300"
          >
            Connect With Me
          </a>
        </div>
      </div >

      <motion.button
        type="button"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => {
          // fallback if sections below fail to render
          const next = document.getElementById("projects") ?? document.getElementById("connect");
          if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
          else window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 border border-primary/10 rotate-45 hidden lg:block" />
      <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-secondary/10 hidden lg:block" />
    </section >
  );
};

export default HeroSection;

