import { Character } from '@/types/api'

interface SelectedCharacterBadgeProps {
  character: Character | null
  placeholder: string
}

export default function SelectedCharacterBadge({ character, placeholder }: SelectedCharacterBadgeProps) {
  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-sm font-medium text-gray-700">
        Selected: {character ? character.name : placeholder}
      </p>
    </div>
  )
}