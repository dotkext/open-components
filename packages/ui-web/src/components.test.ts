import { describe, expect, it, vi } from 'vitest';
import './button/button';
import './badge/badge';
import './alert/alert';
import './input/input';
import './separator/separator';
import './label/label';

type OcTestElement = HTMLElement & { updateComplete: Promise<boolean> };

const create = (tag: string): OcTestElement => document.createElement(tag) as OcTestElement;

describe('oc-button', () => {
  it('applies the default variant classes to the host', async () => {
    const button = create('oc-button');
    button.textContent = 'Save';
    document.body.append(button);
    await button.updateComplete;

    expect(button.classList.contains('bg-primary')).toBe(true);
    expect(button.classList.contains('h-9')).toBe(true);
    expect(button.getAttribute('role')).toBe('button');
    expect(button.getAttribute('tabindex')).toBe('0');
  });

  it('merges consumer classes and resolves conflicts', async () => {
    const button = create('oc-button');
    button.className = 'bg-red-500 mt-4';
    document.body.append(button);
    await button.updateComplete;

    expect(button.classList.contains('bg-red-500')).toBe(true);
    expect(button.classList.contains('mt-4')).toBe(true);
    expect(button.classList.contains('bg-primary')).toBe(false);
  });

  it('updates classes when the variant changes', async () => {
    const button = create('oc-button');
    button.setAttribute('variant', 'outline');
    document.body.append(button);
    await button.updateComplete;

    expect(button.classList.contains('bg-background')).toBe(true);
    expect(button.classList.contains('bg-primary')).toBe(false);
  });

  it('reflects disabled state and blocks clicks', async () => {
    const button = create('oc-button');
    button.setAttribute('disabled', '');
    document.body.append(button);
    await button.updateComplete;

    const listener = vi.fn();
    document.body.addEventListener('click', listener);
    button.click();

    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.getAttribute('tabindex')).toBe('-1');
    expect(listener).not.toHaveBeenCalled();
  });
});

describe('oc-badge', () => {
  it('applies variants', async () => {
    const badge = create('oc-badge');
    badge.setAttribute('variant', 'secondary');
    document.body.append(badge);
    await badge.updateComplete;

    expect(badge.classList.contains('bg-secondary')).toBe(true);
  });
});

describe('oc-alert', () => {
  it('exposes alert semantics and destructive variant', async () => {
    const alert = create('oc-alert');
    alert.setAttribute('variant', 'destructive');
    document.body.append(alert);
    await alert.updateComplete;

    expect(alert.getAttribute('role')).toBe('alert');
    expect(alert.classList.contains('text-destructive')).toBe(true);
  });
});

describe('oc-input', () => {
  it('renders a native input and forwards consumer classes', async () => {
    const input = create('oc-input');
    input.setAttribute('class', 'w-1/2');
    input.setAttribute('placeholder', 'you@example.com');
    document.body.append(input);
    await input.updateComplete;

    const native = input.querySelector('input');
    expect(native).not.toBeNull();
    expect(native?.className).toContain('h-9');
    expect(native?.className).toContain('w-1/2');
    expect(native?.getAttribute('placeholder')).toBe('you@example.com');
  });
});

describe('oc-separator', () => {
  it('sets orientation semantics', async () => {
    const separator = create('oc-separator');
    separator.setAttribute('orientation', 'vertical');
    document.body.append(separator);
    await separator.updateComplete;

    expect(separator.getAttribute('aria-orientation')).toBe('vertical');
    expect(separator.classList.contains('w-px')).toBe(true);
  });
});
