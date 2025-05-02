import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SolutionSection: React.FC = () => {
  return (
    <section className="bg-section-pink bg-cover py-16 md:py-24">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            The all-in-one solution for effective business management
          </h2>
          <p className="text-lg text-white opacity-90 max-w-3xl mx-auto">
            WEZ-ERP brings together all your operational needs in one unified platform, 
            eliminating data silos and streamlining workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <span className="inline-block bg-wez-soft-pink text-wez-red px-3 py-1 rounded-full text-sm font-medium">
                Core Feature
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">Centralized Management</h3>
            <p className="text-gray-600 mb-4">
              Manage inventory, orders, customers, and finances in one place with real-time updates across all departments.
            </p>
            <div className="mt-auto pt-4 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Operations Director</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <span className="inline-block bg-wez-soft-pink text-wez-red px-3 py-1 rounded-full text-sm font-medium">
                Advanced Analytics
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">Data-Driven Decisions</h3>
            <p className="text-gray-600 mb-4">
              Interactive dashboards and custom reports that give you actionable insights to optimize operations and increase profitability.
            </p>
            <div className="mt-auto pt-4 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
              <div>
                <p className="font-medium">Michael Chen</p>
                <p className="text-sm text-gray-500">Business Analyst</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <span className="inline-block bg-wez-soft-pink text-wez-red px-3 py-1 rounded-full text-sm font-medium">
                Automation
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">Streamlined Workflows</h3>
            <p className="text-gray-600 mb-4">
              Automate repetitive tasks, approvals, and notifications to save time and reduce errors across all business processes.
            </p>
            <div className="mt-auto pt-4 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
              <div>
                <p className="font-medium">Jessica Martinez</p>
                <p className="text-sm text-gray-500">Project Manager</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-white text-wez-red hover:bg-gray-100 flex items-center gap-2 mx-auto">
            See all solutions <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;