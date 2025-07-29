import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

export default function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  )
}