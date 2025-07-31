import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import NotFound from '@/app/not-found';

jest.mock('next/link', () => {
  const MockedLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockedLink.displayName = 'MockedLink';
  return MockedLink;
});

describe('NotFound', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render 404 page with all elements', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Dimension Not Found')).toBeInTheDocument();
    expect(
      screen.getByText(/Looks like you've wandered into an unknown dimension/)
    ).toBeInTheDocument();
    expect(screen.getByText('Return to Home Dimension')).toBeInTheDocument();
  });

  it('should have a link to home page', () => {
    render(<NotFound />);

    const homeLink = screen.getByRole('link');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should apply fade-in animation after 100ms', async () => {
    const { container } = render(<NotFound />);

    const mainContainer = container.querySelector('.transform');
    expect(mainContainer).toHaveClass('translate-y-8', 'scale-95', 'opacity-0');

    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(mainContainer).toHaveClass('translate-y-0', 'scale-100', 'opacity-100');
    });
  });

  it('should render icons', () => {
    render(<NotFound />);

    const warningIcon = screen.getByText('404').parentElement?.parentElement?.querySelector('svg');
    expect(warningIcon).toBeInTheDocument();

    const button = screen.getByText('Return to Home Dimension').parentElement;
    const homeIcon = button?.querySelector('svg');
    expect(homeIcon).toBeInTheDocument();
  });

  it('should clean up timer on unmount', () => {
    const { unmount } = render(<NotFound />);

    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });
});
