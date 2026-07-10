'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type BadgeVariant = 'default' | 'emerald' | 'blue' | 'amber' | 'red' | 'purple';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

/* ------------------------------------------------------------------ */
/*  Style maps                                                         */
/* ------------------------------------------------------------------ */

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0]',
  emerald:
    'bg-[#10b981]/10 text-[#059669] border border-[#10b981]/20',
  blue:
    'bg-blue-50 text-blue-600 border border-blue-200/60',
  amber:
    'bg-amber-50 text-amber-600 border border-amber-200/60',
  red:
    'bg-red-50 text-red-600 border border-red-200/60',
  purple:
    'bg-purple-50 text-purple-600 border border-purple-200/60',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Badge({
  variant = 'default',
  size = 'sm',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        'transition-colors duration-200',
        'select-none whitespace-nowrap',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
