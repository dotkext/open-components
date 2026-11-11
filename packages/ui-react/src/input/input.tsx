import type { ComponentProps } from 'react';
import { inputClass } from '@open-components/core/input';
import { cn } from '@open-components/utils';

export function Input({ className, type, ...props }: ComponentProps<'input'>) {
  return <input type={type} data-slot="input" className={cn(inputClass, className)} {...props} />;
}
