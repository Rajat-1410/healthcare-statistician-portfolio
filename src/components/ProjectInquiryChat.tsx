import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, AlertCircle, CheckCircle2, X } from 'lucide-react';

type Message = {
  id: string;
  sender: 'system' | 'user';
  text: string;
  isReview?: boolean;
};

type ChatStep = 'CATEGORY' | 'DESCRIPTION' | 'NAME' | 'EMAIL' | 'TIMELINE' | 'REVIEW' | 'SUBMITTED';

type InquiryPayload = {
  category: string;
  query: string;
  name: string;
  email: string;
  timeline: string;
  file: File | null;
};

const SUGGESTIONS = [
  "Clinical Data Analysis",
  "Statistical Analysis",
  "Survival Analysis",
  "Machine Learning",
  "Power BI Dashboard",
  "Data Cleaning / EDA",
  "Research / Thesis Analysis",
  "Other"
];

const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 1–2 weeks",
  "Within a month",
  "Just exploring"
];

const RESPONSES: Record<string, string> = {
  "Clinical Data Analysis": "What kind of clinical dataset or research question are you working with?",
  "Statistical Analysis": "Tell me about the data you have and the hypothesis you'd like to test.",
  "Survival Analysis": "Tell me about your time-to-event data, outcome, and what you want to investigate.",
  "Machine Learning": "What are you trying to predict, and what kind of dataset do you have?",
  "Power BI Dashboard": "What kind of dashboard or business reporting do you need?",
  "Data Cleaning / EDA": "How messy is the current dataset, and what format is it in?",
  "Research / Thesis Analysis": "Tell me about your research question, dataset, and the analysis you are considering.",
  "Other": "Please describe your project or data problem."
};

