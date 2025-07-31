import { render, screen, fireEvent } from '@testing-library/react';
import WelcomeMessage from '@/components/WelcomeMessage';

const mockScrollIntoView = jest.fn();
Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  configurable: true,
  value: mockScrollIntoView,
});

describe('WelcomeMessage Component', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear();
  });

  it('renders welcome message', () => {
    render(<WelcomeMessage />);

    expect(screen.getByText('Welcome to the Multiverse!')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Select characters below to explore their episodes and discover interdimensional connections.'
      )
    ).toBeInTheDocument();
  });

  it('renders portal tip', () => {
    render(<WelcomeMessage />);

    expect(screen.getByText('Portal Tip:')).toBeInTheDocument();
    expect(
      screen.getByText('Select two characters to see their shared adventures!')
    ).toBeInTheDocument();
  });

  it('renders select characters button', () => {
    render(<WelcomeMessage />);

    const selectButton = screen.getByRole('button', { name: /select characters/i });
    expect(selectButton).toBeInTheDocument();
  });

  it('calls scrollIntoView when button is clicked', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'characters-section';
    const mockGetElementById = jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    render(<WelcomeMessage />);

    const selectButton = screen.getByRole('button', { name: /select characters/i });
    fireEvent.click(selectButton);

    expect(document.getElementById).toHaveBeenCalledWith('characters-section');
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });

    mockGetElementById.mockRestore();
  });

  it('handles click when element is not found', () => {
    const mockGetElementById = jest.spyOn(document, 'getElementById').mockReturnValue(null);

    render(<WelcomeMessage />);

    const selectButton = screen.getByRole('button', { name: /select characters/i });

    expect(() => fireEvent.click(selectButton)).not.toThrow();
    expect(mockScrollIntoView).not.toHaveBeenCalled();

    mockGetElementById.mockRestore();
  });

  it('renders check circle icon', () => {
    render(<WelcomeMessage />);

    const iconContainer = screen.getByText('Welcome to the Multiverse!').previousElementSibling;
    expect(iconContainer).toBeInTheDocument();
  });

  it('has correct styling classes', () => {
    render(<WelcomeMessage />);

    const container = screen.getByText('Welcome to the Multiverse!').closest('div');
    expect(container).toHaveClass(
      ' mx-auto max-w-md rounded-lg border border-rick-green/30 bg-gray-900/80 p-6 shadow-lg shadow-rick-green/10 backdrop-blur-sm'
    );
  });

  it('renders sparkles icon in portal tip', () => {
    render(<WelcomeMessage />);

    const portalTip = screen.getByText('Portal Tip:');
    expect(portalTip).toBeInTheDocument();
    expect(portalTip).toHaveClass('text-portal-blue');
  });
});
