import { EmptyStateProps } from '@/types/ui';

export default function EmptyState({ title, message, icon, action }: EmptyStateProps) {
  return (
    <div className="py-12 text-center">
      {icon && <div className="mb-4 flex justify-center text-gray-400">{icon}</div>}

      {title && <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>}

      <p className="mx-auto mb-6 max-w-sm text-gray-500">{message}</p>

      {action && action}
    </div>
  );
}
