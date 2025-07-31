import { Character } from '@/types/api';
import Image from 'next/image';
import { HiMapPin } from 'react-icons/hi2';
import { CharacterCardProps } from '@/types/components';

const getStatusColor = (status: Character['status']) => {
  switch (status) {
    case 'Alive':
      return 'bg-green-500';
    case 'Dead':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export default function CharacterCard({
  character,
  isSelected = false,
  isDisabled = false,
  onClick,
}: CharacterCardProps) {
  return (
    <div
      className={`relative select-none rounded-lg border-2 p-4 ${
        isDisabled
          ? 'cursor-not-allowed border-red-500/50 bg-gray-900/60 opacity-50'
          : isSelected
            ? 'selected-character cursor-pointer bg-gray-800/60'
            : 'character-hover cursor-pointer border-gray-600 bg-gray-800/40 hover:border-rick-green/50'
      }`}
      onClick={isDisabled ? undefined : onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="relative flex-shrink-0">
          <Image
            src={character.image}
            alt={character.name}
            width={60}
            height={60}
            className="rounded-lg object-cover"
          />
          <div
            className={`absolute -right-1 -top-1 h-4 w-4 rounded-full ${getStatusColor(character.status)} border-2 border-white shadow-sm`}
          ></div>
        </div>

        {/* Info Section - Right */}
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 truncate text-sm font-bold text-white">{character.name}</h3>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <p
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  character.status === 'Alive'
                    ? 'border border-rick-green/30 bg-rick-green/20 text-rick-green'
                    : character.status === 'Dead'
                      ? 'border border-red-500/30 bg-red-500/20 text-red-400'
                      : 'border border-morty-yellow/30 bg-morty-yellow/20 text-morty-yellow'
                }`}
              >
                {character.status}
              </p>
              <p className="truncate text-xs text-gray-300">{character.species}</p>
            </div>

            {character.location.name !== 'unknown' && character.location.name.length < 25 && (
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <HiMapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{character.location.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
