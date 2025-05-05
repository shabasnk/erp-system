import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Command } from "lucide-react";
import { Particles } from "./magicui/particles";

const HeroSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50/30">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <Particles        
          className="absolute inset-0"
          quantity={300}
          ease={80}
          color={"#ea384c"}
          refresh={false}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent, rgba(234,56,76,0.03))",
            filter: "blur(80px)",
            transform: "translateZ(0)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-white/80 shadow-xl shadow-red-500/5 backdrop-blur-sm border border-red-500/10"
          >
            <Command className="w-3.5 h-3.5 text-[#ea384c]" />
            <span className="text-sm font-medium bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent">
              Next Generation ERP System
            </span>
            <span className="flex h-1.5 w-1.5 relative">
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ea384c]" />
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="block">Make your business</span>
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent">
                systematic
              </span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 284 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.path
                  d="M1 4C31 4 61 4 91 4C121 4 151 4 181 4C211 4 241 4 271 4"
                  stroke="url(#paint0_linear)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="paint0_linear" x1="1" y1="4" x2="283" y2="4" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ea384c" />
                    <stop offset="1" stopColor="#FF719A" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
            <span className="block">and easy to manage</span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            WEZ-ERP gives you all the tools you need to streamline your
            operations, enhance productivity, and make informed business
            decisions with real-time data.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Button
              className="relative group overflow-hidden rounded-xl px-6 py-4 text-white"
              style={{
                background: "linear-gradient(90deg, #ea384c 0%, #FF719A 100%)",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: "100%" }}
                animate={isHovered ? { x: "-100%" } : { x: "100%" }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative flex items-center gap-2 text-base font-medium">
                Get started for free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>

            <Button 
              variant="outline" 
              className="rounded-xl px-6 py-4 text-base border-2 hover:border-[#ea384c]/50 hover:text-[#ea384c] flex items-center gap-2"
            >
              Schedule a demo <ArrowUpRight className="w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-[#ea384c] to-[#FF719A]"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                />
              ))}
            </div>
            <div className="text-sm">
              <div className="font-medium">Trusted by 1000+ businesses</div>
              <div className="text-gray-500 text-xs">Join them today</div>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute -right-10 top-1/4 w-32 h-32 bg-[#ea384c]/5 rounded-full blur-3xl" />
          <div className="absolute -left-10 top-3/4 w-32 h-32 bg-[#FF719A]/5 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
