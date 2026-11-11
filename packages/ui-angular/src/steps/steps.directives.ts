import { Component, Directive, input } from '@angular/core';
import {
  stepClass,
  stepDescriptionClass,
  stepMarkerClass,
  stepTitleClass,
  stepsClass,
  type StepState,
} from '@open-components/core/steps';

@Component({
  selector: 'oc-steps',
  host: {
    class: stepsClass,
    role: 'list',
    '[attr.data-slot]': '"steps"',
  },
  template: '<ng-content />',
})
export class OcSteps {}

@Component({
  selector: 'oc-step',
  host: {
    '[class]': 'classes',
    role: 'listitem',
    '[attr.data-slot]': '"step"',
    '[attr.data-state]': 'state()',
  },
  template: `
    <span data-slot="step-marker" [class]="markerClasses" aria-hidden="true">
      @if (state() === 'complete') {
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
          <path
            d="M3.5 8.5l3 3 6-7"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      } @else if (number() !== undefined) {
        {{ number() }}
      }
    </span>
    <div class="flex flex-col gap-1"><ng-content /></div>
  `,
})
export class OcStep {
  readonly state = input<StepState>('upcoming');
  readonly number = input<number | undefined>(undefined);

  protected readonly classes = stepClass;
  protected readonly markerClasses = stepMarkerClass;
}

@Directive({
  selector: 'div[ocStepTitle]',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"step-title"',
  },
})
export class OcStepTitle {
  protected readonly classes = stepTitleClass;
}

@Directive({
  selector: 'div[ocStepDescription]',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"step-description"',
  },
})
export class OcStepDescription {
  protected readonly classes = stepDescriptionClass;
}
