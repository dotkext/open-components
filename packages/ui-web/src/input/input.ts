import { html, LitElement } from 'lit';
import { inputClass } from '@open-components/core/input';
import { cn } from '@open-components/utils';

/**
 * `<oc-input>` renders a native `<input>` in the light DOM.
 * The host uses `display: contents` so consumer utilities apply to the input.
 */
export class OcInput extends LitElement {
  static properties = {
    value: { type: String },
    type: { type: String },
    placeholder: { type: String },
    name: { type: String },
    disabled: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
  };

  value = '';
  type = 'text';
  placeholder = '';
  name = '';
  disabled = false;
  required = false;

  private observer?: MutationObserver;

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.style.display = 'contents';
    this.observer = new MutationObserver(() => this.requestUpdate());
    this.observer.observe(this, { attributes: true, attributeFilter: ['class', 'aria-invalid'] });
  }

  override disconnectedCallback(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    super.disconnectedCallback();
  }

  /** Focus the underlying native input. */
  override focus(options?: FocusOptions): void {
    this.querySelector('input')?.focus(options);
  }

  private onInput = (event: Event): void => {
    this.value = (event.target as HTMLInputElement).value;
  };

  protected override render() {
    const consumerClasses = this.getAttribute('class') ?? '';
    return html`<input
      data-slot="input"
      class=${cn(inputClass, consumerClasses)}
      .value=${this.value}
      type=${this.type}
      placeholder=${this.placeholder}
      name=${this.name}
      ?disabled=${this.disabled}
      ?required=${this.required}
      @input=${this.onInput}
    />`;
  }
}

if (!customElements.get('oc-input')) {
  customElements.define('oc-input', OcInput);
}
