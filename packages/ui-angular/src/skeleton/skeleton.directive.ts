import { Directive } from '@angular/core';
import { skeletonClass } from '@open-components/core/skeleton';
import { cn } from '@open-components/utils';

@Directive({
  selector: 'div[ocSkeleton]',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"skeleton"',
    'aria-hidden': 'true',
  },
})
export class OcSkeleton {
  protected readonly classes = cn(skeletonClass);
}
