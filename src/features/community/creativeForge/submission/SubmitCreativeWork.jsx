import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useGetContestQuery, useSubmitCreativeWorkMutation } from '../../../../redux/api/communityApi';
import Breadcrumbs from '../../../../components/ui/Breadcrumbs';
import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';
import Checkbox from '../../../../components/ui/Checkbox';
import FileDropzone from '../../../../components/ui/FileDropzone';
import MarkdownEditor from '../../components/MarkdownEditor';
import ParchmentPanel from '../../components/ParchmentPanel';

export const SubmitCreativeWork = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const { data: contest } = useGetContestQuery(contestId);
  const [submitWork, { isLoading: isSubmitting }] = useSubmitCreativeWorkMutation();

  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState(null);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !lyrics.trim() || !agreed) return;

    try {
      await submitWork({
        contestId,
        submission: { title, lyrics, notes, hasFile: Boolean(file) },
      }).unwrap();

      alert('Your creative work has been inscribed for blind evaluation!');
      navigate(`/community/creative-forge/contests/${contestId}`);
    } catch (err) {
      console.error('Failed to submit work:', err);
    }
  };

  const breadcrumbs = [
    { label: 'Creative Forge', to: '/community/creative-forge' },
    { label: contest?.title || 'Contest', to: `/community/creative-forge/contests/${contestId}` },
    { label: 'Submit Creative Work' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <button
          type="button"
          onClick={() => navigate(`/community/creative-forge/contests/${contestId}`)}
          className="text-xs font-serif text-stone-600 hover:text-stone-900 flex items-center gap-1"
        >
          <ArrowLeft size={13} />
          <span>Back</span>
        </button>
      </div>

      <ParchmentPanel>
        <div className="pb-4 border-b border-amber-900/20 mb-6">
          <span className="text-[10px] font-serif font-bold uppercase tracking-wider text-amber-900">
            Tournament Entry
          </span>
          <h1 className="text-2xl font-serif font-bold text-stone-900">
            Submit Your Adapted Composition
          </h1>
          <p className="text-xs font-serif text-stone-600 mt-0.5">
            Participating in: <strong>{contest?.title}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
              Work Title / Translation Name *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. La Vie en Rose (Midnight English Adaptation)"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
              Adapted Verses & Lyrics *
            </label>
            <MarkdownEditor
              value={lyrics}
              onChange={setLyrics}
              placeholder="Inscribe your stanzas line by line with meter and rhyme considerations..."
              rows={10}
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
              Poetic Notes & Rhyme Scheme Rationale
            </label>
            <MarkdownEditor
              value={notes}
              onChange={setNotes}
              placeholder="Explain how you handled tricky idioms, syllables, or cultural metaphors..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
              Optional Audio Recital / Performance Recording
            </label>
            <FileDropzone
              file={file}
              onFileSelect={setFile}
              onClear={() => setFile(null)}
              label="Drop audio file (MP3, WAV) or click to browse"
            />
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-900/20 rounded-lg space-y-3">
            <Checkbox
              id="rightsAgreement"
              checked={agreed}
              onChange={setAgreed}
              label="Guild Rights & Originality Declaration *"
              description="I certify this translation/adaptation is my own creation and does not infringe on third-party licenses. I consent to my work being displayed anonymously during Blind Voting."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-900/10">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(`/community/creative-forge/contests/${contestId}`)}
              className="px-4 py-2 text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="ornate"
              disabled={!title.trim() || !lyrics.trim() || !agreed || isSubmitting}
              className="px-6 py-2.5 text-sm flex items-center gap-2"
            >
              <Send size={15} />
              <span>{isSubmitting ? 'Submitting...' : 'Seal & Enter Submission'}</span>
            </Button>
          </div>
        </form>
      </ParchmentPanel>
    </div>
  );
};

export default SubmitCreativeWork;
