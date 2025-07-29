import { Episode } from '@/types/api'

interface EpisodeCardProps {
  episode: Episode
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 border border-gray-200 select-none">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-800 text-sm leading-tight">
          {episode.name}
        </h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full ml-2 whitespace-nowrap">
          {episode.episode}
        </span>
      </div>
      <div className="text-xs text-gray-600 mb-2">
        Air Date: {episode.air_date}
      </div>
      <div className="text-xs text-gray-500">
        {episode.characters.length} character
        {episode.characters.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
