import { ReactNode } from 'react'

interface EmptyStateProps {
  title?: string
  message: string
  icon?: ReactNode
  action?: ReactNode
}

export default function EmptyState({ title, message, icon, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {icon && (
        <div className="flex justify-center mb-4 text-gray-400">
          {icon}
        </div>
      )}
      
      {title && (
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {title}
        </h3>
      )}
      
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        {message}
      </p>
      
      {action && action}
    </div>
  )
}