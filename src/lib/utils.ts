import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

/**
 * Merges Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string into a readable format (e.g., "Jan 1, 2024")
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  try {
    return format(parseISO(dateString), 'MMM d, yyyy')
  } catch (e) {
    return dateString
  }
}

/**
 * Generates a URL-friendly slug from a string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
}

/**
 * Calculates estimated reading time (in minutes) from HTML string
 */
export function readingTime(html: string | null | undefined): number {
  if (!html) return 1
  const text = stripHtml(html)
  const wordCount = text.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200) // 200 words per minute
  return Math.max(1, readingTime) // At least 1 minute
}

/**
 * Truncates text to a specified length and adds ellipsis
 */
export function truncate(text: string | null | undefined, length: number): string {
  if (!text) return ''
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * Formats a number to a readable string (e.g., 1.5K, 2M)
 */
export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return '0'
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

/**
 * Extracts initials from a name
 */
export function getInitials(name: string | null | undefined): string {
  if (!name) return '?'
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/**
 * Creates an absolute URL given a relative path
 */
export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Removes HTML tags from a string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, '')
}
