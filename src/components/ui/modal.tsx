'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ModalProps {
  /** Whether the modal is visible */
  open: boolean;
  /** Called when the modal wants to close */
  onClose: () => void;
  /** Dialog title */
  title?: string;
  /** Short description below the title */
  description?: string;
  /** Additional class names on the panel */
  className?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Max-width utility class (default: max-w-lg) */
  maxWidth?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Modal({
  open,
  onClose,
  title,
  description,
  className,
  children,
  maxWidth = 'max-w-lg',
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* ---- Escape key handler ---- */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll while modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, handleKeyDown]);

  /* ---- Click-outside handler ---- */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  /* ---- Don't render when closed ---- */
  if (!open) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        // Animated backdrop
        'bg-black/40 backdrop-blur-sm',
        'animate-[fadeIn_200ms_ease-out]',
      )}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-desc' : undefined}
    >
      {/* Panel */}
      <div
        ref={panelRef}
        className={cn(
          'relative w-full bg-white rounded-[12px] shadow-2xl',
          'animate-[scaleIn_200ms_ease-out]',
          maxWidth,
          className,
        )}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className={cn(
            'absolute top-4 right-4 p-1.5 rounded-[6px]',
            'text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc]',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/40',
          )}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        {(title || description) && (
          <div className="px-6 pt-6 pb-2">
            {title && (
              <h2
                id="modal-title"
                className="text-lg font-semibold text-[#0f172a]"
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                id="modal-desc"
                className="mt-1 text-sm text-[#64748b]"
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4">{children}</div>
      </div>

      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>,
    document.body,
  );
}
