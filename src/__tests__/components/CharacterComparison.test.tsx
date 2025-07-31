import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CharacterComparison from '@/components/CharacterComparison';
import { Character } from '@/types/api';

const mockCharacter1: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: '',
  created: '',
};

const mockCharacter2: Character = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Earth (Replacement Dimension)', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: '',
  created: '',
};

describe('CharacterComparison', () => {
  const mockOnClearSelection = jest.fn();

  beforeEach(() => {
    mockOnClearSelection.mockClear();
  });

  it('should return null when no characters are selected', () => {
    const { container } = render(
      <CharacterComparison
        character1={null}
        character2={null}
        onClearSelection={mockOnClearSelection}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should show validation message when only one character is selected', async () => {
    render(
      <CharacterComparison
        character1={mockCharacter1}
        character2={null}
        onClearSelection={mockOnClearSelection}
      />
    );

    expect(screen.getByText('Almost there! One more character needed')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText(/Please select a second character to compare/)).toBeInTheDocument();
  });

  it('should show validation message when second character is selected but first is not', async () => {
    render(
      <CharacterComparison
        character1={null}
        character2={mockCharacter2}
        onClearSelection={mockOnClearSelection}
      />
    );

    expect(screen.getByText('Almost there! One more character needed')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('should show comparison when both characters are selected', async () => {
    render(
      <CharacterComparison
        character1={mockCharacter1}
        character2={mockCharacter2}
        onClearSelection={mockOnClearSelection}
      />
    );

    await waitFor(
      () => {
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
        expect(screen.getByText('Morty Smith')).toBeInTheDocument();
        expect(screen.getByText('VS')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    const speciesElements = screen.getAllByText('Human');
    expect(speciesElements.length).toBeGreaterThanOrEqual(1);
  });

  it('should call onClearSelection when reset button is clicked in validation state', async () => {
    render(
      <CharacterComparison
        character1={mockCharacter1}
        character2={null}
        onClearSelection={mockOnClearSelection}
      />
    );

    const resetButton = screen.getByText('Reset Selection').closest('button');
    fireEvent.click(resetButton!);

    await waitFor(
      () => {
        expect(mockOnClearSelection).toHaveBeenCalledTimes(1);
      },
      { timeout: 700 }
    );
  });

  it('should call onClearSelection when "Select Other Characters" button is clicked', async () => {
    render(
      <CharacterComparison
        character1={mockCharacter1}
        character2={mockCharacter2}
        onClearSelection={mockOnClearSelection}
      />
    );

    await waitFor(() => {
      const selectOtherButton = screen.getByText('Select Other Characters').closest('button');
      fireEvent.click(selectOtherButton!);
    });

    await waitFor(
      () => {
        expect(mockOnClearSelection).toHaveBeenCalledTimes(1);
      },
      { timeout: 700 }
    );
  });

  it('should show character images with correct alt text', async () => {
    render(
      <CharacterComparison
        character1={mockCharacter1}
        character2={mockCharacter2}
        onClearSelection={mockOnClearSelection}
      />
    );

    await waitFor(() => {
      const rickImage = screen.getByAltText('Rick Sanchez');
      const mortyImage = screen.getByAltText('Morty Smith');

      expect(rickImage).toBeInTheDocument();
      expect(mortyImage).toBeInTheDocument();
    });
  });

  it('should show species information for both characters', async () => {
    render(
      <CharacterComparison
        character1={mockCharacter1}
        character2={mockCharacter2}
        onClearSelection={mockOnClearSelection}
      />
    );

    await waitFor(() => {
      const speciesElements = screen.getAllByText('Human');
      expect(speciesElements).toHaveLength(2);
    });
  });

  it('should handle transition from single to both characters correctly', async () => {
    const { rerender } = render(
      <CharacterComparison
        character1={mockCharacter1}
        character2={null}
        onClearSelection={mockOnClearSelection}
      />
    );

    expect(screen.getByText('Almost there! One more character needed')).toBeInTheDocument();

    rerender(
      <CharacterComparison
        character1={mockCharacter1}
        character2={mockCharacter2}
        onClearSelection={mockOnClearSelection}
      />
    );

    await waitFor(
      () => {
        expect(screen.getByText('VS')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});
