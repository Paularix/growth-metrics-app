'use client';

import { ButtonProps } from './Button.types';

/**
 * Reusable Button component that supports multiple visual variants and sizes,
 * featuring a flexible icon slot and standard HTML button attributes.
 */

export const Button = ({
  label,
  icon,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  type = 'button',
  ...props
}: ButtonProps) => {
  const baseStyles = 'flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 ' +
    'active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-sm';

  const sizes = {
    sm: 'px-3 py-1.5 text-[10px] gap-1.5',
    md: 'px-4 py-2.5 text-xs gap-2',
    lg: 'px-6 py-3.5 text-sm gap-2.5',
  };

  const variants = {
    primary: 'bg-[#ff585d] hover:bg-[#ff4046] text-white shadow-red-100',
    secondary: 'bg-slate-800 hover:bg-slate-900 text-white shadow-slate-200',
    outline: 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm',
    danger: 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 shadow-none',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && (
        <span className='flex items-center justify-center leading-none'>
          {icon}
        </span>
      )}
      {label && <span>{label}</span>}
    </button>
  );
};
