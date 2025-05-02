import React from 'react';
import { 
  Users, 
  ChartPie, 
  ShoppingCart, 
  Database, 
  Clock, 
  Lock 
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="flex items-center mb-4">
        <div className="bg-wez-soft-pink p-3 rounded-lg text-wez-red mr-3">
          {icon}
        </div>
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="bg-white py-16 md:py-24">
      <div className="section-container">
        <h2 className="section-title">Explore the features we offer</h2>
        <p className="section-subtitle">
          WEZ-ERP provides a comprehensive suite of tools designed to streamline every aspect of your business operations.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Users size={24} />} 
            title="Team Management" 
            description="Manage employees, assign roles and track performance with powerful HR tools." 
          />
          <FeatureCard 
            icon={<ChartPie size={24} />} 
            title="Financial Analytics" 
            description="Generate detailed financial reports and visualize business performance in real-time." 
          />
          <FeatureCard 
            icon={<ShoppingCart size={24} />} 
            title="Inventory Control" 
            description="Track stock levels, manage suppliers, and automate reordering processes." 
          />
          <FeatureCard 
            icon={<Database size={24} />} 
            title="Customer Management" 
            description="Store customer data, track interactions, and improve customer satisfaction." 
          />
          <FeatureCard 
            icon={<Clock size={24} />} 
            title="Project Timeline" 
            description="Plan projects, set milestones, and monitor progress against deadlines." 
          />
          <FeatureCard 
            icon={<Lock size={24} />} 
            title="Advanced Security" 
            description="Protect sensitive data with role-based access control and encryption." 
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;