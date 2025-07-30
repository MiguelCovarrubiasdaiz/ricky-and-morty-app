import { CardProps } from '@/types/ui';

export default function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`rounded-lg border border-rick-green/30 bg-gray-900/80 shadow-lg shadow-rick-green/10 backdrop-blur-sm ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
