import { html } from 'lit';
import { getNextTabIndex } from '@open-components/core/tabs/behavior';
import { tabsContentClass, tabsListClass, tabsTriggerClass } from '@open-components/core/tabs';
import { OcElement } from '../base';

let tabsCounter = 0;

/**
 * `<oc-tabs value="...">` — coordinates `<oc-tab-list>`, `<oc-tab>` and
 * `<oc-tab-panel>` descendants. Selecting a tab emits `oc-value-change`.
 */
export class OcTabs extends OcElement {
  static properties = {
    value: { type: String, reflect: true },
  };

  value = '';

  private readonly baseId = `oc-tabs-${tabsCounter++}`;
  private childObserver?: MutationObserver;

  protected override variantClasses(): string {
    return 'block';
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'tabs');
    this.addEventListener('click', this.onClick);
    this.addEventListener('keydown', this.onKeydown);
    this.childObserver = new MutationObserver(() => this.sync());
    this.childObserver.observe(this, { childList: true, subtree: true });
    this.sync();
  }

  override disconnectedCallback(): void {
    this.removeEventListener('click', this.onClick);
    this.removeEventListener('keydown', this.onKeydown);
    this.childObserver?.disconnect();
    this.childObserver = undefined;
    super.disconnectedCallback();
  }

  protected override updated(): void {
    super.updated();
    this.sync();
  }

  private get tabs(): HTMLElement[] {
    return Array.from(this.querySelectorAll<HTMLElement>('oc-tab'));
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

  private sync(): void {
    const tabs = this.tabs;
    const panels = Array.from(this.querySelectorAll<HTMLElement>('oc-tab-panel'));

    for (const tab of tabs) {
      const value = tab.getAttribute('value') ?? '';
      const active = value === this.value;
      tab.id = `${this.baseId}-trigger-${value}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', `${this.baseId}-panel-${value}`);
      tab.setAttribute('aria-selected', String(active));
      tab.setAttribute('data-state', active ? 'active' : 'inactive');
      tab.setAttribute('tabindex', active ? '0' : '-1');
    }

    for (const panel of panels) {
      const value = panel.getAttribute('value') ?? '';
      const active = value === this.value;
      panel.id = `${this.baseId}-panel-${value}`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `${this.baseId}-trigger-${value}`);
      panel.setAttribute('data-state', active ? 'active' : 'inactive');
      panel.hidden = !active;
    }
  }

  private readonly onClick = (event: MouseEvent): void => {
    const tab = (event.target as Element | null)?.closest('oc-tab');
    if (!tab || !this.contains(tab)) return;
    this.select(tab.getAttribute('value') ?? '');
  };

  private readonly onKeydown = (event: KeyboardEvent): void => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    const tabs = this.tabs;
    const activeIndex = tabs.indexOf(document.activeElement as HTMLElement);
    if (activeIndex === -1) return;

    const nextIndex = getNextTabIndex(event.key, activeIndex, tabs.length, 'horizontal');
    if (nextIndex === null) return;

    event.preventDefault();
    const next = tabs[nextIndex];
    next?.focus();
    this.select(next?.getAttribute('value') ?? '');
  };

  protected override render() {
    return html``;
  }
}

export class OcTabList extends OcElement {
  protected override variantClasses(): string {
    return tabsListClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'tabs-list');
    this.setAttribute('role', 'tablist');
    this.setAttribute('aria-orientation', 'horizontal');
  }

  protected override render() {
    return html``;
  }
}

export class OcTab extends OcElement {
  static properties = {
    value: { type: String, reflect: true },
  };

  value = '';

  protected override variantClasses(): string {
    return tabsTriggerClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'tabs-trigger');
  }

  protected override render() {
    return html``;
  }
}

export class OcTabPanel extends OcElement {
  static properties = {
    value: { type: String, reflect: true },
  };

  value = '';

  protected override variantClasses(): string {
    return tabsContentClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'tabs-content');
  }

  protected override render() {
    return html``;
  }
}

const definitions: Array<[string, CustomElementConstructor]> = [
  ['oc-tabs', OcTabs],
  ['oc-tab-list', OcTabList],
  ['oc-tab', OcTab],
  ['oc-tab-panel', OcTabPanel],
];

for (const [tag, constructor] of definitions) {
  if (!customElements.get(tag)) {
    customElements.define(tag, constructor);
  }
}
