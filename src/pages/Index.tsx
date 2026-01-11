import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SocialGrid from "@/components/SocialGrid";
import ErrorBoundary from "@/components/ErrorBoundary";

const scrollToHash = (hash: string) => {
  const id = hash.replace(/^#/, "").trim();
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  requestAnimationFrame(() => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
};

const Index = () => {
  const safeMode = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("safe") === "1";
  }, []);

  useEffect(() => {
    if (window.location.hash) scrollToHash(window.location.hash);

    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden pb-20">
      <FloatingShapes />

      {/* Motion Wrapper for Page Transitions */}
      <motion.main
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ErrorBoundary name="Hero">
          <HeroSection />
        </ErrorBoundary>

        {!safeMode && (
          <>
            <ErrorBoundary name="Social">
              <SocialGrid />
            </ErrorBoundary>
            <ErrorBoundary name="Projects">
              <ProjectsSection />
            </ErrorBoundary>
            <ErrorBoundary name="Footer">
              <Footer />
            </ErrorBoundary>
          </>
        )}

        {safeMode && (
          <section className="px-6 pb-20">
            <div className="max-w-3xl mx-auto glass rounded-xl p-6 border border-border/30">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Safe Mode פעיל</h2>
              <p className="text-muted-foreground">
                אם הכל עובד כאן, אפשר לכבות Safe Mode ע"י הסרת <span className="font-mono text-foreground">?safe=1</span> מהקישור.
              </p>
            </div>
          </section>
        )}
      </motion.main>
    </div>
  );
};

export default Index;