// Abstracted submission API function
const submitInquiryAPI = async (inquiry: InquiryPayload) => {
  const formData = new FormData();
  formData.append('category', inquiry.category);
  formData.append('query', inquiry.query);
  formData.append('name', inquiry.name);
  formData.append('email', inquiry.email);
  formData.append('timeline', inquiry.timeline);
  
  if (inquiry.file) {
    formData.append('file', inquiry.file);
  }

  const response = await fetch('/api/inquiry', {
    method: 'POST',
    body: formData, // fetch automatically sets multipart/form-data with boundaries
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to submit inquiry');
  }

  return response.json();
};

const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const ProjectInquiryChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'system',
      text: "Hi! Tell me a little about what you need help with. You can describe your project in your own words — no technical language required."
    }
  ]);
  
  const [step, setStep] = useState<ChatStep>('CATEGORY');
  const [payload, setPayload] = useState<InquiryPayload>({
    category: '', query: '', name: '', email: '', timeline: '', file: null
  });
  
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, step, selectedFile]);

  const addSysMsg = (text: string, isReview = false) => {
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'system', text, isReview }]);
    }, 600);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: suggestion }]);
    
    if (step === 'CATEGORY') {
      setPayload(prev => ({ ...prev, category: suggestion }));
      setStep('DESCRIPTION');
      addSysMsg(RESPONSES[suggestion] || RESPONSES["Other"]);
    } else if (step === 'TIMELINE') {
      setPayload(prev => ({ ...prev, timeline: suggestion }));
      setStep('REVIEW');
      addSysMsg("Great. Here is a summary of your inquiry:", true);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const text = inputValue.trim();
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text }]);
    setInputValue("");

    if (step === 'CATEGORY') {
      setPayload(prev => ({ ...prev, category: text }));
      setStep('DESCRIPTION');
      addSysMsg(RESPONSES["Other"]);
    } else if (step === 'DESCRIPTION') {
      setPayload(prev => ({ ...prev, query: text }));
      setStep('NAME');
      addSysMsg("How can I reach you? What is your name?");
    } else if (step === 'NAME') {
      setPayload(prev => ({ ...prev, name: text }));
      setStep('EMAIL');
      addSysMsg("Thanks! And what is your email address?");
    } else if (step === 'EMAIL') {
      if (!isValidEmail(text)) {
        addSysMsg("That doesn't look like a valid email. Please enter a valid email address.");
        return;
      }
      setPayload(prev => ({ ...prev, email: text }));
      setStep('TIMELINE');
      addSysMsg("When are you looking to start?");
    } else if (step === 'TIMELINE') {
      setPayload(prev => ({ ...prev, timeline: text }));
      setStep('REVIEW');
      addSysMsg("Great. Here is a summary of your inquiry:", true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleEdit = () => {
    setStep('CATEGORY');
    setMessages([{
      id: Date.now().toString(),
      sender: 'system',
      text: "Let's start over. What do you need help with?"
    }]);
    setPayload({ category: '', query: '', name: '', email: '', timeline: '', file: null });
    setSelectedFile(null);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    const finalPayload = { ...payload, file: selectedFile };
    setPayload(finalPayload);
    
    try {
      await submitInquiryAPI(finalPayload);
      setIsSubmitting(false);
      setStep('SUBMITTED');
    } catch (error: any) {
      setIsSubmitting(false);
      addSysMsg(`Submission failed: ${error.message}. Please try again later.`, false);
    }
  };

  const renderReviewCard = () => (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mt-3 text-navy-900 w-full max-w-sm">
      <div className="space-y-3 text-sm">
        <div><span className="font-semibold text-teal-700">Project Type:</span> {payload.category}</div>
        <div><span className="font-semibold text-teal-700">Description:</span> {payload.query}</div>
        <div><span className="font-semibold text-teal-700">Name:</span> {payload.name}</div>
        <div><span className="font-semibold text-teal-700">Email:</span> {payload.email}</div>
        <div><span className="font-semibold text-teal-700">Timeline:</span> {payload.timeline}</div>
        {selectedFile && (
          <div><span className="font-semibold text-teal-700">Attached File:</span> {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</div>
        )}
      </div>
      <div className="mt-5 flex gap-3">
        <button onClick={handleEdit} disabled={isSubmitting} className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50">
          Edit
        </button>
        <button onClick={handleFinalSubmit} disabled={isSubmitting} className="flex-[2] py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-medium rounded-lg transition-colors flex justify-center items-center disabled:opacity-50">
          {isSubmitting ? 'Submitting...' : 'Submit Project Inquiry'}
        </button>
      </div>
    </div>
  );

  return (
    <section id="contact" className="py-24 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Tell me what you're working on.</h2>
            <p className="text-text-muted text-lg mb-8">
              Have a dataset, research question, dashboard requirement, or statistical problem? Describe it below.
            </p>
            
            <div className="hidden lg:block">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-8 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 leading-relaxed">
                  <strong>Privacy Note:</strong> Please do not upload personally identifiable patient information (PHI/PII) or other sensitive medical data.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-4">Prefer standard email?</p>
                <a href="mailto:rjrajat4434@gmail.com" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-navy-900 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm w-full">
                  rjrajat4434@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-background border border-gray-200 rounded-2xl shadow-premium h-[600px] flex flex-col overflow-hidden relative">
              
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-navy-900">Project Inquiry</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <AnimatePresence initial={false}>
                  {messages.map((msg: Message) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-4 rounded-2xl ${
                        msg.sender === 'user' 
                          ? 'bg-navy-900 text-white rounded-tr-sm' 
                          : 'bg-white border border-gray-100 text-navy-900 rounded-tl-sm shadow-sm'
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        {msg.isReview && renderReviewCard()}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {step === 'CATEGORY' && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-2 pt-2"
                  >
                    {SUGGESTIONS.map(suggestion => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-navy-700 hover:border-teal-500 hover:text-teal-600 transition-colors shadow-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
                
                {step === 'TIMELINE' && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-2 pt-2"
                  >
                    {TIMELINE_OPTIONS.map(suggestion => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-navy-700 hover:border-teal-500 hover:text-teal-600 transition-colors shadow-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}

                {step === 'SUBMITTED' && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center p-6 bg-green-50 border border-green-100 rounded-xl gap-3 text-center mt-4"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-green-800">
                      Thanks — your project inquiry has been securely submitted!
                    </span>
                    <span className="text-xs text-green-700/80 mt-2 italic">
                      Note: Email delivery is connected via Resend, but requires a valid RESEND_API_KEY and verified domain before production launch.
                    </span>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="bg-white border-t border-gray-100 p-4 relative z-10">
                {step !== 'SUBMITTED' && step !== 'REVIEW' ? (
                  <div className="flex flex-col gap-2">
                    {/* File Attachment Chip */}
                    {selectedFile && (
                      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-fit mx-2">
                        <Paperclip className="w-4 h-4 text-teal-600" />
                        <span className="text-xs font-medium text-navy-900 truncate max-w-[200px]">{selectedFile.name}</span>
                        <button 
                          onClick={() => setSelectedFile(null)}
                          className="text-gray-400 hover:text-red-500 transition-colors ml-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    <form onSubmit={handleSend} className="relative flex items-center">
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept=".csv,.xlsx,.xls,.pdf,.docx,.doc" 
                      />
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute left-4 text-gray-400 hover:text-navy-900 transition-colors"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={
                          step === 'CATEGORY' ? "Describe your project or select an option..." :
                          step === 'DESCRIPTION' ? "Describe your dataset and question..." :
                          step === 'NAME' ? "Enter your name..." :
                          step === 'EMAIL' ? "Enter your email..." :
                          step === 'TIMELINE' ? "Enter timeline or select an option..." :
                          "Type your message..."
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded-full py-4 pl-12 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                      />
                      <button 
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="absolute right-2 p-2.5 bg-navy-900 text-white rounded-full hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                ) : step === 'SUBMITTED' ? (
                  <div className="text-center p-4">
                    <button 
                      onClick={handleEdit}
                      className="text-sm font-medium text-teal-600 hover:text-teal-700"
                    >
                      Start new inquiry
                    </button>
                  </div>
                ) : null}
              </div>

            </div>

            <div className="lg:hidden mt-8">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 leading-relaxed">
                  <strong>Privacy Note:</strong> Please do not upload personally identifiable patient information (PHI/PII).
                </p>
              </div>
              <a href="mailto:rjrajat4434@gmail.com" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-navy-900 bg-white border border-gray-200 rounded-full w-full border-solid">
                Prefer email? Send direct
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
