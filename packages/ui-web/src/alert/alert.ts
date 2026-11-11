import { html } from 'lit';
import {
  alertDescriptionClass,
  alertTitleClass,
  alertVariants,
  type AlertVariant,
} from '@open-components/core/alert';
import { OcElement } from '../base';

export class OcAlert extends OcElement {
  static properties = {
    variant: { type: String, reflect: true },
  };

  variant: AlertVariant = 'default';

  protected override variantClasses(): string {
    return alertVariants({ variant: this.variant });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'alert');
    this.setAttribute('role', 'alert');
  }

  protected override render() {
    return html``;
  }
}

export class OcAlertTitle extends OcElement {
  protected override variantClasses(): string {
    return alertTitleClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'alert-title');
  }

  protected override render() {
    return html``;
  }
}

export class OcAlertDescription extends OcElement {
  protected override variantClasses(): string {
    return alertDescriptionClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'alert-description');
  }

  protected override render() {
    return html``;
  }
}

const definitions: Array<[string, CustomElementConstructor]> = [
  ['oc-alert', OcAlert],
  ['oc-alert-title', OcAlertTitle],
  ['oc-alert-description', OcAlertDescription],
];

for (const [tag, constructor] of definitions) {
  if (!customElements.get(tag)) {
    customElements.define(tag, constructor);
  }
}
