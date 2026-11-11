import { computed, Directive, inject, input, model } from '@angular/core';
import { segmentedControlClass, segmentedItemClass } from '@open-components/core/segmented-control';

let segmentedCounter = 0;

@Directive({
  selector: 'div[ocSegmentedControl]',
  host: {
    '[class]': 'classes',
    role: 'group',
    '[attr.data-slot]': '"segmented-control"',
    '(keydown)': 'onKeydown($event)',
  },
})
export class OcSegmentedControl {
  readonly value = model('');
  readonly instanceId = `oc-segmented-${segmentedCounter++}`;
  protected readonly classes = segmentedControlClass;

  protected onKeydown(event: KeyboardEvent): void {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    const host = event.currentTarget as HTMLElement;
    const items = Array.from(host.querySelectorAll<HTMLElement>('button[ocSegment]'));
    const activeIndex = items.indexOf(document.activeElement as HTMLElement);
    if (activeIndex === -1) return;

    event.preventDefault();
    let nextIndex = activeIndex;
    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = items.length - 1;
    else if (event.key === 'ArrowLeft') nextIndex = (activeIndex - 1 + items.length) % items.length;
    else nextIndex = (activeIndex + 1) % items.length;

    const next = items[nextIndex];
    next?.focus();
    const value = next?.dataset['value'];
    if (value !== undefined) this.value.set(value);
  }
}

@Directive({
  selector: 'button[ocSegment]',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"segmented-control-item"',
    '[attr.data-value]': 'value()',
    '[attr.data-state]': 'active() ? "active" : "inactive"',
    '[attr.aria-pressed]': 'active()',
    '(click)': 'select()',
  },
})
export class OcSegment {
  readonly value = input.required<string>();
  protected readonly control = inject(OcSegmentedControl);
  protected readonly classes = segmentedItemClass;
  protected readonly active = computed(() => this.control.value() === this.value());

  protected select(): void {
    this.control.value.set(this.value());
  }
}
