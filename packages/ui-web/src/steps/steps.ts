import { html, nothing, type TemplateResult } from 'lit';
import {
  stepClass,
  stepDescriptionClass,
  stepMarkerClass,
  stepTitleClass,
  stepsClass,
  type StepState,
} from '@open-components/core/steps';
import { OcElement } from '../base';

function checkIcon(): TemplateResult {
  return html`<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
    <path
      d="M3.5 8.5l3 3 6-7"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`;
}

export class OcSteps extends OcElement {
  protected override variantClasses(): string {
    return stepsClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'steps');
    this.setAttribute('role', 'list');
  }

  protected override render() {
    return html``;
  }
}

export class OcStep extends OcElement {
  static properties = {
    state: { type: String, reflect: true },
    number: { type: Number },
  };

  state: StepState = 'upcoming';
  number?: number;

  protected override variantClasses(): string {
    return stepClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'step');
    this.setAttribute('role', 'listitem');
  }

  protected override updated(): void {
    super.updated();
    this.setAttribute('data-state', this.state);
  }

  protected override render() {
    return html`<span data-slot="step-marker" class=${stepMarkerClass} aria-hidden="true"
      >${this.state === 'complete' ? checkIcon() : nothing}${
        this.state !== 'complete' && this.number !== undefined ? this.number : nothing
      }</span
    >`;
  }
}

export class OcStepTitle extends OcElement {
  protected override variantClasses(): string {
    return stepTitleClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'step-title');
  }

  protected override render() {
    return html``;
  }
}

export class OcStepDescription extends OcElement {
  protected override variantClasses(): string {
    return stepDescriptionClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'step-description');
  }

  protected override render() {
    return html``;
  }
}

const definitions: Array<[string, CustomElementConstructor]> = [
  ['oc-steps', OcSteps],
  ['oc-step', OcStep],
  ['oc-step-title', OcStepTitle],
  ['oc-step-description', OcStepDescription],
];

for (const [tag, constructor] of definitions) {
  if (!customElements.get(tag)) {
    customElements.define(tag, constructor);
  }
}
