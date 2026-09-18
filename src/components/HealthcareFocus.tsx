import React from 'react';
import { motion } from 'framer-motion';
import { Database, Filter, Calculator, Network, LayoutDashboard, Lightbulb } from 'lucide-react';

const pipeline = [
  { icon: <Database />, label: "Patient Data" },
  { icon: <Filter />, label: "Data Cleaning" },
  { icon: <Calculator />, label: "Statistical Analysis" },
  { icon: <Network />, label: "Modelling" },
  { icon: <LayoutDashboard />, label: "Visualization" },
  { icon: <Lightbulb />, label: "Clinical Insight" },
];

export const HealthcareFocus = () => {
  return (
    <section className="py-24 bg-navy-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Focused on Healthcare. Built for Data.</h2>
        <p className="text-navy-100 text-lg max-w-3xl mx-auto mb-16 leading-relaxed opacity-90">
          Healthcare datasets require careful statistical reasoning, data quality checks, appropriate methodology, and responsible interpretation. I design analytical pipelines that respect the complexity of clinical data.
        </p>

        {/* Pipeline Visual */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 lg:gap-4 flex-wrap">
          {pipeline.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center bg-navy-800/80 backdrop-blur-sm border border-navy-700 p-4 rounded-2xl w-32 md:w-36 shadow-lg"
              >
                <div className="text-teal-400 mb-3">{step.icon}</div>
                <span className="text-xs font-semibold text-center">{step.label}</span>
              </motion.div>
              
              {index < pipeline.length - 1 && (
                <div className="hidden md:block text-navy-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              )}
              {index < pipeline.length - 1 && (
                <div className="md:hidden text-navy-500 my-1 transform rotate-90">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <p className="text-xs text-navy-300 mt-12 max-w-xl mx-auto opacity-60">
          Note: This website demonstrates analytical capabilities and does not provide medical advice. All statistical findings must be interpreted by qualified healthcare professionals.
        </p>
      </div>
    </section>
  );
};
