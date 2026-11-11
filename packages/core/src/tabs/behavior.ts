export type TabOrientation = 'horizontal' | 'vertical';

/**
 * Resolve the index a tab group should move to for a keyboard event.
 * Returns `null` when the key is not handled.
 */
export function getNextTabIndex(
  key: string,
  currentIndex: number,
  count: number,
  orientation: TabOrientation = 'horizontal',
): number | null {
  if (count === 0) return null;

  const previousKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
  const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';

  if (key === previousKey) return (currentIndex - 1 + count) % count;
  if (key === nextKey) return (currentIndex + 1) % count;
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;
  return null;
}
