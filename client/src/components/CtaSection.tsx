import React from 'react';
import { Button } from "@/components/ui/button";

const CtaSection: React.FC = () => {
  return (
    <section className="bg-section-blue py-16 md:py-24">
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Try the product</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Experience how WEZ-ERP can transform your business operations. 
          Get started with a free 14-day trial, no credit card required.
        </p>
        <Button className="gradient-button text-lg px-8 py-4">
          Start your free trial
        </Button>
        <p className="mt-4 text-gray-500">No credit card required. Cancel anytime.</p>
      </div>
    </section>
  );
};

export default CtaSection;