import CharacterCard from './CharacterCard';
import { CharacterGridProps } from '@/types/components';

export default function CharacterGrid({
  characters,
  selectedCharacter,
  otherSelectedCharacter,
  onCharacterSelect,
}: CharacterGridProps) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {characters.map((character) => {
        const isDisabled = otherSelectedCharacter?.id === character.id;
        return (
          <CharacterCard
            key={character.id}
            character={character}
            isSelected={selectedCharacter?.id === character.id}
            isDisabled={isDisabled}
            onClick={() => onCharacterSelect(character)}
          />
        );
      })}
    </div>
  );
}
