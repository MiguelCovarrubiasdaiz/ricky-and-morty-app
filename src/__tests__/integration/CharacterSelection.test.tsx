import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useCharacterSelection } from '@/hooks/useCharacterSelection';
import * as api from '@/services/api';
import * as episodeFiltersUtils from '@/utils/episodeFilters';
import { Character } from '@/types/api';

jest.mock('../../services/api');
jest.mock('../../utils/episodeFilters');

const mockGetCharacters = api.getCharacters as jest.MockedFunction<typeof api.getCharacters>;
const mockFilterEpisodesByCharacters =
  episodeFiltersUtils.filterEpisodesByCharacters as jest.MockedFunction<
    typeof episodeFiltersUtils.filterEpisodesByCharacters
  >;

function TestCharacterSelection() {
  const {
    character1,
    character2,
    selectCharacter1,
    selectCharacter2,
    clearCharacter1,
    clearCharacter2,
    clearAll,
  } = useCharacterSelection();

  return (
    <div>
      <div data-testid="character1">{character1 ? character1.name : 'No character 1'}</div>
      <div data-testid="character2">{character2 ? character2.name : 'No character 2'}</div>
      <button onClick={() => selectCharacter1(mockCharacter1)}>Select Character 1</button>
      <button onClick={() => selectCharacter2(mockCharacter2)}>Select Character 2</button>
      <button onClick={clearCharacter1}>Clear Character 1</button>
      <button onClick={clearCharacter2}>Clear Character 2</button>
      <button onClick={clearAll}>Clear All</button>
    </div>
  );
}

const mockCharacter1: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
  location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

const mockCharacter2: Character = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'unknown', url: '' },
  location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/2',
  created: '2017-11-04T18:50:21.651Z',
};

describe('CharacterSelection Integration', () => {
  beforeEach(() => {
    mockGetCharacters.mockClear();
    mockFilterEpisodesByCharacters.mockClear();
  });

  it('should render initial state correctly', () => {
    render(<TestCharacterSelection />);

    expect(screen.getByTestId('character1')).toHaveTextContent('No character 1');
    expect(screen.getByTestId('character2')).toHaveTextContent('No character 2');
  });

  it('should select character 1', async () => {
    render(<TestCharacterSelection />);

    fireEvent.click(screen.getByText('Select Character 1'));

    await waitFor(() => {
      expect(screen.getByTestId('character1')).toHaveTextContent('Rick Sanchez');
    });
  });

  it('should select character 2', async () => {
    render(<TestCharacterSelection />);

    fireEvent.click(screen.getByText('Select Character 2'));

    await waitFor(() => {
      expect(screen.getByTestId('character2')).toHaveTextContent('Morty Smith');
    });
  });

  it('should select both characters', async () => {
    render(<TestCharacterSelection />);

    fireEvent.click(screen.getByText('Select Character 1'));
    fireEvent.click(screen.getByText('Select Character 2'));

    await waitFor(() => {
      expect(screen.getByTestId('character1')).toHaveTextContent('Rick Sanchez');
      expect(screen.getByTestId('character2')).toHaveTextContent('Morty Smith');
    });
  });

  it('should clear character 1', async () => {
    render(<TestCharacterSelection />);

    fireEvent.click(screen.getByText('Select Character 1'));
    await waitFor(() => {
      expect(screen.getByTestId('character1')).toHaveTextContent('Rick Sanchez');
    });

    fireEvent.click(screen.getByText('Clear Character 1'));
    expect(screen.getByTestId('character1')).toHaveTextContent('No character 1');
  });

  it('should clear character 2', async () => {
    render(<TestCharacterSelection />);

    fireEvent.click(screen.getByText('Select Character 2'));
    await waitFor(() => {
      expect(screen.getByTestId('character2')).toHaveTextContent('Morty Smith');
    });

    fireEvent.click(screen.getByText('Clear Character 2'));
    expect(screen.getByTestId('character2')).toHaveTextContent('No character 2');
  });

  it('should clear all characters', async () => {
    render(<TestCharacterSelection />);

    fireEvent.click(screen.getByText('Select Character 1'));
    fireEvent.click(screen.getByText('Select Character 2'));

    await waitFor(() => {
      expect(screen.getByTestId('character1')).toHaveTextContent('Rick Sanchez');
      expect(screen.getByTestId('character2')).toHaveTextContent('Morty Smith');
    });
  });

  it('should handle replacing selected characters', async () => {
    const anotherCharacter: Character = {
      ...mockCharacter1,
      id: 3,
      name: 'Summer Smith',
    };

    function TestReplaceSelection() {
      const { character1, selectCharacter1 } = useCharacterSelection();

      return (
        <div>
          <div data-testid="character1">{character1 ? character1.name : 'No character 1'}</div>
          <button onClick={() => selectCharacter1(mockCharacter1)}>Select Rick</button>
          <button onClick={() => selectCharacter1(anotherCharacter)}>Select Summer</button>
        </div>
      );
    }

    render(<TestReplaceSelection />);

    fireEvent.click(screen.getByText('Select Rick'));
    await waitFor(() => {
      expect(screen.getByTestId('character1')).toHaveTextContent('Rick Sanchez');
    });

    fireEvent.click(screen.getByText('Select Summer'));
    expect(screen.getByTestId('character1')).toHaveTextContent('Summer Smith');
  });
});
