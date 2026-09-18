import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Download } from 'lucide-react';

const experience = [
  {
    type: 'work',
    date: 'June 2026 – Present',
    title: 'Statistician',
    organization: 'Gastro Care Hospital',
    details: [
      'Clinical data analysis',
      'Statistical modelling',
      'Hypothesis testing',
      'Survival analysis',
      'Data management',
      'Statistical reporting',
      'Publication-ready visualizations'
    ]
  },
  {
    type: 'edu',
    date: '2024 – 2026',
    title: 'M.Sc. Statistics',
    organization: 'University of Allahabad',
    details: []
  },
  {
    type: 'edu',
    date: '2024',
    title: 'B.Sc. Statistics',
    organization: 'University of Allahabad',
    details: []
  }
];

export const Experience = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">Experience & Education</h2>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
          {experience.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-teal-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                {item.type === 'work' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white shadow-premium border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-navy-900 text-lg">{item.title}</h3>
                </div>
                <div className="text-teal-600 font-semibold text-sm mb-2">{item.organization}</div>
                <div className="text-xs text-gray-500 font-mono mb-4">{item.date}</div>
                
                {item.details.length > 0 && (
                  <ul className="text-sm text-text-muted space-y-1">
                    {item.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-navy-900 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            View Full Resume
          </button>
        </div>
      </div>
    </section>
  );
};
