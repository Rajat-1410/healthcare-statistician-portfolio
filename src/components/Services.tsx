import { motion } from 'framer-motion';
import { 
  HeartPulse, 
  LineChart, 
  Timer, 
  FileText, 
  BrainCircuit, 
  PieChart, 
  DatabaseBackup, 
  BarChart3 
} from 'lucide-react';

const services = [
  {
    title: "Healthcare & Clinical Analytics",
    description: "Statistical analysis of clinical and patient datasets to support healthcare research and evidence-based decision making.",
    icon: <HeartPulse className="w-6 h-6" />
  },
  {
    title: "Statistical Analysis & Biostatistics",
    description: "Hypothesis testing, regression, statistical modelling, study analysis, and interpretation of results.",
    icon: <LineChart className="w-6 h-6" />
  },
  {
    title: "Survival Analysis",
    description: "Kaplan-Meier analysis, Cox proportional hazards modelling, hazard functions, and time-to-event analysis.",
    icon: <Timer className="w-6 h-6" />
  },
  {
    title: "Clinical Research Support",
    description: "Support with data preparation, statistical methodology, analysis, interpretation, and publication-ready outputs.",
    icon: <FileText className="w-6 h-6" />
  },
  {
    title: "Machine Learning",
    description: "Predictive modelling and classification using Python and modern machine learning techniques.",
    icon: <BrainCircuit className="w-6 h-6" />
  },
  {
    title: "Power BI & Business Analytics",
    description: "Interactive dashboards, KPIs, business reporting, and data visualization for decision making.",
    icon: <PieChart className="w-6 h-6" />
  },
  {
    title: "Data Cleaning & EDA",
    description: "Transforming messy datasets into structured, analysis-ready data.",
    icon: <DatabaseBackup className="w-6 h-6" />
  },
  {
    title: "Statistical Reporting",
    description: "Publication-ready tables, visualizations, statistical summaries, and analytical reports.",
    icon: <BarChart3 className="w-6 h-6" />
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Analytics built around your problem.</h2>
          <p className="text-text-muted text-lg">
            From raw datasets to statistical insight, reporting, and decision-ready outputs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="premium-card p-8 group flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">{service.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed flex-grow">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
