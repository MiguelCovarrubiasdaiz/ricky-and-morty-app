import { Episode } from '@/types/api'

interface EpisodeCardProps {
  episode: Episode
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <div className="bg-gray-800/40 rounded-lg border border-gray-600 hover:border-portal-blue/50 transition-colors duration-150 p-4 select-none">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-white text-sm leading-tight pr-2">
          {episode.name}
        </h3>
        <span className="bg-portal-blue/20 text-portal-blue border border-portal-blue/30 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
          {episode.episode}
        </span>
      </div>
      <div className="text-xs text-gray-300 mb-2">
        {episode.air_date}
      </div>
      <div className="text-xs text-gray-400">
        {episode.characters.length} character{episode.characters.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
