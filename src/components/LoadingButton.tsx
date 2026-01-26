import { useState, useCallback, ReactNode, ButtonHTMLAttributes } from 'react';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loadingText?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-primary hover:bg-teal-700 text-white glow-button',
  secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white',
  accent: 'bg-accent-green hover:bg-emerald-600 text-white glow-accent',
  outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-400 dark:hover:text-white',
};

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-base',
};

export default function LoadingButton({
  children,
  loadingText = 'Procesando...',
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled,
  className = '',
  type = 'button',
  ...props
}: LoadingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading || disabled) return;

    if (onClick) {
      const result = onClick(e);
      if (result instanceof Promise) {
        setIsLoading(true);
        try {
          await result;
        } finally {
          setIsLoading(false);
        }
      }
    }
  }, [onClick, isLoading, disabled]);

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        font-bold rounded-xl transition-all duration-300
        flex items-center justify-center gap-2
        disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
