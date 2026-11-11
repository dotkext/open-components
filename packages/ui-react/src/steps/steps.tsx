import type { ComponentProps } from 'react';
import {
  stepClass,
  stepDescriptionClass,
  stepMarkerClass,
  stepTitleClass,
  stepsClass,
  type StepState,
} from '@open-components/core/steps';
import { cn } from '@open-components/utils';

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Steps({ className, ...props }: ComponentProps<'ol'>) {
  return <ol data-slot="steps" className={cn(stepsClass, className)} {...props} />;
}

export type StepProps = ComponentProps<'li'> & {
  state?: StepState;
  number?: number;
};

export function Step({ state = 'upcoming', number, className, children, ...props }: StepProps) {
  return (
    <li data-slot="step" data-state={state} className={cn(stepClass, className)} {...props}>
      <span data-slot="step-marker" className={stepMarkerClass} aria-hidden="true">
        {state === 'complete' ? <CheckIcon /> : (number ?? null)}
      </span>
      <div className="flex flex-col gap-1">{children}</div>
    </li>
  );
}

export function StepTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="step-title" className={cn(stepTitleClass, className)} {...props} />;
}

export function StepDescription({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="step-description" className={cn(stepDescriptionClass, className)} {...props} />
  );
}
