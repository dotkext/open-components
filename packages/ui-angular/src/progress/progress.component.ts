import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'oc-progress',
  host: {
    role: 'progressbar',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'safeMax()',
    '[attr.aria-valuenow]': 'clamped()',
    '[attr.data-slot]': '"progress"',
    class: 'block',
  },
  template: `
    <div class="relative h-2 w-full overflow-hidden rounded-full bg-input">
      <div
        data-slot="progress-indicator"
        class="h-full rounded-full bg-primary transition-all"
        [style.width.%]="percent()"
      ></div>
    </div>
  `,
})
export class OcProgress {
  readonly value = input(0);
  readonly max = input(100);

  protected readonly safeMax = computed(() => (this.max() > 0 ? this.max() : 100));
  protected readonly clamped = computed(() => Math.min(Math.max(this.value(), 0), this.safeMax()));
  protected readonly percent = computed(() => (this.clamped() / this.safeMax()) * 100);
}
