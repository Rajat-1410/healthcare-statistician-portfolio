
const technologies = {
  "Statistical Computing": ["R", "Python", "SPSS", "Stata"],
  "Data Analytics": ["SQL", "Excel", "Power BI"],
  "Python Ecosystem": ["Pandas", "NumPy", "SciPy", "Statsmodels", "Scikit-learn"],
  "Statistical Methods": ["Survival Analysis", "Cox PH", "Kaplan-Meier", "Regression", "Hypothesis Testing"]
};

export const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Bio */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">Statistics with a purpose.</h2>
            <div className="space-y-4 text-text-muted text-lg leading-relaxed">
              <p>
                I am a Statistician and Data Analyst currently working at Gastro Care Hospital, with an M.Sc. in Statistics from the University of Allahabad.
              </p>
              <p>
                My work focuses on turning complex datasets into clear, evidence-based insights. I specialize in clinical data analysis, biostatistics, survival analysis, and statistical modelling. Whether it's evaluating clinical outcomes using Cox Proportional Hazards or building predictive machine learning models in Python, my goal is to provide rigorous, publication-ready statistical reporting.
              </p>
              <p>
                Beyond healthcare research, I apply these same analytical principles to business datasets—building interactive Power BI dashboards, performing exploratory data analysis, and driving data-driven decision making.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-background rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-navy-900 mb-8">Technical & Analytical Stack</h3>
            <div className="space-y-8">
              {Object.entries(technologies).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-3">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map(item => (
                      <span key={item} className="px-3 py-1.5 bg-white border border-gray-200 text-navy-800 text-sm font-medium rounded-lg shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
