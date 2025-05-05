import React from "react";
import { motion } from "motion/react";

export const FeatureParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 20 + 10,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#ea384c]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [-20, 20],
            x: [-20, 20],
            opacity: [particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};