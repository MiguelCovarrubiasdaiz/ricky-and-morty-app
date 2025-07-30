import { render, screen } from '@testing-library/react';
import SelectedCharacterBadge from '@/components/SelectedCharacterBadge';
import { Character } from '@/types/api';

describe('SelectedCharacterBadge Component', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  };

  it('renders selected character name', () => {
    render(<SelectedCharacterBadge character={mockCharacter} placeholder="None selected" />);

    expect(screen.getByText('Selected:')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('renders placeholder when no character', () => {
    render(<SelectedCharacterBadge character={null} placeholder="None selected" />);

    expect(screen.getByText('Selected:')).toBeInTheDocument();
    expect(screen.getByText('None selected')).toBeInTheDocument();
  });
});
