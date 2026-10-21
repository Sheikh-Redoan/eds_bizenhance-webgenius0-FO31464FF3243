import React from 'react';
import { clsx } from 'clsx';
import TagChip from '../../components/TagChip';

export const TagSelector = ({
  availableTags = [],
  selectedTags = [],
  onChange,
  maxTags = 3,
  className,
}) => {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length < maxTags) {
        onChange([...selectedTags, tag]);
      }
    }
  };

  return (
    <div className={clsx('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-serif font-bold text-stone-800">
          Chamber Tags (Choose up to {maxTags})
        </label>
        <span className="text-[11px] font-serif text-stone-500">
          {selectedTags.length} / {maxTags} selected
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          const isDisabled = !isSelected && selectedTags.length >= maxTags;

          return (
            <TagChip
              key={tag}
              label={tag}
              selected={isSelected}
              onClick={() => !isDisabled && toggleTag(tag)}
              className={clsx(isDisabled && 'opacity-50 cursor-not-allowed hover:!bg-stone-200')}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TagSelector;
