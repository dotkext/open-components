import { computed, Directive, input } from '@angular/core';
import { badgeVariants, type BadgeVariant } from '@open-components/core/badge';
import { cn } from '@open-components/utils';

@Directive({
  selector: 'span[ocBadge]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': '"badge"',
  },
})
export class OcBadge {
  readonly variant = input<BadgeVariant>('default');

  protected readonly classes = computed(() => cn(badgeVariants({ variant: this.variant() })));
}
