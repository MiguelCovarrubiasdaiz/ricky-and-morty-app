import { Character } from '@/types/api'
import Image from 'next/image'

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
      className={`relative p-4 rounded-lg shadow-lg cursor-pointer transform transition-all duration-200 hover:scale-105 ${
        isSelected
          ? 'ring-4 ring-blue-500 bg-blue-50'
          : 'bg-white hover:shadow-xl'
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="relative">
          <Image
            src={character.image}
            alt={character.name}
            width={120}
            height={120}
            className="rounded-full object-cover"
            priority={false}
          />
          <div
            className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${getStatusColor(character.status)} border-2 border-white flex items-center justify-center`}
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-bold text-lg text-gray-800 mb-1">
            {character.name}
          </h3>
          <div className="space-y-1">
            <p
              className={`text-sm font-medium ${
                character.status === 'Alive'
                  ? 'text-green-600'
                  : character.status === 'Dead'
                    ? 'text-red-600'
                    : 'text-gray-600'
              }`}
            >
              {character.status}
            </p>
            <p className="text-sm text-gray-600">{character.species}</p>
          </div>
        </div>

        {character.location.name !== 'unknown' && (
          <div className="text-center">
            <p className="text-xs text-gray-500">Last known location:</p>
            <p className="text-xs font-medium text-gray-700">
              {character.location.name}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
