import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  ShieldCheck, 
  Award, 
  Printer, 
  Download, 
  FileText, 
  Maximize2, 
  Minimize2,
  Calendar, 
  Clock, 
  Sparkles,
  CheckCircle2,
  Upload,
  Cloud,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Certificate } from '../types';
import { saveCertificateDocument, getCertificateDocument, CLOUDFLARE_FREE_TIER_INFO } from '../lib/storageService';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
  initialMode?: 'pdf' | 'metadata' | 'vault';
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ 
  certificate, 
  onClose,
  initialMode = 'pdf'
}) => {
  const [viewMode, setViewMode] = useState<'pdf' | 'metadata' | 'vault'>(initialMode);
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [saylorPage, setSaylorPage] = useState<1 | 2>(1);
  const [storedPdfData, setStoredPdfData] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showCloudflareModal, setShowCloudflareModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (certificate) {
      setSaylorPage(1);
      getCertificateDocument(certificate.id).then(data => {
        setStoredPdfData(data);
      });
    }
  }, [certificate]);

  if (!certificate) return null;

  const handleCopyId = () => {
    const idToCopy = certificate.certificateId || certificate.verificationUrl || `VER-${certificate.id.toUpperCase()}`;
    navigator.clipboard.writeText(idToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && certificate) {
      setIsUploading(true);
      try {
        const saved = await saveCertificateDocument(certificate.id, file);
        setStoredPdfData(saved);
      } catch (err) {
        console.error('Failed to save certificate document:', err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div 
      id="certificate-inspector-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className={`bg-[#FDFDFD] w-full ${
          isZoomed ? 'max-w-6xl' : 'max-w-5xl'
        } border-2 border-black overflow-hidden flex flex-col max-h-[96vh] my-auto shadow-2xl transition-all duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar (Hidden on print) */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-black bg-[#F5F5F4] gap-2 print:hidden">
          
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-black">
              <ShieldCheck className="w-4 h-4 text-black shrink-0" />
              <span className="truncate max-w-[160px] sm:max-w-xs">{certificate.title}</span>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center border border-black p-0.5 bg-white">
              <button
                type="button"
                onClick={() => setViewMode('pdf')}
                className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 ${
                  viewMode === 'pdf' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>Certificate Document</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('metadata')}
                className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  viewMode === 'metadata' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'
                }`}
              >
                <span>Record Data</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('vault')}
                className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 ${
                  viewMode === 'vault' ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'
                }`}
              >
                <Cloud className="w-3 h-3" />
                <span>Storage Vault {storedPdfData ? '✓' : ''}</span>
              </button>
            </div>

            {/* Saylor multi-page toggle if applicable */}
            {(certificate.id === 'saylor-ai' || certificate.id === 'saylor-leadership') && viewMode === 'pdf' && (
              <div className="flex items-center border border-black bg-white text-[10px] font-mono font-bold">
                <button
                  type="button"
                  onClick={() => setSaylorPage(1)}
                  className={`px-2 py-1 ${saylorPage === 1 ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'}`}
                >
                  Page 1: Certificate
                </button>
                <button
                  type="button"
                  onClick={() => setSaylorPage(2)}
                  className={`px-2 py-1 ${saylorPage === 2 ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'}`}
                >
                  Page 2: Transcript
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              id="print-certificate-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-black bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              title="Print or Save Certificate as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="hidden md:inline-flex p-1.5 border border-black bg-white hover:bg-[#F5F5F4] text-black transition-colors cursor-pointer"
              title={isZoomed ? "Standard view" : "Zoom view"}
            >
              {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              id="close-certificate-modal-btn"
              onClick={onClose}
              className="p-1.5 border border-black bg-white hover:bg-black hover:text-white text-black transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-3 sm:p-6 overflow-y-auto bg-[#ECECE9]/70">
          
          {viewMode === 'pdf' ? (
            /* ========================================================================= */
            /* AUTHENTIC TEMPLATES MATCHING EXACT UPLOADED CERTIFICATES                 */
            /* ========================================================================= */
            <div className="w-full flex justify-center">
              
              {/* ----------------------------------------------------------------------- */}
              {/* 1. IAMNEO / NIIT / LOVELY PROFESSIONAL UNIVERSITY TEMPLATE             */}
              {/* ----------------------------------------------------------------------- */}
              {certificate.id === 'iamneo-programming' && (
                <div 
                  id="printable-certificate-document"
                  className="w-full max-w-4xl bg-white border border-black shadow-lg flex flex-col md:flex-row min-h-[500px] relative overflow-hidden"
                >
                  {/* Left Coral Stripe with neo colab */}
                  <div className="w-full md:w-28 bg-[#EA4359] text-white flex flex-row md:flex-col items-center justify-between p-4 md:py-8 shrink-0">
                    <div className="flex md:flex-col items-center gap-2">
                      <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center font-bold text-xs">
                        ○
                      </div>
                    </div>
                    
                    <div className="md:-rotate-90 whitespace-nowrap text-xl sm:text-2xl font-black tracking-widest uppercase my-auto font-sans">
                      neo colab
                    </div>

                    <div className="text-[9px] font-mono opacity-80 uppercase tracking-tighter">
                      Certified
                    </div>
                  </div>

                  {/* Main Certificate Content */}
                  <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between relative">
                    
                    {/* Top Right University Crest and Constellation Dots */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 font-bold block">
                          Official Certificate of Completion
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111] uppercase font-sans">
                          CERTIFICATE OF APPRECIATION
                        </h2>
                      </div>

                      {/* LPU Seal Badge */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 border border-neutral-300 rounded-full p-1 flex flex-col items-center justify-center text-center shrink-0 bg-white shadow-xs">
                        <div className="w-full h-full rounded-full border border-dashed border-[#EA4359]/60 flex flex-col items-center justify-center p-1">
                          <span className="text-[6px] sm:text-[7px] font-bold font-serif leading-tight text-[#C0392B]">
                            LOVELY PROFESSIONAL UNIVERSITY
                          </span>
                          <span className="text-[5px] sm:text-[6px] font-mono text-black/70">PUNJAB (INDIA)</span>
                        </div>
                      </div>
                    </div>

                    {/* Recipient & Presentation */}
                    <div className="my-6 space-y-3 font-sans">
                      <p className="text-sm text-black/75">
                        This certificate is proudly presented to
                      </p>

                      <div className="border-b border-black/30 pb-2">
                        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121212]">
                          Vidhan Agrawal
                        </h3>
                      </div>

                      <div className="space-y-2 pt-1 text-sm sm:text-base leading-relaxed text-black/85">
                        <p>
                          for successfully completing the{' '}
                          <span className="font-bold text-[#EA4359] text-lg sm:text-xl">
                            Computer Programming
                          </span>
                        </p>
                        <p className="text-xs sm:text-sm text-black/75">
                          demonstrating strong commitment, consistency, and excellence throughout the course with a duration of <strong>150 Hours</strong>.
                        </p>
                        <p className="text-xs font-mono font-medium text-black/70 bg-[#F5F5F4] px-2.5 py-1 border border-black/20 inline-block">
                          Course Duration: 18-Jan-2026 to 20-May-2026
                        </p>
                        <p className="text-xs text-black/70 italic">
                          We appreciate your dedication to continuous learning and skill development in programming.
                        </p>
                      </div>
                    </div>

                    {/* Bottom Verification & Signatories */}
                    <div className="border-t border-black/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      
                      {/* Left: Issue Date and QR */}
                      <div className="flex items-center gap-3">
                        {/* QR Code graphic */}
                        <div className="w-16 h-16 border border-black p-1 bg-white flex flex-col items-center justify-center shrink-0">
                          <div className="w-full h-full bg-neutral-900 grid grid-cols-4 gap-0.5 p-1">
                            <div className="bg-white col-span-2 row-span-2"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white col-span-2 row-span-2"></div>
                          </div>
                        </div>
                        <div className="text-left font-mono">
                          <div className="border-b border-black pb-0.5 text-xs font-bold text-black">
                            21-May-2026
                          </div>
                          <div className="text-[9px] uppercase tracking-widest text-black/60 pt-0.5">
                            ISSUE DATE
                          </div>
                        </div>
                      </div>

                      {/* Center: Signatory */}
                      <div className="text-center font-sans">
                        <div className="font-serif italic text-lg sm:text-xl text-black border-b border-black/40 px-4 pb-0.5 inline-block">
                          S.P. Senthil
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-black mt-1">
                          SENTHIKUMAR TP
                        </div>
                      </div>

                      {/* Right: iamneo Logo */}
                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-black tracking-tighter text-black flex items-center justify-end gap-1">
                          <span>iam</span>
                          <span className="text-[#EA4359]">neo</span>
                        </div>
                        <div className="text-[9px] font-mono tracking-widest text-black/60 uppercase">
                          — An NIIT Venture —
                        </div>
                      </div>

                    </div>

                    {/* Serial Number */}
                    <div className="text-[10px] font-mono text-black/60 pt-2 text-left">
                      C.No: <span className="font-bold text-black">18dh7Ci2A10b65DJ3BK1</span>
                    </div>

                  </div>
                </div>
              )}

              {/* ----------------------------------------------------------------------- */}
              {/* 2. SAYLOR ACADEMY TEMPLATE (AI & LEADERSHIP)                           */}
              {/* ----------------------------------------------------------------------- */}
              {(certificate.id === 'saylor-ai' || certificate.id === 'saylor-leadership') && (
                <div 
                  id="printable-certificate-document"
                  className="w-full max-w-4xl bg-white border-4 border-[#0F2C3F] p-6 sm:p-10 shadow-lg relative overflow-hidden min-h-[520px]"
                >
                  {/* Decorative Corner Accents */}
                  <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#0F2C3F]"></div>
                  <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#0F2C3F]"></div>
                  <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#0F2C3F]"></div>
                  <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#0F2C3F]"></div>

                  {saylorPage === 1 ? (
                    <div className="space-y-6 flex flex-col justify-between h-full">
                      
                      {/* Top Row */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 text-left">
                          <p className="text-sm font-sans text-neutral-600">
                            Saylor Academy awards
                          </p>
                          <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-[#0F2C3F] lowercase">
                            vidhan agrawal
                          </h2>
                          <p className="text-sm font-sans text-neutral-600 pt-2">
                            this certificate of achievement for
                          </p>
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-[#0F2C3F] tracking-tight pt-1">
                            {certificate.title}
                          </h3>
                        </div>

                        {/* Navy Seal Medallion */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0F2C3F] border-4 border-[#1E4D6B] flex flex-col items-center justify-center text-white shadow-md shrink-0 p-2 text-center">
                          <div className="w-full h-full rounded-full border border-dashed border-white/60 flex flex-col items-center justify-center">
                            <span className="text-xl sm:text-2xl font-serif font-black tracking-widest text-cyan-300">
                              S
                            </span>
                            <span className="text-[6px] uppercase font-mono tracking-widest text-white/80">SAYLOR</span>
                          </div>
                        </div>
                      </div>

                      {/* Metadata row */}
                      <div className="space-y-2 text-left font-sans">
                        <p className="text-sm text-neutral-700">
                          Issue Date: <span className="font-semibold">{certificate.issueDate}</span>
                        </p>
                        <p className="text-sm text-neutral-700">
                          Certificate ID:{' '}
                          <span className="text-blue-700 font-mono font-bold underline cursor-pointer" onClick={handleCopyId}>
                            {certificate.certificateId}
                          </span>
                        </p>
                      </div>

                      {/* Signatory & Logo Footer */}
                      <div className="pt-8 border-t border-neutral-300 flex items-end justify-between">
                        <div className="text-left font-sans">
                          <div className="font-serif italic text-2xl text-[#0F2C3F] border-b border-black/40 pb-1 inline-block pr-6">
                            Michael J Saylor
                          </div>
                          <div className="text-xs font-semibold text-neutral-600 mt-1">
                            Michael J Saylor
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-[#0F2C3F] flex items-center gap-2 justify-end">
                            <span className="text-cyan-600 font-mono text-xl">■■</span>
                            <span>saylor.org</span>
                          </div>
                          <div className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
                            ACADEMY
                          </div>
                        </div>
                      </div>

                    </div>
                  ) : (
                    /* Page 2: Saylor Transcript */
                    <div className="space-y-6 flex flex-col justify-between h-full text-left">
                      <div className="flex items-start justify-between border-b border-neutral-300 pb-4">
                        <div>
                          <p className="text-sm text-neutral-600">Saylor Academy Academic Record</p>
                          <h2 className="text-3xl font-bold text-[#0F2C3F] lowercase">vidhan agrawal</h2>
                          <h3 className="text-xl font-semibold text-[#0F2C3F] mt-1">{certificate.title}</h3>
                          <p className="text-xs font-mono text-neutral-500 mt-1">Certificate ID: {certificate.certificateId}</p>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-[#0F2C3F] flex items-center justify-center text-cyan-300 font-bold text-xl">
                          S
                        </div>
                      </div>

                      {/* Official Evaluation Metrics */}
                      <div className="border border-neutral-300 bg-neutral-50 divide-y divide-neutral-300 font-sans">
                        <div className="p-3 flex justify-between">
                          <span className="font-medium text-neutral-700">Total Hours in Course:</span>
                          <span className="font-bold text-neutral-900">{certificate.hours}</span>
                        </div>
                        <div className="p-3 flex justify-between">
                          <span className="font-medium text-neutral-700">Continuing Education Units (CEU):</span>
                          <span className="font-bold text-neutral-900">{certificate.ceu}</span>
                        </div>
                        <div className="p-3 flex justify-between">
                          <span className="font-medium text-neutral-700">Official Exam Grade:</span>
                          <span className="font-bold text-emerald-700 text-lg">{certificate.grade}</span>
                        </div>
                        <div className="p-3 flex justify-between">
                          <span className="font-medium text-neutral-700">Conferral Date:</span>
                          <span className="font-mono text-neutral-900">{certificate.issueDate}</span>
                        </div>
                      </div>

                      <div className="text-xs text-neutral-500 font-mono">
                        Powered by TCPDF (www.tcpdf.org) • Verified Saylor Academy Academic Transcript
                      </div>

                      <div className="flex justify-between items-end pt-4 border-t border-neutral-300">
                        <div className="font-serif italic text-xl border-b border-black pb-0.5">
                          Michael J Saylor
                        </div>
                        <div className="text-xl font-bold text-[#0F2C3F]">saylor.org ACADEMY</div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* ----------------------------------------------------------------------- */}
              {/* 3. TIMES FOUNDATION / THE TIMES OF INDIA TEMPLATE                      */}
              {/* ----------------------------------------------------------------------- */}
              {certificate.id === 'times-community' && (
                <div 
                  id="printable-certificate-document"
                  className="w-full max-w-4xl bg-[#FFFDF9] border-8 border-[#C5A059] p-6 sm:p-10 shadow-lg relative text-black overflow-hidden min-h-[520px]"
                >
                  {/* Classical Ornamental Inner Border */}
                  <div className="absolute inset-2 border-2 border-[#9D782F] pointer-events-none"></div>

                  <div className="relative z-10 space-y-4 text-center">
                    
                    {/* Header: The Times of India & Times Foundation */}
                    <div className="flex items-center justify-between border-b border-[#C5A059]/40 pb-4">
                      {/* TOI Crest */}
                      <div className="text-left flex items-center gap-2">
                        <div className="w-12 h-10 border border-black/30 bg-[#F5F5F4] flex items-center justify-center text-[8px] font-serif font-black uppercase text-center p-1">
                          TIMES OF INDIA
                        </div>
                        <div>
                          <div className="font-serif font-black tracking-wider text-xs uppercase">
                            THE TIMES OF INDIA
                          </div>
                          <div className="text-[8px] font-serif italic text-black/60">LET TRUTH PREVAIL</div>
                        </div>
                      </div>

                      {/* Times Foundation */}
                      <div className="text-right">
                        <div className="text-[9px] font-mono uppercase tracking-widest text-black/60">EST 2008</div>
                        <div className="text-lg sm:text-xl font-sans font-black tracking-tight text-black uppercase">
                          TIMES FOUNDATION
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="py-2 space-y-1">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-[#111111] uppercase">
                        CERTIFICATE OF COMPLETION
                      </h2>
                      <p className="text-xs sm:text-sm font-serif italic text-black/75">
                        This is to certify that
                      </p>
                    </div>

                    {/* Recipient */}
                    <div className="border-b-2 border-black/20 pb-2 max-w-md mx-auto">
                      <h3 className="text-3xl sm:text-4xl font-serif italic font-bold text-black">
                        Vidhan Agrawal
                      </h3>
                    </div>

                    {/* Award Context */}
                    <div className="max-w-2xl mx-auto space-y-3 font-sans text-xs sm:text-sm text-black/85 leading-relaxed">
                      <p>
                        has successfully completed the{' '}
                        <span className="font-serif font-bold text-base sm:text-lg text-[#9D782F]">
                          Community Development Project
                        </span>{' '}
                        organized by Times Foundation in collaboration with <strong>Lovely Professional University</strong>.
                      </p>
                      <p className="text-[11px] sm:text-xs text-black/75">
                        During the project, the participant actively contributed to community-focused initiatives and demonstrated commitment, responsibility, leadership and a strong spirit of social service. The participant's contribution reflects a sincere dedication to creating a positive impact and fostering sustainable community development.
                      </p>
                      <p className="text-[11px] sm:text-xs italic text-black/70">
                        We appreciate the participant's valuable contribution and wish him/her continued success in all future endeavors.
                      </p>
                    </div>

                    {/* Signatures and Seals */}
                    <div className="pt-6 border-t border-[#C5A059]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                      
                      {/* Left: QR Code */}
                      <div className="w-14 h-14 border border-black p-1 bg-white shrink-0">
                        <div className="w-full h-full bg-neutral-900 grid grid-cols-3 gap-0.5 p-0.5">
                          <div className="bg-white"></div>
                          <div className="bg-white"></div>
                          <div className="bg-white"></div>
                          <div className="bg-white"></div>
                        </div>
                      </div>

                      {/* Center: Signatory */}
                      <div className="text-center font-sans">
                        <div className="font-serif italic text-lg text-black border-b border-black/40 pb-0.5 inline-block">
                          Lieutenant Sanjiv Kaura
                        </div>
                        <div className="text-xs font-bold text-black mt-0.5">
                          Lieutenant Sanjiv Kaura
                        </div>
                        <div className="text-[10px] text-black/70">
                          CEO-Corporate Social Responsibility
                        </div>
                        <div className="text-[9px] text-black/60 font-serif italic">
                          Bennett, Coleman & Co. Ltd.
                        </div>
                      </div>

                      {/* Right: Gold Ribbon Badge */}
                      <div className="w-20 h-20 rounded-full border-2 border-[#C5A059] bg-[#FAF5EB] flex flex-col items-center justify-center p-2 text-center shadow-xs">
                        <Award className="w-6 h-6 text-[#9D782F]" />
                        <span className="text-[7px] font-sans font-black uppercase text-[#9D782F] leading-tight mt-0.5">
                          COMMITTED TO COMMUNITY IMPACT
                        </span>
                      </div>

                    </div>

                    {/* Bottom Link */}
                    <div className="text-[9px] font-mono text-black/60 text-left pt-2">
                      Verify at <span className="underline">{certificate.verificationUrl}</span>
                    </div>

                  </div>
                </div>
              )}

              {/* ----------------------------------------------------------------------- */}
              {/* 4. INFOSYS SPRINGBOARD TEMPLATE (BIG DATA & DATA SCIENCE)              */}
              {/* ----------------------------------------------------------------------- */}
              {(certificate.id === 'infosys-bigdata' || certificate.id === 'infosys-datascience') && (
                <div 
                  id="printable-certificate-document"
                  className="w-full max-w-4xl bg-white border border-neutral-300 p-6 sm:p-10 shadow-lg text-center space-y-6 relative overflow-hidden min-h-[520px]"
                >
                  {/* Top Infosys Header */}
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-sans font-bold text-[#007CC3] tracking-tight">
                      Infosys
                    </div>
                    <div className="text-[10px] font-sans text-neutral-500 uppercase tracking-wider">
                      Navigate your next
                    </div>
                  </div>

                  {/* Barcode Cyan Accents */}
                  <div className="flex items-center justify-center gap-1.5 py-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-1 h-5 bg-[#00A3E0]/40"></div>
                    ))}
                    <h2 className="text-base sm:text-xl font-sans font-bold text-[#007CC3] px-3 tracking-wider uppercase">
                      COURSE COMPLETION CERTIFICATE
                    </h2>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-1 h-5 bg-[#00A3E0]/40"></div>
                    ))}
                  </div>

                  {/* Recipient */}
                  <div className="space-y-2">
                    <p className="text-xs text-neutral-600 font-sans">
                      The certificate is awarded to
                    </p>
                    <h3 className="text-3xl sm:text-4xl font-sans font-bold text-[#0070BA] tracking-tight">
                      Vidhan Agrawal
                    </h3>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-1">
                    <p className="text-xs text-neutral-600 font-sans">
                      for successfully completing the course
                    </p>
                    <h4 className="text-2xl sm:text-3xl font-sans font-black text-[#111111]">
                      {certificate.title}
                    </h4>
                    <p className="text-xs text-neutral-600 font-sans">
                      on April 3, 2026
                    </p>
                  </div>

                  {/* Infosys Springboard Logo */}
                  <div className="pt-2">
                    <div className="inline-flex items-center gap-2 border-b border-neutral-200 pb-2 px-6">
                      <span className="text-xl sm:text-2xl font-bold text-[#007CC3]">Infosys</span>
                      <span className="text-xl text-neutral-400">|</span>
                      <span className="text-xl sm:text-2xl font-bold text-[#FF6F00]">Springboard</span>
                    </div>
                    <p className="font-serif italic text-sm text-[#E53935] mt-2 font-medium">
                      Congratulations! You make us proud!
                    </p>
                  </div>

                  {/* Footer Signatures and Verification */}
                  <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                    
                    {/* Left QR */}
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 border border-black p-1 bg-white shrink-0">
                        <div className="w-full h-full bg-neutral-900 grid grid-cols-4 gap-0.5 p-0.5">
                          <div className="bg-white col-span-2 row-span-2"></div>
                          <div className="bg-white"></div>
                          <div className="bg-white"></div>
                          <div className="bg-white"></div>
                          <div className="bg-white col-span-2 row-span-2"></div>
                        </div>
                      </div>
                      <div className="text-[10px] font-sans text-neutral-600 space-y-0.5">
                        <p>Issued on: Friday, April 3, 2026</p>
                        <p>To verify, scan the QR code at <span className="text-blue-600 underline">https://verify.onwingspan.com</span></p>
                      </div>
                    </div>

                    {/* Right Signatory */}
                    <div className="text-center sm:text-right font-sans">
                      <div className="font-serif italic text-lg text-blue-900 border-b border-neutral-400 pb-0.5 inline-block">
                        Satheesh B. N.
                      </div>
                      <div className="text-xs font-bold text-neutral-900 mt-1">
                        Satheesha B. Nanjappa
                      </div>
                      <div className="text-[10px] text-neutral-600 leading-tight">
                        Senior Vice President and Head
                      </div>
                      <div className="text-[10px] text-neutral-600 leading-tight">
                        Education, Training and Assessment
                      </div>
                      <div className="text-[10px] text-neutral-600 font-semibold">
                        Infosys Limited
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </div>
          ) : viewMode === 'metadata' ? (
            /* ========================================================================= */
            /* METADATA ARCHIVAL RECORD VIEW                                             */
            /* ========================================================================= */
            <div className="bg-white border-2 border-black p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-black/60 font-bold mb-1">
                  Verified Archive Record
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif italic text-black font-bold">
                  {certificate.title}
                </h3>
                <p className="text-xs font-mono text-black/70 mt-1">
                  Conferred by {certificate.issuer} {certificate.partner ? `• ${certificate.partner}` : ''}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 border border-black bg-[#F5F5F4]">
                  <span className="text-[9px] font-bold uppercase text-black/60 block">Issue Date</span>
                  <span className="font-bold text-black">{certificate.issueDate}</span>
                </div>

                {certificate.hours && (
                  <div className="p-3 border border-black bg-[#F5F5F4]">
                    <span className="text-[9px] font-bold uppercase text-black/60 block">Course Duration</span>
                    <span className="font-bold text-black">{certificate.hours}</span>
                  </div>
                )}

                {certificate.grade && (
                  <div className="p-3 border border-black bg-[#F5F5F4]">
                    <span className="text-[9px] font-bold uppercase text-black/60 block">Grading Distinction</span>
                    <span className="font-bold text-emerald-700">{certificate.grade}</span>
                  </div>
                )}

                {certificate.ceu && (
                  <div className="p-3 border border-black bg-[#F5F5F4]">
                    <span className="text-[9px] font-bold uppercase text-black/60 block">Academic Units (CEU)</span>
                    <span className="font-bold text-black">{certificate.ceu}</span>
                  </div>
                )}

                <div className="p-3 border border-black bg-[#F5F5F4] col-span-2">
                  <span className="text-[9px] font-bold uppercase text-black/60 block">Authorized Signatory</span>
                  <span className="font-serif italic font-bold text-sm text-black">
                    {certificate.signatory || certificate.issuer}
                  </span>
                </div>

                {certificate.certificateId && (
                  <div className="p-3 border border-black bg-[#F5F5F4] col-span-2 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold uppercase text-black/60 block">Certificate ID</span>
                      <span className="font-mono text-xs font-bold text-black">{certificate.certificateId}</span>
                    </div>
                    <button
                      onClick={handleCopyId}
                      className="px-2.5 py-1 border border-black bg-white hover:bg-black hover:text-white text-black text-[10px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Covered Competencies */}
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-black/60 font-bold mb-2">
                  Verified Technical Competencies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {certificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 border border-black text-xs font-bold uppercase text-black bg-[#F5F5F4]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-black/15 flex justify-end">
                <button
                  onClick={() => setViewMode('pdf')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-black bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Official Document View</span>
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* STORAGE VAULT & CLOUDFLARE R2 INTEGRATION VIEW                            */
            /* ========================================================================= */
            <div className="bg-white border-2 border-black p-6 sm:p-8 space-y-6 max-w-2xl mx-auto text-left">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 font-bold block">
                    Certificate Document Vault
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold uppercase">
                    Free Tier Enabled
                  </span>
                </div>
                <h3 className="text-2xl font-serif italic text-black font-bold mt-1">
                  Upload & Store Original PDF Document
                </h3>
                <p className="text-xs font-sans text-black/75 mt-1">
                  Attach your original high-resolution PDF or scan for <strong>{certificate.title}</strong>. Stored securely on the server and in local IndexedDB.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-black/40 hover:border-black p-6 bg-[#F9F9F8] text-center cursor-pointer transition-colors space-y-3"
              >
                <Upload className="w-8 h-8 text-black/60 mx-auto" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-black">
                    {isUploading ? 'Uploading & Processing...' : 'Click to Upload Original PDF'}
                  </p>
                  <p className="text-[11px] font-mono text-black/60 mt-0.5">
                    Supports PDF, PNG, JPG (Saved permanently)
                  </p>
                </div>
                {storedPdfData && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-mono font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Original Document Stored in Vault</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Stored Document Preview / Download */}
              {storedPdfData && (
                <div className="p-4 border border-black bg-[#F5F5F4] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-black" />
                    <div>
                      <div className="text-xs font-bold text-black uppercase">Stored Vault Document</div>
                      <div className="text-[10px] font-mono text-black/60">Ready for instant download & viewing</div>
                    </div>
                  </div>
                  <a
                    href={storedPdfData}
                    download={`${certificate.id}-original.pdf`}
                    className="px-3 py-1.5 border border-black bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              )}

              {/* Cloudflare Free Tier Card */}
              <div className="p-4 border border-black/30 bg-[#FBFBFA] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-black uppercase tracking-wider">
                      Cloudflare R2 Free Cloud Storage
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 border border-blue-200 font-bold">
                    10 GB Free / Mo
                  </span>
                </div>
                <p className="text-[11px] text-black/75 leading-relaxed">
                  Cloudflare R2 offers 10 GB free object storage with zero egress fees. Our architecture is pre-configured to sync with Cloudflare R2 bucket credentials anytime.
                </p>
                <button
                  type="button"
                  onClick={() => setShowCloudflareModal(!showCloudflareModal)}
                  className="text-xs font-mono font-bold text-black underline cursor-pointer hover:text-blue-700 block pt-1"
                >
                  {showCloudflareModal ? 'Hide Cloudflare Setup Info' : 'View Cloudflare R2 Free Tier Details →'}
                </button>

                {showCloudflareModal && (
                  <div className="mt-3 p-3 border border-black/20 bg-white space-y-2 font-mono text-[11px]">
                    <div className="font-bold text-black uppercase">Setup Cloudflare R2 (100% Free):</div>
                    <ul className="list-disc pl-4 space-y-1 text-black/80">
                      {CLOUDFLARE_FREE_TIER_INFO.setupSteps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Status Bar */}
        <div className="px-6 py-2.5 border-t border-black bg-[#F5F5F4] flex flex-wrap items-center justify-between text-[11px] font-mono text-black/70 print:hidden gap-2">
          <span>Student: Vidhan Agrawal • Lovely Professional University (CGPA: 9.3)</span>
          <div className="flex items-center gap-3">
            {certificate.certificateId && (
              <button
                onClick={handleCopyId}
                className="hover:text-black font-bold flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? 'Copied!' : `ID: ${certificate.certificateId}`}</span>
              </button>
            )}
            <button
              onClick={handlePrint}
              className="hover:text-black font-bold flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3 h-3" />
              <span>Print A4 Document</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
