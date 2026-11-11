import { computed, Directive, inject, input, model } from '@angular/core';
import { getNextTabIndex } from '@open-components/core/tabs/behavior';
import { tabsContentClass, tabsListClass, tabsTriggerClass } from '@open-components/core/tabs';

let tabsCounter = 0;

@Directive({
  selector: 'div[ocTabs]',
  host: {
    class: 'block',
    '[attr.data-slot]': '"tabs"',
  },
})
export class OcTabs {
  readonly value = model('');
  readonly instanceId = `oc-tabs-${tabsCounter++}`;
}

@Directive({
  selector: 'div[ocTabList]',
  host: {
    '[class]': 'classes',
    role: 'tablist',
    'aria-orientation': 'horizontal',
    '[attr.data-slot]': '"tabs-list"',
    '(keydown)': 'onKeydown($event)',
  },
})
export class OcTabList {
  protected readonly tabs = inject(OcTabs);
  protected readonly classes = tabsListClass;

  protected onKeydown(event: KeyboardEvent): void {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    const items = Array.from(
      (event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role="tab"]'),
    );
    const activeIndex = items.indexOf(document.activeElement as HTMLElement);
    if (activeIndex === -1) return;

    const nextIndex = getNextTabIndex(event.key, activeIndex, items.length, 'horizontal');
    if (nextIndex === null) return;

    event.preventDefault();
    const next = items[nextIndex];
    next?.focus();
    const value = next?.dataset['value'];
    if (value !== undefined) this.tabs.value.set(value);
  }
}

@Directive({
  selector: 'button[ocTab]',
  host: {
    role: 'tab',
    '[class]': 'classes',
    '[attr.id]': 'triggerId()',
    '[attr.aria-controls]': 'panelId()',
    '[attr.aria-selected]': 'active()',
    '[attr.data-state]': 'active() ? "active" : "inactive"',
    '[attr.data-value]': 'value()',
    '[attr.data-slot]': '"tabs-trigger"',
    '[attr.tabindex]': 'active() ? 0 : -1',
    '(click)': 'select()',
  },
})
export class OcTab {
  readonly value = input.required<string>();
  protected readonly tabs = inject(OcTabs);
  protected readonly classes = tabsTriggerClass;
  protected readonly active = computed(() => this.tabs.value() === this.value());
  protected readonly triggerId = computed(() => `${this.tabs.instanceId}-trigger-${this.value()}`);
  protected readonly panelId = computed(() => `${this.tabs.instanceId}-panel-${this.value()}`);

  protected select(): void {
    this.tabs.value.set(this.value());
  }
}

@Directive({
  selector: 'div[ocTabPanel]',
  host: {
    role: 'tabpanel',
    '[class]': 'classes',
    '[attr.id]': 'panelId()',
    '[attr.aria-labelledby]': 'triggerId()',
    '[attr.data-state]': 'active() ? "active" : "inactive"',
    '[attr.data-slot]': '"tabs-content"',
    '[attr.tabindex]': '0',
    '[hidden]': '!active()',
  },
})
export class OcTabPanel {
  readonly value = input.required<string>();
  protected readonly tabs = inject(OcTabs);
  protected readonly classes = tabsContentClass;
  protected readonly active = computed(() => this.tabs.value() === this.value());
  protected readonly triggerId = computed(() => `${this.tabs.instanceId}-trigger-${this.value()}`);
  protected readonly panelId = computed(() => `${this.tabs.instanceId}-panel-${this.value()}`);
}
