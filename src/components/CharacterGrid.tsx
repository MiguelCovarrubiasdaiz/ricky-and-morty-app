import { Character } from '@/types/api'
import CharacterCard from './CharacterCard'

interface CharacterGridProps {
  characters: Character[]
  selectedCharacter: Character | null
  onCharacterSelect: (character: Character) => void
}

export default function CharacterGrid({
  characters,
  selectedCharacter,
  onCharacterSelect,
}: CharacterGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          isSelected={selectedCharacter?.id === character.id}
          onClick={() => onCharacterSelect(character)}
        />
      ))}
    </div>
  )
}