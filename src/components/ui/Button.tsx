'use client';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer tracking-wider uppercase';

  const variants = {
    primary:
      'bg-gold text-dark hover:bg-gold-light shadow-lg shadow-gold/20 hover:shadow-gold/40',
    secondary:
      'bg-white text-dark hover:bg-gray-200 shadow-lg',
    outline:
      'border-2 border-gold text-gold hover:bg-gold hover:text-dark',
    ghost:
      'text-gold hover:bg-gold/10',
    gold:
      'gradient-gold text-dark hover:opacity-90 shadow-lg shadow-gold/30',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  if (href) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], sizes[size], className)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
