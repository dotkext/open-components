import { Directive } from '@angular/core';
import {
  cardActionClass,
  cardClass,
  cardContentClass,
  cardDescriptionClass,
  cardFooterClass,
  cardHeaderClass,
  cardTitleClass,
} from '@open-components/core/card';

@Directive({
  selector: 'div[ocCard]',
  host: { '[class]': 'classes', '[attr.data-slot]': '"card"' },
})
export class OcCard {
  protected readonly classes = cardClass;
}

@Directive({
  selector: 'div[ocCardHeader]',
  host: { '[class]': 'classes', '[attr.data-slot]': '"card-header"' },
})
export class OcCardHeader {
  protected readonly classes = cardHeaderClass;
}

@Directive({
  selector: 'div[ocCardTitle]',
  host: { '[class]': 'classes', '[attr.data-slot]': '"card-title"' },
})
export class OcCardTitle {
  protected readonly classes = cardTitleClass;
}

@Directive({
  selector: 'div[ocCardDescription]',
  host: { '[class]': 'classes', '[attr.data-slot]': '"card-description"' },
})
export class OcCardDescription {
  protected readonly classes = cardDescriptionClass;
}

@Directive({
  selector: 'div[ocCardContent]',
  host: { '[class]': 'classes', '[attr.data-slot]': '"card-content"' },
})
export class OcCardContent {
  protected readonly classes = cardContentClass;
}

@Directive({
  selector: 'div[ocCardFooter]',
  host: { '[class]': 'classes', '[attr.data-slot]': '"card-footer"' },
})
export class OcCardFooter {
  protected readonly classes = cardFooterClass;
}

@Directive({
  selector: 'div[ocCardAction]',
  host: { '[class]': 'classes', '[attr.data-slot]': '"card-action"' },
})
export class OcCardAction {
  protected readonly classes = cardActionClass;
}
