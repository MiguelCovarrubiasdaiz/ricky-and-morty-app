import { render } from '@testing-library/react'
import Card from '@/components/ui/Card'

describe('Card Component', () => {
  it('renders children correctly', () => {
    const { container } = render(
      <Card>
        <div>Card Content</div>
      </Card>
    )
    
    expect(container.textContent).toContain('Card Content')
  })

  it('applies correct base classes', () => {
    const { container } = render(<Card>Content</Card>)
    
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('bg-gray-900/80', 'backdrop-blur-sm', 'rounded-lg', 'border', 'border-rick-green/30')
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('custom-class')
  })
})