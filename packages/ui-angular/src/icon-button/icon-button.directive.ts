import { computed, Directive, input } from '@angular/core';
import {
  iconButtonVariants,
  type IconButtonSize,
  type IconButtonVariant,
} from '@open-components/core/icon-button';
import { cn } from '@open-components/utils';

@Directive({
  selector: 'button[ocIconButton]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': '"icon-button"',
  },
})
export class OcIconButton {
  readonly variant = input<IconButtonVariant>('ghost');
  readonly size = input<IconButtonSize>('default');

  protected readonly classes = computed(() =>
    cn(iconButtonVariants({ variant: this.variant(), size: this.size() })),
  );
}
