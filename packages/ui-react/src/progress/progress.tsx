import type { ComponentProps } from 'react';
import { progressClass, progressIndicatorClass } from '@open-components/core/progress';
import { cn } from '@open-components/utils';

export type ProgressProps = Omit<ComponentProps<'div'>, 'children'> & {
  value?: number;
  max?: number;
};

export function Progress({ className, value = 0, max = 100, ...props }: ProgressProps) {
  const safeMax = max > 0 ? max : 100;
  const clamped = Math.min(Math.max(value, 0), safeMax);
  const percent = (clamped / safeMax) * 100;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={clamped}
      data-slot="progress"
      className={cn(progressClass, className)}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className={progressIndicatorClass}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
