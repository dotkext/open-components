import { Directive } from '@angular/core';
import { inputClass } from '@open-components/core/input';
import { cn } from '@open-components/utils';

@Directive({
  selector: 'input[ocInput]',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"input"',
  },
})
export class OcInput {
  protected readonly classes = cn(inputClass);
}
