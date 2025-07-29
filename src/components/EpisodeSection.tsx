import { Episode } from '@/types/api'
import { sortEpisodesByNumber } from '@/utils/episodeFilters'
import Card from './ui/Card'
import LoadingSpinner from './ui/LoadingSpinner'
import EmptyState from './ui/EmptyState'
import EpisodeGrid from './EpisodeGrid'

interface EpisodeSectionProps {
  title: string
  episodes: Episode[]
  loading?: boolean
  emptyMessage?: string
}

export default function EpisodeSection({
  title,
  episodes,
  loading = false,
  emptyMessage = 'No episodes found',
}: EpisodeSectionProps) {
  const sortedEpisodes = sortEpisodesByNumber(episodes)

  if (loading) {
    return (
      <Card>
        <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner />
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      <div className="mb-2 text-sm text-gray-600">
        {sortedEpisodes.length} episode{sortedEpisodes.length !== 1 ? 's' : ''}
      </div>

      {sortedEpisodes.length === 0 ? (
        <EmptyState message={emptyMessage} />
      ) : (
        <EpisodeGrid episodes={sortedEpisodes} />
      )}
    </Card>
  )
}
