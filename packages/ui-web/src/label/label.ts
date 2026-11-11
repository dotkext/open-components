import { html } from 'lit';
import { labelClass } from '@open-components/core/label';
import { OcElement } from '../base';

/**
 * `<oc-label>` — visually a label; clicking focuses the element referenced by
 * the `for` attribute. Form association of custom elements is not available,
 * so prefer the React/Angular renderers when native `<label>` semantics matter.
 */
export class OcLabel extends OcElement {
  static properties = {
    htmlFor: { type: String, attribute: 'for' },
  };

  htmlFor = '';

  protected override variantClasses(): string {
    return labelClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'label');
    this.addEventListener('click', this.onClick);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('click', this.onClick);
    super.disconnectedCallback();
  }

  private readonly onClick = (): void => {
    const target = this.htmlFor || this.getAttribute('for');
    if (!target) return;
    const element = document.getElementById(target);
    element?.focus();
    element?.click();
  };

  protected override render() {
    return html``;
  }
}

if (!customElements.get('oc-label')) {
  customElements.define('oc-label', OcLabel);
}
