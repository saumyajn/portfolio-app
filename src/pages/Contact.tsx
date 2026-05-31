import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiX, FiSend, FiCheckCircle, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import DomeGallery from "../components/DomeGallery";

export default function Contact() {
  const [isExpanded, setIsExpanded] = useState(false);

  const domeImages = Array.from({ length: 14 }, (_, i) => ({
    src: `/images/IMG_${i + 1}.webp`,
    alt: `Original painting ${i + 1}`,
  }));

  const [inputs, setInputs] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: false });

  const isEmailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email), [inputs.email]);
  const canSubmit = inputs.name && inputs.email && inputs.message && isEmailValid;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "7f4657de-d1fc-480a-8048-45b0860d50d9", 
          ...inputs
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ loading: false, success: true, error: false });
        setInputs({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 4000);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, success: false, error: true });
    }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen flex flex-col md:flex-row bg-[#050505] overflow-hidden pointer-events-auto border-t border-white/5">
      
      {/* LEFT SIDE: The 3D Dome Gallery */}
      <div className="w-full md:w-1/2 relative z-0 h-[60vh] md:h-screen">
        <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20 pointer-events-none">
          <p className="text-[var(--accent-emerald)] font-mono tracking-widest uppercase text-xs md:text-sm drop-shadow-lg bg-[#050505]/50 px-4 py-2 rounded-full items-center border border-white/10 backdrop-blur-md">
            A few of my original Paintings
          </p>
        </div>
        <div className="absolute inset-0 pointer-events-auto">
           <DomeGallery images={domeImages} />
        </div>
      </div>

      {/* RIGHT SIDE: Cult UI Expandable Screen Trigger */}
      <div className="w-full md:w-1/2 relative z-10 flex flex-col items-center justify-center p-12 bg-gradient-to-l from-white/5 to-transparent border-l border-white/5">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-4">Let's Build.</h2>
          <p className="text-[var(--accent-amethyst)] font-mono tracking-widest uppercase text-sm drop-shadow-lg">Open to Opportunities</p>
        </div>

        <motion.button 
          layoutId="expandable-contact"
          onClick={() => setIsExpanded(true)}
          className="group relative flex items-center gap-4 bg-white text-black px-8 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] pointer-events-auto"
        >
          Reach Out <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* THE CULT UI EXPANDABLE SCREEN OVERLAY */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 pointer-events-auto">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />

            <motion.div 
              layoutId="expandable-contact"
              className="relative w-[95%] md:w-full max-w-5xl h-[90vh] md:h-[85vh] max-h-[850px] bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <button aria-label="Close contact form"
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 md:p-3 bg-black/50 backdrop-blur-md hover:bg-white/20 rounded-full text-white transition-colors border border-white/10"
              >
                <FiX size={24} />
              </button>

              {/* Modal Left Side (Info) */}
              <div className="w-full md:w-[35%] bg-[#111] p-6 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 shrink-0">
                <div>
                  <h3 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Get in touch.</h3>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                    I am currently available for opportunities. Whether you have a project in mind, an architecture problem to solve, or just want to connect - send me a message.
                  </p>
                </div>

                <div className="mt-6 md:mt-12 space-y-6">
                  <a href="mailto:saumyajn1994@gmail.com" className="flex items-center gap-4 text-white/70 hover:text-emerald-400 transition-colors pointer-events-auto">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                      <FiMail size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/40">Direct Email</span>
                      <span className="font-medium text-sm md:text-base truncate">saumyajn1994@gmail.com</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Modal Right Side (The Integrated Form) */}
              {/* FIX: Added min-h-0 here to ensure flexbox constraints trigger the scrollbar! */}
              <div className="w-full md:w-[65%] p-6 md:p-12 flex flex-col justify-start md:justify-center relative overflow-y-auto flex-1 min-h-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-emerald-500/5 pointer-events-none" />
                
                <h4 className="text-xl md:text-2xl font-bold text-white mb-5 relative z-10 tracking-tight mt-2 md:mt-0">Send a Message</h4>

                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4 w-full max-w-2xl pb-4">
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label htmlFor="name" className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/50 mb-1.5">Name</label>
                      <input id="name"
                        type="text" name="name" value={inputs.name} onChange={handleChange} required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/20 focus:outline-none focus:border-[var(--accent-emerald)] focus:bg-white/10 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="email" className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/50 mb-1.5">Email</label>
                      <input id="email"
                        type="email" name="email" value={inputs.email} onChange={handleChange} required
                        className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/20 focus:outline-none focus:bg-white/10 transition-colors ${inputs.email.length > 0 && !isEmailValid ? 'border-red-500' : 'border-white/10 focus:border-[var(--accent-emerald)]'}`}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/50 mb-1.5">Subject</label>
                    <input id="subject"
                      type="text" name="subject" value={inputs.subject} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/20 focus:outline-none focus:border-[var(--accent-emerald)] focus:bg-white/10 transition-colors"
                      placeholder="Opportunity / Collaboration"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/50 mb-1.5">Message</label>
                    <textarea id="message"
                      name="message" value={inputs.message} onChange={handleChange} required rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/20 focus:outline-none focus:border-[var(--accent-emerald)] focus:bg-white/10 transition-colors resize-none"
                      placeholder="How can I help you?"
                    />
                  </div>

                  {/* Status Alerts */}
                  <AnimatePresence>
                    {status.success && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm">
                        <FiCheckCircle size={18} /> Message sent successfully! I'll get back to you soon.
                      </motion.div>
                    )}
                    {status.error && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                        <FiAlertCircle size={18} /> Failed to send message. Please try again.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    type="submit" 
                    disabled={!canSubmit || status.loading}
                    className="mt-1 md:mt-2 group flex items-center justify-center gap-3 bg-white text-black px-8 py-3.5 md:py-4 rounded-xl font-bold text-sm hover:bg-[var(--accent-emerald)] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shrink-0"
                  >
                    {status.loading ? 'Sending...' : 'Send Message'}
                    {!status.loading && <FiSend className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />}
                  </button>

                </form>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}