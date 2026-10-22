import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useGetArchivedSongQuery } from '../../../redux/api/communityApi';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';
import RoleGate from '../components/RoleGate';
import { ROLES } from '../constants';

export const AuditSong = () => {
  const { songId } = useParams();
  const navigate = useNavigate();

  const { data: song } = useGetArchivedSongQuery(songId);

  const [activeTab, setActiveTab] = useState('write'); // 'write' | 'preview'
  const [targetVersion, setTargetVersion] = useState('1.3');
  const [proposedLyrics, setProposedLyrics] = useState('');
  const [auditRationale, setAuditRationale] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!auditRationale.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Your peer audit submission has been inscribed for council review!');
      navigate(`/community/living-archives/songs/${songId || 'canto-del-alba'}`);
    }, 500);
  };

  const handleSaveDraft = () => {
    alert('Audit draft saved locally to your satchel.');
  };

  const songTitle = song?.title || 'Canto del Alba';
  const songLanguage = song?.language || 'Spanish';
  const isFormValid = auditRationale.trim().length > 0;

  return (
    // <RoleGate allowedRoles={[ROLES.LINGUIST, ROLES.ADMIN]} showNotice>
    <div className="w-full max-w-[1200px] mx-auto flex flex-col justify-start items-start gap-8 my-2 px-2 sm:px-0">
      {/* 1. Breadcrumbs Header */}
      <div className="w-full inline-flex flex-wrap justify-start items-center gap-2 select-none">
        <button
          type="button"
          onClick={() => navigate('/community/guild-hall')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          Guild Hall
        </button>

        <ChevronRight size={18} className="text-white/60 shrink-0" />

        <button
          type="button"
          onClick={() => navigate('/community/living-archives')}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer"
        >
          The Living Archives
        </button>

        <ChevronRight size={18} className="text-white/60 shrink-0" />

        <button
          type="button"
          onClick={() => navigate(`/community/living-archives/songs/${songId || 'canto-del-alba'}`)}
          className="text-white/60 hover:text-white transition-colors text-base sm:text-xl font-normal font-Merriweather cursor-pointer capitalize"
        >
          {songTitle}
        </button>

        <ChevronRight size={18} className="text-white shrink-0" />

        <span className="text-white text-base sm:text-xl font-normal font-Merriweather">
          Audit Manuscript
        </span>
      </div>

      {/* 2. Top Header & Title */}
      <div className="w-full flex flex-col justify-start items-start gap-6">
        <div className="flex flex-col justify-start items-start gap-1">
          <h1 className="text-white text-3xl font-normal font-MetalMania leading-9 tracking-wide uppercase">
            AUDIT MANUSCRIPT
          </h1>
          <p className="text-white/80 text-base font-normal font-Merriweather leading-6">
            Review semantic accuracy, regional dialect idioms, and proposed stanza corrections for{' '}
            <strong className="text-white font-semibold">{songTitle}</strong> ({songLanguage}).
          </p>
        </div>

        {/* 3. Form Container */}
        <div className="w-full flex flex-col justify-start items-start gap-6">
          {/* Write / Preview Tab switcher */}
          <div className="w-full border-b border-white/40 flex justify-start items-end gap-6 select-none">
            <button
              type="button"
              onClick={() => setActiveTab('write')}
              className={`h-10 px-4 py-2.5 flex flex-col justify-center items-center text-xl font-normal font-Merriweather transition-colors cursor-pointer ${activeTab === 'write'
                ? 'text-white border-b-2 border-white'
                : 'text-white/70 hover:text-white border-b-2 border-transparent'
                }`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`h-10 px-4 py-2.5 flex flex-col justify-center items-center text-xl font-normal font-Merriweather transition-colors cursor-pointer ${activeTab === 'preview'
                ? 'text-white border-b-2 border-white'
                : 'text-white/70 hover:text-white border-b-2 border-transparent'
                }`}
            >
              Preview
            </button>
          </div>

          {/* Target Version & Manuscript Context strip */}
          <div className="w-full pl-6 pr-7 py-4 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-white shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div className="flex flex-col justify-start items-start">
                <span className="text-white text-base font-normal font-Merriweather">
                  Manuscript: <span className="font-semibold">{songTitle}</span>
                </span>
                <span className="text-white/70 text-xs font-normal font-Merriweather">
                  Evaluating approved canon {targetVersion} in {songLanguage}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/70 text-xs font-normal font-Merriweather">Target version:</span>
              <div className="px-2.5 py-1 bg-white/20 outline outline-1 outline-white text-white text-xs font-Merriweather">
                v{targetVersion}
              </div>
            </div>
          </div>

          {/* Section 1: Proposed Revisions & Line-by-Line Adjustments */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-white text-xl font-normal font-Merriweather leading-6">
              PROPOSED REVISIONS & ADJUSTMENTS
            </label>
            <div className="w-full flex flex-col justify-start items-end gap-2">
              {activeTab === 'write' ? (
                <div className="w-full h-40 px-4 py-3 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-start items-start overflow-hidden">
                  <textarea
                    value={proposedLyrics}
                    onChange={(e) => setProposedLyrics(e.target.value)}
                    placeholder="Inscribe corrected stanzas, meter adjustments, or revised lines here..."
                    className="w-full h-full bg-transparent text-white placeholder-white/40 text-base font-normal font-Merriweather outline-hidden resize-none"
                  />
                </div>
              ) : (
                <div className="w-full h-40 px-6 py-4 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 overflow-y-auto text-white/90 text-sm font-Merriweather leading-relaxed">
                  {proposedLyrics ? (
                    <p className="whitespace-pre-wrap">{proposedLyrics}</p>
                  ) : (
                    <p className="text-white/40 italic">No revisions entered yet.</p>
                  )}
                </div>
              )}
              <div className="text-white/70 text-xs font-normal font-Merriweather leading-3">
                {proposedLyrics.length} chars
              </div>
            </div>
          </div>

          {/* Section 2: Scholarly Justification & Source References */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-white text-xl font-normal font-Merriweather leading-6">
              SCHOLARLY JUSTIFICATION & SOURCES *
            </label>
            <div className="w-full flex flex-col justify-start items-end gap-2">
              {activeTab === 'write' ? (
                <div className="w-full h-36 px-4 py-3 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 flex flex-col justify-start items-start overflow-hidden">
                  <textarea
                    value={auditRationale}
                    onChange={(e) => setAuditRationale(e.target.value)}
                    placeholder="Cite dictionaries, etymological roots, vocal cadence rationale, or regional folklore traditions..."
                    className="w-full h-full bg-transparent text-white placeholder-white/40 text-base font-normal font-Merriweather outline-hidden resize-none"
                    required
                  />
                </div>
              ) : (
                <div className="w-full h-36 px-6 py-4 bg-stone-400/30 outline outline-1 outline-offset-[-1px] outline-stone-400 overflow-y-auto text-white/90 text-sm font-Merriweather leading-relaxed">
                  {auditRationale ? (
                    <p className="whitespace-pre-wrap">{auditRationale}</p>
                  ) : (
                    <p className="text-white/40 italic">No scholarly justification entered yet.</p>
                  )}
                </div>
              )}
              <div className="text-white/70 text-xs font-normal font-Merriweather leading-3">
                {auditRationale.length} chars
              </div>
            </div>
          </div>

          {/* 4. Bottom Action Row: Cancel (Left) | Save draft + Publish Peer Audit (Right) */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/20">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => navigate(`/community/living-archives/songs/${songId || 'canto-del-alba'}`)}
              className="relative inline-flex items-center justify-center px-8 py-3 bg-[#755F48] hover:bg-[#634f3c] text-white font-normal font-Merriweather text-base tracking-normal transition-all cursor-pointer group shadow-md"
            >
              <img
                src={buttonBorderSecondary}
                alt="button border"
                className="absolute inset-0 w-full h-full pointer-events-none object-fill"
              />
              <span className="relative z-10">Cancel</span>
            </button>

            {/* Right Buttons: Save draft + Publish Peer Audit */}
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="text-white text-base font-normal font-Merriweather leading-4 hover:underline cursor-pointer"
              >
                Save draft
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className={`relative inline-flex items-center justify-center px-7 py-3 font-normal font-Merriweather text-base tracking-normal transition-all shadow-md group ${!isFormValid || isSubmitting
                  ? 'bg-stone-200 text-neutral-950/60 opacity-40 cursor-not-allowed'
                  : 'bg-white text-neutral-950 hover:bg-stone-100 cursor-pointer'
                  }`}
              >
                <img
                  src={buttonBorderSecondary}
                  alt="button border"
                  className="absolute inset-0 w-full h-full pointer-events-none object-fill"
                />
                <span className="relative z-10">
                  {isSubmitting ? 'Publishing...' : 'Publish Peer Audit'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
{/* </RoleGate> */ }

export default AuditSong;
