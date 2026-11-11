// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getNextTabIndex } from './tabs/behavior';
import { focusMenuItem, getMenuItems, onPointerDownOutside } from './dropdown-menu/behavior';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('getNextTabIndex', () => {
  it('wraps horizontally', () => {
    expect(getNextTabIndex('ArrowRight', 2, 3)).toBe(0);
    expect(getNextTabIndex('ArrowLeft', 0, 3)).toBe(2);
  });

  it('uses the arrow keys for the orientation', () => {
    expect(getNextTabIndex('ArrowDown', 0, 3, 'vertical')).toBe(1);
    expect(getNextTabIndex('ArrowRight', 0, 3, 'vertical')).toBeNull();
  });

  it('supports Home and End', () => {
    expect(getNextTabIndex('Home', 2, 3)).toBe(0);
    expect(getNextTabIndex('End', 0, 3)).toBe(2);
  });

  it('ignores unrelated keys and empty groups', () => {
    expect(getNextTabIndex('Enter', 0, 3)).toBeNull();
    expect(getNextTabIndex('ArrowRight', 0, 0)).toBeNull();
  });
});

describe('dropdown menu behavior', () => {
  function createMenu() {
    const menu = document.createElement('div');
    menu.innerHTML = `
      <div role="menuitem" id="one" tabindex="-1">One</div>
      <div role="menuitem" id="two" tabindex="-1">Two</div>
      <div role="menuitem" id="disabled" aria-disabled="true" tabindex="-1">Disabled</div>
    `;
    document.body.append(menu);
    return menu;
  }

  it('only returns enabled menu items', () => {
    const menu = createMenu();
    expect(getMenuItems(menu).map((item) => item.id)).toEqual(['one', 'two']);
  });

  it('focuses items and wraps indices', () => {
    const menu = createMenu();
    focusMenuItem(menu, 0);
    expect(document.activeElement?.id).toBe('one');
    focusMenuItem(menu, 2);
    expect(document.activeElement?.id).toBe('one');
    focusMenuItem(menu, -1);
    expect(document.activeElement?.id).toBe('two');
  });

  it('notifies on outside pointer presses only', () => {
    const menu = createMenu();
    const handler = vi.fn();
    const cleanup = onPointerDownOutside(menu, handler);

    menu.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(handler).not.toHaveBeenCalled();

    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);

    cleanup();
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
