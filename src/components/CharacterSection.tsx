import { Character } from '@/types/api'
import { useCharacters } from '@/hooks/useCharacters'
import Card from './ui/Card'
import LoadingSpinner from './ui/LoadingSpinner'
import ErrorState from './ui/ErrorState'
import Pagination from './ui/Pagination'
import SelectedCharacterBadge from './SelectedCharacterBadge'
import CharacterGrid from './CharacterGrid'

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
  } = useCharacters()

  if (loading) {
    return (
      <Card>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {title}
        </h2>
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
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
    <Card>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {title}
      </h2>

      {selectedCharacter && (
        <SelectedCharacterBadge character={selectedCharacter} />
      )}

      <CharacterGrid
        characters={characters}
        selectedCharacter={selectedCharacter}
        onCharacterSelect={onCharacterSelect}
      />

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
