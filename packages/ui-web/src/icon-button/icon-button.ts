import { html } from 'lit';
import {
  iconButtonVariants,
  type IconButtonSize,
  type IconButtonVariant,
} from '@open-components/core/icon-button';
import { OcActionElement } from '../interactive';

/**
 * `<oc-icon-button>` — an icon-only control. Consumers must provide an
 * accessible name (`aria-label`) and icon content.
 */
export class OcIconButton extends OcActionElement {
  static properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
  };

  variant: IconButtonVariant = 'ghost';
  size: IconButtonSize = 'default';
  disabled = false;

  protected override variantClasses(): string {
    return iconButtonVariants({ variant: this.variant, size: this.size });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'icon-button');
  }

  protected override render() {
    return html``;
  }
}

if (!customElements.get('oc-icon-button')) {
  customElements.define('oc-icon-button', OcIconButton);
}
