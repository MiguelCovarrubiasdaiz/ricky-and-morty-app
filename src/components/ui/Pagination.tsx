import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import Button from './Button';
import { PaginationProps } from '@/types/ui';

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
    <div className="flex items-center justify-between border-t border-rick-green/30 pt-4">
      <Button
        onClick={onPrevious}
        disabled={!canGoPrevious || loading}
        variant={canGoPrevious ? 'secondary' : 'ghost'}
        size="sm"
        className="flex items-center space-x-1"
      >
        <HiChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-300">Page</span>
        <span className="rounded border border-rick-green/30 bg-rick-green/10 px-2 py-1 text-sm font-medium text-rick-green">
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
        <HiChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
