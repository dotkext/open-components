import { html } from 'lit';
import {
  cardActionClass,
  cardClass,
  cardContentClass,
  cardDescriptionClass,
  cardFooterClass,
  cardHeaderClass,
  cardTitleClass,
} from '@open-components/core/card';
import { OcElement } from '../base';

abstract class OcCardPart extends OcElement {
  protected slotName: string = 'card';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', this.slotName);
  }

  protected override render() {
    return html``;
  }
}

export class OcCard extends OcCardPart {
  protected override slotName = 'card';
  protected override variantClasses(): string {
    return cardClass;
  }
}

export class OcCardHeader extends OcCardPart {
  protected override slotName = 'card-header';
  protected override variantClasses(): string {
    return cardHeaderClass;
  }
}

export class OcCardTitle extends OcCardPart {
  protected override slotName = 'card-title';
  protected override variantClasses(): string {
    return cardTitleClass;
  }
}

export class OcCardDescription extends OcCardPart {
  protected override slotName = 'card-description';
  protected override variantClasses(): string {
    return cardDescriptionClass;
  }
}

export class OcCardContent extends OcCardPart {
  protected override slotName = 'card-content';
  protected override variantClasses(): string {
    return cardContentClass;
  }
}

export class OcCardFooter extends OcCardPart {
  protected override slotName = 'card-footer';
  protected override variantClasses(): string {
    return cardFooterClass;
  }
}

export class OcCardAction extends OcCardPart {
  protected override slotName = 'card-action';
  protected override variantClasses(): string {
    return cardActionClass;
  }
}

const definitions: Array<[string, CustomElementConstructor]> = [
  ['oc-card', OcCard],
  ['oc-card-header', OcCardHeader],
  ['oc-card-title', OcCardTitle],
  ['oc-card-description', OcCardDescription],
  ['oc-card-content', OcCardContent],
  ['oc-card-footer', OcCardFooter],
  ['oc-card-action', OcCardAction],
];

for (const [tag, constructor] of definitions) {
  if (!customElements.get(tag)) {
    customElements.define(tag, constructor);
  }
}
