import { render, screen } from '@testing-library/react'
import WelcomeMessage from '@/components/WelcomeMessage'

describe('WelcomeMessage Component', () => {
  it('renders welcome message', () => {
    render(<WelcomeMessage />)
    
    expect(screen.getByText('Welcome to the Multiverse!')).toBeInTheDocument()
    expect(screen.getByText('Select characters above to explore their episodes and discover interdimensional connections.')).toBeInTheDocument()
  })

  it('renders portal tip', () => {
    render(<WelcomeMessage />)
    
    expect(screen.getByText('Portal Tip:')).toBeInTheDocument()
    expect(screen.getByText('Select two characters to see their shared adventures!')).toBeInTheDocument()
  })
})