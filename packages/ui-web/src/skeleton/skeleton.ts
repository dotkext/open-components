import { html } from 'lit';
import { skeletonClass } from '@open-components/core/skeleton';
import { OcElement } from '../base';

export class OcSkeleton extends OcElement {
  protected override variantClasses(): string {
    return skeletonClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'skeleton');
    this.setAttribute('aria-hidden', 'true');
  }

  protected override render() {
    return html``;
  }
}

if (!customElements.get('oc-skeleton')) {
  customElements.define('oc-skeleton', OcSkeleton);
}
