import { useState, type ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { switchVariants } from '@open-components/core/switch';
import { cn } from '@open-components/utils';

export type SwitchProps = Omit<ComponentProps<'button'>, 'onChange'> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
} & VariantProps<typeof switchVariants>;

export function Switch({
  className,
  size,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  onClick,
  ...props
}: SwitchProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const value = isControlled ? checked : uncontrolled;

  const toggle = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setUncontrolled(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      data-state={value ? 'checked' : 'unchecked'}
      data-slot="switch"
      disabled={disabled}
      className={cn(switchVariants({ size }), className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggle();
      }}
      {...props}
    />
  );
}
