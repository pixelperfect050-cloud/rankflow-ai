'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'emerald' | 'blue' | 'amber' | 'red' | 'purple';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-slate-50 text-slate-600 border border-slate-200',
  emerald:
    'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
  blue:
    'bg-blue-50 text-blue-700 border border-blue-200/60',
  amber:
    'bg-amber-50 text-amber-700 border border-amber-200/60',
  red:
    'bg-red-50 text-red-700 border border-red-200/60',
  purple:
    'bg-purple-50 text-purple-700 border border-purple-200/60',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

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
        'inline-flex items-center font-bold rounded-lg',
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
