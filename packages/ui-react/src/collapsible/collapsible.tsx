import {
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';
import {
  collapsibleContentClass,
  collapsibleTriggerClass,
} from '@open-components/core/collapsible';
import { cn } from '@open-components/utils';

interface CollapsibleContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext(component: string): CollapsibleContextValue {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error(`${component} must be used within <Collapsible>.`);
  }
  return context;
}

export interface CollapsibleProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function Collapsible({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: CollapsibleProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const value = isControlled ? open : uncontrolled;
  const contentId = useId();

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  return (
    <CollapsibleContext.Provider value={{ open: value, setOpen, contentId }}>
      {children}
    </CollapsibleContext.Provider>
  );
}

export function CollapsibleTrigger({ className, onClick, ...props }: ComponentProps<'button'>) {
  const { open, setOpen, contentId } = useCollapsibleContext('CollapsibleTrigger');

  return (
    <button
      type="button"
      data-slot="collapsible-trigger"
      data-state={open ? 'open' : 'closed'}
      aria-expanded={open}
      aria-controls={contentId}
      className={cn(collapsibleTriggerClass, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(!open);
      }}
      {...props}
    />
  );
}

export function CollapsibleContent({ className, ...props }: ComponentProps<'div'>) {
  const { open, contentId } = useCollapsibleContext('CollapsibleContent');

  return (
    <div
      id={contentId}
      data-slot="collapsible-content"
      data-state={open ? 'open' : 'closed'}
      hidden={!open}
      className={cn(collapsibleContentClass, className)}
      {...props}
    />
  );
}
