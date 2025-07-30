import { render, screen } from '@testing-library/react';
import EpisodeCard from '@/components/EpisodeCard';
import { Episode } from '@/types/api';

describe('EpisodeCard', () => {
  const mockEpisode: Episode = {
    id: 1,
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
    characters: [
      'https://rickandmortyapi.com/api/character/1',
      'https://rickandmortyapi.com/api/character/2',
      'https://rickandmortyapi.com/api/character/35',
    ],
    url: 'https://rickandmortyapi.com/api/episode/1',
    created: '2017-11-10T12:56:33.798Z',
  };

  it('should render episode information correctly', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    expect(screen.getByText('Pilot')).toBeInTheDocument();
    expect(screen.getByText('S01E01')).toBeInTheDocument();
    expect(screen.getByText('December 2, 2013')).toBeInTheDocument();
    expect(screen.getByText('3 characters')).toBeInTheDocument();
  });

  it('should render episode badge with correct styling', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    const episodeBadge = screen.getByText('S01E01');
    expect(episodeBadge).toHaveClass(
      'bg-portal-blue/20',
      'text-portal-blue',
      'border',
      'border-portal-blue/30',
      'text-xs',
      'font-medium',
      'px-2.5',
      'py-1',
      'rounded-full',
      'whitespace-nowrap'
    );
  });

  it('should handle single character correctly', () => {
    const singleCharacterEpisode: Episode = {
      ...mockEpisode,
      characters: ['https://rickandmortyapi.com/api/character/1'],
    };

    render(<EpisodeCard episode={singleCharacterEpisode} />);

    expect(screen.getByText('1 character')).toBeInTheDocument();
  });

  it('should handle no characters correctly', () => {
    const noCharacterEpisode: Episode = {
      ...mockEpisode,
      characters: [],
    };

    render(<EpisodeCard episode={noCharacterEpisode} />);

    expect(screen.getByText('0 characters')).toBeInTheDocument();
  });

  it('should handle many characters correctly', () => {
    const manyCharacterEpisode: Episode = {
      ...mockEpisode,
      characters: Array.from(
        { length: 15 },
        (_, i) => `https://rickandmortyapi.com/api/character/${i + 1}`
      ),
    };

    render(<EpisodeCard episode={manyCharacterEpisode} />);

    expect(screen.getByText('15 characters')).toBeInTheDocument();
  });

  it('should apply correct card styling', () => {
    const { container } = render(<EpisodeCard episode={mockEpisode} />);

    const card = container.firstChild;
    expect(card).toHaveClass(
      'bg-gray-800/40',
      'rounded-lg',
      'border',
      'border-gray-600',
      'hover:border-portal-blue/50',
      'transition-colors',
      'duration-150',
      'p-4',
      'select-none'
    );
  });

  it('should render episode name with correct styling', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    const episodeName = screen.getByText('Pilot');
    expect(episodeName).toHaveClass(
      'font-semibold',
      'text-white',
      'text-sm',
      'leading-tight',
      'pr-2'
    );
  });

  it('should render air date with correct styling', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    const airDate = screen.getByText('December 2, 2013');
    expect(airDate).toHaveClass('text-xs', 'text-gray-300', 'mb-2');
  });

  it('should render character count with correct styling', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    const characterCount = screen.getByText('3 characters');
    expect(characterCount).toHaveClass('text-xs', 'text-gray-400');
  });

  it('should handle long episode names correctly', () => {
    const longNameEpisode: Episode = {
      ...mockEpisode,
      name: 'This is a very long episode name that should be handled properly',
    };

    render(<EpisodeCard episode={longNameEpisode} />);

    expect(
      screen.getByText('This is a very long episode name that should be handled properly')
    ).toBeInTheDocument();
  });

  it('should render different episode formats correctly', () => {
    const differentFormats = [
      { ...mockEpisode, episode: 'S02E05', id: 5 },
      { ...mockEpisode, episode: 'S10E10', id: 10 },
      { ...mockEpisode, episode: 'Special', id: 99 },
    ];

    differentFormats.forEach((episode) => {
      const { unmount } = render(<EpisodeCard episode={episode} />);
      expect(screen.getByText(episode.episode)).toBeInTheDocument();
      unmount();
    });
  });

  it('should maintain layout structure', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    const headerSection = screen.getByText('Pilot').closest('div');
    expect(headerSection).toHaveClass('flex', 'items-start', 'justify-between', 'mb-3');

    const episodeBadge = screen.getByText('S01E01');
    expect(episodeBadge).toBeInTheDocument();

    const airDate = screen.getByText('December 2, 2013');
    expect(airDate).toBeInTheDocument();

    const characterCount = screen.getByText('3 characters');
    expect(characterCount).toBeInTheDocument();
  });
});
