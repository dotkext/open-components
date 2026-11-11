import { html } from 'lit';
import { badgeVariants, type BadgeVariant } from '@open-components/core/badge';
import { OcElement } from '../base';

export class OcBadge extends OcElement {
  static properties = {
    variant: { type: String, reflect: true },
  };

  variant: BadgeVariant = 'default';

  protected override variantClasses(): string {
    return badgeVariants({ variant: this.variant });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'badge');
  }

  protected override render() {
    return html``;
  }
}

if (!customElements.get('oc-badge')) {
  customElements.define('oc-badge', OcBadge);
}
