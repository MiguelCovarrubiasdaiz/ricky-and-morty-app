export default function CharacterCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="flex items-center space-x-3">
        {/* Image skeleton */}
        <div className="w-[60px] h-[60px] bg-gray-200 rounded-lg flex-shrink-0"></div>
        
        {/* Content skeleton */}
        <div className="flex-1 min-w-0">
          {/* Name skeleton */}
          <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
          
          {/* Status and species skeleton */}
          <div className="flex items-center space-x-2 mb-1">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
          
          {/* Location skeleton */}
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  )
}