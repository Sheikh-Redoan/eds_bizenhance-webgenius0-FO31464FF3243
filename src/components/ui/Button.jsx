import React from 'react';
import { clsx } from 'clsx';
import buttonBG from '../../assets/images/ButtonBG.png';

const Button = ({ children, variant = 'primary', className, ...props }) => { 
  const baseStyles = 'rounded-lg font-medieval transition-all duration-200 bg-contain bg-center bg-no-repeat cursor-pointer';
  
  const variants = {
    primary: 'bg-wood hover:bg-wood-light text-paper-light',
    secondary: 'bg-paper hover:bg-paper-dark text-wood-dark border-2 border-wood',
    gold: 'bg-gold hover:bg-yellow-500 text-wood-dark font-bold',
  };

  return (
    <button 
      className={clsx(baseStyles, variants[variant], className)}
      style={{ backgroundImage: `url(${buttonBG})` }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;