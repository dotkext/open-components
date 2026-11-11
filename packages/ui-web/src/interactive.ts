import { OcElement } from './base';

/**
 * Shared behaviour for host-as-control elements (`oc-button`, `oc-icon-button`).
 * Handles role, disabled semantics, keyboard activation and click blocking.
 */
export abstract class OcActionElement extends OcElement {
  abstract disabled: boolean;

  protected actionRole = 'button';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', this.actionRole);
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this.addEventListener('keydown', this.onKeydown);
    this.addEventListener('click', this.onClickCapture, true);
    this.updateAccessibility();
  }

  override disconnectedCallback(): void {
    this.removeEventListener('keydown', this.onKeydown);
    this.removeEventListener('click', this.onClickCapture, true);
    super.disconnectedCallback();
  }

  protected override updated(): void {
    super.updated();
    this.updateAccessibility();
  }

  private updateAccessibility(): void {
    this.setAttribute('aria-disabled', String(this.disabled));
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
  }

  private readonly onClickCapture = (event: MouseEvent): void => {
    if (!this.disabled) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  private readonly onKeydown = (event: KeyboardEvent): void => {
    if (this.disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.click();
    }
  };
}
