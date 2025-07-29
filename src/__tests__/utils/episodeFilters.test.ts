import { filterEpisodesByCharacters, sortEpisodesByNumber } from '@/utils/episodeFilters'
import * as api from '@/services/api'
import { Character, Episode } from '@/types/api'

jest.mock('../../services/api')
const mockGetEpisodesForCharacter = api.getEpisodesForCharacter as jest.MockedFunction<typeof api.getEpisodesForCharacter>

describe('episodeFilters', () => {
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
    episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z'
  }

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
    created: '2017-11-04T18:50:21.651Z'
  }

  const mockEpisodes: Episode[] = [
    {
      id: 1,
      name: 'Pilot',
      air_date: 'December 2, 2013',
      episode: 'S01E01',
      characters: [
        'https://rickandmortyapi.com/api/character/1',
        'https://rickandmortyapi.com/api/character/2'
      ],
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

  beforeEach(() => {
    mockGetEpisodesForCharacter.mockClear()
  })

  describe('filterEpisodesByCharacters', () => {
    it('should return empty filters when both characters are null', async () => {
      const result = await filterEpisodesByCharacters(null, null)

      expect(result).toEqual({
        character1Only: [],
        sharedEpisodes: [],
        character2Only: [],
      })
      expect(mockGetEpisodesForCharacter).not.toHaveBeenCalled()
    })

    it('should handle only character1 being provided', async () => {
      mockGetEpisodesForCharacter.mockResolvedValueOnce([mockEpisodes[0], mockEpisodes[1]])

      const result = await filterEpisodesByCharacters(mockCharacter1, null)

      expect(mockGetEpisodesForCharacter).toHaveBeenCalledWith(mockCharacter1)
      expect(result).toEqual({
        character1Only: [mockEpisodes[0], mockEpisodes[1]],
        sharedEpisodes: [],
        character2Only: [],
      })
    })

    it('should handle only character2 being provided', async () => {
      mockGetEpisodesForCharacter.mockResolvedValueOnce([mockEpisodes[0]])

      const result = await filterEpisodesByCharacters(null, mockCharacter2)

      expect(mockGetEpisodesForCharacter).toHaveBeenCalledWith(mockCharacter2)
      expect(result).toEqual({
        character1Only: [],
        sharedEpisodes: [],
        character2Only: [mockEpisodes[0]],
      })
    })

    it('should filter episodes correctly for both characters', async () => {
      mockGetEpisodesForCharacter
        .mockResolvedValueOnce([mockEpisodes[0], mockEpisodes[1]]) // character1
        .mockResolvedValueOnce([mockEpisodes[0]]) // character2

      const result = await filterEpisodesByCharacters(mockCharacter1, mockCharacter2)

      expect(mockGetEpisodesForCharacter).toHaveBeenCalledTimes(2)
      expect(result).toEqual({
        character1Only: [mockEpisodes[1]],
        sharedEpisodes: [mockEpisodes[0]],
        character2Only: [],
      })
    })
  })

  describe('sortEpisodesByNumber', () => {
    it('should sort episodes by season and episode number', () => {
      const unsortedEpisodes: Episode[] = [
        { ...mockEpisodes[0], episode: 'S02E01' },
        { ...mockEpisodes[0], episode: 'S01E02' },
        { ...mockEpisodes[0], episode: 'S01E01' },
        { ...mockEpisodes[0], episode: 'S02E02' },
      ]

      const result = sortEpisodesByNumber(unsortedEpisodes)

      expect(result.map(ep => ep.episode)).toEqual(['S01E01', 'S01E02', 'S02E01', 'S02E02'])
    })

    it('should handle invalid episode formats', () => {
      const episodes: Episode[] = [
        { ...mockEpisodes[0], episode: 'Special' },
        { ...mockEpisodes[0], episode: 'S01E01' },
      ]

      const result = sortEpisodesByNumber(episodes)

      expect(result).toHaveLength(2)
    })
  })
})