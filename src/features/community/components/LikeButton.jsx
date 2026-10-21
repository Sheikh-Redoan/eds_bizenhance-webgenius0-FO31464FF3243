import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Heart } from 'lucide-react';

export const LikeButton = ({
  initialCount = 0,
  initialLiked = false,
  onLikeChange,
  size = 'md',
  className,
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const toggle = (e) => {
    e.stopPropagation();
    const nextLiked = !liked;
    const nextCount = nextLiked ? count + 1 : Math.max(0, count - 1);
    setLiked(nextLiked);
    setCount(nextCount);
    onLikeChange?.(nextLiked, nextCount);
  };

  const isSmall = size === 'sm';

  return (
    <button
      type="button"
      onClick={toggle}
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-serif transition-all duration-150 active:scale-90 cursor-pointer',
        isSmall ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        liked
          ? 'bg-red-100 text-red-700 border border-red-300 shadow-2xs font-bold'
          : 'bg-stone-200/70 text-stone-700 border border-stone-300 hover:border-red-400 hover:bg-red-50/50',
        className
      )}
    >
      <Heart
        size={isSmall ? 13 : 15}
        className={clsx('transition-transform', liked ? 'fill-red-600 text-red-600 scale-110' : 'text-stone-500')}
      />
      <span>{count}</span>
    </button>
  );
};

export default LikeButton;
