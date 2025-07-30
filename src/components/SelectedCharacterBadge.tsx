import { SelectedCharacterBadgeProps } from '@/types/components';

export default function SelectedCharacterBadge({
  character,
  placeholder,
}: SelectedCharacterBadgeProps) {
  return (
    <div className="mb-4 rounded-lg border border-rick-green/20 bg-gray-800/30 p-3">
      <p className="text-sm font-medium text-gray-200">
        Selected:{' '}
        <span className={character ? 'text-rick-green' : 'text-gray-400'}>
          {character ? character.name : placeholder}
        </span>
      </p>
    </div>
  );
}
