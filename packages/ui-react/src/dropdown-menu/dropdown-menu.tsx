import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import {
  focusMenuItem,
  getMenuItems,
  onEscape,
  onPointerDownOutside,
} from '@open-components/core/dropdown-menu/behavior';
import {
  dropdownContentClass,
  dropdownItemClass,
  dropdownLabelClass,
  dropdownSeparatorClass,
  dropdownTriggerClass,
} from '@open-components/core/dropdown-menu';
import { cn } from '@open-components/utils';

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  menuId: string;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext(component: string): DropdownMenuContextValue {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(`${component} must be used within <DropdownMenu>.`);
  }
  return context;
}

export interface DropdownMenuProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function DropdownMenu({
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...props
}: DropdownMenuProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const value = isControlled ? open : uncontrolled;
  const menuId = useId();

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  return (
    <div data-slot="dropdown-menu" className={cn('relative inline-block', className)} {...props}>
      <DropdownMenuContext.Provider value={{ open: value, setOpen, menuId }}>
        {children}
      </DropdownMenuContext.Provider>
    </div>
  );
}

export function DropdownMenuTrigger({ className, onClick, ...props }: ComponentProps<'button'>) {
  const { open, setOpen, menuId } = useDropdownMenuContext('DropdownMenuTrigger');

  return (
    <button
      type="button"
      data-slot="dropdown-trigger"
      data-state={open ? 'open' : 'closed'}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={menuId}
      className={cn(dropdownTriggerClass, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(!open);
      }}
      {...props}
    />
  );
}

export function DropdownMenuContent({
  className,
  children,
  onKeyDown,
  ...props
}: ComponentProps<'div'>) {
  const { open, setOpen, menuId } = useDropdownMenuContext('DropdownMenuContent');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const content = contentRef.current;
    if (!content) return;

    focusMenuItem(content, 0);

    const releaseOutside = onPointerDownOutside(content.parentElement ?? content, () =>
      setOpen(false),
    );
    const releaseEscape = onEscape(() => setOpen(false));

    return () => {
      releaseEscape();
      releaseOutside();
    };
  }, [open, setOpen]);

  if (!open) return null;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const content = event.currentTarget;
    const items = getMenuItems(content);
    const activeIndex = items.findIndex((item) => item === document.activeElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusMenuItem(content, activeIndex + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusMenuItem(content, activeIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusMenuItem(content, 0);
        break;
      case 'End':
        event.preventDefault();
        focusMenuItem(content, items.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        setOpen(false);
        break;
      case 'Tab':
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={contentRef}
      id={menuId}
      role="menu"
      data-slot="dropdown-content"
      data-state="open"
      className={cn(dropdownContentClass, className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
}

export type DropdownMenuItemProps = ComponentProps<'button'> & {
  onSelect?: () => void;
};

export function DropdownMenuItem({
  className,
  disabled,
  onClick,
  onSelect,
  ...props
}: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenuContext('DropdownMenuItem');

  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      data-slot="dropdown-item"
      data-disabled={disabled ? 'true' : 'false'}
      disabled={disabled}
      className={cn(dropdownItemClass, className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        onSelect?.();
        setOpen(false);
      }}
      {...props}
    />
  );
}

export function DropdownMenuLabel({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="dropdown-label" className={cn(dropdownLabelClass, className)} {...props} />
  );
}

export function DropdownMenuSeparator({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      role="separator"
      data-slot="dropdown-separator"
      className={cn(dropdownSeparatorClass, className)}
      {...props}
    />
  );
}
