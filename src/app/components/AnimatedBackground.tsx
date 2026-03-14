import { motion } from "motion/react";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Circles */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-[#F3782C] rounded-full opacity-10 blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl"
        animate={{
          y: [0, -40, 0],
          x: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#0A70A1] rounded-full opacity-5 blur-3xl"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Grid Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
    </div>
  );
}
