import { html } from 'lit';
import { buttonVariants, type ButtonSize, type ButtonVariant } from '@open-components/core/button';
import { OcActionElement } from '../interactive';

/**
 * `<oc-button>` — light-DOM custom element styled with the shared CVA variants.
 *
 * Uses `role="button"` semantics on the host so Tailwind utilities apply
 * directly. Native form submission is not supported; prefer the React or
 * Angular renderers when you need a real `<button>`.
 */
export class OcButton extends OcActionElement {
  static properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
  };

  variant: ButtonVariant = 'default';
  size: ButtonSize = 'default';
  disabled = false;

  protected override variantClasses(): string {
    return buttonVariants({ variant: this.variant, size: this.size });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'button');
  }

  protected override render() {
    return html``;
  }
}

if (!customElements.get('oc-button')) {
  customElements.define('oc-button', OcButton);
}
