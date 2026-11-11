import type { ComponentProps } from 'react';
import { skeletonClass } from '@open-components/core/skeleton';
import { cn } from '@open-components/utils';

export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(skeletonClass, className)}
      {...props}
    />
  );
}
