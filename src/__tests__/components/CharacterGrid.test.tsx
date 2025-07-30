import { render, screen, fireEvent } from '@testing-library/react';
import CharacterGrid from '@/components/CharacterGrid';
import { Character } from '@/types/api';

describe('CharacterGrid', () => {
  const mockCharacters: Character[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [],
      url: '',
      created: '',
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: [],
      url: '',
      created: '',
    },
    {
      id: 3,
      name: 'Summer Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Female',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
      episode: [],
      url: '',
      created: '',
    },
  ];

  const mockOnCharacterSelect = jest.fn();

  beforeEach(() => {
    mockOnCharacterSelect.mockClear();
  });

  it('should render all characters', () => {
    render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={null}
        otherSelectedCharacter={null}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('Summer Smith')).toBeInTheDocument();
  });

  it('should apply grid layout classes', () => {
    const { container } = render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={null}
        otherSelectedCharacter={null}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'gap-2', 'mb-4');
  });

  it('should call onCharacterSelect when a character is clicked', () => {
    render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={null}
        otherSelectedCharacter={null}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    const rickCard = screen.getByText('Rick Sanchez').closest('div');
    fireEvent.click(rickCard!);

    expect(mockOnCharacterSelect).toHaveBeenCalledWith(mockCharacters[0]);
  });

  it('should mark selected character as selected', () => {
    render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={mockCharacters[0]}
        otherSelectedCharacter={null}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    const rickCard = screen.getByText('Rick Sanchez').closest('div[class*="selected-character"]');
    expect(rickCard).toHaveClass('selected-character');
  });

  it('should mark other selected character as disabled', () => {
    render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={null}
        otherSelectedCharacter={mockCharacters[1]}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    const mortyCard = screen.getByText('Morty Smith').closest('div[class*="cursor-not-allowed"]');
    expect(mortyCard).toHaveClass('cursor-not-allowed', 'opacity-50');
  });

  it('should not disable character that is not selected in other slot', () => {
    render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={null}
        otherSelectedCharacter={mockCharacters[1]}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    const rickCard = screen.getByText('Rick Sanchez').closest('div');
    const summerCard = screen.getByText('Summer Smith').closest('div');

    expect(rickCard).not.toHaveClass('cursor-not-allowed', 'opacity-50');
    expect(summerCard).not.toHaveClass('cursor-not-allowed', 'opacity-50');
  });

  it('should handle empty characters array', () => {
    const { container } = render(
      <CharacterGrid
        characters={[]}
        selectedCharacter={null}
        otherSelectedCharacter={null}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    const gridContainer = container.firstChild;
    expect(gridContainer?.childNodes).toHaveLength(0);
  });

  it('should handle both selected and disabled states correctly', () => {
    render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={mockCharacters[0]}
        otherSelectedCharacter={mockCharacters[1]}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    const rickCard = screen.getByText('Rick Sanchez').closest('div[class*="selected-character"]');
    const mortyCard = screen.getByText('Morty Smith').closest('div[class*="cursor-not-allowed"]');
    const summerCard = screen.getByText('Summer Smith').closest('div[class*="bg-gray-800"]');

    // Rick should be selected (not disabled)
    expect(rickCard).toHaveClass('selected-character');
    expect(rickCard).not.toHaveClass('cursor-not-allowed', 'opacity-50');

    // Morty should be disabled (selected in other slot)
    expect(mortyCard).toHaveClass('cursor-not-allowed', 'opacity-50');
    expect(mortyCard).not.toHaveClass('selected-character');

    // Summer should be normal
    expect(summerCard).not.toHaveClass('selected-character');
    expect(summerCard).not.toHaveClass('cursor-not-allowed', 'opacity-50');
  });

  it('should render correct number of characters', () => {
    render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={null}
        otherSelectedCharacter={null}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    const characterImages = screen.getAllByRole('img');
    expect(characterImages).toHaveLength(mockCharacters.length);
  });

  it('should pass correct props to each CharacterCard', () => {
    render(
      <CharacterGrid
        characters={mockCharacters}
        selectedCharacter={mockCharacters[0]}
        otherSelectedCharacter={mockCharacters[1]}
        onCharacterSelect={mockOnCharacterSelect}
      />
    );

    mockCharacters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
  });
});
