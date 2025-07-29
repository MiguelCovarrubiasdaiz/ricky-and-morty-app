interface PageHeaderProps {
  title: string
  subtitle: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="text-center mb-12">
      <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
        {title}
      </h1>
      <p className="text-xl text-white/90 drop-shadow">
        {subtitle}
      </p>
    </header>
  )
}