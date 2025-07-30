import { useCustomPagination } from '@/hooks/useCustomPagination';
import Card from './ui/Card';
import ErrorState from './ui/ErrorState';
import Pagination from './ui/Pagination';
import SelectedCharacterBadge from './SelectedCharacterBadge';
import CharacterGrid from './CharacterGrid';
import CharacterCardSkeleton from './ui/CharacterCardSkeleton';
import { CharacterSectionProps } from '@/types/components';

export default function CharacterSection({
  title,
  selectedCharacter,
  otherSelectedCharacter,
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
  } = useCustomPagination();

  if (error) {
    return (
      <Card>
        <h2 className="mb-4 text-xl font-bold text-rick-green">{title}</h2>
        <ErrorState message={error} onRetry={retryFetch} />
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <h2 className="mb-4 text-xl font-bold text-rick-green">{title}</h2>

      <SelectedCharacterBadge character={selectedCharacter} placeholder="None selected" />

      {loading ? (
        <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <CharacterCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <CharacterGrid
          characters={characters}
          selectedCharacter={selectedCharacter}
          otherSelectedCharacter={otherSelectedCharacter}
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
  );
}
