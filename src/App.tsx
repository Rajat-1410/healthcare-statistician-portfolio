import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { Services } from './components/Services';
import { ProcessTimeline } from './components/ProcessTimeline';
import { FeaturedWork } from './components/FeaturedWork';
import { InteractiveViz } from './components/InteractiveViz';
import { About } from './components/About';
import { HealthcareFocus } from './components/HealthcareFocus';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { Experience } from './components/Experience';
import { ProjectInquiryChat } from './components/ProjectInquiryChat';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-text">
      <Navbar />
      <Hero />
      <TrustStrip />
      <Services />
      <ProcessTimeline />
      <FeaturedWork />
      <InteractiveViz />
      <About />
      <HealthcareFocus />
      <WhyWorkWithMe />
      <Experience />
      
      {/* Final CTA Banner */}
      <section className="py-24 bg-navy-900 text-white text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Have data that needs an answer?</h2>
        <p className="text-xl text-teal-400 mb-10 font-light">Let's turn your dataset into clear, defensible insights.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#contact" className="px-8 py-4 text-base font-medium text-navy-900 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg">
            Start a Project Inquiry
          </a>
          <a href="mailto:rjrajat4434@gmail.com" className="px-8 py-4 text-base font-medium text-white bg-transparent border border-white/30 rounded-full hover:bg-white/10 transition-colors">
            Email Me Directly
          </a>
        </div>
      </section>

      <ProjectInquiryChat />
      <Footer />
    </div>
  );
}

export default App;
