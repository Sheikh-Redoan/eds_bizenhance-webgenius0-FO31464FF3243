import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, Send, Users, Shield } from 'lucide-react';
import { selectCurrentUser } from '../../../redux/slices/authSlice';
import { useGetCourseQuery } from '../../../redux/api/communityApi';
import Breadcrumbs from '../../../components/ui/Breadcrumbs';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import ParchmentPanel from '../components/ParchmentPanel';
import AuthorMeta from '../components/AuthorMeta';

export const CourseChat = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const { data: course } = useGetCourseQuery(courseId);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      author: {
        id: 'inst-1',
        name: 'Maestro Rodrigo Flores',
        role: 'teacher',
      },
      text: '¡Bienvenidos todos! Please listen through Verse 1 of Bésame Mucho before our upcoming seminar.',
      time: '10:30 AM',
    },
    {
      id: 'msg-2',
      author: {
        id: 'std-2',
        name: 'Elena Rostova',
        role: 'student',
      },
      text: 'Thank you Maestro! I had a quick question regarding the subjunctive trigger in line 4.',
      time: '11:15 AM',
    },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        author: {
          id: user?._id || user?.id || 'anon',
          name: user?.name || 'Fellow Scholar',
          role: user?.role || 'student',
        },
        text: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setMessage('');
  };

  const breadcrumbs = [
    { label: 'Study Chambers', to: '/community/study-chambers' },
    { label: course?.title || 'Course', to: `/community/study-chambers/courses/${courseId}` },
    { label: 'Cohort Chat' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbs} />
        <button
          type="button"
          onClick={() => navigate(`/community/study-chambers/courses/${courseId}`)}
          className="text-xs font-serif text-stone-600 hover:text-stone-900 flex items-center gap-1"
        >
          <ArrowLeft size={13} />
          <span>Leave Room</span>
        </button>
      </div>

      <ParchmentPanel className="flex flex-col h-[650px] p-0 overflow-hidden">
        <div className="p-4 border-b border-amber-900/20 bg-[#f4ede1] flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-lg text-stone-900">
              {course?.title || 'Study Chamber'} • Cohort Discussion
            </h2>
            <p className="text-xs font-serif text-stone-600">
              Private dialogue sanctuary for enrolled scholars and instructor.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            <Users size={13} />
            <span>{course?.enrolledCount || 14} Members</span>
          </div>
        </div>

        {/* Message scroll list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <AuthorMeta author={msg.author} />
                <span className="text-[10px] text-stone-400 font-sans">{msg.time}</span>
              </div>
              <div className="ml-10 bg-white/90 border border-stone-200/80 rounded-lg p-3 text-xs sm:text-sm font-serif text-stone-800 shadow-2xs leading-relaxed max-w-xl">
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat input */}
        <form onSubmit={handleSend} className="p-3 border-t border-amber-900/20 bg-[#f4ede1] flex items-center gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share an observation, question, or translation note..."
            className="flex-1 font-serif bg-white"
          />
          <Button type="submit" variant="ornate" disabled={!message.trim()} className="px-5 py-2 text-xs flex items-center gap-1">
            <Send size={13} />
            <span>Send</span>
          </Button>
        </form>
      </ParchmentPanel>
    </div>
  );
};

export default CourseChat;
