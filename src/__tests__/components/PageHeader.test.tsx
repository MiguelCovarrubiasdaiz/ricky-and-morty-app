import { render, screen } from '@testing-library/react'
import PageHeader from '@/components/PageHeader'

describe('PageHeader Component', () => {
  it('renders title and subtitle', () => {
    render(<PageHeader title="Test Title" subtitle="Test Subtitle" />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('renders with correct styling', () => {
    render(<PageHeader title="Rick & Morty" subtitle="Character Explorer" />)
    
    const title = screen.getByText('Rick & Morty')
    const subtitle = screen.getByText('Character Explorer')
    
    expect(title).toHaveClass('text-3xl', 'font-bold')
    expect(subtitle).toHaveClass('text-sm', 'text-gray-300')
  })
})