import { Character } from '@/types/api'
import { useCustomPagination } from '@/hooks/useCustomPagination'
import Card from './ui/Card'
import ErrorState from './ui/ErrorState'
import Pagination from './ui/Pagination'
import SelectedCharacterBadge from './SelectedCharacterBadge'
import CharacterGrid from './CharacterGrid'
import CharacterCardSkeleton from './ui/CharacterCardSkeleton'

interface CharacterSectionProps {
  title: string
  selectedCharacter: Character | null
  onCharacterSelect: (character: Character) => void
}

export default function CharacterSection({
  title,
  selectedCharacter,
  onCharacterSelect,
}: CharacterSectionProps) {
  const {
    characters,
    currentPage,
    totalPages,
    loading,
    error,
    goToNextPage,
    goToPreviousPage,
    retryFetch,
    canGoNext,
    canGoPrevious,
  } = useCustomPagination()

  if (error) {
    return (
      <Card>
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {title}
        </h2>
        <ErrorState
          message={error}
          onRetry={retryFetch}
        />
      </Card>
    )
  }

  return (
    <Card className="h-fit">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {title}
      </h2>

      <SelectedCharacterBadge 
        character={selectedCharacter} 
        placeholder="None selected"
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <CharacterCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <CharacterGrid
          characters={characters}
          selectedCharacter={selectedCharacter}
          onCharacterSelect={onCharacterSelect}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={goToPreviousPage}
        onNext={goToNextPage}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
        loading={loading}
      />
    </Card>
  )
}
