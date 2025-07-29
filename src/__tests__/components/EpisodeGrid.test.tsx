import { render, screen } from '@testing-library/react'
import EpisodeGrid from '@/components/EpisodeGrid'
import { Episode } from '@/types/api'

describe('EpisodeGrid Component', () => {
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

  it('renders episodes in grid layout', () => {
    render(<EpisodeGrid episodes={mockEpisodes} />)
    
    expect(screen.getByText('Pilot')).toBeInTheDocument()
    expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument()
  })

  it('applies correct grid styling', () => {
    const { container } = render(<EpisodeGrid episodes={mockEpisodes} />)
    
    const grid = container.firstChild as HTMLElement
    expect(grid).toHaveClass('grid')
  })

  it('handles empty episodes array', () => {
    const { container } = render(<EpisodeGrid episodes={[]} />)
    
    expect(container.firstChild).toBeInTheDocument()
  })
})