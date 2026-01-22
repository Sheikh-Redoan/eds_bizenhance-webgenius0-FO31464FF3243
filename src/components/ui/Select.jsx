import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";

const Select = ({ options = [], placeholder, value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange && onChange(optionValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div className={clsx("relative w-full", className)} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex h-14 w-full items-center justify-between",
          "px-6 py-3",
          "outline outline-2 outline-offset-[-2px] outline-[#B28769]",
          "hover:bg-white/5 transition-colors duration-200",
          "bg-transparent cursor-pointer"
        )}
      >
        <span className="text-stone-400 text-base font-normal font-sans leading-8 truncate">
          {selectedLabel}
        </span>
        <div
          className={clsx(
            "relative flex items-center justify-center size-6 text-stone-400 transition-transform duration-300",
            isOpen ? "rotate-180" : "-rotate-90" // Matches the visual rotation in your demo
          )}
        >
          <ChevronDown size={20} />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full z-60">
          <div className="p-6 bg-[#B28769] outline outline-2 outline-offset-[-2px] outline-[#B28769] flex flex-col gap-2.5 shadow-2xl">
            {/* "All" Option (Reset) */}
            <div
              onClick={() => handleSelect(null)}
              className={clsx(
                "w-full h-10 px-4 py-1 flex items-center gap-2.5 cursor-pointer transition-colors",
                !value ? "bg-stone-600" : "hover:bg-[#B28769]"
              )}
            >
              <span className="text-stone-50 text-base font-normal font-sans leading-6">
                {placeholder || "All"}
              </span>
            </div>
            
            {/* Options List */}
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={clsx(
                  "w-full px-4 py-1 rounded-2xl flex items-center gap-2.5 cursor-pointer transition-colors",
                  value === option.value ? "bg-stone-600" : "hover:bg-stone-600/50"
                )}
              >
                <span
                  className={clsx(
                    "text-white text-base font-normal font-sans leading-6",
                    value === option.value ? "opacity-100" : "opacity-50"
                  )}
                >
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;