import Button from './Button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
  canGoPrevious: boolean
  canGoNext: boolean
  loading?: boolean
}

export default function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  loading = false,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={onPrevious}
        disabled={!canGoPrevious || loading}
        variant={canGoPrevious ? 'primary' : 'ghost'}
        size="md"
      >
        Previous
      </Button>

      <span className="text-gray-600 font-medium select-none">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        onClick={onNext}
        disabled={!canGoNext || loading}
        variant={canGoNext ? 'primary' : 'ghost'}
        size="md"
      >
        Next
      </Button>
    </div>
  )
}