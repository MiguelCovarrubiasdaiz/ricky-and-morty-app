import { Character } from '@/types/api'

interface SelectedCharacterBadgeProps {
  character: Character | null
  placeholder: string
}

export default function SelectedCharacterBadge({ character, placeholder }: SelectedCharacterBadgeProps) {
  return (
    <div className="mb-4 p-3 bg-gray-800/30 rounded-lg border border-rick-green/20">
      <p className="text-sm font-medium text-gray-200">
        Selected: <span className={character ? "text-rick-green" : "text-gray-400"}>{character ? character.name : placeholder}</span>
      </p>
    </div>
  )
}