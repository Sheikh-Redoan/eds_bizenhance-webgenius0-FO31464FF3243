import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { MessageSquare, Eye } from 'lucide-react';
import TagChip from '../../components/TagChip';
import RoleBadge from '../../components/RoleBadge';
import { timeAgo } from '../../utils/formatters';

export const ThreadRow = ({
  thread,
  wing,
  className,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/community/${wing}/threads/${thread.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'p-4 sm:p-5 rounded-xl bg-[#fdfbf6] border border-stone-300 hover:border-amber-800/60 shadow-2xs hover:shadow-sm transition-all duration-150 cursor-pointer group space-y-3',
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {(thread.tags || []).map((t) => (
            <TagChip key={t} label={t} className="!text-[11px] !py-0.5 !px-2.5" />
          ))}
        </div>
        <span className="text-[11px] font-sans text-stone-500">
          {timeAgo(thread.createdAt)}
        </span>
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-2">
          {thread.title}
        </h3>
        <p className="text-xs sm:text-sm font-serif text-stone-600 line-clamp-2 mt-1 leading-relaxed">
          {thread.content}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-stone-200/70 text-xs font-serif text-stone-600">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-stone-800">{thread.author?.name}</span>
          {thread.author?.role && <RoleBadge role={thread.author.role} className="scale-90" />}
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Eye size={13} className="text-stone-400" />
            <span>{thread.views || 0}</span>
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={13} className="text-stone-400" />
            <span>{thread.repliesCount || (thread.replies?.length || 0)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThreadRow;
