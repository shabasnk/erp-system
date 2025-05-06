import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedBeamMultipleOutput } from "./custom/AnimatedBeamMultipleInputs";
import { AnimatedList } from "./magicui/animated-list";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  BarChart3,
  FileText,
  PieChart,
  Share2,
  ArrowRight,
  Sparkles,
  Users,
  Clock,
  Target,
} from "lucide-react";
import { FeatureParticles } from "./magicui/feature-particles";
import { DotPattern } from "./magicui/dot-pattern";

interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  description,
  icon,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);

  // Magnetic effect calculations
  const magneticX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  });
  const magneticY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseYFromCenter = (e.clientY - rect.top - height / 2) / (height / 2);
    mouseX.set(mouseXFromCenter);
    mouseY.set(mouseYFromCenter);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        x: magneticX,
        y: magneticY,
        perspective: 1000,
      }}
      className="relative"
    >
      <motion.div
        style={{
          rotateX: useTransform(mouseY, [-1, 1], [15, -15]),
          rotateY: useTransform(mouseX, [-1, 1], [-15, 15]),
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl transition-all duration-300",
          "group hover:shadow-2xl hover:shadow-[#ea384c]/10 border border-[#ea384c]/5",
          "transform-gpu"
        )}
      >
        {/* Gradient background that follows mouse */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `
                radial-gradient(
                  circle at ${50 + (x as number) * 50}% ${
                50 + (y as number) * 50
              }%,
                  rgba(234, 56, 76, 0.1),
                  transparent 70%
                )
              `
            ),
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            className="relative w-14 h-14 mb-6 rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#ea384c] to-[#FF719A]"
              animate={{
                rotate: isHovered ? 360 : 0,
              }}
              transition={{
                duration: 5,
                ease: "linear",
                repeat: Infinity,
              }}
            />
            <div className="absolute inset-0.5 bg-white rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 text-[#ea384c]">{icon}</div>
            </div>
          </motion.div>

          <motion.h3
            className="text-xl font-bold mb-3"
            style={{ transform: "translateZ(50px)" }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-gray-600 leading-relaxed"
            style={{ transform: "translateZ(30px)" }}
          >
            {description}
          </motion.p>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.2) 45%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.2) 55%, transparent 60%)",
              transform: "translateX(-100%)",
            }}
            animate={isHovered ? { transform: "translateX(100%)" } : {}}
            transition={{ duration: 1 }}
          />

          {/* Bottom line indicator */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
            style={{
              background: "linear-gradient(to right, #ea384c, #FF719A)",
              scaleX: 0,
              originX: 0,
            }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// First Benefits Section
export const BenefitsSection1: React.FC = () => {
  const benefits = [
    {
      title: "Team Collaboration",
      description:
        "Make communication and project coordination easier with real-time updates and shared spaces.",
      icon: <Users />,
    },
    {
      title: "Task Management",
      description:
        "Keep work organized and on track with easy drag-and-drop tools.",
      icon: <Clock />,
    },
    {
      title: "Resource Allocation",
      description:
        "Distribute work efficiently and avoid bottlenecks with smart resource management.",
      icon: <Target />,
    },
    {
      title: "Progress Tracking",
      description:
        "Track project progress with interactive timelines and visual milestones.",
      icon: <BarChart3 />,
    },
  ];

  return (
    <section
      id="benefits"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50/30"
    >
      <div className="absolute inset-0">
        <DotPattern
          className={cn(
            "absolute inset-0 opacity-50 -z-20",
            "[mask-image:radial-gradient(white,transparent_85%)]"
          )}
        />
        <div className="absolute inset-0 -z-10">
          <FeatureParticles />
        </div>
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1 rounded-full bg-gradient-to-r from-[#ea384c]/10 to-[#FF719A]/10"
          >
            <Sparkles className="w-4 h-4 text-[#ea384c]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent">
              Team Management
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Make your team
            <span className="relative ml-2">
              <span className="relative z-10 bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent">
                work better
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
            className="text-lg text-gray-600 md:text-xl max-w-2xl mx-auto"
          >
            Give your team easy-to-use tools that help them work together and
            get things done faster.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} index={index} />
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r p-[2px] from-[#ea384c] to-[#FF719A]">
          <div className="bg-white rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <h3 className="text-2xl font-bold mb-4">
                    Transform how your team works
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Explore our easy-to-use tools and boost your team's
                    productivity today.
                  </p>

                  <Button
                    className="relative group overflow-hidden rounded-xl px-8 py-4 text-white"
                    style={{
                      background:
                        "linear-gradient(90deg, #ea384c 0%, #FF719A 100%)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      animate={{
                        x: ["100%", "-100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="relative flex items-center gap-2">
                      Explore team tools
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </motion.div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ea384c]/20 to-[#FF719A]/20 rounded-2xl blur-2xl" />
                <div className="relative aspect-video bg-white rounded-xl shadow-lg overflow-hidden">
                  <AnimatedBeamMultipleOutput />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Second Benefits Section
export const BenefitsSection2: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50"></div>
      </div>

      <div className="section-container relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 mb-6 text-sm font-semibold tracking-wider uppercase rounded-full"
              style={{
                background: "linear-gradient(90deg, #ea384c 0%, #FF719A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Analytics & Insights
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Transform Data Into
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ea384c] to-[#FF719A]">
                {" "}
                Actionable Insights
              </span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ea384c] to-[#FF719A] rounded-2xl blur-2xl opacity-20"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="aspect-[4/3] w-full bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                    <div className="grid grid-cols-2 gap-4 h-full">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                      >
                        <div className="h-32 bg-gradient-to-br from-[#ea384c]/10 to-[#FF719A]/10 rounded-lg p-4">
                          <div className="h-4 w-24 bg-[#ea384c]/20 rounded mb-2"></div>
                          <div className="h-16 bg-gradient-to-r from-[#ea384c] to-[#FF719A] rounded"></div>
                        </div>
                        <div className="h-32 bg-gradient-to-br from-[#ea384c]/5 to-[#FF719A]/5 rounded-lg p-4">
                          <div className="h-4 w-32 bg-[#ea384c]/20 rounded mb-2"></div>
                          <div className="h-16 bg-gradient-to-r from-[#ea384c]/40 to-[#FF719A]/40 rounded"></div>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4"
                      >
                        <div className="h-40 bg-gradient-to-br from-[#ea384c]/10 to-[#FF719A]/10 rounded-lg p-4">
                          <div className="h-4 w-28 bg-[#ea384c]/20 rounded mb-2"></div>
                          <div className="h-24 bg-gradient-to-r from-[#ea384c]/60 to-[#FF719A]/60 rounded"></div>
                        </div>
                        <div className="h-24 bg-gradient-to-br from-[#ea384c]/5 to-[#FF719A]/5 rounded-lg p-4">
                          <div className="h-4 w-20 bg-[#ea384c]/20 rounded mb-2"></div>
                          <div className="h-8 bg-gradient-to-r from-[#ea384c]/30 to-[#FF719A]/30 rounded"></div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 space-y-8"
            >
              <AnimatedList>
                {[
                  {
                    title: "Real-time Analytics",
                    description:
                      "Track KPIs and business metrics as they happen with customizable dashboards",
                    icon: <BarChart3 className="w-5 h-5 text-white" />,
                    delay: 0.2,
                  },
                  {
                    title: "Custom Reports",
                    description:
                      "Create tailored reports for different departments and stakeholders",
                    icon: <FileText className="w-5 h-5 text-white" />,
                    delay: 0.3,
                  },
                  {
                    title: "Data Visualization",
                    description:
                      "Transform complex data into easy-to-understand charts and graphs",
                    icon: <PieChart className="w-5 h-5 text-white" />,
                    delay: 0.4,
                  },
                  {
                    title: "Export Capabilities",
                    description:
                      "Share insights in multiple formats including PDF, Excel, and PowerPoint",
                    icon: <Share2 className="w-5 h-5 text-white" />,
                    delay: 0.5,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay }}
                    className="group"
                  >
                    <div className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ea384c] to-[#FF719A] flex items-center justify-center">
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-[#ea384c] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatedList>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <Button
                  className="relative group overflow-hidden rounded-xl px-8 py-4 text-white w-full sm:w-auto"
                  style={{
                    background:
                      "linear-gradient(90deg, #ea384c 0%, #FF719A 100%)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{
                      x: ["100%", "-100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative flex items-center gap-2">
                    Explore analytics features
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Third Benefits Section
export const BenefitsSection3: React.FC = () => {
  return (
    <section className="bg-wez-soft-peach py-16 md:py-24">
      <div className="section-container">
        <h2 className="section-title">
          Easily track orders and customer operations
        </h2>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Customer Orders</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm">#ORD-2023-1842</td>
                    <td className="px-4 py-3 text-sm">John Doe</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Delivered
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">May 1, 2023</td>
                    <td className="px-4 py-3 text-sm">$1,205.00</td>
                    <td className="px-4 py-3 text-sm text-wez-red">
                      View Details
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">#ORD-2023-1841</td>
                    <td className="px-4 py-3 text-sm">Jane Smith</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        Processing
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">Apr 30, 2023</td>
                    <td className="px-4 py-3 text-sm">$850.75</td>
                    <td className="px-4 py-3 text-sm text-wez-red">
                      View Details
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">#ORD-2023-1840</td>
                    <td className="px-4 py-3 text-sm">Robert Johnson</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        Shipped
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">Apr 29, 2023</td>
                    <td className="px-4 py-3 text-sm">$2,540.25</td>
                    <td className="px-4 py-3 text-sm text-wez-red">
                      View Details
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-6">
              <Button className="gradient-button">Manage all orders</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ListSection: React.FC = () => {
  return (
    <>
      <li
        className={cn(
          "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
          // animation styles
          "transition-all duration-200 ease-in-out hover:scale-[103%]",
          // light styles
          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
          // dark styles
          "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
        )}
      ></li>
    </>
  );
};
