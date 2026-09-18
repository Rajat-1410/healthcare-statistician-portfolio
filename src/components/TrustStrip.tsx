import { Activity, GraduationCap, BarChart2, Database } from 'lucide-react';

const credentials = [
  {
    icon: <Activity className="w-5 h-5 text-teal-500" />,
    title: "Statistician",
    subtitle: "Gastro Care Hospital"
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-teal-500" />,
    title: "M.Sc. Statistics",
    subtitle: "University of Allahabad"
  },
  {
    icon: <Database className="w-5 h-5 text-teal-500" />,
    title: "R + Python",
    subtitle: "Statistical Computing"
  },
  {
    icon: <BarChart2 className="w-5 h-5 text-teal-500" />,
    title: "Healthcare Analytics",
    subtitle: "Clinical Research"
  }
];

export const TrustStrip = () => {
  return (
    <section className="border-y border-gray-100 bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {credentials.map((cred, i) => (
            <div key={i} className={`flex items-center space-x-4 ${i !== 0 ? 'md:pl-8' : ''} ${i > 1 ? 'pt-6 md:pt-0' : ''}`}>
              <div className="flex-shrink-0 w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center">
                {cred.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-900">{cred.title}</p>
                <p className="text-xs text-text-muted mt-0.5">{cred.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
