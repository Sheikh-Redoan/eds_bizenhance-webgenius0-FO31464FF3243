import React from "react";
import { clsx } from "clsx";
import { Search } from "lucide-react";

const SearchInput = ({ className, placeholder, ...props }) => {
  return (
    <div
      className={clsx(
        "flex h-14 w-full items-center gap-2.5",
        "px-6 py-3",
        // Outline styling from demo
        "outline outline-2 outline-offset-[-2px] outline-[#B28769]",
        // Interactive states
        "focus-within:outline-stone-300 transition-colors duration-200",
        className
      )}
    >
      <div className="relative flex items-center justify-center size-6 shrink-0 text-stone-400">
        <Search size={20} strokeWidth={2} />
      </div>
      
      <input
        className={clsx(
          "h-full w-full bg-transparent border-none outline-none",
          "font-sans text-base font-normal leading-8",
          "text-stone-300 placeholder:text-stone-400"
        )}
        placeholder={placeholder || "Search song or article..."}
        {...props}
      />
    </div>
  );
};

export default SearchInput;