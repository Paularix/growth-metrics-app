import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The text to be displayed inside the button */
  label?: string;
  /** Optional icon element to be rendered alongside the label */
  icon?: React.ReactNode;
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  /** Size scale for padding and font size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional Tailwind CSS classes for custom styling */
  className?: string;
}
