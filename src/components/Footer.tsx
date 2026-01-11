import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 border-t border-border/30">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-6">
          {/* Logo and Text - Centered */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/50 shadow-[0_0_10px_rgba(0,255,255,0.3)]">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-display text-xl font-bold text-primary neon-text uppercase tracking-widest">
              AGAM STUDIO
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
