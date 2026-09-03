import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  MessageSquare, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Formulate a pre-filled mailto as backup
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || `Message from ${formData.name}`)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    
    setSubmitted(true);
    // Open mail client
    window.location.href = mailtoUrl;
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 6000);
  };

  return (
    <section id="contact" className="py-16 bg-[#FDFDFD] border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 pb-4 border-b border-black/15">
          <div className="inline-flex items-center gap-2 mb-2 text-xs font-black uppercase tracking-widest text-black">
            <MessageSquare className="w-3.5 h-3.5 text-black" />
            <span>Communications Desk • Connect</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif italic tracking-tight leading-none text-[#121212]">
            Get in Touch
          </h2>
          <p className="text-sm text-[#121212]/80 mt-2 max-w-xl font-sans">
            Interested in collaborating, hiring for an internship or software engineering role, or discussing data analytics? Send a message directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details & Quick Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary Email Card */}
            <div className="p-6 bg-white border border-black space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 border border-black bg-[#F5F5F4] text-black flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-mono uppercase tracking-widest font-bold text-black/60">Direct Inquiries</h3>
                    <p className="text-sm font-serif italic font-bold text-black">{personalInfo.email}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-black/10">
                <button
                  id="copy-contact-email-btn"
                  onClick={() => handleCopy(personalInfo.email, 'email')}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-black bg-white hover:bg-black hover:text-white text-[11px] font-bold uppercase tracking-wider text-black transition-colors"
                >
                  {copiedType === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
                <a
                  id="mail-to-link"
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center justify-center px-4 py-1.5 border border-black bg-black hover:bg-neutral-800 text-white text-[11px] font-bold uppercase tracking-wider transition-colors"
                >
                  Open Mail
                </a>
              </div>
            </div>

            {/* Mobile / WhatsApp Card */}
            <div className="p-6 bg-white border border-black space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 border border-black bg-[#F5F5F4] text-black flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-mono uppercase tracking-widest font-bold text-black/60">Direct Telephony</h3>
                    <p className="text-sm font-mono font-bold text-black">{personalInfo.phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-black/10">
                <button
                  id="copy-contact-phone-btn"
                  onClick={() => handleCopy(personalInfo.phone, 'phone')}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-black bg-white hover:bg-black hover:text-white text-[11px] font-bold uppercase tracking-wider text-black transition-colors"
                >
                  {copiedType === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
                <a
                  id="whatsapp-chat-link"
                  href={`https://wa.me/917974406417?text=${encodeURIComponent("Hi Vidhan, I saw your portfolio and would like to connect!")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-4 py-1.5 border border-black bg-[#F5F5F4] hover:bg-black hover:text-white text-black text-[11px] font-bold uppercase tracking-wider transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Social & Professional Links */}
            <div className="p-6 bg-white border border-black space-y-3">
              <h3 className="text-[10px] font-mono uppercase tracking-widest font-bold text-black/60">Public Transmissions</h3>
              <div className="space-y-2">
                <a
                  id="contact-linkedin-link"
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 border border-black bg-[#FDFDFD] hover:bg-black hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">LinkedIn</span>
                    <span className="text-[11px] font-mono opacity-60">@{personalInfo.linkedinUsername}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  id="contact-github-link"
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 border border-black bg-[#FDFDFD] hover:bg-black hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">GitHub</span>
                    <span className="text-[11px] font-mono opacity-60">@{personalInfo.githubUsername}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-black p-6 sm:p-8">
              <h3 className="text-2xl font-serif italic font-bold text-[#121212] mb-1">Send a Message</h3>
              <p className="text-xs text-black/60 font-sans mb-6">
                Fill in the details below to initiate direct correspondence with Vidhan Agrawal.
              </p>

              {submitted ? (
                <div className="p-6 border border-black bg-[#F5F5F4] text-center space-y-2 animate-in fade-in">
                  <div className="w-10 h-10 border border-black bg-white text-black flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif italic font-bold text-black text-lg">Message Prepared for Dispatch</h4>
                  <p className="text-xs font-mono text-black/80">
                    Your email client has been triggered to send directly to vidhanagrawal0607@gmail.com.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-black mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Alex Johnson"
                        className="w-full px-3.5 py-2.5 bg-[#FDFDFD] border border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-black mb-1.5">
                        Your Email *
                      </label>
                      <input
                        id="contact-email-input"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 bg-[#FDFDFD] border border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-black mb-1.5">
                      Subject
                    </label>
                    <input
                      id="contact-subject-input"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Summer Internship / Software Role Opportunity"
                      className="w-full px-3.5 py-2.5 bg-[#FDFDFD] border border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-black mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="contact-message-input"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Vidhan, I would like to discuss an opportunity or project..."
                      className="w-full px-3.5 py-2.5 bg-[#FDFDFD] border border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:bg-white resize-none"
                    ></textarea>
                  </div>

                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-black bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Transmission</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
