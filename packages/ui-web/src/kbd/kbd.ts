import { html } from 'lit';
import { kbdClass } from '@open-components/core/kbd';
import { OcElement } from '../base';

/** `<oc-kbd>` — keyboard keycap. */
export class OcKbd extends OcElement {
  protected override variantClasses(): string {
    return kbdClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'kbd');
  }

  protected override render() {
    return html``;
  }
}

if (!customElements.get('oc-kbd')) {
  customElements.define('oc-kbd', OcKbd);
}
