import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './button/button';
import { Badge } from './badge/badge';
import { Card, CardContent, CardHeader, CardTitle } from './card/card';
import { Input } from './input/input';
import { Label } from './label/label';
import { Alert, AlertDescription, AlertTitle } from './alert/alert';
import { Separator } from './separator/separator';
import { Skeleton } from './skeleton/skeleton';

describe('Button', () => {
  it('renders with the default variant classes', () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveClass('bg-primary', 'h-9');
  });

  it('applies variants', () => {
    render(<Button variant="outline" size="icon" aria-label="icon button" />);
    const button = screen.getByRole('button', { name: 'icon button' });
    expect(button).toHaveClass('bg-background', 'size-9');
  });

  it('merges consumer classes with tailwind-merge', () => {
    render(<Button className="bg-red-500 mt-4">Save</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-red-500', 'mt-4');
    expect(button).not.toHaveClass('bg-primary');
  });

  it('forwards native props and handlers', () => {
    const onClick = vi.fn();
    render(
      <Button type="submit" disabled onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
  });
});

describe('Badge', () => {
  it('renders variants', () => {
    render(<Badge variant="secondary">New</Badge>);
    expect(screen.getByText('New')).toHaveClass('bg-secondary');
  });
});

describe('Card', () => {
  it('renders shadcn-like structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
        <CardContent>Content</CardContent>
      </Card>,
    );
    expect(screen.getByText('Title')).toHaveAttribute('data-slot', 'card-title');
    expect(screen.getByText('Content')).toHaveAttribute('data-slot', 'card-content');
  });
});

describe('Input & Label', () => {
  it('renders a labelled input', () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="you@example.com" />
      </>,
    );
    expect(screen.getByLabelText('Email')).toHaveAttribute('placeholder', 'you@example.com');
  });
});

describe('Alert', () => {
  it('renders with role alert and variant', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something happened</AlertDescription>
      </Alert>,
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('text-destructive');
    expect(screen.getByText('Something happened')).toHaveAttribute(
      'data-slot',
      'alert-description',
    );
  });
});

describe('Separator & Skeleton', () => {
  it('renders orientation semantics', () => {
    render(<Separator orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders a skeleton placeholder', () => {
    const { container } = render(<Skeleton className="h-4 w-10" />);
    expect(container.firstElementChild).toHaveClass('animate-pulse');
  });
});
