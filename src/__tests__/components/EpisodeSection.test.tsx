import { render, screen } from '@testing-library/react'
import EpisodeSection from '@/components/EpisodeSection'
import { Episode } from '@/types/api'
import * as episodeFiltersUtils from '@/utils/episodeFilters'

jest.mock('../../utils/episodeFilters')
const mockSortEpisodesByNumber = episodeFiltersUtils.sortEpisodesByNumber as jest.MockedFunction<typeof episodeFiltersUtils.sortEpisodesByNumber>

describe('EpisodeSection', () => {
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

  beforeEach(() => {
    mockSortEpisodesByNumber.mockClear()
    mockSortEpisodesByNumber.mockImplementation((episodes) => episodes)
  })

  it('renders title correctly', () => {
    render(
      <EpisodeSection 
        title="Test Episodes" 
        episodes={mockEpisodes}
      />
    )

    expect(screen.getByText('Test Episodes')).toBeInTheDocument()
  })

  it('calls sortEpisodesByNumber with episodes', () => {
    render(
      <EpisodeSection 
        title="Test Episodes" 
        episodes={mockEpisodes}
      />
    )

    expect(mockSortEpisodesByNumber).toHaveBeenCalledWith(mockEpisodes)
  })

  it('displays episode count for multiple episodes', () => {
    render(
      <EpisodeSection 
        title="Test Episodes" 
        episodes={mockEpisodes}
      />
    )

    expect(screen.getByText('2 episodes')).toBeInTheDocument()
  })

  it('displays episode count for single episode', () => {
    render(
      <EpisodeSection 
        title="Test Episodes" 
        episodes={[mockEpisodes[0]]}
      />
    )

    expect(screen.getByText('1 episode')).toBeInTheDocument()
  })

  it('renders loading state when loading is true', () => {
    const { container } = render(
      <EpisodeSection 
        title="Test Episodes" 
        episodes={mockEpisodes}
        loading={true}
      />
    )

    expect(screen.getByText('Test Episodes')).toBeInTheDocument()
    expect(container.querySelector('.animate-spin')).toBeInTheDocument() // LoadingSpinner
    expect(screen.queryByText('2 episodes')).not.toBeInTheDocument()
  })

  it('renders empty state when no episodes', () => {
    render(
      <EpisodeSection 
        title="Test Episodes" 
        episodes={[]}
      />
    )

    expect(screen.getByText('Test Episodes')).toBeInTheDocument()
    expect(screen.getByText('0 episodes')).toBeInTheDocument()
    expect(screen.getByText('No episodes found')).toBeInTheDocument()
  })

  it('renders custom empty message', () => {
    render(
      <EpisodeSection 
        title="Test Episodes" 
        episodes={[]}
        emptyMessage="Custom empty message"
      />
    )

    expect(screen.getByText('Custom empty message')).toBeInTheDocument()
    expect(screen.queryByText('No episodes found')).not.toBeInTheDocument()
  })

  it('renders EpisodeGrid when episodes exist', () => {
    render(
      <EpisodeSection 
        title="Test Episodes" 
        episodes={mockEpisodes}
      />
    )

    expect(screen.getByText('Test Episodes')).toBeInTheDocument()
    expect(screen.getByText('2 episodes')).toBeInTheDocument()
    // The EpisodeGrid should render the episodes
    expect(screen.getByText('Pilot')).toBeInTheDocument()
    expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument()
  })

  it('uses default loading prop when not provided', () => {
    const { container } = render(
      <EpisodeSection 
        title="Test Episodes" 
        episodes={mockEpisodes}
      />
    )

    // Should not show loading spinner by default
    expect(container.querySelector('.animate-spin')).not.toBeInTheDocument()
    expect(screen.getByText('2 episodes')).toBeInTheDocument()
  })

  it('uses default emptyMessage when not provided', () => {
    render(
      <EpisodeSection 
        title="Test Episodes" 
        episodes={[]}
      />
    )

    expect(screen.getByText('No episodes found')).toBeInTheDocument()
  })

  it('handles sorted episodes from sortEpisodesByNumber', () => {
    const sortedEpisodes = [mockEpisodes[1], mockEpisodes[0]] // Reversed order
    mockSortEpisodesByNumber.mockReturnValue(sortedEpisodes)

    render(
      <EpisodeSection 
        title="Test Episodes" 
        episodes={mockEpisodes}
      />
    )

    expect(mockSortEpisodesByNumber).toHaveBeenCalledWith(mockEpisodes)
    expect(screen.getByText('2 episodes')).toBeInTheDocument()
  })
})