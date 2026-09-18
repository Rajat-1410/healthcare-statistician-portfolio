import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Survival Analysis vs Machine Learning in Clinical Outcomes",
    category: "Clinical Research / Survival Analysis / Machine Learning",
    description: "Compared Cox Proportional Hazards models and machine learning approaches for clinical outcome analysis, with publication-ready statistical reporting and visualizations.",
    visualType: "survival",
    details: {
      problem: "Evaluate whether modern ML models outperform traditional Cox PH in predicting time-to-event clinical outcomes.",
      methodology: "Kaplan-Meier, Cox Proportional Hazards, Random Survival Forests.",
      tools: "R (survival, survminer), Python (scikit-survival)",
      outcome: "Developed a hybrid reporting framework combining interpretable hazard ratios with high-accuracy predictive ML models."
    }
  },
  {
    id: 2,
    title: "Diabetes Risk Prediction",
    category: "Healthcare / Machine Learning",
    description: "Developed predictive models using Logistic Regression, Random Forest, and KNN, with feature engineering, exploratory analysis, and ROC-AUC evaluation.",
    visualType: "ml",
    details: {
      problem: "Identify high-risk patients based on early demographic and clinical indicators.",
      methodology: "Logistic Regression, Random Forest, KNN, SMOTE for class imbalance.",
      tools: "Python (pandas, scikit-learn, seaborn)",
      outcome: "Achieved high ROC-AUC and delivered feature importance analysis to clinical stakeholders."
    }
  },
  {
    id: 3,
    title: "Power BI Business Analytics Dashboard",
    category: "Business Intelligence / Power BI",
    description: "Interactive dashboard for sales, inventory, and customer analytics with KPI reporting and DAX measures.",
    visualType: "dashboard",
    details: {
      problem: "Consolidate fragmented Excel reports into a unified, automated dashboard.",
      methodology: "Data Modeling (Star Schema), DAX measure creation, ETL.",
      tools: "Power BI, Power Query, DAX",
      outcome: "Reduced reporting time by 15 hours weekly and enabled drill-down analytics for management."
    }
  },
  {
    id: 4,
    title: "British Airways Customer Review Analysis",
    category: "Customer Analytics / Machine Learning",
    description: "Analyzed customer review data and developed predictive models to identify factors associated with customer satisfaction.",
    visualType: "sentiment",
    details: {
      problem: "Extract actionable insights from unstructured text reviews.",
      methodology: "NLP, Sentiment Analysis, Topic Modeling, Classification.",
      tools: "Python (NLTK, scikit-learn), WordClouds",
      outcome: "Identified key pain points in customer journey and delivered automated sentiment categorization."
    }
  }
];

export const FeaturedWork = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const renderVisual = (type: string) => {
    switch (type) {
      case 'survival':
        return (
          <div className="w-full h-48 bg-gray-50 rounded-t-2xl border-b border-gray-100 flex flex-col justify-end px-6 pt-6 relative overflow-hidden">
             <div className="absolute top-3 left-3 text-[10px] text-gray-400 font-mono">Illustrative visualization — synthetic data</div>
             <svg viewBox="0 0 100 50" className="w-full h-full text-navy-900">
                <path d="M 0 10 L 20 10 L 20 20 L 40 20 L 40 30 L 60 30 L 60 40 L 100 40" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M 0 10 L 30 10 L 30 15 L 50 15 L 50 25 L 80 25 L 80 35 L 100 35" fill="none" stroke="#5BC0BE" strokeWidth="1.5" strokeDasharray="2 2" />
             </svg>
          </div>
        );
      case 'ml':
        return (
          <div className="w-full h-48 bg-gray-50 rounded-t-2xl border-b border-gray-100 flex items-center justify-center relative overflow-hidden">
             <div className="absolute top-3 left-3 text-[10px] text-gray-400 font-mono">Illustrative visualization — synthetic data</div>
             <div className="flex gap-2 items-end h-24">
               {[40, 70, 45, 90, 65, 85].map((h, i) => (
                 <motion.div key={i} className="w-6 bg-teal-500 rounded-t-sm opacity-80" style={{ height: `${h}%` }}
                   initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i*0.1 }}
                 />
               ))}
             </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="w-full h-48 bg-gray-50 rounded-t-2xl border-b border-gray-100 flex items-center justify-center relative overflow-hidden p-4">
             <div className="absolute top-3 left-3 text-[10px] text-gray-400 font-mono">Illustrative visualization</div>
             <div className="w-full h-full bg-white rounded-lg shadow-sm border border-gray-100 p-2 flex flex-col gap-2">
                <div className="flex gap-2 h-1/3">
                  <div className="flex-1 bg-navy-50 rounded"></div>
                  <div className="flex-1 bg-navy-50 rounded"></div>
                  <div className="flex-1 bg-navy-50 rounded"></div>
                </div>
                <div className="flex gap-2 h-2/3">
                  <div className="w-2/3 bg-teal-50/50 rounded border border-teal-100"></div>
                  <div className="w-1/3 bg-gray-50 rounded"></div>
                </div>
             </div>
          </div>
        );
      case 'sentiment':
        return (
          <div className="w-full h-48 bg-gray-50 rounded-t-2xl border-b border-gray-100 flex items-center justify-center relative overflow-hidden">
             <div className="absolute top-3 left-3 text-[10px] text-gray-400 font-mono">Illustrative visualization</div>
             <div className="relative w-32 h-32 rounded-full border-8 border-navy-100">
               <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
                 <circle cx="50" cy="50" r="46" fill="none" stroke="#5BC0BE" strokeWidth="8" strokeDasharray="289" strokeDashoffset="80" />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center text-navy-900 font-bold text-xl">72%</div>
             </div>
          </div>
        );
      default:
        return <div className="w-full h-48 bg-gray-100 rounded-t-2xl"></div>;
    }
  };

  const activeProject = projects.find(p => p.id === selectedProject);

  return (
    <section id="work" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:flex justify-between items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Featured Work</h2>
            <p className="text-text-muted text-lg">Selected projects spanning healthcare research, predictive modelling, and business analytics.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="premium-card cursor-pointer group flex flex-col h-full"
              onClick={() => setSelectedProject(project.id)}
            >
              {renderVisual(project.visualType)}
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-xs font-semibold text-teal-600 mb-2">{project.category}</div>
                <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-teal-600 transition-colors">{project.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>
                <div className="flex items-center text-sm font-semibold text-navy-900 mt-auto">
                  View Project Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="overflow-y-auto p-8 sm:p-10">
                <div className="text-xs font-semibold text-teal-600 mb-3">{activeProject.category}</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-8 pr-8">{activeProject.title}</h2>
                
                <div className="grid sm:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-sm font-bold text-navy-900 mb-2 uppercase tracking-wider">Problem</h4>
                    <p className="text-text-muted text-sm leading-relaxed">{activeProject.details.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-900 mb-2 uppercase tracking-wider">Methodology</h4>
                    <p className="text-text-muted text-sm leading-relaxed">{activeProject.details.methodology}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-900 mb-2 uppercase tracking-wider">Tools</h4>
                    <p className="text-text-muted text-sm leading-relaxed font-mono">{activeProject.details.tools}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-900 mb-2 uppercase tracking-wider">Outcome</h4>
                    <p className="text-text-muted text-sm leading-relaxed">{activeProject.details.outcome}</p>
                  </div>
                </div>
                
                <div className="bg-navy-50 rounded-2xl p-6 border border-navy-100">
                  <p className="text-sm text-navy-800 text-center italic">
                    "Data visualization and detailed statistical reporting available upon request to protect client/research confidentiality."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
