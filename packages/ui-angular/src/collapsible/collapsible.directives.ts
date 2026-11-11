import { Directive, inject, model } from '@angular/core';
import {
  collapsibleContentClass,
  collapsibleTriggerClass,
} from '@open-components/core/collapsible';

let collapsibleCounter = 0;

@Directive({
  selector: 'div[ocCollapsible]',
  host: {
    class: 'block',
    '[attr.data-slot]': '"collapsible"',
    '[attr.data-state]': 'open() ? "open" : "closed"',
  },
})
export class OcCollapsible {
  readonly open = model(false);
  readonly contentId = `oc-collapsible-${collapsibleCounter++}`;

  toggle(): void {
    this.open.update((value) => !value);
  }
}

@Directive({
  selector: 'button[ocCollapsibleTrigger]',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"collapsible-trigger"',
    '[attr.aria-expanded]': 'collapsible.open()',
    '[attr.aria-controls]': 'collapsible.contentId',
    '[attr.data-state]': 'collapsible.open() ? "open" : "closed"',
    '(click)': 'collapsible.toggle()',
  },
})
export class OcCollapsibleTrigger {
  protected readonly collapsible = inject(OcCollapsible);
  protected readonly classes = collapsibleTriggerClass;
}

@Directive({
  selector: 'div[ocCollapsibleContent]',
  host: {
    '[class]': 'classes',
    '[id]': 'collapsible.contentId',
    '[attr.data-slot]': '"collapsible-content"',
    '[attr.data-state]': 'collapsible.open() ? "open" : "closed"',
    '[hidden]': '!collapsible.open()',
  },
})
export class OcCollapsibleContent {
  protected readonly collapsible = inject(OcCollapsible);
  protected readonly classes = collapsibleContentClass;
}
