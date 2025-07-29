import '@testing-library/jest-dom'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock environment variables
process.env.NEXT_PUBLIC_API_BASE_URL = 'https://rickandmortyapi.com/api'
process.env.NEXT_PUBLIC_ITEMS_PER_PAGE = '12'

// Mock fetch globally
global.fetch = jest.fn()
