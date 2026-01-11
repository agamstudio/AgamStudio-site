import { motion } from "framer-motion";
import { Activity, Cpu, HardDrive, Wifi } from "lucide-react";
import { useState, useEffect } from "react";

const SystemStatus = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Israel Time (UTC+2 or UTC+3 depending on DST)
  const israelTime = time.toLocaleTimeString("en-IL", {
    timeZone: "Asia/Jerusalem",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const israelDate = time.toLocaleDateString("en-IL", {
    timeZone: "Asia/Jerusalem",
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const statusItems = [
    { icon: Cpu, label: "CPU", value: "87%", status: "active" },
    { icon: HardDrive, label: "Memory", value: "4.2GB", status: "active" },
    { icon: Wifi, label: "Network", value: "Online", status: "online" },
    { icon: Activity, label: "Uptime", value: "99.9%", status: "active" },
  ];

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <div className="glass-strong rounded-xl p-4 min-w-[200px]">
        {/* Time Display */}
        <div className="mb-4 border-b border-border/30 pb-3">
          <div className="font-mono text-2xl font-bold text-primary neon-text">
            {israelTime}
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            {israelDate} • Israel Time
          </div>
        </div>

        {/* Status Indicators */}
        <div className="space-y-2">
          {statusItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-center justify-between text-xs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7 + index * 0.1 }}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <item.icon className="w-3 h-3" />
                <span>{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-foreground">{item.value}</span>
                <motion.div
                  className={`w-2 h-2 rounded-full ${
                    item.status === "online" ? "bg-neon-green" : "bg-neon-cyan"
                  }`}
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Label */}
        <div className="mt-3 pt-3 border-t border-border/30">
          <div className="text-[10px] font-mono text-muted-foreground/50 tracking-widest">
            AGAM.STUDIO // SYSTEM v2.1
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemStatus;
