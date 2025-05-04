import React from 'react';
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { FeatureParticles } from './magicui/feature-particles';
import { MagneticRipple } from './magicui/magnetic-ripple';
import { Ripple } from './magicui/ripple';

const CtaSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50"></div>
        <MagneticRipple />
        <FeatureParticles />
        <Ripple />
      </div>

      <div className="section-container relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-left space-y-6"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1 text-sm font-semibold tracking-wider uppercase rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #ea384c 0%, #FF719A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Start Now
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold leading-tight"
              >
                Transform Your Business{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ea384c] to-[#FF719A]">
                  Operations Today
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-600"
              >
                Experience how WEZ-ERP can revolutionize your workflow with our risk-free trial. 
                Join thousands of satisfied businesses already using our platform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button
                  className="relative group overflow-hidden rounded-xl px-8 py-6 text-lg"
                  style={{
                    background: 'linear-gradient(90deg, #ea384c 0%, #FF719A 100%)'
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{
                      x: ['100%', '-100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <span className="relative flex items-center gap-2 z-10">
                    Start your free trial
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-xl px-8 py-6 text-lg border-2 hover:border-[#ea384c]/50 hover:text-[#ea384c]"
                >
                  Schedule a demo
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-6 text-sm text-gray-500 pt-2"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#ea384c]" /> No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#ea384c]" /> Cancel anytime
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-[#ea384c] to-[#FF719A] rounded-2xl p-1">
                <div className="bg-white rounded-xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#ea384c]" />
                      <span className="font-semibold">Trial Benefits</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Full access to all features",
                      "Dedicated onboarding support",
                      "Integration assistance",
                      "Data migration help",
                      "Priority customer support"
                    ].map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                      >
                        <div className="h-2 w-2 rounded-full bg-[#ea384c]" />
                        <span className="text-gray-600">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;