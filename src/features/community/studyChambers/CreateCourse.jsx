import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, Plus, GraduationCap } from 'lucide-react';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import { useCreateCourseMutation } from '../../../redux/api/communityApi';
import Breadcrumbs from '../../../components/ui/Breadcrumbs';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import MarkdownEditor from '../components/MarkdownEditor';
import ParchmentPanel from '../components/ParchmentPanel';
import RoleGate from '../components/RoleGate';
import { ROLES } from '../constants';

export const CreateCourse = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('Spanish');
  const [level, setLevel] = useState('Beginner A1-A2');
  const [maxStudents, setMaxStudents] = useState(20);
  const [startDate, setStartDate] = useState('2026-07-15');
  const [schedule, setSchedule] = useState('Every Wednesday, 18:00 UTC');
  const [classLink, setClassLink] = useState('');

  const [createCourse, { isLoading: isSubmitting }] = useCreateCourseMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    try {
      await createCourse({
        title,
        description,
        language,
        level,
        maxStudents: Number(maxStudents),
        startDate: new Date(startDate).toISOString(),
        schedule,
        instructor: {
          id: user?._id || user?.id || 'inst-current',
          name: user?.name || 'Master Instructor',
          role: 'teacher',
          avatar: user?.avatar || '',
        },
        instructorId: user?._id || user?.id,
        nextSession: {
          date: new Date(startDate).toISOString(),
          title: `Session 1: Introduction to ${language} Through Song`,
          time: schedule,
          classLink: classLink || 'https://zoom.us/mock-link',
        },
        tags: [language, level, 'New Cohort'],
      }).unwrap();

      navigate('/community/study-chambers');
    } catch (err) {
      console.error('Failed to create course:', err);
    }
  };

  const breadcrumbs = [
    { label: 'Study Chambers', to: '/community/study-chambers' },
    { label: 'Found New Chamber' },
  ];

  return (
    <RoleGate allowedRoles={[ROLES.TEACHER, ROLES.ADMIN]} showNotice>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        <div className="flex items-center justify-between">
          <Breadcrumbs items={breadcrumbs} />
          <button
            type="button"
            onClick={() => navigate('/community/study-chambers')}
            className="text-xs font-serif text-stone-600 hover:text-stone-900 flex items-center gap-1"
          >
            <ArrowLeft size={13} />
            <span>Cancel</span>
          </button>
        </div>

        <ParchmentPanel>
          <div className="pb-4 border-b border-amber-900/20 mb-6">
            <h1 className="text-2xl font-serif font-bold text-stone-900">
              Establish a Study Chamber Cohort
            </h1>
            <p className="text-xs font-serif text-stone-600 mt-0.5">
              Only verified Instructors and Overseers may institute curriculum cohorts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                Chamber Title *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. French Chanson & Phonetic Liaison Masterclass"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                  Target Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-white/80 border border-stone-300 rounded-lg text-sm font-serif"
                >
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="Korean">Korean</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                  Proficiency Level
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-white/80 border border-stone-300 rounded-lg text-sm font-serif"
                >
                  <option value="Beginner A1-A2">Beginner A1-A2</option>
                  <option value="Intermediate B1-B2">Intermediate B1-B2</option>
                  <option value="Advanced C1-C2">Advanced C1-C2</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                  Max Scholars
                </label>
                <Input
                  type="number"
                  min="5"
                  max="50"
                  value={maxStudents}
                  onChange={(e) => setMaxStudents(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                  Commencement Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                  Class Schedule Cadence
                </label>
                <Input
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="e.g. Every Thursday, 18:00 UTC"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                Classroom Gathering Link (Protected - Revealed Only to Approved Students)
              </label>
              <Input
                type="url"
                value={classLink}
                onChange={(e) => setClassLink(e.target.value)}
                placeholder="https://zoom.us/j/123456789 or Google Meet URL"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-stone-800 mb-1.5">
                Chamber Syllabus & Curriculum Description *
              </label>
              <MarkdownEditor
                value={description}
                onChange={setDescription}
                placeholder="Outline the weekly modules, song selections, homework expectations, and pedagogical goals..."
                rows={8}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-900/10">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/community/study-chambers')}
                className="px-4 py-2 text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="ornate"
                disabled={!title.trim() || !description.trim() || isSubmitting}
                className="px-6 py-2.5 text-sm"
              >
                {isSubmitting ? 'Establishing Chamber...' : 'Found Chamber'}
              </Button>
            </div>
          </form>
        </ParchmentPanel>
      </div>
    </RoleGate>
  );
};

export default CreateCourse;
