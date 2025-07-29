import { Episode } from '@/types/api'
import EpisodeCard from './EpisodeCard'

interface EpisodeGridProps {
  episodes: Episode[]
}

export default function EpisodeGrid({ episodes }: EpisodeGridProps) {
  return (
    <div className="grid grid-cols-1   gap-4 max-h-96 overflow-y-auto">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  )
}