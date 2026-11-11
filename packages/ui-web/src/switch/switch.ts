import { html } from 'lit';
import { switchVariants, type SwitchSize } from '@open-components/core/switch';
import { OcElement } from '../base';

/**
 * `<oc-switch>` — toggle control with `role="switch"` on the host.
 *
 * Emits `oc-change` (`CustomEvent<{ checked: boolean }>`) when toggled.
 */
export class OcSwitch extends OcElement {
  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    size: { type: String, reflect: true },
  };

  checked = false;
  disabled = false;
  size: SwitchSize = 'default';

  protected override variantClasses(): string {
    return switchVariants({ size: this.size });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'switch');
    this.setAttribute('data-slot', 'switch');
    this.addEventListener('click', this.onClick);
    this.addEventListener('keydown', this.onKeydown);
    this.syncState();
  }

  override disconnectedCallback(): void {
    this.removeEventListener('click', this.onClick);
    this.removeEventListener('keydown', this.onKeydown);
    super.disconnectedCallback();
  }

  protected override updated(): void {
    super.updated();
    this.syncState();
  }

  /** Toggle the switch (respects `disabled`). */
  toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.syncState();
    this.dispatchEvent(
      new CustomEvent('oc-change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private syncState(): void {
    this.setAttribute('data-state', this.checked ? 'checked' : 'unchecked');
    this.setAttribute('aria-checked', String(this.checked));
    this.setAttribute('aria-disabled', String(this.disabled));
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
  }

  private readonly onClick = (): void => {
    this.toggle();
  };

  private readonly onKeydown = (event: KeyboardEvent): void => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  };

  protected override render() {
    return html``;
  }
}

if (!customElements.get('oc-switch')) {
  customElements.define('oc-switch', OcSwitch);
}
