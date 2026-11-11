import { computed, Directive, input } from '@angular/core';
import { buttonVariants, type ButtonSize, type ButtonVariant } from '@open-components/core/button';
import { cn } from '@open-components/utils';

/**
 * `<button ocButton variant="outline" size="sm">` — idiomatic Angular
 * attribute directive applied to a native element.
 */
@Directive({
  selector: 'button[ocButton], a[ocButton]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': '"button"',
  },
})
export class OcButton {
  readonly variant = input<ButtonVariant>('default');
  readonly size = input<ButtonSize>('default');

  protected readonly classes = computed(() =>
    cn(buttonVariants({ variant: this.variant(), size: this.size() })),
  );
}
