import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { alertDescriptionClass, alertTitleClass, alertVariants } from '@open-components/core/alert';
import { cn } from '@open-components/utils';

export type AlertProps = ComponentProps<'div'> & VariantProps<typeof alertVariants>;

export function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      data-slot="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="alert-title" className={cn(alertTitleClass, className)} {...props} />;
}

export function AlertDescription({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(alertDescriptionClass, className)}
      {...props}
    />
  );
}
