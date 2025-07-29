import { Episode } from '@/types/api'

interface EpisodeCardProps {
  episode: Episode
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-150 p-4 select-none">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight pr-2">
          {episode.name}
        </h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
          {episode.episode}
        </span>
      </div>
      <div className="text-xs text-gray-600 mb-2">
        {episode.air_date}
      </div>
      <div className="text-xs text-gray-500">
        {episode.characters.length} character{episode.characters.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
