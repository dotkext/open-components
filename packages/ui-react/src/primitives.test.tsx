import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Switch } from './switch/switch';
import { Progress } from './progress/progress';
import { IconButton } from './icon-button/icon-button';
import { Kbd } from './kbd/kbd';
import { TextLink } from './text-link/text-link';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet/sheet';

describe('Switch', () => {
  it('toggles uncontrolled state', () => {
    render(<Switch aria-label="Notifications" />);
    const control = screen.getByRole('switch', { name: 'Notifications' });

    expect(control).toHaveAttribute('aria-checked', 'false');
    expect(control).toHaveAttribute('data-state', 'unchecked');

    fireEvent.click(control);
    expect(control).toHaveAttribute('aria-checked', 'true');
    expect(control).toHaveAttribute('data-state', 'checked');
  });

  it('supports controlled state', () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Notifications" checked={false} onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole('switch');

    fireEvent.click(control);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(control).toHaveAttribute('aria-checked', 'false');
  });

  it('does not toggle when disabled', () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Notifications" disabled onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole('switch'));

    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});

describe('Progress', () => {
  it('exposes value semantics and clamps the indicator', () => {
    render(<Progress value={150} max={100} aria-label="Upload" />);
    const progress = screen.getByRole('progressbar');

    expect(progress).toHaveAttribute('aria-valuenow', '100');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
    expect(progress.querySelector('[data-slot="progress-indicator"]')).toHaveStyle({
      width: '100%',
    });
  });

  it('supports custom maxima', () => {
    render(<Progress value={2} max={4} aria-label="Steps" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '4');
  });
});

describe('IconButton', () => {
  it('renders a native button with variants', () => {
    render(
      <IconButton aria-label="Close" variant="outline" size="sm">
        ×
      </IconButton>,
    );
    const button = screen.getByRole('button', { name: 'Close' });
    expect(button).toHaveClass('size-7', 'border');
    expect(button).toHaveAttribute('type', 'button');
  });
});

describe('Kbd & TextLink', () => {
  it('renders keycaps', () => {
    render(<Kbd>Esc</Kbd>);
    expect(screen.getByText('Esc')).toHaveAttribute('data-slot', 'kbd');
  });

  it('renders links with variants', () => {
    render(
      <TextLink href="#details" variant="muted">
        Details
      </TextLink>,
    );
    const link = screen.getByRole('link', { name: 'Details' });
    expect(link).toHaveAttribute('href', '#details');
    expect(link).toHaveClass('text-muted-foreground');
  });
});

describe('Sheet', () => {
  function Example() {
    return (
      <Sheet>
        <SheetTrigger>Open settings</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>Manage your preferences.</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose>Done</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  it('opens from the trigger and closes on Escape', () => {
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Open settings' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByText('Manage your preferences.')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes with SheetClose', () => {
    render(<Example />);
    fireEvent.click(screen.getByRole('button', { name: 'Open settings' }));
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
