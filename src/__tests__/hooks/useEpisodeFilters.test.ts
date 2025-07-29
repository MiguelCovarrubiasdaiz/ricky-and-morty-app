import { renderHook, waitFor } from '@testing-library/react'
import { useEpisodeFilters } from '@/hooks/useEpisodeFilters'
import * as episodeFiltersUtils from '@/utils/episodeFilters'
import { Character } from '@/types/api'

jest.mock('../../utils/episodeFilters')
const mockFilterEpisodesByCharacters = episodeFiltersUtils.filterEpisodesByCharacters as jest.MockedFunction<typeof episodeFiltersUtils.filterEpisodesByCharacters>

describe('useEpisodeFilters', () => {
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

  const mockEpisodeFilters = {
    character1Only: [
      {
        id: 2,
        name: 'Lawnmower Dog',
        air_date: 'December 9, 2013',
        episode: 'S01E02',
        characters: ['https://rickandmortyapi.com/api/character/1'],
        url: 'https://rickandmortyapi.com/api/episode/2',
        created: '2017-11-10T12:56:33.916Z'
      }
    ],
    sharedEpisodes: [
      {
        id: 1,
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        characters: ['https://rickandmortyapi.com/api/character/1', 'https://rickandmortyapi.com/api/character/2'],
        url: 'https://rickandmortyapi.com/api/episode/1',
        created: '2017-11-10T12:56:33.798Z'
      }
    ],
    character2Only: []
  }

  beforeEach(() => {
    mockFilterEpisodesByCharacters.mockClear()
  })

  it('should initialize with empty filters when no characters provided', async () => {
    const { result } = renderHook(() => useEpisodeFilters(null, null))

    expect(result.current.episodeFilters).toEqual({
      character1Only: [],
      sharedEpisodes: [],
      character2Only: []
    })
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.hasAnyCharacter).toBe(false)
    expect(result.current.hasBothCharacters).toBe(false)
    expect(mockFilterEpisodesByCharacters).not.toHaveBeenCalled()
  })

  it('should filter episodes when characters are provided', async () => {
    mockFilterEpisodesByCharacters.mockResolvedValue(mockEpisodeFilters)

    const { result } = renderHook(() => useEpisodeFilters(mockCharacter1, mockCharacter2))

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(mockFilterEpisodesByCharacters).toHaveBeenCalledWith(mockCharacter1, mockCharacter2)
    expect(result.current.episodeFilters).toEqual(mockEpisodeFilters)
    expect(result.current.error).toBeNull()
    expect(result.current.hasAnyCharacter).toBe(true)
    expect(result.current.hasBothCharacters).toBe(true)
  })

  it('should handle only one character being provided', async () => {
    const singleCharacterFilters = {
      character1Only: mockEpisodeFilters.character1Only,
      sharedEpisodes: [],
      character2Only: []
    }
    mockFilterEpisodesByCharacters.mockResolvedValue(singleCharacterFilters)

    const { result } = renderHook(() => useEpisodeFilters(mockCharacter1, null))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(mockFilterEpisodesByCharacters).toHaveBeenCalledWith(mockCharacter1, null)
    expect(result.current.episodeFilters).toEqual(singleCharacterFilters)
    expect(result.current.hasAnyCharacter).toBe(true)
    expect(result.current.hasBothCharacters).toBe(false)
  })

  it('should handle API errors', async () => {
    mockFilterEpisodesByCharacters.mockRejectedValue(new Error('API Error'))

    const { result } = renderHook(() => useEpisodeFilters(mockCharacter1, mockCharacter2))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Error filtering episodes')
    expect(result.current.episodeFilters).toEqual({
      character1Only: [],
      sharedEpisodes: [],
      character2Only: []
    })
  })

  it('should update when characters change', async () => {
    mockFilterEpisodesByCharacters.mockResolvedValue(mockEpisodeFilters)

    const { result, rerender } = renderHook(
      ({ char1, char2 }: { char1: Character | null, char2: Character | null }) => 
        useEpisodeFilters(char1, char2),
      { initialProps: { char1: null, char2: null } }
    )

    expect(result.current.hasAnyCharacter).toBe(false)

    rerender({ char1: mockCharacter1, char2: mockCharacter2 })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(mockFilterEpisodesByCharacters).toHaveBeenCalledWith(mockCharacter1, mockCharacter2)
    expect(result.current.episodeFilters).toEqual(mockEpisodeFilters)
  })

  it('should clear filters when characters are removed', async () => {
    mockFilterEpisodesByCharacters.mockResolvedValue(mockEpisodeFilters)

    const { result, rerender } = renderHook(
      ({ char1, char2 }: { char1: Character | null, char2: Character | null }) => 
        useEpisodeFilters(char1, char2),
      { initialProps: { char1: mockCharacter1, char2: mockCharacter2 } }
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.episodeFilters).toEqual(mockEpisodeFilters)

    rerender({ char1: null, char2: null })

    expect(result.current.episodeFilters).toEqual({
      character1Only: [],
      sharedEpisodes: [],
      character2Only: []
    })
    expect(result.current.hasAnyCharacter).toBe(false)
  })
})