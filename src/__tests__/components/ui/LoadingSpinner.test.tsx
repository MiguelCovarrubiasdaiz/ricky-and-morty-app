import { render } from '@testing-library/react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders loading spinner', () => {
    const { container } = render(<LoadingSpinner />);

    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    const { container } = render(<LoadingSpinner />);

    const spinnerContainer = container.firstChild as HTMLElement;
    expect(spinnerContainer).toHaveClass(
      'animate-spin',
      'rounded-full',
      'border-b-2',
      'border-blue-600'
    );
  });
});
