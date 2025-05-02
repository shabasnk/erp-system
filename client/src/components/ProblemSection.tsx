import React from 'react';

interface ProblemCardProps {
  number: string;
  title: string;
  description: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ number, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start gap-4">
        <div className="bg-wez-soft-pink text-wez-red rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {number}
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ProblemSection: React.FC = () => {
  return (
    <section id="problems" className="bg-gray-50 py-16 md:py-24">
      <div className="section-container">
        <h2 className="section-title">Problems that complicate business management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProblemCard 
            number="1" 
            title="Manual Data Entry Errors" 
            description="Repetitive data entry leads to human errors, affecting reporting accuracy and business decisions." 
          />
          <ProblemCard 
            number="2" 
            title="Disconnected Systems" 
            description="Using multiple disconnected tools creates data silos and prevents real-time visibility across departments." 
          />
          <ProblemCard 
            number="3" 
            title="Limited Reporting" 
            description="Difficulty in generating comprehensive reports to track KPIs and business performance metrics." 
          />
          <ProblemCard 
            number="4" 
            title="Inventory Management" 
            description="Challenges in tracking inventory levels accurately, leading to stockouts or excess inventory." 
          />
          <ProblemCard 
            number="5" 
            title="Poor Customer Experience" 
            description="Lack of integration between customer data and operations affects service quality and response times." 
          />
          <ProblemCard 
            number="6" 
            title="Scaling Difficulties" 
            description="Current systems can't efficiently scale with your growing business needs and increasing complexity." 
          />
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;