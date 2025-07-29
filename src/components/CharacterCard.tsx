import { Character } from '@/types/api'
import Image from 'next/image'
import { HiMapPin } from 'react-icons/hi2'

interface CharacterCardProps {
  character: Character
  isSelected?: boolean
  isDisabled?: boolean
  onClick?: () => void
}

const getStatusColor = (status: Character['status']) => {
  switch (status) {
    case 'Alive':
      return 'bg-green-500'
    case 'Dead':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

export default function CharacterCard({
  character,
  isSelected = false,
  isDisabled = false,
  onClick,
}: CharacterCardProps) {
  return (
    <div
      className={`relative p-4 rounded-lg select-none border-2 ${
        isDisabled
          ? 'bg-gray-900/60 border-red-500/50 cursor-not-allowed opacity-50'
          : isSelected
          ? 'selected-character bg-gray-800/60 cursor-pointer'
          : 'bg-gray-800/40 border-gray-600 hover:border-rick-green/50 cursor-pointer character-hover'
      }`}
      onClick={isDisabled ? undefined : onClick}
    >
      <div className="flex items-center space-x-3">
        {/* Image Section - Left */}
        <div className="relative flex-shrink-0">
          <Image
            src={character.image}
            alt={character.name}
            width={60}
            height={60}
            className="rounded-lg object-cover"
            priority={false}
          />
          <div
            className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(character.status)} border-2 border-white shadow-sm`}
          >
          </div>
        </div>

        {/* Info Section - Right */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-white mb-1 truncate">
            {character.name}
          </h3>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <p
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  character.status === 'Alive'
                    ? 'bg-rick-green/20 text-rick-green border border-rick-green/30'
                    : character.status === 'Dead'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-morty-yellow/20 text-morty-yellow border border-morty-yellow/30'
                }`}
              >
                {character.status}
              </p>
              <p className="text-xs text-gray-300 truncate">{character.species}</p>
            </div>
            
            {character.location.name !== 'unknown' && character.location.name.length < 25 && (
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <HiMapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{character.location.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
