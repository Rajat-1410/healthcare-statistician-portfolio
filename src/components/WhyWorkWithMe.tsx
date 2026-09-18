import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const points = [
  {
    title: "Statistical Thinking",
    description: "Methods selected according to the research or business question, not just applying algorithms blindly."
  },
  {
    title: "Healthcare Context",
    description: "Experience working with clinical datasets, understanding medical terminologies, and healthcare research methodologies."
  },
  {
    title: "Reproducible Analysis",
    description: "Structured analytical workflows using R and Python, ensuring results can be audited and verified."
  },
  {
    title: "Clear Communication",
    description: "Complex statistical results translated into understandable insights for non-technical stakeholders."
  },
  {
    title: "Publication-Ready Outputs",
    description: "Tables, charts, and reports prepared specifically for professional research workflows and journals."
  }
];

export const WhyWorkWithMe = () => {
  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          <div className="sticky top-32">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">Why work with me?</h2>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              Data analysis shouldn't end with a p-value or a complicated model. It should end with a clear, defensible answer to your question.
            </p>
            <div className="hidden md:block w-32 h-1 bg-teal-500 rounded-full"></div>
          </div>

          <div className="space-y-8">
            {points.map((point, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-teal-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{point.title}</h3>
                  <p className="text-text-muted leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
