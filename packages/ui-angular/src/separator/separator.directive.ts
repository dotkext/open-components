import { computed, Directive, input } from '@angular/core';
import { separatorVariants, type SeparatorOrientation } from '@open-components/core/separator';
import { cn } from '@open-components/utils';

@Directive({
  selector: 'div[ocSeparator]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': '"separator"',
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
  },
})
export class OcSeparator {
  readonly orientation = input<SeparatorOrientation>('horizontal');

  protected readonly classes = computed(() =>
    cn(separatorVariants({ orientation: this.orientation() })),
  );
}
