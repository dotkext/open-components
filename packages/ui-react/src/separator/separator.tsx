import type { ComponentProps } from 'react';
import { separatorVariants, type SeparatorOrientation } from '@open-components/core/separator';
import { cn } from '@open-components/utils';

export type SeparatorProps = ComponentProps<'div'> & {
  orientation?: SeparatorOrientation;
};

export function Separator({ className, orientation = 'horizontal', ...props }: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      data-slot="separator"
      data-orientation={orientation}
      className={cn(separatorVariants({ orientation }), className)}
      {...props}
    />
  );
}
