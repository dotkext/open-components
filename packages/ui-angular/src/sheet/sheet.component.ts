import {
  Component,
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import {
  createFocusTrap,
  focusFirstElement,
  lockBodyScroll,
  onEscape,
} from '@open-components/core/sheet/behavior';
import {
  sheetContentVariants,
  sheetDescriptionClass,
  sheetFooterClass,
  sheetHeaderClass,
  sheetTitleClass,
  type SheetSide,
} from '@open-components/core/sheet';
import { cn } from '@open-components/utils';

@Component({
  selector: 'oc-sheet',
  host: { class: 'contents', '(oc-sheet-request-close)': 'close()' },
  template: `
    <div
      data-slot="sheet-overlay"
      class="fixed inset-0 z-50 bg-black/50 data-[state=closed]:hidden"
      [attr.data-state]="open() ? 'open' : 'closed'"
      (click)="requestClose()"
    ></div>
    <div
      #panel
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      [attr.data-state]="open() ? 'open' : 'closed'"
      [attr.data-slot]="'sheet-content'"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-hidden]="!open()"
      [class]="panelClasses()"
    >
      <ng-content />
    </div>
  `,
})
export class OcSheet {
  readonly open = model(false);
  readonly side = input<SheetSide>('right');
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly openChange = output<boolean>();

  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
  private cleanup?: () => void;
  private restoreFocus: HTMLElement | null = null;
  private active = false;

  protected readonly panelClasses = computed(() =>
    cn(sheetContentVariants({ side: this.side() }), 'data-[state=closed]:hidden'),
  );

  constructor() {
    effect(() => {
      const isOpen = this.open();
      const panel = this.panel()?.nativeElement;
      if (isOpen && panel) {
        this.activate(panel);
      } else {
        this.deactivate();
      }
    });
  }

  close(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.openChange.emit(false);
  }

  requestClose(): void {
    this.close();
  }

  private activate(panel: HTMLElement): void {
    if (this.active) return;
    this.active = true;
    this.restoreFocus = document.activeElement as HTMLElement | null;

    const releaseScroll = lockBodyScroll();
    const releaseTrap = createFocusTrap(panel);
    const releaseEscape = onEscape(() => this.close());

    this.cleanup = () => {
      releaseEscape();
      releaseTrap();
      releaseScroll();
    };

    focusFirstElement(panel);
  }

  private deactivate(): void {
    if (!this.active) return;
    this.active = false;
    this.cleanup?.();
    this.cleanup = undefined;
    this.restoreFocus?.focus?.();
    this.restoreFocus = null;
  }
}

@Directive({
  selector: 'div[ocSheetHeader]',
  host: { '[class]': 'classes', '[attr.data-slot]': '"sheet-header"' },
})
export class OcSheetHeader {
  protected readonly classes = cn(sheetHeaderClass);
}

@Directive({
  selector: 'div[ocSheetTitle]',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"sheet-title"',
    role: 'heading',
    'aria-level': '2',
  },
})
export class OcSheetTitle {
  protected readonly classes = cn(sheetTitleClass);
}

@Directive({
  selector: 'div[ocSheetDescription]',
  host: { '[class]': 'classes', '[attr.data-slot]': '"sheet-description"' },
})
export class OcSheetDescription {
  protected readonly classes = cn(sheetDescriptionClass);
}

@Directive({
  selector: 'div[ocSheetFooter]',
  host: { '[class]': 'classes', '[attr.data-slot]': '"sheet-footer"' },
})
export class OcSheetFooter {
  protected readonly classes = cn(sheetFooterClass);
}

@Directive({
  selector: 'button[ocSheetClose]',
  host: {
    '[attr.data-slot]': '"sheet-close"',
    '(click)': 'requestClose()',
  },
})
export class OcSheetClose {
  private readonly element = inject(ElementRef<HTMLElement>);

  protected requestClose(): void {
    this.element.nativeElement
      .closest('oc-sheet')
      ?.dispatchEvent(new CustomEvent('oc-sheet-request-close', { bubbles: true }));
  }
}
