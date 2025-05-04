import { motion } from "motion/react";

export const MagneticRipple = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 origin-center"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(234, 56, 76, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 113, 154, 0.08) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(234, 56, 76, 0.05) 0%, transparent 50%)',
          ],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            background: `radial-gradient(circle at center, ${i % 2 === 0 ? 'rgba(234, 56, 76, 0.1)' : 'rgba(255, 113, 154, 0.1)'}, transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, Math.random() * 0.5 + 1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};