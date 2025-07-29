import { render } from '@testing-library/react'
import CharacterCardSkeleton from '@/components/ui/CharacterCardSkeleton'

describe('CharacterCardSkeleton Component', () => {
  it('renders skeleton loading state', () => {
    const { container } = render(<CharacterCardSkeleton />)
    
    expect(container.firstChild).toBeInTheDocument()
  })

  it('has correct styling for skeleton animation', () => {
    const { container } = render(<CharacterCardSkeleton />)
    
    const skeleton = container.querySelector('.animate-pulse')
    expect(skeleton).toBeInTheDocument()
  })
})