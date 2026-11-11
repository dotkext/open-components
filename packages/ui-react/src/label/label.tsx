import type { ComponentProps } from 'react';
import { labelClass } from '@open-components/core/label';
import { cn } from '@open-components/utils';

export function Label({ className, ...props }: ComponentProps<'label'>) {
  return <label data-slot="label" className={cn(labelClass, className)} {...props} />;
}
