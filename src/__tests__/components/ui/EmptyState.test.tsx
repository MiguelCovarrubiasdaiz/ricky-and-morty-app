import { render, screen } from '@testing-library/react'
import EmptyState from '@/components/ui/EmptyState'

describe('EmptyState Component', () => {
  it('renders with message', () => {
    render(<EmptyState message="No episodes found" />)
    
    expect(screen.getByText('No episodes found')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<EmptyState message="Custom empty state message" />)
    
    expect(screen.getByText('Custom empty state message')).toBeInTheDocument()
  })

  it('applies correct styling', () => {
    const { container } = render(<EmptyState message="Test message" />)
    
    const emptyState = container.firstChild as HTMLElement
    expect(emptyState).toHaveClass('text-center', 'py-12')
  })
})