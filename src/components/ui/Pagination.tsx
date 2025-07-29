import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
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
    <div className="flex items-center justify-between pt-4 border-t border-rick-green/30">
      <Button
        onClick={onPrevious}
        disabled={!canGoPrevious || loading}
        variant={canGoPrevious ? 'secondary' : 'ghost'}
        size="sm"
        className="flex items-center space-x-1"
      >
        <HiChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </Button>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-300">Page</span>
        <span className="text-sm font-medium text-rick-green bg-rick-green/10 border border-rick-green/30 px-2 py-1 rounded">
          {currentPage}
        </span>
        <span className="text-sm text-gray-300">of {totalPages}</span>
      </div>

      <Button
        onClick={onNext}
        disabled={!canGoNext || loading}
        variant={canGoNext ? 'secondary' : 'ghost'}
        size="sm"
        className="flex items-center space-x-1"
      >
        <span>Next</span>
        <HiChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}