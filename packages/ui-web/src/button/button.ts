import { html, nothing } from 'lit';
import { buttonVariants, type ButtonSize, type ButtonVariant } from '@open-components/core/button';
import { OcElement } from '../base';

/**
 * `<oc-button>` — light-DOM custom element styled with the shared CVA variants.
 *
 * Uses `role="button"` semantics on the host so Tailwind utilities apply
 * directly. Native form submission is not supported; prefer the React or
 * Angular renderers when you need a real `<button>`.
 */
export class OcButton extends OcElement {
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
    this.setAttribute('role', 'button');
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    }
    this.addEventListener('keydown', this.onKeydown);
    this.addEventListener('click', this.onClick, true);
    this.updateAccessibility();
  }

  override disconnectedCallback(): void {
    this.removeEventListener('keydown', this.onKeydown);
    this.removeEventListener('click', this.onClick, true);
    super.disconnectedCallback();
  }

  protected override updated(): void {
    super.updated();
    this.updateAccessibility();
  }

  private updateAccessibility(): void {
    this.setAttribute('aria-disabled', String(this.disabled));
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
  }

  private readonly onClick = (event: MouseEvent): void => {
    if (!this.disabled) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  private readonly onKeydown = (event: KeyboardEvent): void => {
    if (this.disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.click();
    }
  };

  protected override render() {
    return html`${nothing}`;
  }
}

if (!customElements.get('oc-button')) {
  customElements.define('oc-button', OcButton);
}
