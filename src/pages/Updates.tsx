import { motion } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";

const changelog = [
    {
        version: "2.0.0",
        date: "2024-05-15",
        title: "The Cybernetic Rebirth",
        changes: [
            "Complete Website Rebuild from the ground up",
            "Enhanced performance and futuristic UI architecture",
            "New core routing and animation systems",
        ],
    },

    {
        version: "1.8.0",
        date: "2024-05-05",
        title: "Games Arena 2.0",
        changes: [
            "Dedicated arena for interactive browser experiences",
            "New game selection interface",
            "Optimized performance for web-based gaming",
        ],
    },
    {
        version: "1.7.0",
        date: "2024-05-01",
        title: "Global Music Player",
        changes: [
            "Persistent audio playback across all page navigations",
            "Real-time progress tracking and seeking",
            "Synced state management (Play/Pause/Volume)",
        ],
    },
    {
        version: "1.6.0",
        date: "2024-04-28",
        title: "Original Soundtracks",
        changes: [
            "Added 2 exclusive original tracks produced by Agam",
            "Integrated visualizer reacting to audio frequency",
            "High-quality audio streaming optimization",
        ],
    },
    {
        version: "1.5.0",
        date: "2024-04-25",
        title: "Portfolio Overhaul",
        changes: [
            "Showcasing elite projects: LuckyDrop & SuperDuels",
            "Removed legacy projects for focused quality",
            "New centered card layout design",
        ],
    },
];

const Updates = () => {
    return (
        <div className="relative min-h-screen bg-background pt-32 pb-20 px-6 overflow-x-hidden">
            {/* BACKGROUND CONSISTENCY */}
            <FloatingShapes />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-6xl mx-auto relative z-10"
            >
                <div className="text-center mb-24">
                    <h1 className="text-6xl md:text-8xl font-black font-display mb-4 tracking-tighter text-primary neon-text uppercase">
                        Update Log
                    </h1>
                    <p className="text-muted-foreground text-lg font-mono tracking-wide">Track the evolution of Agam Studio</p>
                </div>

                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent -translate-x-1/2" />

                    <div className="space-y-24">
                        {changelog.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={item.version}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7, delay: index * 0.1 }}
                                    className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8 md:gap-0`}
                                >
                                    {/* Timeline Node */}
                                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_15px_hsl(var(--primary))] z-20">
                                        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                                    </div>

                                    {/* Content Card Side */}
                                    <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 pl-12' : 'md:pl-16 pl-12'}`}>
                                        <div className="relative group">
                                            {/* Connector Line (Horizontal) */}
                                            <div className={`hidden md:block absolute top-1/2 ${isEven ? '-right-16' : '-left-16'} w-16 h-px bg-primary/30 group-hover:bg-primary/60 transition-colors duration-500`} />

                                            {/* Mobile Connector */}
                                            <div className="md:hidden absolute top-4 -left-12 w-12 h-px bg-primary/30" />

                                            <div className="glass-strong p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-xl group-hover:translate-y-[-5px]">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <span className={`px-3 py-1 rounded-md text-xs font-bold font-mono bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(0,255,255,0.1)]`}>
                                                        v{item.version}
                                                    </span>
                                                </div>

                                                <h3 className="text-2xl font-bold font-display text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                                                    {item.title}
                                                </h3>

                                                <ul className="space-y-3">
                                                    {item.changes.map((change, i) => (
                                                        <li key={i} className="text-muted-foreground/80 text-sm leading-relaxed flex items-start gap-2">
                                                            <span className="text-primary/50 mt-1.5">•</span>
                                                            {change}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Empty Side for Balance */}
                                    <div className="w-full md:w-1/2" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Updates;
