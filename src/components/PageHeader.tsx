import { PageHeaderProps } from '@/types/components';

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-8 text-center">
      <h1 className="glow-text mb-2 text-3xl font-bold tracking-wider text-rick-green">{title}</h1>
      <p className="mx-auto max-w-2xl text-sm text-gray-300">{subtitle}</p>
    </header>
  );
}
