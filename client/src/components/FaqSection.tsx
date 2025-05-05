import React from 'react';
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FeatureParticles } from './magicui/feature-particles';
import { ChevronDown, Search } from 'lucide-react';

const FaqSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeItem, setActiveItem] = React.useState<string | undefined>(undefined);

  const faqs = [
    {
      id: 'item-1',
      question: 'How long does it take to implement WEZ-ERP?',
      answer: 'Implementation times vary based on your business size and complexity. For small businesses, you can be up and running in as little as 2 weeks. For medium-sized businesses, the typical implementation timeframe is 4-6 weeks. Our team provides comprehensive onboarding and training to ensure a smooth transition.',
      category: 'Implementation'
    },
    {
      id: 'item-2',
      question: 'Can WEZ-ERP be customized for my specific industry?',
      answer: 'Yes, WEZ-ERP is highly customizable and can be tailored to meet the specific requirements of various industries including manufacturing, retail, healthcare, construction, and more. Our system includes industry-specific modules and custom field options to ensure it aligns perfectly with your business processes.',
      category: 'Customization'
    },
    {
      id: 'item-3',
      question: 'What kind of support do you offer?',
      answer: 'We provide multiple tiers of support depending on your needs. All plans include email and ticket support, while premium plans include dedicated account managers, 24/7 phone support, and priority response times. We also offer a comprehensive knowledge base and regular training webinars for all customers.',
      category: 'Support'
    },
    {
      id: 'item-4',
      question: 'Is my data secure with WEZ-ERP?',
      answer: 'Security is our top priority. WEZ-ERP employs industry-leading security practices including encrypted data storage, regular security audits, and compliance with GDPR, HIPAA, and other relevant standards. We provide role-based access control, two-factor authentication, and detailed audit logs to maintain the security and integrity of your business data.',
      category: 'Security'
    },
    {
      id: 'item-5',
      question: 'Can I integrate WEZ-ERP with my existing software?',
      answer: 'Yes, WEZ-ERP offers robust API capabilities and pre-built integrations with popular business applications including accounting software, CRM systems, e-commerce platforms, payment gateways, and more. Our team can assist with custom integrations to ensure WEZ-ERP works seamlessly with your existing technology infrastructure.',
      category: 'Integration'
    },
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="faq" className="relative py-20 overflow-hidden bg-gray-50/50">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-white/50"></div>
        <FeatureParticles />
      </div>
      
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 mb-6 text-sm font-semibold tracking-wider uppercase rounded-full"
            style={{
              background: 'linear-gradient(90deg, #ea384c 0%, #FF719A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            FAQ
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, #ea384c 0%, #FF719A 100%)'
            }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Find answers to common questions about WEZ-ERP system and how it can help your business.
          </motion.p>

          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative max-w-xl mx-auto mt-8 mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search your question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-[#ea384c] focus:ring-2 focus:ring-[#ea384c]/20 outline-none transition-all bg-white/80 backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto backdrop-blur-sm"
        >
          <Accordion 
            type="single" 
            collapsible 
            className="space-y-4"
            value={activeItem}
            onValueChange={setActiveItem}
          >
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * (index + 1) }}
              >
                <AccordionItem 
                  value={faq.id} 
                  className="group border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm hover:border-[#ea384c]/50 transition-all duration-300 overflow-hidden"
                >
                  <AccordionTrigger 
                    className="px-6 py-4 text-left font-medium hover:no-underline data-[state=open]:border-b border-gray-200"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <span className="block text-sm text-[#ea384c] mb-1">{faq.category}</span>
                        <span className="block text-lg group-hover:text-[#ea384c] transition-colors">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown 
                        className="h-5 w-5 shrink-0 text-[#ea384c] transition-transform duration-300 group-data-[state=open]:rotate-180" 
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-4 text-gray-600 leading-relaxed border-t-0">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;