import axios from 'axios'
import { getCharacters, getCharacterById, getEpisodesForCharacter, getMultipleEpisodes, extractIdFromUrl } from '@/services/api'
import { Character, Episode } from '@/types/api'


jest.mock('axios', () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }
  
  return {
    create: jest.fn(() => mockAxiosInstance),
    ...mockAxiosInstance
  }
})

const mockedAxios = axios as jest.Mocked<typeof axios>
const mockAxiosInstance = (mockedAxios.create as jest.Mock)()

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getCharacters', () => {
    const mockApiResponse = {
      info: {
        count: 826,
        pages: 42,
        next: 'https://rickandmortyapi.com/api/character?page=2',
        prev: null
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
          created: '2017-11-04T18:48:46.250Z'
        }
      ]
    }

    it('should fetch characters successfully', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockApiResponse })

      const result = await getCharacters(1)

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/character?page=1')
      expect(result).toEqual(mockApiResponse)
    })

    it('should use default page 1', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockApiResponse })

      await getCharacters()

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/character?page=1')
    })
  })

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
      created: '2017-11-04T18:48:46.250Z'
    }

    it('should fetch character by ID successfully', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockCharacter })

      const result = await getCharacterById(1)

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/character/1')
      expect(result).toEqual(mockCharacter)
    })

    it('should fetch different character by different ID', async () => {
      const mortyCharacter = { ...mockCharacter, id: 2, name: 'Morty Smith' }
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mortyCharacter })

      const result = await getCharacterById(2)

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/character/2')
      expect(result).toEqual(mortyCharacter)
    })
  })

  describe('extractIdFromUrl', () => {
    it('should extract ID from episode URL', () => {
      expect(extractIdFromUrl('https://rickandmortyapi.com/api/episode/1')).toBe(1)
      expect(extractIdFromUrl('https://rickandmortyapi.com/api/episode/42')).toBe(42)
    })

    it('should handle invalid URLs', () => {
      expect(extractIdFromUrl('invalid-url')).toBe(0)
      expect(extractIdFromUrl('')).toBe(0)
    })
  })

  describe('getMultipleEpisodes', () => {
    const mockEpisodes: Episode[] = [
      {
        id: 1,
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        characters: ['https://rickandmortyapi.com/api/character/1'],
        url: 'https://rickandmortyapi.com/api/episode/1',
        created: '2017-11-10T12:56:33.798Z'
      },
      {
        id: 2,
        name: 'Lawnmower Dog',
        air_date: 'December 9, 2013',
        episode: 'S01E02',
        characters: ['https://rickandmortyapi.com/api/character/1'],
        url: 'https://rickandmortyapi.com/api/episode/2',
        created: '2017-11-10T12:56:33.916Z'
      }
    ]

    it('should return empty array for empty input', async () => {
      const result = await getMultipleEpisodes([])
      expect(result).toEqual([])
    })

    it('should fetch single episode when only one ID provided', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockEpisodes[0] })

      const result = await getMultipleEpisodes([1])

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/episode/1')
      expect(result).toEqual([mockEpisodes[0]])
    })

    it('should fetch multiple episodes', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockEpisodes })

      const result = await getMultipleEpisodes([1, 2])

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/episode/1,2')
      expect(result).toEqual(mockEpisodes)
    })
  })

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
        'https://rickandmortyapi.com/api/episode/2'
      ],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z'
    }

    const mockEpisodes: Episode[] = [
      {
        id: 1,
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        characters: ['https://rickandmortyapi.com/api/character/1'],
        url: 'https://rickandmortyapi.com/api/episode/1',
        created: '2017-11-10T12:56:33.798Z'
      },
      {
        id: 2,
        name: 'Lawnmower Dog',
        air_date: 'December 9, 2013',
        episode: 'S01E02',
        characters: ['https://rickandmortyapi.com/api/character/1'],
        url: 'https://rickandmortyapi.com/api/episode/2',
        created: '2017-11-10T12:56:33.916Z'
      }
    ]

    it('should fetch episodes for character', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockEpisodes })

      const result = await getEpisodesForCharacter(mockCharacter)

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/episode/1,2')
      expect(result).toEqual(mockEpisodes)
    })

    it('should handle character with no episodes', async () => {
      const characterWithNoEpisodes = { ...mockCharacter, episode: [] }
      
      const result = await getEpisodesForCharacter(characterWithNoEpisodes)

      expect(result).toEqual([])
      expect(mockAxiosInstance.get).not.toHaveBeenCalled()
    })
  })
})