import { Component, input, signal } from '@angular/core';
import { codeBlockClass, codeBlockPreClass } from '@open-components/core/code-block';
import { copyText } from '@open-components/utils';

@Component({
  selector: 'oc-code-block',
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"code-block"',
  },
  template: `
    <pre [class]="preClasses"><code>{{ code() }}</code></pre>
    @if (copyable()) {
      <button
        type="button"
        data-slot="code-block-copy"
        [attr.aria-label]="copied() ? 'Copied' : 'Copy code'"
        class="bg-background/80 hover:bg-accent absolute right-2 top-2 inline-flex h-7 items-center rounded-md border px-2 text-xs font-medium transition-colors"
        (click)="copy()"
      >
        {{ copied() ? 'Copied' : 'Copy' }}
      </button>
    }
  `,
})
export class OcCodeBlock {
  readonly code = input('');
  readonly copyable = input(true);

  protected readonly copied = signal(false);
  protected readonly classes = codeBlockClass;
  protected readonly preClasses = codeBlockPreClass;

  protected async copy(): Promise<void> {
    if (await copyText(this.code())) {
      this.copied.set(true);
      window.setTimeout(() => this.copied.set(false), 2000);
    }
  }
}
