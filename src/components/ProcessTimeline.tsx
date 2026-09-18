import { motion } from 'framer-motion';

const steps = [
  { id: '01', title: 'Understand', desc: 'Understand the research question, business problem, or analytical objective.' },
  { id: '02', title: 'Prepare', desc: 'Clean, structure, validate, and explore the data.' },
  { id: '03', title: 'Analyze', desc: 'Apply appropriate statistical or machine learning methods.' },
  { id: '04', title: 'Interpret', desc: 'Translate statistical results into understandable insights.' },
  { id: '05', title: 'Deliver', desc: 'Provide clear reports, visualizations, dashboards, or analysis outputs.' }
];

export const ProcessTimeline = () => {
  return (
    <section className="py-24 bg-navy-900 text-white overflow-hidden relative">
      {/* Decorative bg */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How I Work</h2>
          <p className="text-teal-400 text-lg">A structured approach to data analysis.</p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-navy-700 -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Node */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-500 border-4 border-navy-900 z-10"></div>
                
                <div className="md:pt-16 md:pb-16 flex flex-col md:items-center md:text-center h-full">
                  <div className="text-teal-400 font-mono text-xl font-bold mb-2">Step {step.id}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-navy-100 text-sm opacity-80 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
