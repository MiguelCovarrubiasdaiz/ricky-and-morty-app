import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharacterFilters from '@/components/CharacterFilters';

describe('CharacterFilters', () => {
  const mockOnSearchChange = jest.fn();
  const mockOnStatusChange = jest.fn();

  const defaultProps = {
    searchName: '',
    statusFilter: '',
    onSearchChange: mockOnSearchChange,
    onStatusChange: mockOnStatusChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render search input and status select', () => {
    render(<CharacterFilters {...defaultProps} />);

    expect(screen.getByPlaceholderText('Search by name...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('All statuses')).toBeInTheDocument();
  });

  it('should display initial values', () => {
    const props = {
      ...defaultProps,
      searchName: 'Rick',
      statusFilter: 'alive',
    };

    render(<CharacterFilters {...props} />);

    const searchInput = screen.getByPlaceholderText('Search by name...') as HTMLInputElement;
    const statusSelect = screen.getByRole('combobox') as HTMLSelectElement;

    expect(searchInput.value).toBe('Rick');
    expect(statusSelect.value).toBe('alive');
  });

  it('should call onSearchChange when typing in search input', async () => {
    const user = userEvent.setup();

    const localMockOnSearchChange = jest.fn();
    render(<CharacterFilters {...defaultProps} onSearchChange={localMockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText('Search by name...');

    await user.type(searchInput, 'Morty');

    expect(localMockOnSearchChange).toHaveBeenCalledTimes(5);
    const calls = localMockOnSearchChange.mock.calls.map((call) => call[0]);
    expect(calls).toContain('M');
    expect(calls).toContain('o');
    expect(calls).toContain('r');
    expect(calls).toContain('t');
    expect(calls).toContain('y');
  });

  it('should call onSearchChange when using fireEvent', () => {
    render(<CharacterFilters {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Search by name...');

    fireEvent.change(searchInput, { target: { value: 'Beth' } });

    expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
    expect(mockOnSearchChange).toHaveBeenCalledWith('Beth');
  });

  it('should call onStatusChange when selecting status', () => {
    render(<CharacterFilters {...defaultProps} />);

    const statusSelect = screen.getByRole('combobox');

    fireEvent.change(statusSelect, { target: { value: 'dead' } });

    expect(mockOnStatusChange).toHaveBeenCalledTimes(1);
    expect(mockOnStatusChange).toHaveBeenCalledWith('dead');
  });

  it('should have all status options available', () => {
    render(<CharacterFilters {...defaultProps} />);

    const statusSelect = screen.getByRole('combobox');
    const options = statusSelect.querySelectorAll('option');

    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent('All statuses');
    expect(options[0]).toHaveValue('');
    expect(options[1]).toHaveTextContent('Alive');
    expect(options[1]).toHaveValue('alive');
    expect(options[2]).toHaveTextContent('Dead');
    expect(options[2]).toHaveValue('dead');
    expect(options[3]).toHaveTextContent('Unknown');
    expect(options[3]).toHaveValue('unknown');
  });

  it('should handle special characters in search', () => {
    render(<CharacterFilters {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Search by name...');

    fireEvent.change(searchInput, { target: { value: 'Rick & Morty!' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('Rick & Morty!');
  });

  it('should maintain controlled input behavior', () => {
    const { rerender } = render(<CharacterFilters {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Search by name...') as HTMLInputElement;
    expect(searchInput.value).toBe('');

    rerender(<CharacterFilters {...defaultProps} searchName="Summer" />);
    expect(searchInput.value).toBe('Summer');
  });
});
