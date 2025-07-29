import { Character } from '@/types/api'

interface SelectedCharacterBadgeProps {
  character: Character
}

export default function SelectedCharacterBadge({ character }: SelectedCharacterBadgeProps) {
  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
      <p className="text-sm font-medium text-blue-800">
        Selected: {character.name}
      </p>
    </div>
  )
}