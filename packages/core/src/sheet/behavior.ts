/**
 * Framework-agnostic modal helpers shared by the web component, React and
 * Angular Sheet implementations.
 */

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/** Elements inside `container` that can currently receive keyboard focus. */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

/** Focus the first focusable element, falling back to the container itself. */
export function focusFirstElement(container: HTMLElement): void {
  const [first] = getFocusableElements(container);
  (first ?? container).focus();
}

/**
 * Keep Tab / Shift+Tab cycling inside `container`.
 * Returns a cleanup function.
 */
export function createFocusTrap(container: HTMLElement): () => void {
  if (typeof document === 'undefined') return () => {};

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    const focusable = getFocusableElements(container);
    if (focusable.length === 0) {
      event.preventDefault();
      container.focus();
      return;
    }

    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    const active = document.activeElement as HTMLElement | null;
    const inside = active !== null && container.contains(active);

    if (event.shiftKey && (!inside || active === first)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (!inside || active === last)) {
      event.preventDefault();
      first.focus();
    }
  };

  document.addEventListener('keydown', onKeydown, true);
  return () => document.removeEventListener('keydown', onKeydown, true);
}

let scrollLocks = 0;
let previousOverflow = '';

/**
 * Lock page scrolling while at least one modal is open.
 * Returns a cleanup function; nested locks are reference counted.
 */
export function lockBodyScroll(): () => void {
  if (typeof document === 'undefined') return () => {};

  scrollLocks += 1;
  if (scrollLocks === 1) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  let released = false;
  return () => {
    if (released) return;
    released = true;
    scrollLocks -= 1;
    if (scrollLocks === 0) {
      document.body.style.overflow = previousOverflow;
    }
  };
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
