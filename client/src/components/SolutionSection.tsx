import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DotPattern } from "./magicui/dot-pattern";
import { FeatureParticles } from "./magicui/feature-particles";
import { MagneticRipple } from "./magicui/magnetic-ripple";

interface SolutionCardProps {
  tag: string;
  title: string;
  description: string;
  person: {
    name: string;
    role: string;
    quote?: string;
  };
}

const SolutionCard: React.FC<SolutionCardProps> = ({ tag, title, description, person }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.02,
        rotateX: 2,
        rotateY: 2,
        translateZ: 10,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white/80",
        "transform-gpu transition-all duration-300",
        "hover:shadow-2xl hover:shadow-[#ea384c]/10 backdrop-blur-sm",
        "border border-[#ea384c]/5"
      )}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-300"
        style={{
          background: isHovered
            ? "radial-gradient(circle at center, rgba(234,56,76,0.08), transparent 70%)"
            : "none",
        }}
      />

      <div className="relative h-full p-8">
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative inline-block"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-[#ea384c] to-[#FF719A] rounded-full blur-md"
              animate={{
                opacity: isHovered ? 0.3 : 0
              }}
            />
            <span className="relative inline-block px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#ea384c] to-[#FF719A] text-white">
              {tag}
            </span>
          </motion.div>
        </div>

        <motion.h3 
          className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
        >
          {title}
        </motion.h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>

        <motion.div 
          className="mt-auto pt-6 border-t border-gray-100"
          initial={false}
          animate={{
            y: isHovered ? 0 : 10,
            opacity: isHovered ? 1 : 0.7
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ea384c] to-[#FF719A] flex items-center justify-center text-white font-medium">
                  {person.name[0]}
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ea384c] to-[#FF719A]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">{person.name}</p>
                <p className="text-sm text-gray-500">{person.role}</p>
              </div>
            </div>
            <motion.div
              animate={{
                x: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0
              }}
            >
              <ArrowUpRight className="w-5 h-5 text-[#ea384c]" />
            </motion.div>
          </div>
          {person.quote && (
            <motion.p
              className="mt-4 text-sm italic text-gray-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10
              }}
            >
              "{person.quote}"
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const SolutionSection: React.FC = () => {
  const solutions = [
    {
      tag: "Core Feature",
      title: "Centralized Management",
      description: "Manage inventory, orders, customers, and finances in one place with real-time updates across all departments.",
      person: {
        name: "Sarah Johnson",
        role: "Operations Director",
        quote: "WEZ-ERP transformed how we manage our operations. Everything is now seamlessly connected."
      }
    },
    {
      tag: "Advanced Analytics",
      title: "Data-Driven Decisions",
      description: "Interactive dashboards and custom reports that give you actionable insights to optimize operations and increase profitability.",
      person: {
        name: "Michael Chen",
        role: "Business Analyst",
        quote: "The analytics capabilities have revolutionized our decision-making process."
      }
    },
    {
      tag: "Automation",
      title: "Streamlined Workflows",
      description: "Automate repetitive tasks, approvals, and notifications to save time and reduce errors across all business processes.",
      person: {
        name: "Jessica Martinez",
        role: "Project Manager",
        quote: "Automation has saved us countless hours and dramatically reduced errors."
      }
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with proper z-index layering */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-white">
        <DotPattern
          className={cn(
            "absolute inset-0 opacity-50 -z-20",
            "[mask-image:radial-gradient(white,transparent_85%)]"
          )}
        />
        <div className="absolute inset-0 -z-10">
          <FeatureParticles />
        </div>
        <div className="absolute inset-0 -z-10">
          <MagneticRipple />
        </div>
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1 rounded-full bg-gradient-to-r from-[#ea384c]/10 to-[#FF719A]/10"
          >
            <Sparkles className="w-4 h-4 text-[#ea384c]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent">
              Enterprise Solutions
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            The all-in-one solution for
            <span className="relative ml-2">
              <span className="relative z-10 bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent">
                effective business
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-3 bg-[#ea384c]/10 -z-10 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 md:text-xl"
          >
            WEZ-ERP brings together all your operational needs in one unified
            platform, eliminating data silos and streamlining workflows.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <SolutionCard key={index} {...solution} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button
            className="relative group overflow-hidden rounded-xl px-8 py-4 text-white"
            style={{
              background: "linear-gradient(90deg, #ea384c 0%, #FF719A 100%)",
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              animate={{
                x: ["100%", "-100%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <span className="relative flex items-center gap-2">
              See all solutions
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
