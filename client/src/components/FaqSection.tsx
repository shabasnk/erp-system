import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="section-container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Find answers to common questions about WEZ-ERP system and how it can help your business.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg p-2">
              <AccordionTrigger className="font-medium px-4">How long does it take to implement WEZ-ERP?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1 text-gray-600">
                Implementation times vary based on your business size and complexity. For small businesses, 
                you can be up and running in as little as 2 weeks. For medium-sized businesses, the typical 
                implementation timeframe is 4-6 weeks. Our team provides comprehensive onboarding and 
                training to ensure a smooth transition.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border rounded-lg p-2">
              <AccordionTrigger className="font-medium px-4">Can WEZ-ERP be customized for my specific industry?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1 text-gray-600">
                Yes, WEZ-ERP is highly customizable and can be tailored to meet the specific requirements 
                of various industries including manufacturing, retail, healthcare, construction, and more. 
                Our system includes industry-specific modules and custom field options to ensure it aligns 
                perfectly with your business processes.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border rounded-lg p-2">
              <AccordionTrigger className="font-medium px-4">What kind of support do you offer?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1 text-gray-600">
                We provide multiple tiers of support depending on your needs. All plans include email and 
                ticket support, while premium plans include dedicated account managers, 24/7 phone support, 
                and priority response times. We also offer a comprehensive knowledge base and regular 
                training webinars for all customers.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border rounded-lg p-2">
              <AccordionTrigger className="font-medium px-4">Is my data secure with WEZ-ERP?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1 text-gray-600">
                Security is our top priority. WEZ-ERP employs industry-leading security practices including 
                encrypted data storage, regular security audits, and compliance with GDPR, HIPAA, and other 
                relevant standards. We provide role-based access control, two-factor authentication, and 
                detailed audit logs to maintain the security and integrity of your business data.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border rounded-lg p-2">
              <AccordionTrigger className="font-medium px-4">Can I integrate WEZ-ERP with my existing software?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1 text-gray-600">
                Yes, WEZ-ERP offers robust API capabilities and pre-built integrations with popular business 
                applications including accounting software, CRM systems, e-commerce platforms, payment 
                gateways, and more. Our team can assist with custom integrations to ensure WEZ-ERP works 
                seamlessly with your existing technology infrastructure.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;