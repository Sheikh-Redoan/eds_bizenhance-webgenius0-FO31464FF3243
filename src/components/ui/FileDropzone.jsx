import React, { useRef, useState } from 'react';
import { clsx } from 'clsx';
import { UploadCloud, FileText, X } from 'lucide-react';

export const FileDropzone = ({
  accept = 'audio/*,image/*,.pdf,.txt',
  maxSizeMB = 15,
  file,
  onFileSelect,
  onClear,
  label = 'Drag and drop your file here, or browse',
  hint = 'Supports MP3, WAV, PNG, JPG, PDF (Max 15MB)',
  className,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className={clsx('w-full', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {file ? (
        <div className="flex items-center justify-between p-3.5 bg-amber-50/80 border border-amber-700/40 rounded-lg shadow-xs">
          <div className="flex items-center gap-3 truncate">
            <div className="w-9 h-9 rounded bg-amber-800 text-amber-100 flex items-center justify-center shrink-0">
              <FileText size={18} />
            </div>
            <div className="truncate text-left">
              <p className="text-sm font-serif font-semibold text-stone-900 truncate">
                {file.name}
              </p>
              <p className="text-xs text-stone-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="p-1 rounded hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={clsx(
            'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2',
            isDragOver
              ? 'border-amber-700 bg-amber-100/50 scale-[1.01]'
              : 'border-stone-400/80 bg-stone-100/40 hover:bg-amber-50/40 hover:border-amber-700/60'
          )}
        >
          <div className="w-12 h-12 rounded-full bg-amber-900/10 text-amber-800 flex items-center justify-center mb-1">
            <UploadCloud size={24} />
          </div>
          <p className="text-sm font-serif font-semibold text-stone-800">{label}</p>
          <p className="text-xs text-stone-500">{hint}</p>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
