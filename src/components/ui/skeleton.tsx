'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape variant */
  variant?: SkeletonVariant;
  /** Width — CSS value or Tailwind class (e.g. "100%", "w-32") */
  width?: string | number;
  /** Height — CSS value or Tailwind class */
  height?: string | number;
  /** Number of text-like lines (only for "text" variant) */
  lines?: number;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Skeleton({
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  className,
  style,
  ...props
}: SkeletonProps) {
  const baseClasses = cn(
    'animate-pulse bg-[#e2e8f0] rounded-[8px]',
    className,
  );

  const inlineStyle: React.CSSProperties = {
    ...(typeof width === 'number' ? { width } : {}),
    ...(typeof height === 'number' ? { height } : {}),
    ...(typeof width === 'string' && !width.startsWith('w-') ? { width } : {}),
    ...(typeof height === 'string' && !height.startsWith('h-') ? { height } : {}),
    ...style,
  };

  // Resolve Tailwind-style width/height classes
  const twWidth = typeof width === 'string' && width.startsWith('w-') ? width : undefined;
  const twHeight = typeof height === 'string' && height.startsWith('h-') ? height : undefined;

  /* ---- Circular ---- */
  if (variant === 'circular') {
    const size = width ?? height ?? 40;
    return (
      <div
        className={cn(baseClasses, 'rounded-full', twWidth, twHeight)}
        style={{
          width: typeof size === 'number' ? size : undefined,
          height: typeof size === 'number' ? size : undefined,
          ...inlineStyle,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }

  /* ---- Text (multiple lines) ---- */
  if (variant === 'text') {
    return (
      <div className="flex flex-col gap-2" aria-hidden="true" {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              'h-4',
              // Last line is shorter for a natural look
              i === lines - 1 && lines > 1 && 'w-3/4',
              twWidth,
            )}
            style={inlineStyle}
          />
        ))}
      </div>
    );
  }

  /* ---- Rectangular (default) ---- */
  return (
    <div
      className={cn(baseClasses, twWidth, twHeight)}
      style={{
        height: !twHeight && !inlineStyle.height ? 120 : undefined,
        ...inlineStyle,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}
