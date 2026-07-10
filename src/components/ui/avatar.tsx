'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string | null;
  /** Alt text for the image */
  alt?: string;
  /** Full name — used to derive initials when image is absent */
  name?: string;
  /** Size preset */
  size?: AvatarSize;
  /** Status indicator dot */
  status?: AvatarStatus;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getInitials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  Style maps                                                         */
/* ------------------------------------------------------------------ */

const sizeMap: Record<AvatarSize, { container: string; text: string; dot: string }> = {
  sm: { container: 'h-8 w-8',   text: 'text-xs',   dot: 'h-2 w-2 border' },
  md: { container: 'h-10 w-10', text: 'text-sm',   dot: 'h-2.5 w-2.5 border-[1.5px]' },
  lg: { container: 'h-12 w-12', text: 'text-base', dot: 'h-3 w-3 border-2' },
  xl: { container: 'h-16 w-16', text: 'text-lg',   dot: 'h-3.5 w-3.5 border-2' },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  status,
  className,
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = !!src && !imgError;
  const { container, text, dot } = sizeMap[size];

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center',
        'rounded-full overflow-hidden',
        'bg-[#10b981]/10 text-[#059669] font-semibold select-none',
        container,
        className,
      )}
      aria-label={alt ?? name}
      {...props}
    >
      {showImage ? (
        <img
          src={src!}
          alt={alt ?? name ?? 'Avatar'}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={cn(text, 'leading-none')}>
          {getInitials(name)}
        </span>
      )}

      {/* Status dot */}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-white',
            status === 'online' ? 'bg-[#10b981]' : 'bg-[#64748b]',
            dot,
          )}
          aria-label={status}
        />
      )}
    </div>
  );
}
