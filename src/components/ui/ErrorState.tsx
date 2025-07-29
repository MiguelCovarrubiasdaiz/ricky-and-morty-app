import { HiExclamationTriangle } from 'react-icons/hi2'
import Button from './Button'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
  retryText?: string
}

export default function ErrorState({ 
  title = 'Something went wrong', 
  message, 
  onRetry, 
  retryText = 'Try again' 
}: ErrorStateProps) {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="rounded-full bg-red-100 p-3">
          <HiExclamationTriangle className="h-6 w-6 text-red-600" />
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-red-600 mb-6 max-w-sm mx-auto">
        {message}
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          {retryText}
        </Button>
      )}
    </div>
  )
}