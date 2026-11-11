import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { segmentedControlClass, segmentedItemClass } from '@open-components/core/segmented-control';
import { cn } from '@open-components/utils';

interface SegmentedControlContextValue {
  value: string;
  setValue: (value: string) => void;
}

const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

function useSegmentedControlContext(component: string): SegmentedControlContextValue {
  const context = useContext(SegmentedControlContext);
  if (!context) {
    throw new Error(`${component} must be used within <SegmentedControl>.`);
  }
  return context;
}

export interface SegmentedControlProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

export function SegmentedControl({
  value,
  defaultValue = '',
  onValueChange,
  className,
  children,
  ...props
}: SegmentedControlProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  return (
    <div
      role="group"
      data-slot="segmented-control"
      className={cn(segmentedControlClass, className)}
      {...props}
    >
      <SegmentedControlContext.Provider value={{ value: current, setValue }}>
        {children}
      </SegmentedControlContext.Provider>
    </div>
  );
}

export type SegmentedControlItemProps = ComponentProps<'button'> & {
  value: string;
};

export function SegmentedControlItem({
  value,
  className,
  onClick,
  ...props
}: SegmentedControlItemProps) {
  const context = useSegmentedControlContext('SegmentedControlItem');
  const active = context.value === value;

  return (
    <button
      type="button"
      data-slot="segmented-control-item"
      data-state={active ? 'active' : 'inactive'}
      data-value={value}
      aria-pressed={active}
      className={cn(segmentedItemClass, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.setValue(value);
      }}
      {...props}
    />
  );
}
