import { html } from 'lit';
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
import { OcElement } from '../base';
import { OcActionElement } from '../interactive';

/**
 * `<oc-sheet>` — modal panel with a backdrop, focus trap, Escape handling and
 * scroll locking. The host is the panel; consumer children are the content.
 *
 * Closing dispatches `oc-open-change` (`CustomEvent<{ open: false }>`).
 */
export class OcSheet extends OcElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    side: { type: String, reflect: true },
  };

  open = false;
  side: SheetSide = 'right';

  private wasOpen = false;
  private restoreFocus: HTMLElement | null = null;
  private cleanup?: () => void;

  protected override variantClasses(): string {
    return cn(sheetContentVariants({ side: this.side }), 'data-[state=closed]:hidden');
  }

  override connectedCallback(): void {
    this.setAttribute('data-state', this.open ? 'open' : 'closed');
    super.connectedCallback();
    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', 'true');
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '-1');
    }
  }

  override disconnectedCallback(): void {
    this.deactivate();
    super.disconnectedCallback();
  }

  protected override updated(): void {
    super.updated();
    this.setAttribute('data-state', this.open ? 'open' : 'closed');
    this.setAttribute('aria-hidden', String(!this.open));

    if (this.open && !this.wasOpen) {
      this.activate();
    } else if (!this.open && this.wasOpen) {
      this.deactivate();
    }
    this.wasOpen = this.open;
  }

  /** Close the sheet and notify listeners. */
  close(): void {
    if (!this.open) return;
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('oc-open-change', {
        detail: { open: false },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private activate(): void {
    if (typeof document === 'undefined') return;
    this.restoreFocus = document.activeElement as HTMLElement | null;

    const releaseScroll = lockBodyScroll();
    const releaseTrap = createFocusTrap(this);
    const releaseEscape = onEscape(() => this.close());

    this.cleanup = () => {
      releaseEscape();
      releaseTrap();
      releaseScroll();
    };

    focusFirstElement(this);
  }

  private deactivate(): void {
    this.cleanup?.();
    this.cleanup = undefined;
    if (this.wasOpen) {
      this.restoreFocus?.focus?.();
      this.restoreFocus = null;
    }
  }

  private readonly onBackdropClick = (): void => {
    this.close();
  };

  protected override render() {
    return html`<div
      data-slot="sheet-overlay"
      class="fixed inset-0 -z-10 bg-black/50"
      @click=${this.onBackdropClick}
    ></div>`;
  }
}

if (!customElements.get('oc-sheet')) {
  customElements.define('oc-sheet', OcSheet);
}

abstract class OcSheetPart extends OcElement {
  protected slotName = 'sheet';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', this.slotName);
  }

  protected override render() {
    return html``;
  }
}

export class OcSheetHeader extends OcSheetPart {
  protected override slotName = 'sheet-header';
  protected override variantClasses(): string {
    return sheetHeaderClass;
  }
}

export class OcSheetTitle extends OcSheetPart {
  protected override slotName = 'sheet-title';
  protected override variantClasses(): string {
    return sheetTitleClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'heading');
    this.setAttribute('aria-level', '2');
  }
}

export class OcSheetDescription extends OcSheetPart {
  protected override slotName = 'sheet-description';
  protected override variantClasses(): string {
    return sheetDescriptionClass;
  }
}

export class OcSheetFooter extends OcSheetPart {
  protected override slotName = 'sheet-footer';
  protected override variantClasses(): string {
    return sheetFooterClass;
  }
}

/** Closes the nearest `<oc-sheet>` ancestor. */
export class OcSheetClose extends OcActionElement {
  disabled = false;

  protected override variantClasses(): string {
    return '';
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'sheet-close');
  }

  override click(): void {
    super.click();
    (this.closest('oc-sheet') as OcSheet | null)?.close();
  }
}

const definitions: Array<[string, CustomElementConstructor]> = [
  ['oc-sheet-header', OcSheetHeader],
  ['oc-sheet-title', OcSheetTitle],
  ['oc-sheet-description', OcSheetDescription],
  ['oc-sheet-footer', OcSheetFooter],
  ['oc-sheet-close', OcSheetClose],
];

for (const [tag, constructor] of definitions) {
  if (!customElements.get(tag)) {
    customElements.define(tag, constructor);
  }
}
