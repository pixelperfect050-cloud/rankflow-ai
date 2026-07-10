'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ToggleProps {
  /** Whether the toggle is on */
  checked: boolean;
  /** Called when the toggle changes */
  onChange: (checked: boolean) => void;
  /** Label displayed next to the toggle */
  label?: string;
  /** Visually and functionally disabled */
  disabled?: boolean;
  /** Additional class names on the wrapper */
  className?: string;
  /** Accessible name when no visible label is provided */
  'aria-label'?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  className,
  'aria-label': ariaLabel,
}: ToggleProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-center gap-2.5 select-none',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      {/* Track */}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={!label ? ariaLabel : undefined}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0',
          'h-6 w-11 rounded-full',
          'transition-colors duration-200 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#10b981]/40',
          checked ? 'bg-[#10b981]' : 'bg-[#e2e8f0]',
        )}
      >
        {/* Thumb */}
        <span
          aria-hidden="true"
          className={cn(
            'inline-block h-5 w-5 rounded-full bg-white shadow-sm',
            'transform transition-transform duration-200 ease-in-out',
            'mt-0.5 ml-0.5',
            checked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>

      {/* Label text */}
      {label && (
        <span className="text-sm font-medium text-[#0f172a]">{label}</span>
      )}
    </label>
  );
}
