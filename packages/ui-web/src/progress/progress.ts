import { html } from 'lit';
import { progressClass, progressIndicatorClass } from '@open-components/core/progress';
import { OcElement } from '../base';

/**
 * `<oc-progress>` — determinate progress bar.
 * Exposes `value` / `max` attributes and progressbar ARIA semantics.
 */
export class OcProgress extends OcElement {
  static properties = {
    value: { type: Number },
    max: { type: Number },
  };

  value = 0;
  max = 100;

  protected override variantClasses(): string {
    return progressClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'progressbar');
    this.setAttribute('data-slot', 'progress');
    this.syncState();
  }

  protected override updated(): void {
    super.updated();
    this.syncState();
  }

  private get safeMax(): number {
    return this.max > 0 ? this.max : 100;
  }

  private get clamped(): number {
    return Math.min(Math.max(this.value, 0), this.safeMax);
  }

  private get percent(): number {
    return (this.clamped / this.safeMax) * 100;
  }

  private syncState(): void {
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', String(this.safeMax));
    this.setAttribute('aria-valuenow', String(this.clamped));
  }

  protected override render() {
    return html`<div
      data-slot="progress-indicator"
      class=${progressIndicatorClass}
      style=${`width: ${this.percent}%`}
    ></div>`;
  }
}

if (!customElements.get('oc-progress')) {
  customElements.define('oc-progress', OcProgress);
}
