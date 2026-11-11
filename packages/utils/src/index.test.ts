import { describe, expect, it } from 'vitest';
import { cn } from './index';

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('ignores falsy values', () => {
    expect(cn('a', false, undefined, null, '', 'b')).toBe('a b');
  });

  it('resolves conflicting Tailwind utilities in favour of the last one', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    expect(cn('bg-primary', 'bg-red-500')).toBe('bg-red-500');
    expect(cn('rounded-md', 'rounded-lg')).toBe('rounded-lg');
  });

  it('supports conditional object syntax', () => {
    expect(cn({ 'text-sm': true, 'text-lg': false })).toBe('text-sm');
  });
});
