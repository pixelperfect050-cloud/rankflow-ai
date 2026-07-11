'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type CardVariant = 'default' | 'elevated';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  noHover?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'border border-slate-200/60 shadow-sm',
  elevated: 'shadow-lg border border-slate-200/40',
};

export function Card({
  variant = 'default',
  noHover = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl overflow-hidden',
        'transition-all duration-300 ease-in-out',
        variantStyles[variant],
        !noHover && 'hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/5 hover:border-slate-200',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('px-6 pt-6 pb-2', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div
      className={cn('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        'px-6 pb-6 pt-2 flex items-center',
        'border-t border-slate-100',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
