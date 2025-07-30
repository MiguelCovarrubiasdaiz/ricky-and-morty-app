import EpisodeCard from './EpisodeCard';
import { EpisodeGridProps } from '@/types/components';

export default function EpisodeGrid({ episodes }: EpisodeGridProps) {
  return (
    <div className="grid max-h-96   grid-cols-1 gap-4 overflow-y-auto">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  );
}
