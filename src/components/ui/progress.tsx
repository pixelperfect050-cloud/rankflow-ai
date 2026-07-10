'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ProgressColor = 'emerald' | 'blue' | 'amber' | 'red';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value (0 – 100) */
  value: number;
  /** Color variant */
  color?: ProgressColor;
  /** Show percentage label */
  showLabel?: boolean;
  /** Height utility class */
  height?: string;
}

/* ------------------------------------------------------------------ */
/*  Style maps                                                         */
/* ------------------------------------------------------------------ */

const colorStyles: Record<ProgressColor, { bar: string; track: string }> = {
  emerald: { bar: 'bg-[#10b981]', track: 'bg-[#10b981]/10' },
  blue:    { bar: 'bg-blue-500',   track: 'bg-blue-500/10' },
  amber:   { bar: 'bg-amber-500',  track: 'bg-amber-500/10' },
  red:     { bar: 'bg-red-500',    track: 'bg-red-500/10' },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Progress({
  value,
  color = 'emerald',
  showLabel = false,
  height = 'h-2',
  className,
  ...props
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const { bar, track } = colorStyles[color];

  return (
    <div className={cn('w-full', className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-[#64748b]">Progress</span>
          <span className="text-xs font-semibold text-[#0f172a]">
            {Math.round(clamped)}%
          </span>
        </div>
      )}

      <div
        className={cn('w-full rounded-full overflow-hidden', track, height)}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            'h-full rounded-full',
            'transition-all duration-500 ease-out',
            bar,
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
