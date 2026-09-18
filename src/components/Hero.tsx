import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 text-xs font-semibold uppercase tracking-wider mb-6 border border-teal-500/20">
            <span>Statistician • Healthcare Analytics • Statistical Research</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-navy-900 leading-tight mb-6">
            Data that answers the questions that matter.
          </h1>
          
          <p className="text-lg md:text-xl text-text-muted mb-8 leading-relaxed max-w-lg">
            Statistical and data analytics support for healthcare research, clinical studies, and data-driven decision making.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="px-8 py-4 text-base font-medium text-white bg-navy-900 rounded-full hover:bg-navy-800 transition-all shadow-premium hover:shadow-lg text-center"
            >
              Discuss a Project
            </a>
            <a
              href="#work"
              className="px-8 py-4 text-base font-medium text-navy-900 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all text-center"
            >
              Explore My Work
            </a>
          </div>
        </motion.div>

        {/* Abstract Data Viz */}
        <motion.div
          className="relative h-[400px] rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 overflow-hidden shadow-2xl flex items-center justify-center p-8 border border-navy-700"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Decorative Grid */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          {/* Synthetic Chart elements using SVG */}
          <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5BC0BE" stopOpacity="0.2"/>
                <stop offset="50%" stopColor="#5BC0BE" stopOpacity="1"/>
                <stop offset="100%" stopColor="#64ffda" stopOpacity="0.8"/>
              </linearGradient>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5BC0BE" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#5BC0BE" stopOpacity="0"/>
              </linearGradient>
            </defs>

            {/* Axes */}
            <path d="M 40 260 L 360 260" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <path d="M 40 40 L 40 260" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

            {/* Grid Lines */}
            {[80, 120, 160, 200, 240].map(y => (
              <path key={y} d={`M 40 ${y} L 360 ${y}`} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
            ))}

            {/* Main Survival/Trend Curve */}
            <motion.path
              d="M 40 60 C 100 60, 120 120, 180 150 C 240 180, 280 230, 360 240"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Area under curve */}
            <motion.path
              d="M 40 60 C 100 60, 120 120, 180 150 C 240 180, 280 230, 360 240 L 360 260 L 40 260 Z"
              fill="url(#areaGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />

            {/* Confidence Interval lines (dashed) */}
            <motion.path
              d="M 40 40 C 100 40, 120 90, 180 120 C 240 150, 280 210, 360 220"
              fill="none"
              stroke="#5BC0BE"
              strokeOpacity="0.3"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.7 }}
            />
            <motion.path
              d="M 40 80 C 100 80, 120 150, 180 180 C 240 210, 280 250, 360 255"
              fill="none"
              stroke="#5BC0BE"
              strokeOpacity="0.3"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.7 }}
            />

            {/* Data points */}
            {[
              {x: 100, y: 88},
              {x: 150, y: 135},
              {x: 210, y: 165},
              {x: 280, y: 228}
            ].map((point, i) => (
              <motion.circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#ffffff"
                stroke="#0B132B"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 + (i * 0.2) }}
              />
            ))}
          </svg>
          
          <div className="absolute bottom-4 right-4 text-[10px] text-white/40 uppercase tracking-widest font-mono">
            Synthetic Data Demo
          </div>
        </motion.div>
      </div>
    </section>
  );
};
