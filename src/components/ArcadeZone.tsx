import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, RotateCcw, Trophy, Gamepad2 } from "lucide-react";

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const ArcadeZone = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef<Direction>("RIGHT");

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 10 });
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setScore(0);
    setGameState("idle");
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameState("playing");
  }, [resetGame]);

  const gameLoop = useCallback(() => {
    if (gameState !== "playing") return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      const currentDirection = directionRef.current;

      switch (currentDirection) {
        case "UP": head.y -= 1; break;
        case "DOWN": head.y += 1; break;
        case "LEFT": head.x -= 1; break;
        case "RIGHT": head.x += 1; break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameState("gameover");
        setHighScore(prev => Math.max(prev, score));
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameState("gameover");
        setHighScore(prev => Math.max(prev, score));
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameState, food, score, generateFood]);

  useEffect(() => {
    if (gameState === "playing") {
      gameLoopRef.current = setInterval(gameLoop, INITIAL_SPEED);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;

      const keyDirections: Record<string, Direction> = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        w: "UP",
        s: "DOWN",
        a: "LEFT",
        d: "RIGHT",
      };

      const newDirection = keyDirections[e.key];
      if (!newDirection) return;

      const opposites: Record<Direction, Direction> = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      };

      if (opposites[newDirection] !== directionRef.current) {
        directionRef.current = newDirection;
        setDirection(newDirection);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  return (
    <>
      {/* Arcade Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 glass-strong rounded-xl p-4 border border-border/30 hover:border-neon-purple/50 transition-all duration-300 group"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Gamepad2 className="w-6 h-6 text-neon-purple group-hover:text-neon-pink transition-colors" />
      </motion.button>

      {/* Arcade Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative glass-strong rounded-2xl p-8 border border-neon-purple/30 max-w-lg w-full"
              initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="font-display text-3xl font-bold text-neon-purple neon-text-purple mb-2">
                  ARCADE ZONE
                </h2>
                <p className="text-muted-foreground text-sm">Classic Snake • Use WASD or Arrow Keys</p>
              </div>

              {/* Score Display */}
              <div className="flex justify-between items-center mb-4 px-4">
                <div className="text-sm">
                  <span className="text-muted-foreground">Score: </span>
                  <span className="font-mono text-primary font-bold">{score}</span>
                </div>
                <div className="text-sm flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-neon-orange" />
                  <span className="font-mono text-neon-orange font-bold">{highScore}</span>
                </div>
              </div>

              {/* Game Board */}
              <div
                className="relative mx-auto rounded-lg overflow-hidden border-2 border-neon-purple/50"
                style={{
                  width: GRID_SIZE * CELL_SIZE,
                  height: GRID_SIZE * CELL_SIZE,
                  background: "linear-gradient(135deg, hsl(var(--muted) / 0.3), hsl(var(--background)))",
                }}
              >
                {/* Grid lines */}
                <div className="absolute inset-0 cyber-grid opacity-20" />

                {/* Snake */}
                {snake.map((segment, index) => (
                  <motion.div
                    key={index}
                    className="absolute rounded-sm"
                    style={{
                      width: CELL_SIZE - 2,
                      height: CELL_SIZE - 2,
                      left: segment.x * CELL_SIZE + 1,
                      top: segment.y * CELL_SIZE + 1,
                      background: index === 0 
                        ? "hsl(var(--primary))" 
                        : `hsl(160, 100%, ${50 - index * 2}%)`,
                      boxShadow: index === 0 
                        ? "0 0 10px hsl(var(--primary))" 
                        : "none",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.1 }}
                  />
                ))}

                {/* Food */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: CELL_SIZE - 4,
                    height: CELL_SIZE - 4,
                    left: food.x * CELL_SIZE + 2,
                    top: food.y * CELL_SIZE + 2,
                    background: "hsl(var(--neon-pink))",
                    boxShadow: "0 0 15px hsl(var(--neon-pink))",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                  }}
                />

                {/* Game Over / Start Overlay */}
                {gameState !== "playing" && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {gameState === "gameover" && (
                      <div className="text-center mb-4">
                        <h3 className="font-display text-2xl text-destructive mb-2">GAME OVER</h3>
                        <p className="text-muted-foreground">Score: {score}</p>
                      </div>
                    )}
                    <button
                      onClick={startGame}
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/20 border border-primary/50 text-primary font-display font-semibold hover:bg-primary/30 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
                    >
                      {gameState === "gameover" ? (
                        <>
                          <RotateCcw className="w-5 h-5" />
                          Play Again
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          Start Game
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Controls hint */}
              <div className="mt-4 text-center text-xs text-muted-foreground">
                <kbd className="px-2 py-1 rounded bg-muted text-foreground mx-1">W</kbd>
                <kbd className="px-2 py-1 rounded bg-muted text-foreground mx-1">A</kbd>
                <kbd className="px-2 py-1 rounded bg-muted text-foreground mx-1">S</kbd>
                <kbd className="px-2 py-1 rounded bg-muted text-foreground mx-1">D</kbd>
                <span className="mx-2">or</span>
                <span>Arrow Keys</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ArcadeZone;
