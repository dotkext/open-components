// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createFocusTrap,
  focusFirstElement,
  getFocusableElements,
  lockBodyScroll,
  onEscape,
} from './behavior';

afterEach(() => {
  document.body.innerHTML = '';
  document.body.style.overflow = '';
});

describe('getFocusableElements', () => {
  it('collects focusable children and skips disabled/tabindex -1 elements', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <button id="first">First</button>
      <button id="disabled" disabled>Disabled</button>
      <a href="#x" id="link">Link</a>
      <input id="input" />
      <div tabindex="-1" id="excluded">Excluded</div>
    `;
    const ids = getFocusableElements(container).map((element) => element.id);
    expect(ids).toEqual(['first', 'link', 'input']);
  });
});

describe('focusFirstElement', () => {
  it('focuses the first focusable element', () => {
    const container = document.createElement('div');
    container.innerHTML = '<button id="target">Target</button>';
    document.body.append(container);
    focusFirstElement(container);
    expect(document.activeElement?.id).toBe('target');
  });
});

describe('createFocusTrap', () => {
  it('wraps focus from the last to the first element', () => {
    const container = document.createElement('div');
    container.innerHTML = '<button id="first">First</button><button id="last">Last</button>';
    document.body.append(container);

    const trap = createFocusTrap(container);
    const last = container.querySelector<HTMLElement>('#last')!;
    last.focus();

    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    document.dispatchEvent(event);

    expect(document.activeElement?.id).toBe('first');
    trap();
  });

  it('wraps backwards from the first element', () => {
    const container = document.createElement('div');
    container.innerHTML = '<button id="first">First</button><button id="last">Last</button>';
    document.body.append(container);

    const trap = createFocusTrap(container);
    const first = container.querySelector<HTMLElement>('#first')!;
    first.focus();

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }),
    );

    expect(document.activeElement?.id).toBe('last');
    trap();
  });
});

describe('lockBodyScroll', () => {
  it('reference counts locks and restores the previous overflow', () => {
    const releaseFirst = lockBodyScroll();
    const releaseSecond = lockBodyScroll();
    expect(document.body.style.overflow).toBe('hidden');

    releaseFirst();
    expect(document.body.style.overflow).toBe('hidden');

    releaseSecond();
    expect(document.body.style.overflow).toBe('');
  });
});

describe('onEscape', () => {
  it('invokes the handler for Escape and stops after cleanup', () => {
    const handler = vi.fn();
    const cleanup = onEscape(handler);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(handler).toHaveBeenCalledTimes(1);

    cleanup();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
