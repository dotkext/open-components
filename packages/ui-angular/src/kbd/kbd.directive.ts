import { Directive } from '@angular/core';
import { kbdClass } from '@open-components/core/kbd';
import { cn } from '@open-components/utils';

@Directive({
  selector: 'kbd[ocKbd]',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"kbd"',
  },
})
export class OcKbd {
  protected readonly classes = cn(kbdClass);
}
