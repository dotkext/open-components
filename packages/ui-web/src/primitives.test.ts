import { describe, expect, it, vi } from 'vitest';
import './icon-button/icon-button';
import './kbd/kbd';
import './progress/progress';
import './sheet/sheet';
import './switch/switch';
import './text-link/text-link';

type OcTestElement = HTMLElement & { updateComplete: Promise<boolean> };

const create = (tag: string): OcTestElement => document.createElement(tag) as OcTestElement;

describe('oc-switch', () => {
  it('toggles, reflects state and emits oc-change', async () => {
    const control = create('oc-switch');
    document.body.append(control);
    await control.updateComplete;

    const listener = vi.fn();
    control.addEventListener('oc-change', listener);

    expect(control.getAttribute('role')).toBe('switch');
    expect(control.getAttribute('aria-checked')).toBe('false');
    expect(control.getAttribute('data-state')).toBe('unchecked');

    control.click();
    await control.updateComplete;

    expect(control.getAttribute('aria-checked')).toBe('true');
    expect(control.getAttribute('data-state')).toBe('checked');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('supports the sm size and disabled state', async () => {
    const control = create('oc-switch');
    control.setAttribute('size', 'sm');
    control.setAttribute('disabled', '');
    document.body.append(control);
    await control.updateComplete;

    expect(control.classList.contains('h-4')).toBe(true);
    control.click();
    expect(control.getAttribute('aria-checked')).toBe('false');
    expect(control.getAttribute('tabindex')).toBe('-1');
  });
});

describe('oc-progress', () => {
  it('exposes arithmetic and clamps values', async () => {
    const progress = create('oc-progress');
    progress.setAttribute('value', '40');
    progress.setAttribute('max', '200');
    document.body.append(progress);
    await progress.updateComplete;

    expect(progress.getAttribute('role')).toBe('progressbar');
    expect(progress.getAttribute('aria-valuenow')).toBe('40');
    expect(progress.getAttribute('aria-valuemax')).toBe('200');

    const indicator = progress.querySelector<HTMLElement>('[data-slot="progress-indicator"]');
    expect(indicator?.style.width).toBe('20%');
  });
});

describe('oc-icon-button', () => {
  it('applies variants and blocks disabled clicks', async () => {
    const button = create('oc-icon-button');
    button.setAttribute('variant', 'solid');
    document.body.append(button);
    await button.updateComplete;

    expect(button.getAttribute('role')).toBe('button');
    expect(button.classList.contains('bg-primary')).toBe(true);

    const listener = vi.fn();
    document.body.addEventListener('click', listener);
    button.setAttribute('disabled', '');
    await button.updateComplete;
    button.click();

    expect(listener).not.toHaveBeenCalled();
  });
});

describe('oc-kbd', () => {
  it('renders keycap styling on the host', async () => {
    const kbd = create('oc-kbd');
    kbd.textContent = 'Esc';
    document.body.append(kbd);
    await kbd.updateComplete;

    expect(kbd.classList.contains('font-mono')).toBe(true);
    expect(kbd.getAttribute('data-slot')).toBe('kbd');
  });
});

describe('oc-link', () => {
  it('renders a native anchor and forwards classes', async () => {
    const link = create('oc-link');
    link.setAttribute('href', '#details');
    link.setAttribute('variant', 'muted');
    link.setAttribute('class', 'font-medium');
    link.textContent = 'Details';
    document.body.append(link);
    await link.updateComplete;

    const anchor = link.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toBe('#details');
    expect(anchor?.textContent).toBe('Details');
    expect(anchor?.className).toContain('text-muted-foreground');
    expect(anchor?.className).toContain('font-medium');
  });
});

describe('oc-sheet', () => {
  it('opens from markup, closes on Escape and emits an event', async () => {
    const sheet = create('oc-sheet');
    sheet.setAttribute('open', '');
    sheet.innerHTML =
      '<oc-sheet-header><oc-sheet-title>Settings</oc-sheet-title></oc-sheet-header>';
    document.body.append(sheet);
    await sheet.updateComplete;

    expect(sheet.getAttribute('role')).toBe('dialog');
    expect(sheet.getAttribute('data-state')).toBe('open');
    expect(sheet.getAttribute('aria-hidden')).toBe('false');

    const listener = vi.fn();
    sheet.addEventListener('oc-open-change', listener);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await sheet.updateComplete;

    expect(sheet.getAttribute('data-state')).toBe('closed');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('closes when the backdrop is clicked', async () => {
    const sheet = create('oc-sheet');
    sheet.setAttribute('open', '');
    document.body.append(sheet);
    await sheet.updateComplete;

    const overlay = sheet.querySelector<HTMLElement>('[data-slot="sheet-overlay"]');
    overlay?.click();
    await sheet.updateComplete;

    expect(sheet.getAttribute('data-state')).toBe('closed');
  });

  it('closes via oc-sheet-close', async () => {
    const sheet = create('oc-sheet');
    sheet.setAttribute('open', '');
    sheet.innerHTML = '<oc-sheet-footer><oc-sheet-close>Close</oc-sheet-close></oc-sheet-footer>';
    document.body.append(sheet);
    await sheet.updateComplete;

    sheet.querySelector<HTMLElement>('oc-sheet-close')?.click();
    await sheet.updateComplete;

    expect(sheet.getAttribute('data-state')).toBe('closed');
  });
});
