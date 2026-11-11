import { html } from 'lit';
import {
  collapsibleContentClass,
  collapsibleTriggerClass,
} from '@open-components/core/collapsible';
import { OcElement } from '../base';
import { OcActionElement } from '../interactive';

/**
 * `<oc-collapsible>` — disclosure container. Toggles when a descendant
 * `<oc-collapsible-trigger>` is activated and emits `oc-open-change`.
 */
export class OcCollapsible extends OcElement {
  static properties = {
    open: { type: Boolean, reflect: true },
  };

  open = false;

  private contentId = '';

  protected override variantClasses(): string {
    return 'block';
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'collapsible');
    this.addEventListener('click', this.onClick);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('click', this.onClick);
    super.disconnectedCallback();
  }

  protected override updated(): void {
    super.updated();
    this.sync();
  }

  private sync(): void {
    const trigger = this.querySelector<HTMLElement>('oc-collapsible-trigger');
    const content = this.querySelector<HTMLElement>('oc-collapsible-content');
    if (!content) return;

    if (!content.id) {
      content.id = `oc-collapsible-content-${Math.random().toString(36).slice(2, 9)}`;
    }
    this.contentId = content.id;

    trigger?.setAttribute('aria-expanded', String(this.open));
    trigger?.setAttribute('aria-controls', this.contentId);
    trigger?.setAttribute('data-state', this.open ? 'open' : 'closed');
    content.hidden = !this.open;
    content.setAttribute('data-state', this.open ? 'open' : 'closed');
    this.setAttribute('data-state', this.open ? 'open' : 'closed');
  }

  private readonly onClick = (event: MouseEvent): void => {
    const trigger = (event.target as Element | null)?.closest('oc-collapsible-trigger');
    if (!trigger || !this.contains(trigger)) return;
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('oc-open-change', {
        detail: { open: this.open },
        bubbles: true,
        composed: true,
      }),
    );
  };

  protected override render() {
    return html``;
  }
}

export class OcCollapsibleTrigger extends OcActionElement {
  disabled = false;

  protected override variantClasses(): string {
    return collapsibleTriggerClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'collapsible-trigger');
  }

  protected override render() {
    return html``;
  }
}

export class OcCollapsibleContent extends OcElement {
  protected override variantClasses(): string {
    return collapsibleContentClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'collapsible-content');
  }

  protected override render() {
    return html``;
  }
}

const definitions: Array<[string, CustomElementConstructor]> = [
  ['oc-collapsible', OcCollapsible],
  ['oc-collapsible-trigger', OcCollapsibleTrigger],
  ['oc-collapsible-content', OcCollapsibleContent],
];

for (const [tag, constructor] of definitions) {
  if (!customElements.get(tag)) {
    customElements.define(tag, constructor);
  }
}
