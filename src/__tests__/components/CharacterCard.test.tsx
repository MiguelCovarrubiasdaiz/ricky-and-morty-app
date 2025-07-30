import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCard from '@/components/CharacterCard';
import { Character } from '@/types/api';

describe('CharacterCard', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '',
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('should render character information correctly', () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();

    const image = screen.getByAltText('Rick Sanchez');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image);
  });

  it('should call onClick when clicked', () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);

    const card = screen.getByRole('img').closest('div');
    fireEvent.click(card!);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should apply selected styles when isSelected is true', () => {
    render(<CharacterCard character={mockCharacter} isSelected={true} onClick={mockOnClick} />);

    const card = screen.getByRole('img').closest('div[class*="selected-character"]');
    expect(card).toHaveClass('selected-character');
  });

  it('should apply disabled styles when isDisabled is true', () => {
    render(<CharacterCard character={mockCharacter} isDisabled={true} onClick={mockOnClick} />);

    const card = screen.getByRole('img').closest('div[class*="cursor-not-allowed"]');
    expect(card).toHaveClass('cursor-not-allowed', 'opacity-50');
  });

  it('should not call onClick when disabled', () => {
    render(<CharacterCard character={mockCharacter} isDisabled={true} onClick={mockOnClick} />);

    const card = screen.getByRole('img').closest('div');
    fireEvent.click(card!);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should render different status colors correctly', () => {
    const aliveCharacter = { ...mockCharacter, status: 'Alive' as const };
    const { rerender } = render(<CharacterCard character={aliveCharacter} onClick={mockOnClick} />);

    expect(screen.getByText('Alive')).toHaveClass('text-rick-green');

    const deadCharacter = { ...mockCharacter, status: 'Dead' as const };
    rerender(<CharacterCard character={deadCharacter} onClick={mockOnClick} />);

    expect(screen.getByText('Dead')).toHaveClass('text-red-400');

    const unknownCharacter = { ...mockCharacter, status: 'unknown' as const };
    rerender(<CharacterCard character={unknownCharacter} onClick={mockOnClick} />);

    expect(screen.getByText('unknown')).toHaveClass('text-morty-yellow');
  });

  it('should not render location when location is unknown', () => {
    const characterWithUnknownLocation = {
      ...mockCharacter,
      location: { name: 'unknown', url: '' },
    };

    render(<CharacterCard character={characterWithUnknownLocation} onClick={mockOnClick} />);

    expect(screen.queryByText('unknown')).not.toBeInTheDocument();
  });

  it('should not render location when location name is too long', () => {
    const characterWithLongLocation = {
      ...mockCharacter,
      location: { name: 'This is a very long location name that exceeds the limit', url: '' },
    };

    render(<CharacterCard character={characterWithLongLocation} onClick={mockOnClick} />);

    expect(
      screen.queryByText('This is a very long location name that exceeds the limit')
    ).not.toBeInTheDocument();
  });

  it('should render location icon when location is valid', () => {
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);

    const locationText = screen.getByText('Citadel of Ricks');
    expect(locationText).toBeInTheDocument();
  });

  it('should handle characters without onClick handler', () => {
    render(<CharacterCard character={mockCharacter} />);

    const card = screen.getByRole('img').closest('div');

    expect(() => fireEvent.click(card!)).not.toThrow();
  });

  it('should render with default props', () => {
    render(<CharacterCard character={mockCharacter} />);

    const card = screen.getByRole('img').closest('div[class*="cursor-pointer"]');
    expect(card).toHaveClass('cursor-pointer');
    expect(card).not.toHaveClass('selected-character');
    expect(card).not.toHaveClass('cursor-not-allowed');
  });
});
