import React from 'react';
import { motion } from "motion/react";
import { 
  Users, 
  ChartPie, 
  ShoppingCart, 
  Database, 
  Clock, 
  Lock,
  // ArrowRight
} from "lucide-react";
import { FeatureParticles } from './magicui/feature-particles';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  primaryColor, 
  secondaryColor,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`group relative overflow-hidden rounded-2xl bg-white p-8 ring-1 ring-gray-200 hover:ring-2 hover:${primaryColor} transition-all duration-300 hover:shadow-lg`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-${secondaryColor} via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className="relative z-10">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
          className={`mb-6 inline-flex items-center justify-center rounded-xl ${primaryColor} ${secondaryColor} p-3`}
        >
          {icon}
        </motion.div>
        
        <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-gray-800">
          {title}
        </h3>
        
        <p className="mb-6 text-gray-600 leading-relaxed">
          {description}
        </p>
        
        {/* <motion.div
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          className={`flex items-center text-sm font-medium ${primaryColor} opacity-0 group-hover:opacity-100 transition-all duration-300`}
        >
          Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.div> */}
      </div>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Team Management",
      description: "Manage employees, assign roles and track performance with powerful HR tools.",
      primaryColor: "text-blue-600",
      secondaryColor: "bg-blue-50",
    },
    {
      icon: <ChartPie className="h-6 w-6 text-purple-600" />,
      title: "Financial Analytics",
      description: "Generate detailed financial reports and visualize business performance in real-time.",
      primaryColor: "text-purple-600",
      secondaryColor: "bg-purple-50",
    },
    {
      icon: <ShoppingCart className="h-6 w-6 text-green-600" />,
      title: "Inventory Control",
      description: "Track stock levels, manage suppliers, and automate reordering processes.",
      primaryColor: "text-green-600",
      secondaryColor: "bg-green-50",
    },
    {
      icon: <Database className="h-6 w-6 text-red-600" />,
      title: "Customer Management",
      description: "Store customer data, track interactions, and improve customer satisfaction.",
      primaryColor: "text-red-600",
      secondaryColor: "bg-red-50",
    },
    {
      icon: <Clock className="h-6 w-6 text-amber-600" />,
      title: "Project Timeline",
      description: "Plan projects, set milestones, and monitor progress against deadlines.",
      primaryColor: "text-amber-600",
      secondaryColor: "bg-amber-50",
    },
    {
      icon: <Lock className="h-6 w-6 text-indigo-600" />,
      title: "Advanced Security",
      description: "Protect sensitive data with role-based access control and encryption.",
      primaryColor: "text-indigo-600",
      secondaryColor: "bg-indigo-50",
    },
  ];

  return (
    <section id="features" className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50"></div>
        <FeatureParticles />
      </div>

      <div className="relative">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 mb-6 text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full"
            >
              Features
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6"
            >
              Everything you need to 
              <span className="bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent"> manage your business</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600"
            >
              WEZ-ERP provides a comprehensive suite of tools designed to streamline every aspect of your business operations.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                delay={0.2 * (index + 1)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;