import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
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
  sheetOverlayClass,
  sheetTitleClass,
  type SheetSide,
} from '@open-components/core/sheet';
import { cn } from '@open-components/utils';

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext(component: string): SheetContextValue {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error(`${component} must be used within <Sheet>.`);
  }
  return context;
}

export interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function Sheet({ open, defaultOpen = false, onOpenChange, children }: SheetProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const value = isControlled ? open : uncontrolled;
  const titleId = useId();
  const descriptionId = useId();

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  return (
    <SheetContext.Provider value={{ open: value, setOpen, titleId, descriptionId }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ onClick, ...props }: ComponentProps<'button'>) {
  const { open, setOpen } = useSheetContext('SheetTrigger');

  return (
    <button
      type="button"
      data-slot="sheet-trigger"
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(!open);
      }}
      {...props}
    />
  );
}

export type SheetContentProps = ComponentProps<'div'> & {
  side?: SheetSide;
};

export function SheetContent({
  className,
  side = 'right',
  children,
  onClick,
  ...props
}: SheetContentProps) {
  const { open, setOpen, titleId, descriptionId } = useSheetContext('SheetContent');
  const contentRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const content = contentRef.current;
    if (!content) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    const releaseScroll = lockBodyScroll();
    const releaseTrap = createFocusTrap(content);
    const releaseEscape = onEscape(() => setOpen(false));
    focusFirstElement(content);

    return () => {
      releaseEscape();
      releaseTrap();
      releaseScroll();
      restoreRef.current?.focus?.();
    };
  }, [open, setOpen]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      data-slot="sheet-overlay"
      data-state="open"
      className={sheetOverlayClass}
      onClick={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        data-slot="sheet-content"
        data-state="open"
        className={cn(sheetContentVariants({ side }), className)}
        onClick={(event) => {
          onClick?.(event);
          event.stopPropagation();
        }}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function SheetHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="sheet-header" className={cn(sheetHeaderClass, className)} {...props} />;
}

export function SheetTitle({ className, ...props }: ComponentProps<'h2'>) {
  const { titleId } = useSheetContext('SheetTitle');
  return (
    <h2
      id={titleId}
      data-slot="sheet-title"
      className={cn(sheetTitleClass, className)}
      {...props}
    />
  );
}

export function SheetDescription({ className, ...props }: ComponentProps<'p'>) {
  const { descriptionId } = useSheetContext('SheetDescription');
  return (
    <p
      id={descriptionId}
      data-slot="sheet-description"
      className={cn(sheetDescriptionClass, className)}
      {...props}
    />
  );
}

export function SheetFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="sheet-footer" className={cn(sheetFooterClass, className)} {...props} />;
}

export function SheetClose({ onClick, ...props }: ComponentProps<'button'>) {
  const { setOpen } = useSheetContext('SheetClose');

  return (
    <button
      type="button"
      data-slot="sheet-close"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(false);
      }}
      {...props}
    />
  );
}
