export default function CharacterCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border   p-4">
      <div className="flex items-center space-x-3">
        <div className="h-[60px] w-[60px] flex-shrink-0 rounded-lg bg-gray-200"></div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>

          <div className="mb-1 flex items-center space-x-2">
            <div className="h-6 w-16 rounded-full bg-gray-200"></div>
            <div className="h-3 w-20 rounded bg-gray-200"></div>
          </div>

          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded bg-gray-200"></div>
            <div className="h-3 w-24 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
