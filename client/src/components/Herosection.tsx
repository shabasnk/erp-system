import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Make your business systematic and easy to manage.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              WEZ-ERP gives you all the tools you need to streamline your operations, 
              enhance productivity, and make informed business decisions with real-time data.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="gradient-button">
                Get started for free
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                Schedule a demo <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-xl">
            {/* This is a placeholder for the dashboard image */}
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;