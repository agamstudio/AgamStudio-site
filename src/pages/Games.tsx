import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Puzzle, CircuitBoard, Loader2, Play, Terminal, Power, Trophy, History, User, Shield, Zap, Heart, Cpu, Sparkles, Ghost, Rocket } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import FloatingShapes from "@/components/FloatingShapes";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

type GameStats = {
    plays: number;
    score: number;
    lastPlayed: string;
};

const gamesList = [
    { id: "tic-tac-toe", title: "Quantum Tic-Tac-Toe", description: "Battle the system in a neural grid collapse.", icon: Puzzle, color: "text-purple-400", bg: "bg-purple-400/20" },
    { id: "snake", title: "Neon Snake", description: "Classic reimagined with retro-wave aesthetic. Use WASD.", icon: Gamepad2, color: "text-green-400", bg: "bg-green-400/20" },
    { id: "memory", title: "Memory Matrix", description: "Test your RAM with pattern matching.", icon: CircuitBoard, color: "text-orange-400", bg: "bg-orange-400/20" },
];

// --- NEON SNAKE ---
const SnakeGame = ({ onScore }: { onScore: (s: number) => void }) => {
    const GRID_SIZE = 20;
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [dir, setDir] = useState({ x: 0, y: -1 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const handleKeys = (e: KeyboardEvent) => {
            if (e.key === "w" || e.key === "ArrowUp") if (dir.y !== 1) setDir({ x: 0, y: -1 });
            if (e.key === "s" || e.key === "ArrowDown") if (dir.y !== -1) setDir({ x: 0, y: 1 });
            if (e.key === "a" || e.key === "ArrowLeft") if (dir.x !== 1) setDir({ x: -1, y: 0 });
            if (e.key === "d" || e.key === "ArrowRight") if (dir.x !== -1) setDir({ x: 1, y: 0 });
        };
        window.addEventListener("keydown", handleKeys);
        const interval = setInterval(() => {
            if (gameOver) return;
            setSnake(prev => {
                const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
                if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || prev.some(s => s.x === head.x && s.y === head.y)) {
                    setGameOver(true);
                    onScore(score);
                    return prev;
                }
                const newSnake = [head, ...prev];
                if (head.x === food.x && head.y === food.y) {
                    setScore(s => s + 10);
                    setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
                } else {
                    newSnake.pop();
                }
                return newSnake;
            });
        }, 150);
        return () => { window.removeEventListener("keydown", handleKeys); clearInterval(interval); };
    }, [dir, food, gameOver, score]);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative bg-black/50 border-2 border-primary/20 rounded-xl" style={{ width: 300, height: 300 }}>
                {snake.map((s, i) => (
                    <div key={i} className="absolute bg-neon-green shadow-neon-green rounded-sm" style={{ left: s.x * 15, top: s.y * 15, width: 14, height: 14 }} />
                ))}
                <div className="absolute bg-neon-pink shadow-neon-pink rounded-full" style={{ left: food.x * 15, top: food.y * 15, width: 14, height: 14 }} />
                {gameOver && <div className="absolute inset-0 bg-black/80 flex items-center justify-center font-display text-2xl text-red-500 neon-text">CRASHED</div>}
            </div>
            <div className="font-mono text-primary font-bold uppercase tracking-widest">Score: {score}</div>
            {gameOver && <Button onClick={() => { setSnake([{ x: 10, y: 10 }]); setGameOver(false); setScore(0); }}>Restart Unit</Button>}
        </div>
    );
};



// --- MEMORY MATRIX ---
const MemoryGame = ({ onScore }: { onScore: (s: number) => void }) => {
    const icons = [Zap, Ghost, Shield, Rocket, Cpu, Sparkles];
    const [cards, setCards] = useState(() => [...icons, ...icons].sort(() => Math.random() - 0.5));
    const [flipped, setFlipped] = useState<number[]>([]);
    const [solved, setSolved] = useState<number[]>([]);
    const [score, setScore] = useState(0);

    const handleFlip = (i: number) => {
        if (flipped.includes(i) || solved.includes(i) || flipped.length === 2) return;
        const newFlipped = [...flipped, i];
        setFlipped(newFlipped);
        if (newFlipped.length === 2) {
            if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
                setSolved([...solved, ...newFlipped]);
                setFlipped([]);
                setScore(s => s + 200);
                if (solved.length + 2 === cards.length) onScore(score + 500);
            } else {
                setTimeout(() => setFlipped([]), 800);
            }
        }
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="grid grid-cols-4 gap-3">
                {cards.map((Icon, i) => (
                    <motion.div key={i} whileTap={{ scale: 0.95 }} onClick={() => handleFlip(i)}
                        className={cn("w-16 h-16 rounded-xl border flex items-center justify-center transition-all cursor-pointer",
                            flipped.includes(i) || solved.includes(i) ? "bg-primary/20 border-primary" : "bg-white/5 border-white/10 hover:bg-white/10")}
                    >
                        {(flipped.includes(i) || solved.includes(i)) && <Icon size={24} className="text-primary" />}
                    </motion.div>
                ))}
            </div>
            <div className="font-mono text-primary font-bold">RAM MATCH: {score}</div>
            {solved.length === cards.length && <Button onClick={() => { setCards([...icons, ...icons].sort(() => Math.random() - 0.5)); setSolved([]); setScore(0); }}>Reset Memory</Button>}
        </div>
    );
};





