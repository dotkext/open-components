import { html } from 'lit';
import { focusMenuItem, onPointerDownOutside } from '@open-components/core/dropdown-menu/behavior';
import {
  dropdownContentClass,
  dropdownItemClass,
  dropdownLabelClass,
  dropdownSeparatorClass,
  dropdownTriggerClass,
} from '@open-components/core/dropdown-menu';
import { OcElement } from '../base';
import { OcActionElement } from '../interactive';

let menusCounter = 0;

/**
 * `<oc-dropdown-menu>` — coordinates a trigger and a floating menu.
 * Selecting an item emits `oc-select`; opening/closing emits `oc-open-change`.
 */
export class OcDropdownMenu extends OcElement {
  static properties = {
    open: { type: Boolean, reflect: true },
  };

  open = false;

  private readonly baseId = `oc-dropdown-${menusCounter++}`;
  private wasOpen = false;
  private outsideCleanup?: () => void;

  protected override variantClasses(): string {
    return 'relative inline-block';
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'dropdown-menu');
    this.addEventListener('click', this.onClick);
    this.addEventListener('keydown', this.onKeydown);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('click', this.onClick);
    this.removeEventListener('keydown', this.onKeydown);
    this.deactivate();
    super.disconnectedCallback();
  }

  protected override updated(): void {
    super.updated();
    this.setAttribute('data-state', this.open ? 'open' : 'closed');
    this.sync();

    if (this.open && !this.wasOpen) {
      this.activate();
    } else if (!this.open && this.wasOpen) {
      this.deactivate();
    }
    this.wasOpen = this.open;
  }

  private get trigger(): HTMLElement | null {
    return this.querySelector<HTMLElement>('oc-dropdown-trigger');
  }

  private get content(): HTMLElement | null {
    return this.querySelector<HTMLElement>('oc-dropdown-content');
  }

  private sync(): void {
    const trigger = this.trigger;
    const content = this.content;
    if (!content) return;

    content.id ||= `${this.baseId}-menu`;
    trigger?.setAttribute('aria-haspopup', 'menu');
    trigger?.setAttribute('aria-expanded', String(this.open));
    trigger?.setAttribute('aria-controls', content.id);
    trigger?.setAttribute('data-state', this.open ? 'open' : 'closed');
    content.setAttribute('role', 'menu');
    content.setAttribute('data-state', this.open ? 'open' : 'closed');
    content.hidden = !this.open;
  }

  private activate(): void {
    const content = this.content;
    if (!content) return;
    focusMenuItem(content, 0);
    this.outsideCleanup = onPointerDownOutside(this, () => this.close());
  }

  private deactivate(): void {
    this.outsideCleanup?.();
    this.outsideCleanup = undefined;
  }

  close(): void {
    if (!this.open) return;
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('oc-open-change', {
        detail: { open: false },
        bubbles: true,
        composed: true,
      }),
    );
    this.trigger?.focus();
  }

  private readonly onClick = (event: MouseEvent): void => {
    const target = event.target as Element | null;
    if (!target) return;

    if (target.closest('oc-dropdown-trigger')) {
      this.open = !this.open;
      this.dispatchEvent(
        new CustomEvent('oc-open-change', {
          detail: { open: this.open },
          bubbles: true,
          composed: true,
        }),
      );
      return;
    }

    const item = target.closest('oc-dropdown-item');
    if (item && this.contains(item)) {
      const value = item.getAttribute('value') ?? '';
      this.dispatchEvent(
        new CustomEvent('oc-select', {
          detail: { value },
          bubbles: true,
          composed: true,
        }),
      );
      this.close();
    }
  };

  private readonly onKeydown = (event: KeyboardEvent): void => {
    if (!this.open) return;
    const content = this.content;
    if (!content) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      return;
    }

    if (event.key === 'Tab') {
      this.close();
      return;
    }

    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;

    const items = Array.from(
      content.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])'),
    );
    if (items.length === 0) return;

    event.preventDefault();
    const activeIndex = items.indexOf(document.activeElement as HTMLElement);

    if (event.key === 'Home') {
      focusMenuItem(content, 0);
    } else if (event.key === 'End') {
      focusMenuItem(content, items.length - 1);
    } else if (event.key === 'ArrowDown') {
      focusMenuItem(content, activeIndex + 1);
    } else {
      focusMenuItem(content, activeIndex - 1);
    }
  };

  protected override render() {
    return html``;
  }
}

export class OcDropdownTrigger extends OcActionElement {
  disabled = false;

  protected override variantClasses(): string {
    return dropdownTriggerClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'dropdown-trigger');
  }

  protected override render() {
    return html``;
  }
}

export class OcDropdownContent extends OcElement {
  protected override variantClasses(): string {
    return dropdownContentClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'dropdown-content');
    this.setAttribute('role', 'menu');
  }

  protected override render() {
    return html``;
  }
}

export class OcDropdownItem extends OcElement {
  static properties = {
    value: { type: String, reflect: true },
  };

  value = '';

  protected override variantClasses(): string {
    return dropdownItemClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'dropdown-item');
    this.setAttribute('role', 'menuitem');
    this.setAttribute('tabindex', '-1');
    this.addEventListener('keydown', this.onKeydown);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('keydown', this.onKeydown);
    super.disconnectedCallback();
  }

  private readonly onKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.click();
    }
  };

  protected override render() {
    return html``;
  }
}

export class OcDropdownLabel extends OcElement {
  protected override variantClasses(): string {
    return dropdownLabelClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'dropdown-label');
  }

  protected override render() {
    return html``;
  }
}

export class OcDropdownSeparator extends OcElement {
  protected override variantClasses(): string {
    return dropdownSeparatorClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'dropdown-separator');
    this.setAttribute('role', 'separator');
  }

  protected override render() {
    return html``;
  }
}

const definitions: Array<[string, CustomElementConstructor]> = [
  ['oc-dropdown-menu', OcDropdownMenu],
  ['oc-dropdown-trigger', OcDropdownTrigger],
  ['oc-dropdown-content', OcDropdownContent],
  ['oc-dropdown-item', OcDropdownItem],
  ['oc-dropdown-label', OcDropdownLabel],
  ['oc-dropdown-separator', OcDropdownSeparator],
];

for (const [tag, constructor] of definitions) {
  if (!customElements.get(tag)) {
    customElements.define(tag, constructor);
  }
}
