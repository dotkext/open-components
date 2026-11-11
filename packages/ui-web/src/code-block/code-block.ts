import { html, nothing } from 'lit';
import { codeBlockClass, codeBlockPreClass } from '@open-components/core/code-block';
import { copyText } from '@open-components/utils';
import { OcElement } from '../base';

/** `<oc-code-block code="...">` — code snippet with a copy action. */
export class OcCodeBlock extends OcElement {
  static properties = {
    code: { type: String },
    copyable: { type: Boolean },
  };

  code = '';
  copyable = true;
  copied = false;

  private timeout?: number;

  protected override variantClasses(): string {
    return codeBlockClass;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', 'code-block');
  }

  override disconnectedCallback(): void {
    if (this.timeout !== undefined) window.clearTimeout(this.timeout);
    super.disconnectedCallback();
  }

  private readonly onCopy = async (): Promise<void> => {
    if (await copyText(this.code)) {
      this.copied = true;
      this.requestUpdate();
      this.timeout = window.setTimeout(() => {
        this.copied = false;
        this.requestUpdate();
      }, 2000);
    }
  };

  protected override render() {
    return html`<pre class=${codeBlockPreClass}><code>${this.code}</code></pre>
      ${
        this.copyable
          ? html`<button
              type="button"
              data-slot="code-block-copy"
              aria-label=${this.copied ? 'Copied' : 'Copy code'}
              class="bg-background/80 hover:bg-accent absolute right-2 top-2 inline-flex h-7 items-center rounded-md border px-2 text-xs font-medium transition-colors"
              @click=${this.onCopy}
            >
              ${this.copied ? 'Copied' : 'Copy'}
            </button>`
          : nothing
      }`;
  }
}

if (!customElements.get('oc-code-block')) {
  customElements.define('oc-code-block', OcCodeBlock);
}
