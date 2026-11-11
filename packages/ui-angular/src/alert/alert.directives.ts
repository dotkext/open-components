import { computed, Directive, input } from '@angular/core';
import {
  alertDescriptionClass,
  alertTitleClass,
  alertVariants,
  type AlertVariant,
} from '@open-components/core/alert';
import { cn } from '@open-components/utils';

@Directive({
  selector: 'div[ocAlert]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': '"alert"',
    role: 'alert',
  },
})
export class OcAlert {
  readonly variant = input<AlertVariant>('default');

  protected readonly classes = computed(() => cn(alertVariants({ variant: this.variant() })));
}

@Directive({
  selector: 'div[ocAlertTitle]',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"alert-title"',
  },
})
export class OcAlertTitle {
  protected readonly classes = cn(alertTitleClass);
}

@Directive({
  selector: 'div[ocAlertDescription]',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"alert-description"',
  },
})
export class OcAlertDescription {
  protected readonly classes = cn(alertDescriptionClass);
}
