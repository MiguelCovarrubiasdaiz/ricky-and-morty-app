import { ButtonProps } from '@/types/components';

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses =
    'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none group';

  const variantClasses = {
    primary:
      'bg-rick-green text-black hover:bg-rick-green/80 focus:ring-rick-green disabled:bg-rick-green/30 shadow-lg shadow-rick-green/20',
    secondary:
      'bg-gray-700 text-white hover:bg-gray-600 focus:ring-portal-blue disabled:bg-gray-800 shadow-sm border border-gray-600',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300 shadow-sm',
    ghost:
      'bg-transparent text-gray-300 hover:bg-gray-800/50 focus:ring-rick-green disabled:text-gray-500 border border-gray-600',
    scroll:
      'inline-flex items-center gap-2 border border-rick-green/50 bg-rick-green/20 text-rick-green hover:bg-rick-green/30 hover:shadow-lg hover:shadow-rick-green/20 focus:ring-rick-green',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
    disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer'
  } ${className}`;

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-current"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
