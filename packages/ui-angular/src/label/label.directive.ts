import { Directive } from '@angular/core';
import { labelClass } from '@open-components/core/label';
import { cn } from '@open-components/utils';

@Directive({
  selector: 'label[ocLabel]',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"label"',
  },
})
export class OcLabel {
  protected readonly classes = cn(labelClass);
}
