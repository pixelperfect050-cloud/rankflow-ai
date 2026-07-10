'use client';

import React, { forwardRef, useId } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type InputVariant = 'default' | 'search';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label displayed above the input */
  label?: string;
  /** Error message — also sets the error visual state */
  error?: string;
  /** Hint text displayed below the input (hidden when error is present) */
  hint?: string;
  /** Visual variant */
  variant?: InputVariant;
  /** Icon rendered inside the left edge */
  leftIcon?: React.ReactNode;
  /** Icon rendered inside the right edge */
  rightIcon?: React.ReactNode;
  /** Full-width wrapper class overrides */
  wrapperClassName?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      variant = 'default',
      leftIcon,
      rightIcon,
      wrapperClassName,
      className,
      id: externalId,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const id = externalId ?? autoId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    // Search variant injects a search icon on the left automatically
    const resolvedLeftIcon =
      variant === 'search' ? (
        <Search className="h-4 w-4 text-[#64748b]" aria-hidden="true" />
      ) : (
        leftIcon
      );

    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[#0f172a] select-none"
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {resolvedLeftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] pointer-events-none">
              {resolvedLeftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : hint ? hintId : undefined
            }
            className={cn(
              // Base
              'w-full h-10 rounded-[8px] bg-white text-[#0f172a] text-sm',
              'border outline-none transition-all duration-200',
              'placeholder:text-[#64748b]/60',
              // Focus
              'focus:ring-2 focus:ring-offset-0',
              // Default state
              !error
                ? 'border-[#e2e8f0] focus:border-[#10b981] focus:ring-[#10b981]/20'
                : 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
              // Icon padding
              resolvedLeftIcon ? 'pl-10' : 'pl-3',
              rightIcon ? 'pr-10' : 'pr-3',
              // Disabled
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#f8fafc]',
              className,
            )}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b]">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Error / Hint */}
        {error && (
          <p id={errorId} className="text-xs text-red-500 mt-0.5" role="alert">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={hintId} className="text-xs text-[#64748b] mt-0.5">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
