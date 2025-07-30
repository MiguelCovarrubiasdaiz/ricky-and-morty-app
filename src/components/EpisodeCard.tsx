import { EpisodeCardProps } from '@/types/components';

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <div className="select-none rounded-lg border border-gray-600 bg-gray-800/40 p-4 transition-colors duration-150 hover:border-portal-blue/50">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="pr-2 text-sm font-semibold leading-tight text-white">{episode.name}</h3>
        <span className="whitespace-nowrap rounded-full border border-portal-blue/30 bg-portal-blue/20 px-2.5 py-1 text-xs font-medium text-portal-blue">
          {episode.episode}
        </span>
      </div>
      <div className="mb-2 text-xs text-gray-300">{episode.air_date}</div>
      <div className="text-xs text-gray-400">
        {episode.characters.length} character{episode.characters.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
