import React from 'react';
import { Button } from "@/components/ui/button";

// First Benefits Section
export const BenefitsSection1: React.FC = () => {
  return (
    <section id="benefits" className="bg-section-blue py-16 md:py-24">
      <div className="section-container">
        <h2 className="section-title">Manage your team and track progress effortlessly</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="font-semibold mb-2">Team Collaboration</h3>
                <p className="text-gray-600 text-sm">Streamline communication and project coordination</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="font-semibold mb-2">Task Management</h3>
                <p className="text-gray-600 text-sm">Organize and prioritize work across departments</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="font-semibold mb-2">Resource Allocation</h3>
                <p className="text-gray-600 text-sm">Optimize workloads and prevent bottlenecks</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-600 text-sm">Visualize milestones and project completion status</p>
              </div>
            </div>
            <div className="mt-8 text-center md:text-left">
              <Button className="gradient-button">
                Try team management tools
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center">
              <p className="text-gray-500">Team Dashboard Preview</p>
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
    <section className="bg-section-green py-16 md:py-24">
      <div className="section-container">
        <h2 className="section-title">Visual reports to analyze business metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center">
              <p className="text-gray-500">Analytics Dashboard Preview</p>
            </div>
          </div>
          
          <div>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="bg-wez-red rounded-full text-white w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">1</span>
                <div>
                  <h3 className="font-semibold mb-1">Real-time Analytics</h3>
                  <p className="text-gray-600">Track KPIs and business metrics as they happen with customizable dashboards</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-wez-red rounded-full text-white w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">2</span>
                <div>
                  <h3 className="font-semibold mb-1">Custom Reports</h3>
                  <p className="text-gray-600">Create tailored reports for different departments and stakeholders</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-wez-red rounded-full text-white w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">3</span>
                <div>
                  <h3 className="font-semibold mb-1">Data Visualization</h3>
                  <p className="text-gray-600">Transform complex data into easy-to-understand charts and graphs</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-wez-red rounded-full text-white w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">4</span>
                <div>
                  <h3 className="font-semibold mb-1">Export Capabilities</h3>
                  <p className="text-gray-600">Share insights in multiple formats including PDF, Excel, and PowerPoint</p>
                </div>
              </li>
            </ul>
            <div className="mt-8">
              <Button className="gradient-button">
                Explore analytics features
              </Button>
            </div>
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
        <h2 className="section-title">Easily track orders and customer operations</h2>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Customer Orders</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Filter</Button>
                <Button variant="outline" size="sm">Export</Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm">#ORD-2023-1842</td>
                    <td className="px-4 py-3 text-sm">John Doe</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Delivered</span>
                    </td>
                    <td className="px-4 py-3 text-sm">May 1, 2023</td>
                    <td className="px-4 py-3 text-sm">$1,205.00</td>
                    <td className="px-4 py-3 text-sm text-wez-red">View Details</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">#ORD-2023-1841</td>
                    <td className="px-4 py-3 text-sm">Jane Smith</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Processing</span>
                    </td>
                    <td className="px-4 py-3 text-sm">Apr 30, 2023</td>
                    <td className="px-4 py-3 text-sm">$850.75</td>
                    <td className="px-4 py-3 text-sm text-wez-red">View Details</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">#ORD-2023-1840</td>
                    <td className="px-4 py-3 text-sm">Robert Johnson</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Shipped</span>
                    </td>
                    <td className="px-4 py-3 text-sm">Apr 29, 2023</td>
                    <td className="px-4 py-3 text-sm">$2,540.25</td>
                    <td className="px-4 py-3 text-sm text-wez-red">View Details</td>
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