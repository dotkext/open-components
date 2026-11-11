import {
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { getNextTabIndex } from '@open-components/core/tabs/behavior';
import { tabsContentClass, tabsListClass, tabsTriggerClass } from '@open-components/core/tabs';
import { cn } from '@open-components/utils';

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`${component} must be used within <Tabs>.`);
  }
  return context;
}

export interface TabsProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

export function Tabs({
  value,
  defaultValue = '',
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;
  const baseId = useId().replace(/:/g, '');

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  return (
    <div data-slot="tabs" className={className} {...props}>
      <TabsContext.Provider value={{ value: current, setValue, baseId }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
}

export function TabsList({ className, onKeyDown, ...props }: ComponentProps<'div'>) {
  const { setValue } = useTabsContext('TabsList');

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])'),
    );
    const activeIndex = tabs.findIndex((tab) => tab === document.activeElement);
    if (activeIndex === -1) return;

    const nextIndex = getNextTabIndex(event.key, activeIndex, tabs.length, 'horizontal');
    if (nextIndex === null) return;

    event.preventDefault();
    tabs[nextIndex]?.focus();
    const nextValue = tabs[nextIndex]?.dataset.value;
    if (nextValue !== undefined) setValue(nextValue);
  };

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      data-slot="tabs-list"
      className={cn(tabsListClass, className)}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

export type TabsTriggerProps = ComponentProps<'button'> & {
  value: string;
};

export function TabsTrigger({ value, className, onClick, ...props }: TabsTriggerProps) {
  const context = useTabsContext('TabsTrigger');
  const active = context.value === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${context.baseId}-trigger-${value}`}
      aria-controls={`${context.baseId}-panel-${value}`}
      aria-selected={active}
      data-state={active ? 'active' : 'inactive'}
      data-value={value}
      data-slot="tabs-trigger"
      tabIndex={active ? 0 : -1}
      className={cn(tabsTriggerClass, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.setValue(value);
      }}
      {...props}
    />
  );
}

export type TabsContentProps = ComponentProps<'div'> & {
  value: string;
};

export function TabsContent({ value, className, ...props }: TabsContentProps) {
  const context = useTabsContext('TabsContent');
  const active = context.value === value;

  return (
    <div
      role="tabpanel"
      id={`${context.baseId}-panel-${value}`}
      aria-labelledby={`${context.baseId}-trigger-${value}`}
      data-state={active ? 'active' : 'inactive'}
      data-slot="tabs-content"
      hidden={!active}
      tabIndex={0}
      className={cn(tabsContentClass, className)}
      {...props}
    />
  );
}
