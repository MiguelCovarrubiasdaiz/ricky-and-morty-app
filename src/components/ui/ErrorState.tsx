import { HiExclamationTriangle } from 'react-icons/hi2';
import Button from './Button';
import { ErrorStateProps } from '@/types/ui';

export default function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryText = 'Try again',
}: ErrorStateProps) {
  return (
    <div className="py-12 text-center">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full bg-red-100 p-3">
          <HiExclamationTriangle className="h-6 w-6 text-red-600" />
        </div>
      </div>

      <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>

      <p className="mx-auto mb-6 max-w-sm text-red-600">{message}</p>

      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          {retryText}
        </Button>
      )}
    </div>
  );
}
