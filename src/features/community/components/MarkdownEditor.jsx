import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Bold, Italic, Link2, Quote, List, Code } from 'lucide-react';
import Textarea from '../../../components/ui/Textarea';

export const MarkdownEditor = ({
  value,
  onChange,
  placeholder = 'Pen your thoughts, analyses, or scholarly notes here...',
  rows = 8,
  className,
}) => {
  const [tab, setTab] = useState('write'); // 'write' | 'preview'

  const insertSyntax = (prefix, suffix = '') => {
    onChange((prev = '') => `${prev}${prefix}${suffix}`);
  };

  return (
    <div className={clsx('border border-amber-900/30 rounded-lg overflow-hidden bg-white/70 shadow-2xs', className)}>
      <div className="flex items-center justify-between px-3 py-1.5 bg-stone-200/60 border-b border-stone-300">
        <div className="flex items-center gap-1 text-xs">
          <button
            type="button"
            onClick={() => setTab('write')}
            className={clsx(
              'px-2.5 py-1 rounded font-serif font-semibold transition-colors',
              tab === 'write' ? 'bg-amber-900 text-amber-100' : 'text-stone-700 hover:text-stone-900'
            )}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setTab('preview')}
            className={clsx(
              'px-2.5 py-1 rounded font-serif font-semibold transition-colors',
              tab === 'preview' ? 'bg-amber-900 text-amber-100' : 'text-stone-700 hover:text-stone-900'
            )}
          >
            Preview
          </button>
        </div>

        {tab === 'write' && (
          <div className="flex items-center gap-1 text-stone-600">
            <button
              type="button"
              onClick={() => insertSyntax('**', '**')}
              title="Bold"
              className="p-1 hover:bg-stone-300 rounded"
            >
              <Bold size={13} />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('*', '*')}
              title="Italic"
              className="p-1 hover:bg-stone-300 rounded"
            >
              <Italic size={13} />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('> ')}
              title="Quote"
              className="p-1 hover:bg-stone-300 rounded"
            >
              <Quote size={13} />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('- ')}
              title="List"
              className="p-1 hover:bg-stone-300 rounded"
            >
              <List size={13} />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('`', '`')}
              title="Code"
              className="p-1 hover:bg-stone-300 rounded"
            >
              <Code size={13} />
            </button>
          </div>
        )}
      </div>

      <div className="p-2">
        {tab === 'write' ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="w-full !border-0 !bg-transparent focus:!ring-0 resize-y font-serif text-sm text-stone-900"
          />
        ) : (
          <div className="p-3 min-h-[160px] font-serif text-sm text-stone-800 whitespace-pre-wrap leading-relaxed">
            {value || <span className="text-stone-400 italic">Nothing to preview yet.</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
