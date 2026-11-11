import { Directive, effect, ElementRef, inject, input, model, output } from '@angular/core';
import {
  dropdownContentClass,
  dropdownItemClass,
  dropdownLabelClass,
  dropdownSeparatorClass,
  dropdownTriggerClass,
} from '@open-components/core/dropdown-menu';
import {
  focusMenuItem,
  getMenuItems,
  onPointerDownOutside,
} from '@open-components/core/dropdown-menu/behavior';

let dropdownCounter = 0;

@Directive({
  selector: 'div[ocDropdownMenu]',
  host: {
    class: 'relative inline-block',
    '[attr.data-slot]': '"dropdown-menu"',
    '[attr.data-state]': 'open() ? "open" : "closed"',
  },
})
export class OcDropdownMenu {
  readonly open = model(false);
  readonly menuId = `oc-dropdown-${dropdownCounter++}`;

  private readonly element = inject(ElementRef<HTMLElement>);
  private outsideCleanup?: () => void;

  constructor() {
    effect(() => {
      if (this.open()) {
        this.outsideCleanup?.();
        this.outsideCleanup = onPointerDownOutside(this.element.nativeElement, () => this.close());
      } else {
        this.closeOutside();
      }
    });
  }

  toggle(): void {
    this.open.update((value) => !value);
  }

  close(): void {
    this.open.set(false);
  }

  private closeOutside(): void {
    this.outsideCleanup?.();
    this.outsideCleanup = undefined;
  }
}

@Directive({
  selector: 'button[ocDropdownTrigger]',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"dropdown-trigger"',
    '[attr.data-state]': 'menu.open() ? "open" : "closed"',
    'aria-haspopup': 'menu',
    '[attr.aria-expanded]': 'menu.open()',
    '[attr.aria-controls]': 'menu.menuId',
    '(click)': 'menu.toggle()',
  },
})
export class OcDropdownTrigger {
  protected readonly menu = inject(OcDropdownMenu);
  protected readonly classes = dropdownTriggerClass;
}

@Directive({
  selector: 'div[ocDropdownContent]',
  host: {
    '[class]': 'classes',
    role: 'menu',
    '[id]': 'menu.menuId',
    '[attr.data-slot]': '"dropdown-content"',
    '[attr.data-state]': 'menu.open() ? "open" : "closed"',
    '[hidden]': '!menu.open()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class OcDropdownContent {
  protected readonly menu = inject(OcDropdownMenu);
  protected readonly classes = dropdownContentClass;
  private readonly element = inject(ElementRef<HTMLElement>);

  constructor() {
    effect(() => {
      if (!this.menu.open()) return;
      queueMicrotask(() => focusMenuItem(this.element.nativeElement, 0));
    });
  }

  protected onKeydown(event: KeyboardEvent): void {
    const content = this.element.nativeElement;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.menu.close();
      return;
    }

    if (event.key === 'Tab') {
      this.menu.close();
      return;
    }

    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;

    const items = getMenuItems(content);
    if (items.length === 0) return;

    event.preventDefault();
    const activeIndex = items.indexOf(document.activeElement as HTMLElement);

    if (event.key === 'Home') focusMenuItem(content, 0);
    else if (event.key === 'End') focusMenuItem(content, items.length - 1);
    else if (event.key === 'ArrowDown') focusMenuItem(content, activeIndex + 1);
    else focusMenuItem(content, activeIndex - 1);
  }
}

@Directive({
  selector: 'button[ocDropdownItem]',
  host: {
    '[class]': 'classes',
    role: 'menuitem',
    '[attr.data-slot]': '"dropdown-item"',
    '[attr.data-disabled]': 'disabled() ? "true" : "false"',
    '[attr.tabindex]': '-1',
    '(click)': 'selectItem()',
  },
})
export class OcDropdownItem {
  readonly value = input<string | undefined>(undefined);
  readonly disabled = input(false);
  readonly selected = output<string | undefined>();

  protected readonly menu = inject(OcDropdownMenu);
  protected readonly classes = dropdownItemClass;

  protected selectItem(): void {
    if (this.disabled()) return;
    this.selected.emit(this.value());
    this.menu.close();
  }
}

@Directive({
  selector: 'div[ocDropdownLabel]',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"dropdown-label"',
  },
})
export class OcDropdownLabel {
  protected readonly classes = dropdownLabelClass;
}

@Directive({
  selector: 'div[ocDropdownSeparator]',
  host: {
    '[class]': 'classes',
    role: 'separator',
    '[attr.data-slot]': '"dropdown-separator"',
  },
})
export class OcDropdownSeparator {
  protected readonly classes = dropdownSeparatorClass;
}
