import { Outlet, Link, useLocation } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";
import MagneticCursor from "./MagneticCursor";
import { cn } from "@/lib/utils";
import { Home, Newspaper, Gamepad2, Bot } from "lucide-react";
import { motion } from "framer-motion";

const Layout = () => {
    const location = useLocation();

    const navItems = [
        { name: "Home", path: "/", icon: Home, color: "text-neon-cyan", shadow: "shadow-[0_0_10px_rgba(0,255,255,0.5)]" },
        { name: "Updates", path: "/updates", icon: Newspaper, color: "text-neon-purple", shadow: "shadow-[0_0_10px_rgba(180,0,255,0.5)]" },
        { name: "Games", path: "/games", icon: Gamepad2, color: "text-neon-green", shadow: "shadow-[0_0_10px_rgba(0,255,0,0.5)]" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
            {/* Custom Cursor */}
            <MagneticCursor />

            {/* Navigation Bar */}
            <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2 shadow-2xl flex gap-1 items-center">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 group overflow-hidden",
                                isActive ? "bg-white/5 active-glow" : "hover:bg-white/5"
                            )}
                        >
                            <div className={cn(
                                "relative z-10 p-1.5 rounded-lg transition-all duration-500",
                                isActive ? `${item.color} ${item.shadow} scale-110` : "text-muted-foreground group-hover:text-foreground"
                            )}>
                                <Icon size={20} className={cn(isActive && "animate-pulse")} />
                            </div>
                            <span className={cn(
                                "relative z-10 text-xs font-bold uppercase tracking-widest transition-all duration-300 hidden sm:inline",
                                isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground opacity-70"
                            )}>
                                {item.name}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="nav-active"
                                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Main Content Area */}
            <div className="pt-0">
                <Outlet />
            </div>

            {/* Persistent Music Player */}
            <div className="fixed bottom-5 right-5 z-50">
                <MusicPlayer />
            </div>
        </div>
    );
};

export default Layout;
