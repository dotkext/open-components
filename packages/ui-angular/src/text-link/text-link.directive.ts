import { computed, Directive, input } from '@angular/core';
import { textLinkVariants, type TextLinkVariant } from '@open-components/core/text-link';
import { cn } from '@open-components/utils';

@Directive({
  selector: 'a[ocTextLink]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': '"text-link"',
  },
})
export class OcTextLink {
  readonly variant = input<TextLinkVariant>('default');

  protected readonly classes = computed(() => cn(textLinkVariants({ variant: this.variant() })));
}
