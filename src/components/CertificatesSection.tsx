import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  FileText, 
  Eye, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Sparkles,
  Search,
  Cloud
} from 'lucide-react';
import { certificates } from '../data/portfolioData';
import { Certificate } from '../types';
import { CertificateModal } from './CertificateModal';

export const CertificatesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [modalMode, setModalMode] = useState<'pdf' | 'metadata' | 'vault'>('pdf');
  const [activeTab, setActiveTab] = useState<'all' | 'programming' | 'ai' | 'data' | 'leadership' | 'community'>('all');

  const filteredCerts = activeTab === 'all'
    ? certificates
    : certificates.filter(c => c.category === activeTab);

  const handleOpenPdfPreview = (cert: Certificate) => {
    setModalMode('pdf');
    setSelectedCert(cert);
  };

  const handleOpenInspect = (cert: Certificate) => {
    setModalMode('metadata');
    setSelectedCert(cert);
  };

  const handleOpenVault = (cert: Certificate) => {
    setModalMode('vault');
    setSelectedCert(cert);
  };

  return (
    <section id="certificates" className="py-16 bg-white border-b border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-black/15 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-black uppercase tracking-widest text-black">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
              <span>Accreditation Records • Authentic Verifications</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif italic tracking-tight leading-none text-[#121212]">
              Verified Credentials
            </h2>
            <p className="text-sm text-[#121212]/80 mt-2 max-w-xl font-sans">
              Officially issued credentials from Infosys Springboard, Saylor Academy, iamNeo, and Times Foundation verifying technical mastery, AI workflows, and data pipelines.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#F5F5F4] border border-black self-start md:self-auto">
            {[
              { label: 'All Records (6)', value: 'all' },
              { label: 'Programming', value: 'programming' },
              { label: 'AI & ML', value: 'ai' },
              { label: 'Data Systems', value: 'data' },
              { label: 'Leadership', value: 'leadership' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as any)}
                className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  activeTab === tab.value
                    ? 'bg-black text-white'
                    : 'text-black/70 hover:text-black hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              id={`cert-card-${cert.id}`}
              className="bg-white border border-black hover:bg-[#FDFDFD] transition-colors p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Issuer */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-black/60 block">
                      {cert.issuer}
                    </span>
                    {cert.partner && (
                      <span className="text-[11px] font-serif italic text-black/70">
                        {cert.partner}
                      </span>
                    )}
                  </div>
                  <span className="px-2 py-0.5 border border-black text-[9px] font-bold uppercase tracking-wider bg-[#F5F5F4] text-black shrink-0">
                    Verified
                  </span>
                </div>

                {/* Certificate Title */}
                <h3 className="text-xl sm:text-2xl font-serif italic tracking-tight text-[#121212] group-hover:text-black leading-snug">
                  {cert.title}
                </h3>

                {/* Highlight text / score */}
                <div className="mt-3 p-3 bg-[#F5F5F4] border border-black/20 text-xs font-sans text-black/85">
                  <div className="flex items-center gap-1.5 text-black font-bold uppercase tracking-widest text-[10px] font-mono mb-1">
                    <Sparkles className="w-3 h-3 text-black" />
                    <span>Highlights</span>
                  </div>
                  <p className="text-black/75 leading-relaxed">
                    {cert.highlightText}
                  </p>
                </div>

                {/* Metadata details */}
                <div className="mt-4 space-y-1.5 text-xs text-black/70 font-sans border-t border-black/10 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-black" />
                      <span>Issue Date:</span>
                    </span>
                    <span className="font-mono text-[11px] font-bold text-black">{cert.issueDate}</span>
                  </div>

                  {cert.hours && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-black" />
                        <span>Curriculum:</span>
                      </span>
                      <span className="font-mono text-[11px] font-bold text-black">{cert.hours}</span>
                    </div>
                  )}

                  {cert.grade && (
                    <div className="flex items-center justify-between">
                      <span>Official Grade:</span>
                      <span className="font-mono font-bold text-black bg-[#F5F5F4] px-1.5 py-0.5 border border-black text-[11px]">{cert.grade}</span>
                    </div>
                  )}

                  {cert.certificateId && (
                    <div className="flex items-center justify-between pt-1 border-t border-black/5">
                      <span className="text-black/50 text-[10px] font-mono">ID:</span>
                      <span className="font-mono text-[10px] font-medium text-black truncate max-w-[140px]">
                        {cert.certificateId}
                      </span>
                    </div>
                  )}
                </div>

                {/* Skills tags */}
                <div className="mt-4 pt-3 border-t border-black/15 flex flex-wrap gap-1">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 border border-black text-[9px] font-bold uppercase text-black bg-white hover:bg-black hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-black/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  id={`preview-cert-pdf-${cert.id}`}
                  onClick={() => handleOpenPdfPreview(cert)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-black bg-black hover:bg-neutral-800 text-white text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  title="Preview official certificate document"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Preview PDF</span>
                </button>

                <button
                  id={`inspect-cert-btn-${cert.id}`}
                  onClick={() => handleOpenInspect(cert)}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 border border-black bg-[#F5F5F4] hover:bg-black hover:text-white text-black text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  title="Inspect credential metadata"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="sm:inline">Record</span>
                </button>

                <button
                  id={`vault-cert-btn-${cert.id}`}
                  onClick={() => handleOpenVault(cert)}
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-2 border border-black bg-[#F5F5F4] hover:bg-black hover:text-white text-black text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  title="Store or attach original PDF file in Vault"
                >
                  <Cloud className="w-3.5 h-3.5" />
                  <span>Vault</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail & PDF Preview Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
        initialMode={modalMode}
      />
    </section>
  );
};
