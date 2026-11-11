import { computed, Directive, input, model } from '@angular/core';
import { switchVariants, type SwitchSize } from '@open-components/core/switch';
import { cn } from '@open-components/utils';

@Directive({
  selector: 'button[ocSwitch]',
  host: {
    role: 'switch',
    '[attr.aria-checked]': 'checked()',
    '[attr.data-state]': 'checked() ? "checked" : "unchecked"',
    '[class]': 'classes()',
    '[attr.data-slot]': '"switch"',
    '(click)': 'toggle()',
  },
})
export class OcSwitch {
  readonly checked = model(false);
  readonly size = input<SwitchSize>('default');

  protected readonly classes = computed(() => cn(switchVariants({ size: this.size() })));

  protected toggle(): void {
    this.checked.update((value) => !value);
  }
}
