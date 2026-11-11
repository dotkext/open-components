import { html } from 'lit';
import { segmentedControlClass, segmentedItemClass } from '@open-components/core/segmented-control';
import { OcElement } from '../base';
import { OcActionElement } from '../interactive';

let segmentedCounter = 0;

/**
 * `<oc-segmented-control value="...">` with `<oc-segment value="...">` children.
 * Emits `oc-value-change` on selection.
 */
export class OcSegmentedControl extends OcElement {
  static properties = {
    value: { type: String, reflect: true },
  };

  value = '';

  private readonly baseId = `oc-segmented-${segmentedCounter++}`;

  protected override variantClasses(): string {
    return segmentedControlClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'segmented-control');
    this.setAttribute('role', 'group');
    this.addEventListener('click', this.onClick);
    this.addEventListener('keydown', this.onKeydown);
    this.sync();
  }

  override disconnectedCallback(): void {
    this.removeEventListener('click', this.onClick);
    this.removeEventListener('keydown', this.onKeydown);
    super.disconnectedCallback();
  }

  protected override updated(): void {
    super.updated();
    this.sync();
  }

  private get segments(): HTMLElement[] {
    return Array.from(this.querySelectorAll<HTMLElement>('oc-segment'));
  }

  private sync(): void {
    for (const segment of this.segments) {
      const value = segment.getAttribute('value') ?? '';
      const active = value === this.value;
      segment.id ||= `${this.baseId}-${value}`;
      segment.setAttribute('data-state', active ? 'active' : 'inactive');
      segment.setAttribute('aria-pressed', String(active));
    }
  }

  private select(value: string): void {
    if (!value || value === this.value) return;
    this.value = value;
    this.sync();
    this.dispatchEvent(
      new CustomEvent('oc-value-change', {
        detail: { value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private readonly onClick = (event: MouseEvent): void => {
    const segment = (event.target as Element | null)?.closest('oc-segment');
    if (!segment || !this.contains(segment)) return;
    this.select(segment.getAttribute('value') ?? '');
  };

  private readonly onKeydown = (event: KeyboardEvent): void => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const segments = this.segments;
    const activeIndex = segments.indexOf(document.activeElement as HTMLElement);
    if (activeIndex === -1) return;

    event.preventDefault();
    let nextIndex = activeIndex;
    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = segments.length - 1;
    else if (event.key === 'ArrowLeft')
      nextIndex = (activeIndex - 1 + segments.length) % segments.length;
    else nextIndex = (activeIndex + 1) % segments.length;

    const next = segments[nextIndex];
    next?.focus();
    this.select(next?.getAttribute('value') ?? '');
  };

  protected override render() {
    return html``;
  }
}

export class OcSegment extends OcActionElement {
  static properties = {
    value: { type: String, reflect: true },
  };

  value = '';
  disabled = false;

  protected override variantClasses(): string {
    return segmentedItemClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'segmented-control-item');
  }

  protected override render() {
    return html``;
  }
}

const definitions: Array<[string, CustomElementConstructor]> = [
  ['oc-segmented-control', OcSegmentedControl],
  ['oc-segment', OcSegment],
];

for (const [tag, constructor] of definitions) {
  if (!customElements.get(tag)) {
    customElements.define(tag, constructor);
  }
}
