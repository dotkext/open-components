import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { iconButtonVariants } from '@open-components/core/icon-button';
import { cn } from '@open-components/utils';

export type IconButtonProps = ComponentProps<'button'> & VariantProps<typeof iconButtonVariants>;

export function IconButton({
  className,
  variant,
  size,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      data-slot="icon-button"
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
