'use client';

import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Shows a spinner and disables the button */
  loading?: boolean;
  /** Icon rendered before the label */
  leftIcon?: React.ReactNode;
  /** Icon rendered after the label */
  rightIcon?: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Style maps                                                         */
/* ------------------------------------------------------------------ */

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#10b981] text-white hover:bg-[#059669] focus-visible:ring-[#10b981]/40 shadow-sm hover:shadow-md',
  secondary:
    'bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0] hover:bg-[#e2e8f0] focus-visible:ring-[#64748b]/30',
  ghost:
    'bg-transparent text-[#0f172a] hover:bg-[#f8fafc] focus-visible:ring-[#64748b]/30',
  danger:
    'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500/40 shadow-sm hover:shadow-md',
  destructive:
    'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500/40 shadow-sm hover:shadow-md',
  outline:
    'bg-transparent text-[#10b981] border border-[#10b981] hover:bg-[#10b981]/5 focus-visible:ring-[#10b981]/40',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5 rounded-[6px]',
  md: 'h-10 px-4 text-sm gap-2 rounded-[8px]',
  lg: 'h-12 px-6 text-base gap-2.5 rounded-[8px]',
  icon: 'h-10 w-10 shrink-0 rounded-[8px]',
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          // Base
          'inline-flex items-center justify-center font-medium',
          'transition-all duration-200 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'select-none whitespace-nowrap',
          // Variant + size
          variantStyles[variant],
          sizeStyles[size],
          // Disabled / loading
          isDisabled && 'opacity-50 pointer-events-none',
          className,
        )}
        {...props}
      >
        {/* Loading spinner replaces leftIcon */}
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}

        {children}

        {rightIcon && !loading && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
