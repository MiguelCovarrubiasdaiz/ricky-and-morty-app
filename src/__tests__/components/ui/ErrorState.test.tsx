import { render, screen, fireEvent } from '@testing-library/react'
import ErrorState from '@/components/ui/ErrorState'

describe('ErrorState Component', () => {
  it('renders error message', () => {
    render(<ErrorState message="Custom error message" />)
    
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument() // default title
  })

  it('renders retry button when onRetry provided', () => {
    const onRetry = jest.fn()
    render(<ErrorState message="Error occurred" onRetry={onRetry} />)
    
    const retryButton = screen.getByText('Try again')
    expect(retryButton).toBeInTheDocument()
    
    fireEvent.click(retryButton)
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('does not render retry button when onRetry not provided', () => {
    render(<ErrorState message="Error occurred" />)
    
    expect(screen.queryByText('Try again')).not.toBeInTheDocument()
  })
})