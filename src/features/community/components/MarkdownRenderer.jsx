import React from 'react';
import { clsx } from 'clsx';

export const MarkdownRenderer = ({
  content = '',
  className,
}) => {
  if (!content) return null;

  return (
    <div
      className={clsx(
        'font-serif text-sm sm:text-base text-stone-800 leading-relaxed whitespace-pre-wrap space-y-3 prose-stone',
        className
      )}
    >
      {content}
    </div>
  );
};

export default MarkdownRenderer;
