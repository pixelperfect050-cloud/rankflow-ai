'use client';

import React, { useState, useCallback } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps {
  /** Current rating value (supports half values in display mode, e.g. 3.5) */
  value: number;
  /** Called when user clicks a star (interactive mode only) */
  onChange?: (value: number) => void;
  /** Read-only display mode (supports half stars) */
  readOnly?: boolean;
  /** Max number of stars */
  max?: number;
  /** Size preset */
  size?: RatingSize;
  /** Additional class names */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Style maps                                                         */
/* ------------------------------------------------------------------ */

const sizeMap: Record<RatingSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

const gapMap: Record<RatingSize, string> = {
  sm: 'gap-0.5',
  md: 'gap-1',
  lg: 'gap-1',
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Rating({
  value,
  onChange,
  readOnly = false,
  max = 5,
  size = 'md',
  className,
}: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const displayValue = hovered ?? value;
  const iconSize = sizeMap[size];

  const handleClick = useCallback(
    (starIndex: number) => {
      if (!readOnly && onChange) onChange(starIndex);
    },
    [readOnly, onChange],
  );

  return (
    <div
      className={cn('inline-flex items-center', gapMap[size], className)}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={`Rating: ${value} out of ${max}`}
      onMouseLeave={() => !readOnly && setHovered(null)}
    >
      {Array.from({ length: max }).map((_, i) => {
        const starIndex = i + 1;
        const isFull = displayValue >= starIndex;
        const isHalf = !isFull && displayValue >= starIndex - 0.5 && readOnly;

        return (
          <span
            key={i}
            className={cn(
              'relative inline-flex',
              !readOnly && 'cursor-pointer transition-transform duration-150 hover:scale-110',
            )}
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => !readOnly && setHovered(starIndex)}
            role={readOnly ? undefined : 'radio'}
            aria-checked={readOnly ? undefined : value >= starIndex}
            aria-label={`${starIndex} star${starIndex > 1 ? 's' : ''}`}
          >
            {/* Background (empty) star */}
            <Star
              className={cn(iconSize, 'text-[#e2e8f0] fill-[#e2e8f0]')}
            />

            {/* Filled overlay */}
            {(isFull || isHalf) && (
              <Star
                className={cn(
                  iconSize,
                  'absolute inset-0 text-amber-400 fill-amber-400',
                  'transition-colors duration-150',
                )}
                style={
                  isHalf
                    ? { clipPath: 'inset(0 50% 0 0)' }
                    : undefined
                }
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
