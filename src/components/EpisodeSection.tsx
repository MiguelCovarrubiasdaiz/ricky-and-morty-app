import { sortEpisodesByNumber } from '@/utils/episodeFilters';
import Card from './ui/Card';
import LoadingSpinner from './ui/LoadingSpinner';
import EmptyState from './ui/EmptyState';
import EpisodeGrid from './EpisodeGrid';
import { EpisodeSectionProps } from '@/types/components';

export default function EpisodeSection({
  title,
  episodes,
  loading = false,
  emptyMessage = 'No episodes found',
}: EpisodeSectionProps) {
  const sortedEpisodes = sortEpisodesByNumber(episodes);

  if (loading) {
    return (
      <Card>
        <h3 className="mb-4 text-xl font-bold text-rick-green">{title}</h3>
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="mb-4 text-xl font-bold text-rick-green">{title}</h3>
      <div className="mb-2 text-sm text-gray-300">
        {sortedEpisodes.length} episode{sortedEpisodes.length !== 1 ? 's' : ''}
      </div>

      {sortedEpisodes.length === 0 ? (
        <EmptyState message={emptyMessage} />
      ) : (
        <EpisodeGrid episodes={sortedEpisodes} />
      )}
    </Card>
  );
}
