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

/**
 * Copy text to the clipboard. Returns `false` when the API is unavailable
 * (SSR, insecure context, or a denied permission) instead of throwing.
 */
export async function copyText(text: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