// --- TIC TAC TOE ---
const TicTacToe = ({ onWin }: { onWin: (winner: string) => void }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const winner = calculateWinner(board);
    useEffect(() => { if (winner) onWin(winner); }, [winner]);
    const handleClick = (i: number) => {
        if (winner || board[i]) return;
        const nextBoard = board.slice();
        nextBoard[i] = "X"; setBoard(nextBoard);
        setTimeout(() => {
            if (calculateWinner(nextBoard) || nextBoard.every(b => b)) return;
            const empty = nextBoard.map((v, idx) => v === null ? idx : null).filter(v => v !== null) as number[];
            nextBoard[empty[Math.floor(Math.random() * empty.length)]] = "O"; setBoard(nextBoard);
        }, 400);
    };
    return (
        <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-3 gap-4">{board.map((cell, i) => (<motion.button key={i} whileTap={{ scale: 0.9 }} onClick={() => handleClick(i)} className="w-20 h-20 rounded-2xl bg-white/5 border-2 border-white/10 flex items-center justify-center text-3xl font-black font-display transition-all hover:bg-white/10"><span className={cell === "X" ? "text-neon-cyan" : "text-neon-pink"}>{cell}</span></motion.button>))}</div>
            {winner && <Button onClick={() => setBoard(Array(9).fill(null))}>Restart Matrix</Button>}
        </div>
    );
};

const Games = () => {
    const [bootingGame, setBootingGame] = useState<string | null>(null);
    const [activeSession, setActiveSession] = useState<string | null>(null);
    const [stats, setStats] = useState<Record<string, GameStats>>({});

    useEffect(() => { const saved = localStorage.getItem("agam_game_stats"); if (saved) setStats(JSON.parse(saved)); }, []);

    const updateStats = (gameId: string, win = false) => {
        const newStats = { ...stats };
        if (!newStats[gameId]) newStats[gameId] = { plays: 0, score: 0, lastPlayed: new Date().toLocaleDateString() };
        newStats[gameId].plays += 1;
        if (win) newStats[gameId].score += 100;
        newStats[gameId].lastPlayed = new Date().toLocaleDateString();
        setStats(newStats); localStorage.setItem("agam_game_stats", JSON.stringify(newStats));
    };

    const handlePlay = (game: typeof gamesList[0]) => {
        setBootingGame(game.title);
        setTimeout(() => { setBootingGame(null); setActiveSession(game.id); updateStats(game.id); }, 2000);
    };

    return (
        <div className="relative min-h-screen pt-32 px-6 flex flex-col items-center overflow-x-hidden">
            <FloatingShapes />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold font-display text-primary mb-6 neon-text uppercase tracking-tighter">Games Arena</h1>
                    <p className="text-muted-foreground text-lg font-mono">Select a virtualization to begin testing.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gamesList.map((game, index) => (
                        <motion.div key={game.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                            className="glass-strong rounded-3xl p-8 border-2 border-white/5 hover:border-primary/40 transition-all hover:shadow-[0_0_40px_rgba(0,255,255,0.1)] group relative flex flex-col items-center text-center">
                            <div className={`p-5 rounded-2xl ${game.bg} ${game.color} mb-6 shadow-lg group-hover:scale-110 transition-transform`}><game.icon className="w-12 h-12" /></div>
                            <h3 className={`text-2xl font-bold font-display mb-3 ${game.color}`}>{game.title}</h3>
                            <p className="text-muted-foreground mb-8 text-sm">{game.description}</p>
                            <div className="flex gap-2 w-full mt-auto">
                                <Button onClick={() => handlePlay(game)} className="flex-1 h-12 rounded-xl bg-primary/10 border border-primary/40 hover:bg-primary transition-all font-bold uppercase tracking-widest text-xs">Play</Button>
                                <Dialog>
                                    <DialogTrigger asChild><Button variant="ghost" className="h-12 w-12 rounded-xl bg-white/5"><History size={18} /></Button></DialogTrigger>
                                    <DialogContent className="glass-strong border-white/10 rounded-3xl max-w-sm">
                                        <DialogHeader><DialogTitle className="text-2xl font-display uppercase tracking-widest text-primary mb-2">Game Logs</DialogTitle></DialogHeader>
                                        <div className="space-y-4 py-4 font-mono text-sm">
                                            <div className="flex justify-between p-3 rounded-xl bg-white/5"><span>Plays</span><span>{stats[game.id]?.plays || 0}</span></div>
                                            <div className="flex justify-between p-3 rounded-xl bg-white/5"><span>High Score</span><span>{stats[game.id]?.score || 0}</span></div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <AnimatePresence>
                {bootingGame && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} className="w-24 h-24 rounded-full border-4 border-t-primary mb-8" />
                        <h2 className="text-4xl font-display font-black text-primary neon-text mb-4 uppercase tracking-tighter">Booting: {bootingGame}</h2>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {activeSession && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="fixed inset-0 z-[101] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-4">
                        <div className="max-w-xl w-full glass-strong rounded-[40px] p-8 md:p-12 border-2 border-primary/20 relative shadow-2xl">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-display font-black text-primary uppercase">{activeSession.replace("-", " ")}</h2>
                                <Button onClick={() => setActiveSession(null)} className="rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"><Power size={14} /></Button>
                            </div>
                            <div className="flex items-center justify-center py-6">
                                {activeSession === "tic-tac-toe" && <TicTacToe onWin={() => updateStats("tic-tac-toe", true)} />}
                                {activeSession === "snake" && <SnakeGame onScore={(s) => updateStats("snake", s > 0)} />}
                                {activeSession === "memory" && <MemoryGame onScore={() => updateStats("memory", true)} />}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

function calculateWinner(squares: (string | null)[]) {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (const [a, b, c] of lines) if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    return null;
}

export default Games;
