import { html, LitElement } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { textLinkVariants, type TextLinkVariant } from '@open-components/core/text-link';
import { cn } from '@open-components/utils';

/**
 * `<oc-link>` renders a native `<a>` in the light DOM.
 * The host uses `display: contents` so consumer utilities and native link
 * behaviour (middle click, open in new tab, context menu) keep working.
 */
export class OcLink extends LitElement {
  static properties = {
    href: { type: String },
    target: { type: String },
    rel: { type: String },
    variant: { type: String, reflect: true },
  };

  href = '';
  target = '';
  rel = '';
  variant: TextLinkVariant = 'default';

  private capturedNodes?: Node[];
  private observer?: MutationObserver;

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  override connectedCallback(): void {
    if (!this.capturedNodes) {
      this.capturedNodes = Array.from(this.childNodes);
    }
    super.connectedCallback();
    this.style.display = 'contents';
    this.observer = new MutationObserver(() => this.requestUpdate());
    this.observer.observe(this, { attributes: true, attributeFilter: ['class'] });
  }

  override disconnectedCallback(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    super.disconnectedCallback();
  }

  /** Focus the underlying native anchor. */
  override focus(options?: FocusOptions): void {
    this.querySelector('a')?.focus(options);
  }

  private readonly onAnchorRef = (element: Element | undefined): void => {
    if (!element || !this.capturedNodes) return;
    element.replaceChildren(...this.capturedNodes);
  };

  protected override render() {
    const consumerClasses = this.getAttribute('class') ?? '';
    return html`<a
      ${ref(this.onAnchorRef)}
      data-slot="text-link"
      class=${cn(textLinkVariants({ variant: this.variant }), consumerClasses)}
      href=${this.href}
      target=${this.target || undefined}
      rel=${this.rel || undefined}
    ></a>`;
  }
}

if (!customElements.get('oc-link')) {
  customElements.define('oc-link', OcLink);
}
