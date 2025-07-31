import {
  getCharacters,
  getCharacterById,
  getEpisodesForCharacter,
  getMultipleEpisodes,
  extractIdFromUrl,
} from '@/services/api';
import { Character, Episode } from '@/types/api';
import httpClient from '../../services/httpClient';

jest.mock('../../services/httpClient', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    setAuthToken: jest.fn(),
    removeAuthToken: jest.fn(),
    setHeader: jest.fn(),
    removeHeader: jest.fn(),
  },
}));

const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;

describe('API Service', () => {
  describe('HTTP Client configuration', () => {
    it('should have HTTP client with required methods', () => {
      expect(mockHttpClient).toBeDefined();
      expect(mockHttpClient.get).toBeDefined();
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCharacters', () => {
    const mockApiResponse = {
      info: {
        count: 826,
        pages: 42,
        next: 'https://rickandmortyapi.com/api/character?page=2',
        prev: null,
      },
      results: [
        {
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
        },
      ],
    };

    it('should fetch characters successfully', async () => {
      mockHttpClient.get.mockResolvedValueOnce(mockApiResponse);

      const result = await getCharacters(1);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/character?page=1');
      expect(result).toEqual(mockApiResponse);
    });

    it('should use default page 1', async () => {
      mockHttpClient.get.mockResolvedValueOnce(mockApiResponse);

      await getCharacters();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/character?page=1');
    });

    it('should include name parameter when provided', async () => {
      mockHttpClient.get.mockResolvedValueOnce(mockApiResponse);

      await getCharacters(1, 'Rick');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/character?page=1&name=Rick');
    });

    it('should include status parameter when provided', async () => {
      mockHttpClient.get.mockResolvedValueOnce(mockApiResponse);

      await getCharacters(1, undefined, 'alive');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/character?page=1&status=alive');
    });

    it('should include both name and status parameters when provided', async () => {
      mockHttpClient.get.mockResolvedValueOnce(mockApiResponse);

      await getCharacters(2, 'Morty', 'dead');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/character?page=2&name=Morty&status=dead');
    });
  });

  describe('getCharacterById', () => {
    const mockCharacter: Character = {
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

    it('should fetch character by ID successfully', async () => {
      mockHttpClient.get.mockResolvedValueOnce(mockCharacter);

      const result = await getCharacterById(1);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/character/1');
      expect(result).toEqual(mockCharacter);
    });

    it('should fetch different character by different ID', async () => {
      const mortyCharacter = { ...mockCharacter, id: 2, name: 'Morty Smith' };
      mockHttpClient.get.mockResolvedValueOnce(mortyCharacter);

      const result = await getCharacterById(2);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/character/2');
      expect(result).toEqual(mortyCharacter);
    });
  });

  describe('extractIdFromUrl', () => {
    it('should extract ID from episode URL', () => {
      expect(extractIdFromUrl('https://rickandmortyapi.com/api/episode/1')).toBe(1);
      expect(extractIdFromUrl('https://rickandmortyapi.com/api/episode/42')).toBe(42);
    });

    it('should handle invalid URLs', () => {
      expect(extractIdFromUrl('invalid-url')).toBe(0);
      expect(extractIdFromUrl('')).toBe(0);
    });
  });

  describe('getMultipleEpisodes', () => {
    const mockEpisodes: Episode[] = [
      {
        id: 1,
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        characters: ['https://rickandmortyapi.com/api/character/1'],
        url: 'https://rickandmortyapi.com/api/episode/1',
        created: '2017-11-10T12:56:33.798Z',
      },
      {
        id: 2,
        name: 'Lawnmower Dog',
        air_date: 'December 9, 2013',
        episode: 'S01E02',
        characters: ['https://rickandmortyapi.com/api/character/1'],
        url: 'https://rickandmortyapi.com/api/episode/2',
        created: '2017-11-10T12:56:33.916Z',
      },
    ];

    it('should return empty array for empty input', async () => {
      const result = await getMultipleEpisodes([]);
      expect(result).toEqual([]);
    });

    it('should fetch single episode when only one ID provided', async () => {
      mockHttpClient.get.mockResolvedValueOnce(mockEpisodes[0]);

      const result = await getMultipleEpisodes([1]);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/episode/1');
      expect(result).toEqual([mockEpisodes[0]]);
    });

    it('should fetch multiple episodes', async () => {
      mockHttpClient.get.mockResolvedValueOnce(mockEpisodes);

      const result = await getMultipleEpisodes([1, 2]);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/episode/1,2');
      expect(result).toEqual(mockEpisodes);
    });
  });

  describe('getEpisodesForCharacter', () => {
    const mockCharacter: Character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
      location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
      ],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z',
    };

    const mockEpisodes: Episode[] = [
      {
        id: 1,
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        characters: ['https://rickandmortyapi.com/api/character/1'],
        url: 'https://rickandmortyapi.com/api/episode/1',
        created: '2017-11-10T12:56:33.798Z',
      },
      {
        id: 2,
        name: 'Lawnmower Dog',
        air_date: 'December 9, 2013',
        episode: 'S01E02',
        characters: ['https://rickandmortyapi.com/api/character/1'],
        url: 'https://rickandmortyapi.com/api/episode/2',
        created: '2017-11-10T12:56:33.916Z',
      },
    ];

    it('should fetch episodes for character', async () => {
      mockHttpClient.get.mockResolvedValueOnce(mockEpisodes);

      const result = await getEpisodesForCharacter(mockCharacter);

      expect(mockHttpClient.get).toHaveBeenCalledWith('/episode/1,2');
      expect(result).toEqual(mockEpisodes);
    });

    it('should handle character with no episodes', async () => {
      const characterWithNoEpisodes = { ...mockCharacter, episode: [] };

      const result = await getEpisodesForCharacter(characterWithNoEpisodes);

      expect(result).toEqual([]);
      expect(mockHttpClient.get).not.toHaveBeenCalled();
    });
  });
});
