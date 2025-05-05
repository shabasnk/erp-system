import React from 'react';
import { motion } from "motion/react";
import { BarChart3, Users, AlertCircle, Package, UserX, TrendingDown, Shield } from "lucide-react";

interface ProblemCardProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ number, title, description, icon, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-lg border ${className}`}
    >
      <div className="relative h-full p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 rounded-md bg-white/80">
            {icon}
          </div>
          <span className="text-xs font-medium text-gray-500">Problem {number}</span>
        </div>
        <h3 className="text-lg font-bold mb-2.5 text-gray-800">{title}</h3>
        <p className="text-[15px] text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const ProblemSection: React.FC = () => {
  return (
    <section id="problems" className="relative py-12 md:py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-red-400 font-semibold mb-4 block text-sm uppercase tracking-wider">
            Business Challenges
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
            Transform Your Business Challenges into <span className="text-red-500">Opportunities</span>
          </h2>
          <p className="text-lg text-gray-600 md:text-xl max-w-2xl mx-auto">
            Identify and overcome the common obstacles that hold businesses back from reaching their full potential
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[14rem] gap-4 mx-auto">
          <ProblemCard 
            number="1" 
            title="Manual Data Entry Errors" 
            description="Repetitive data entry leads to human errors, affecting reporting accuracy and business decisions." 
            icon={<BarChart3 className="w-6 h-6 text-red-600" />}
            className="md:col-span-2 bg-red-50/50 border-red-100 hover:border-red-200"
          />
          <ProblemCard 
            number="2" 
            title="Disconnected Systems" 
            description="Using multiple disconnected tools creates data silos and prevents real-time visibility across departments." 
            icon={<AlertCircle className="w-6 h-6 text-purple-600" />}
            className="bg-purple-50/50 border-purple-100 hover:border-purple-200"
          />
          <ProblemCard 
            number="3" 
            title="Limited Reporting" 
            description="Difficulty in generating comprehensive reports to track KPIs and business performance metrics." 
            icon={<Users className="w-6 h-6 text-blue-600" />}
            className="bg-blue-50/50 border-blue-100 hover:border-blue-200"
          />
          <ProblemCard 
            number="4" 
            title="Inventory Management" 
            description="Challenges in tracking inventory levels accurately, leading to stockouts or excess inventory." 
            icon={<Package className="w-6 h-6 text-green-600" />}
            className="bg-green-50/50 border-green-100 hover:border-green-200"
          />
          <ProblemCard 
            number="5" 
            title="Poor Customer Experience" 
            description="Lack of integration between customer data and operations affects service quality and response times." 
            icon={<UserX className="w-6 h-6 text-amber-600" />}
            className="bg-amber-50/50 border-amber-100 hover:border-amber-200"
          />
          <ProblemCard 
            number="6" 
            title="Scaling Difficulties" 
            description="Current systems can't efficiently scale with your growing business needs and increasing complexity." 
            icon={<TrendingDown className="w-6 h-6 text-orange-600" />}
            className="bg-orange-50/50 border-orange-100 hover:border-orange-200"
          />
          <ProblemCard 
            number="7" 
            title="Security & Compliance" 
            description="Growing concerns about data security, privacy regulations, and maintaining compliance standards in business operations." 
            icon={<Shield className="w-6 h-6 text-indigo-600" />}
            className="md:col-span-2 bg-indigo-50/50 border-indigo-100 hover:border-indigo-200"
          />
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;