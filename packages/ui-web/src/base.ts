import { LitElement } from 'lit';
import { cn } from '@open-components/utils';

/**
 * Base class for OpenComponents custom elements.
 *
 * Components render into the **light DOM** so that the consumer's Tailwind
 * stylesheet applies directly and `className` utilities can be merged with
 * tailwind-merge — exactly like shadcn/ui components.
 *
 * The variant classes are kept in sync on the host element while preserving any
 * classes provided by the consumer through the `class` attribute.
 */
export abstract class OcElement extends LitElement {
  private applied = new Set<string>();
  private syncing = false;
  private observer?: MutationObserver;

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  /** Classes contributed by the component's CVA variants. */
  protected abstract variantClasses(): string;

  override connectedCallback(): void {
    super.connectedCallback();
    this.observer = new MutationObserver(() => this.syncClasses());
    this.observer.observe(this, { attributes: true, attributeFilter: ['class'] });
    this.syncClasses();
  }

  override disconnectedCallback(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    super.disconnectedCallback();
  }

  /** Merge variant classes with the consumer's classes and write them to the host. */
  protected syncClasses(): void {
    if (this.syncing) return;
    const variant = this.variantClasses();
    const consumer = [...this.classList].filter((token) => !this.applied.has(token));
    const merged = cn(variant, consumer.join(' '));
    this.applied = new Set(variant.split(/\s+/).filter(Boolean));
    if (this.className === merged) return;
    this.syncing = true;
    this.className = merged;
    this.syncing = false;
  }

  protected override updated(): void {
    this.syncClasses();
  }
}
