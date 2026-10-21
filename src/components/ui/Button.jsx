import React from 'react';
import { clsx } from 'clsx';
import buttonBG from '../../assets/images/ButtonBG.png';

const Button = ({ children, variant = 'primary', className, ...props }) => { 
  const baseStyles = 'rounded-lg font-medieval transition-all duration-200 bg-contain bg-center bg-no-repeat cursor-pointer';
  
  const variants = {
    primary: 'bg-wood hover:bg-wood-light text-paper-light',
    secondary: 'bg-paper hover:bg-paper-dark text-wood-dark border-2 border-wood',
    gold: 'bg-gold hover:bg-yellow-500 text-wood-dark font-bold',
    ornate: 'bg-amber-900/80 hover:bg-amber-800 text-amber-100 border border-amber-600/60 shadow-md',
    ghost: 'bg-transparent hover:bg-black/10 text-stone-700 hover:text-stone-900',
  };

  const isBgExcluded = variant === 'ghost';

  return (
    <button 
      className={clsx(baseStyles, variants[variant] || variants.primary, className)}
      style={isBgExcluded ? {} : { backgroundImage: `url(${buttonBG})` }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;