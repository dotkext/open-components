/** Menu items that can receive focus. */
export function getMenuItems(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([disabled]):not([aria-disabled="true"])',
    ),
  );
}

/** Focus a menu item by index, wrapping around the ends. */
export function focusMenuItem(container: HTMLElement, index: number): void {
  const items = getMenuItems(container);
  if (items.length === 0) return;
  const clamped = ((index % items.length) + items.length) % items.length;
  items[clamped]?.focus();
}

/** Call `handler` when Escape is pressed. Returns a cleanup function. */
export function onEscape(handler: () => void): () => void {
  if (typeof document === 'undefined') return () => {};

  const listener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') handler();
  };
  document.addEventListener('keydown', listener);
  return () => document.removeEventListener('keydown', listener);
}

/**
 * Invoke `handler` when a pointer press happens outside `container`.
 * Returns a cleanup function.
 */
export function onPointerDownOutside(container: HTMLElement, handler: () => void): () => void {
  if (typeof document === 'undefined') return () => {};

  const listener = (event: PointerEvent) => {
    const target = event.target as Node | null;
    if (target && !container.contains(target)) handler();
  };

  document.addEventListener('pointerdown', listener, true);
  return () => document.removeEventListener('pointerdown', listener, true);
}
