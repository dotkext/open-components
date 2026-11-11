import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@open-components/core/badge';
import { cn } from '@open-components/utils';

export type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
