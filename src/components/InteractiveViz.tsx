import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area, Legend
} from 'recharts';

const clinicalData = [
  { time: 0, groupA: 100, groupB: 100 },
  { time: 10, groupA: 95, groupB: 92 },
  { time: 20, groupA: 85, groupB: 78 },
  { time: 30, groupA: 78, groupB: 65 },
  { time: 40, groupA: 72, groupB: 50 },
  { time: 50, groupA: 68, groupB: 42 },
  { time: 60, groupA: 62, groupB: 35 }
];

const businessData = [
  { month: 'Jan', revenue: 4000, profit: 2400 },
  { month: 'Feb', revenue: 3000, profit: 1398 },
  { month: 'Mar', revenue: 2000, profit: 9800 },
  { month: 'Apr', revenue: 2780, profit: 3908 },
  { month: 'May', revenue: 1890, profit: 4800 },
  { month: 'Jun', revenue: 2390, profit: 3800 },
];

const mlData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.1, tpr: 0.5 },
  { fpr: 0.2, tpr: 0.75 },
  { fpr: 0.4, tpr: 0.88 },
  { fpr: 0.6, tpr: 0.94 },
  { fpr: 0.8, tpr: 0.98 },
  { fpr: 1, tpr: 1 }
];

export const InteractiveViz = () => {
  const [activeTab, setActiveTab] = useState<'clinical' | 'business' | 'ml'>('clinical');

  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Where Statistics Meets Data</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Interactive analytical capabilities. <span className="text-teal-600 font-medium text-sm block mt-2">Interactive demonstration using synthetic data</span>
          </p>
        </div>

        <div className="bg-background rounded-3xl p-2 shadow-premium max-w-5xl mx-auto border border-gray-100">
          <div className="flex flex-wrap sm:flex-nowrap gap-2 p-2 bg-white rounded-2xl shadow-sm mb-6 border border-gray-50">
            {[
              { id: 'clinical', label: 'Clinical & Survival' },
              { id: 'business', label: 'Business KPIs' },
              { id: 'ml', label: 'Machine Learning' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-navy-900 text-white shadow-md' 
                    : 'text-text-muted hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl h-[400px] relative">
            <AnimatePresence mode="wait">
              {activeTab === 'clinical' && (
                <motion.div 
                  key="clinical"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <h3 className="text-lg font-bold text-navy-900 mb-6">Synthetic Kaplan-Meier Survival Estimate</h3>
                  <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={clinicalData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis dataKey="time" label={{ value: 'Time (Months)', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Survival Probability (%)', angle: -90, position: 'insideLeft' }} domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Line type="stepAfter" dataKey="groupA" name="Treatment A" stroke="#0B132B" strokeWidth={3} dot={false} />
                      <Line type="stepAfter" dataKey="groupB" name="Treatment B" stroke="#5BC0BE" strokeWidth={3} dot={false} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              )}

              {activeTab === 'business' && (
                <motion.div 
                  key="business"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <h3 className="text-lg font-bold text-navy-900 mb-6">Synthetic Business KPI Overview</h3>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={businessData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                      <Legend verticalAlign="top" height={36} />
                      <Bar dataKey="revenue" name="Revenue" fill="#1C2541" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="profit" name="Profit" fill="#48A9A6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              )}

              {activeTab === 'ml' && (
                <motion.div 
                  key="ml"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <h3 className="text-lg font-bold text-navy-900 mb-6">Synthetic ROC Curve (Model Performance)</h3>
                  <ResponsiveContainer width="100%" height="85%">
                    <AreaChart data={mlData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="fpr" type="number" domain={[0, 1]} label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }} />
                      <YAxis type="number" domain={[0, 1]} label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                      <Area type="monotone" dataKey="tpr" name="Model ROC" stroke="#0B132B" fill="#5BC0BE" fillOpacity={0.2} strokeWidth={3} />
                      {/* Random guess line */}
                      <Line type="linear" dataKey="fpr" name="Random" stroke="#9ca3af" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
