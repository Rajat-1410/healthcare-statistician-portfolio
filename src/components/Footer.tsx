import { Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start border-b border-navy-800 pb-12 mb-8 gap-8">
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Rajat Kumar Singh</h2>
            <p className="text-navy-300 text-sm">Statistician | Data & Healthcare Analytics</p>
          </div>

          <div className="flex gap-8 text-sm font-medium text-navy-200">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/rajat-1410" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-navy-800 rounded-full hover:bg-teal-500 hover:text-white transition-all text-navy-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="#" className="p-2.5 bg-navy-800 rounded-full hover:bg-teal-500 hover:text-white transition-all text-navy-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="mailto:rjrajat4434@gmail.com" className="p-2.5 bg-navy-800 rounded-full hover:bg-teal-500 hover:text-white transition-all text-navy-300 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-navy-400">
          <p>© 2026 Rajat Kumar Singh. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            India • rjrajat4434@gmail.com • +91-9569921101
          </div>
        </div>
      </div>
    </footer>
  );
};
