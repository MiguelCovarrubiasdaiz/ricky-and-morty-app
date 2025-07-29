import { render, screen, waitFor } from '@testing-library/react'
import Home from '@/app/page'
import * as api from '@/services/api'

jest.mock('../../services/api')
const mockGetCharacters = api.getCharacters as jest.MockedFunction<typeof api.getCharacters>

describe('Home Page', () => {
  const mockResponse = {
    results: [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [],
        url: '',
        created: ''
      }
    ],
    info: {
      count: 1,
      pages: 1,
      next: null,
      prev: null
    }
  }

  beforeEach(() => {
    mockGetCharacters.mockClear()
    mockGetCharacters.mockResolvedValue(mockResponse)
  })

  it('renders the main page', async () => {
    render(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Welcome to the Multiverse!')).toBeInTheDocument()
    })
  })

  it('loads characters', async () => {
    render(<Home />)
    
    await waitFor(() => {
      expect(mockGetCharacters).toHaveBeenCalled()
    })
  })
})