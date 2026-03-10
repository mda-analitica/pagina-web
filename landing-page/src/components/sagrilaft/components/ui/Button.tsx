import type { ReactNode } from 'react';
import { Icon } from './Icon';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const variantClasses = {
  primary: 'bg-primary hover:bg-primary/90 text-white shadow-sm',
  secondary: 'bg-secondary hover:bg-secondary/90 text-white shadow-sm',
  outline: 'border-2 border-primary text-primary hover:bg-primary/10 dark:border-secondary dark:text-secondary',
  ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  children, onClick, variant = 'primary', size = 'md', icon,
  iconPosition = 'left', disabled = false, type = 'button', className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200
        ${variantClasses[variant]} ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {icon && iconPosition === 'left' && <Icon name={icon} size={size === 'sm' ? 16 : 18} />}
      {children}
      {icon && iconPosition === 'right' && <Icon name={icon} size={size === 'sm' ? 16 : 18} />}
    </button>
  );
}
