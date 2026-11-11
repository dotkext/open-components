import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export { cva, type VariantProps } from 'class-variance-authority';
export type { ClassValue } from 'clsx';
export { clsx, twMerge };

/**
 * Merge Tailwind class names, resolving conflicts the way shadcn/ui does.
 * Works in every renderer (React, Angular, Web Components) because it is a pure function.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
