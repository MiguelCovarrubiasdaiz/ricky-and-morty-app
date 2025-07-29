interface PageHeaderProps {
  title: string
  subtitle: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl font-bold text-rick-green mb-2 tracking-wider glow-text">
        {title}
      </h1>
      <p className="text-sm text-gray-300 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </header>
  )
}