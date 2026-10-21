import React from 'react';
import { clsx } from 'clsx';
import buttonBorderSecondary from '../../../assets/images/Buttonbordersecoundary.png';

export const OrnateButton = ({
  children,
  icon: Icon,
  onClick,
  className,
  type = 'button',
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'relative group inline-flex items-center justify-center cursor-pointer select-none transition-transform duration-200 active:scale-95 px-6 py-3',
        disabled && 'opacity-60 cursor-not-allowed pointer-events-none',
        className
      )}
      {...props}
    >
      {/* Background Frame Graphic */}
      <img
        src={buttonBorderSecondary}
        alt=""
        className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-md group-hover:brightness-110 group-hover:drop-shadow-lg transition-all"
      />

      {/* Button Content */}
      <span className="relative z-10 inline-flex items-center justify-center gap-2 text-white font-Merriweather text-sm sm:text-base font-normal tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {Icon && <Icon size={16} className="text-amber-200 group-hover:scale-110 transition-transform shrink-0" />}
        <span>{children}</span>
      </span>
    </button>
  );
};

export default OrnateButton;
