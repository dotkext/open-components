import { html } from 'lit';
import { separatorVariants, type SeparatorOrientation } from '@open-components/core/separator';
import { OcElement } from '../base';

export class OcSeparator extends OcElement {
  static properties = {
    orientation: { type: String, reflect: true },
  };

  orientation: SeparatorOrientation = 'horizontal';

  protected override variantClasses(): string {
    return separatorVariants({ orientation: this.orientation });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'separator');
    this.setAttribute('role', 'separator');
    this.setAttribute('aria-orientation', this.orientation);
  }

  protected override updated(): void {
    super.updated();
    this.setAttribute('aria-orientation', this.orientation);
  }

  protected override render() {
    return html``;
  }
}

if (!customElements.get('oc-separator')) {
  customElements.define('oc-separator', OcSeparator);
}
