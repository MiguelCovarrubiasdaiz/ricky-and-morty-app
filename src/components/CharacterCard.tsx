import { Character } from '@/types/api'
import Image from 'next/image'
import { HiMapPin } from 'react-icons/hi2'

interface CharacterCardProps {
  character: Character
  isSelected?: boolean
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
  onClick,
}: CharacterCardProps) {
  return (
    <div
      className={`relative p-4 rounded-lg cursor-pointer transition-colors duration-150 select-none border ${
        isSelected
          ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200'
          : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
      } shadow-sm hover:shadow-md`}
      onClick={onClick}
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
          <h3 className="font-bold text-sm text-gray-800 mb-1 truncate">
            {character.name}
          </h3>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <p
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  character.status === 'Alive'
                    ? 'bg-green-100 text-green-700'
                    : character.status === 'Dead'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                }`}
              >
                {character.status}
              </p>
              <p className="text-xs text-gray-600 truncate">{character.species}</p>
            </div>
            
            {character.location.name !== 'unknown' && character.location.name.length < 25 && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
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
