import { render, screen } from '@testing-library/react';
import EpisodeAnalysisHeader from '../../components/EpisodeAnalysisHeader';

describe('EpisodeAnalysisHeader Component', () => {
  it('renders episode analysis title', () => {
    render(<EpisodeAnalysisHeader />);

    expect(screen.getByText('Episode Analysis')).toBeInTheDocument();
  });

  it('renders subtitle text', () => {
    render(<EpisodeAnalysisHeader />);

    expect(
      screen.getByText('Discover which episodes feature your selected characters')
    ).toBeInTheDocument();
  });

  it('has correct styling', () => {
    const { container } = render(<EpisodeAnalysisHeader />);

    const header = container.firstChild as HTMLElement;
    expect(header).toHaveClass('text-center');
  });
});
