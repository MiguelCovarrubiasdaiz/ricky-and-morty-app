import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '@/components/ui/Pagination'

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPrevious: jest.fn(),
    onNext: jest.fn(),
    canGoPrevious: false,
    canGoNext: true
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders current page info', () => {
    render(<Pagination {...defaultProps} />)
    
    expect(screen.getByText('Page')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('of 5')).toBeInTheDocument()
  })

  it('calls onNext when next is clicked', () => {
    render(<Pagination {...defaultProps} />)
    
    fireEvent.click(screen.getByText('Next'))
    expect(defaultProps.onNext).toHaveBeenCalled()
  })

  it('calls onPrevious when previous is clicked', () => {
    const props = { ...defaultProps, currentPage: 3, canGoPrevious: true }
    render(<Pagination {...props} />)
    
    fireEvent.click(screen.getByText('Previous'))
    expect(props.onPrevious).toHaveBeenCalled()
  })

  it('disables previous button when canGoPrevious is false', () => {
    render(<Pagination {...defaultProps} canGoPrevious={false} />)
    
    const prevButton = screen.getByText('Previous').closest('button')
    expect(prevButton).toBeDisabled()
  })

  it('disables next button when canGoNext is false', () => {
    render(<Pagination {...defaultProps} canGoNext={false} />)
    
    const nextButton = screen.getByText('Next').closest('button')
    expect(nextButton).toBeDisabled()
  })
})