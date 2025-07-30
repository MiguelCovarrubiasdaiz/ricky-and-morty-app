import { renderHook, act, waitFor } from '@testing-library/react';
import { useCustomPagination } from '@/hooks/useCustomPagination';
import * as api from '@/services/api';
import { CharacterResponse } from '@/types/api';

jest.mock('../../services/api');
const mockGetCharacters = api.getCharacters as jest.MockedFunction<typeof api.getCharacters>;

describe('useCustomPagination', () => {
  const mockApiResponse: CharacterResponse = {
    info: {
      count: 826,
      pages: 42,
      next: 'https://rickandmortyapi.com/api/character?page=2',
      prev: null,
    },
    results: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Character ${i + 1}`,
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: '',
      episode: [],
      url: '',
      created: '',
    })),
  };

  beforeEach(() => {
    mockGetCharacters.mockClear();
    mockGetCharacters.mockResolvedValue(mockApiResponse);
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useCustomPagination());

    expect(result.current.loading).toBe(true);
    expect(result.current.characters).toEqual([]);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors', async () => {
    mockGetCharacters.mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useCustomPagination());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to fetch characters');
    expect(result.current.characters).toEqual([]);
  });

  it('should navigate to next page', async () => {
    const { result } = renderHook(() => useCustomPagination());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const initialPage = result.current.currentPage;

    act(() => {
      result.current.goToNextPage();
    });

    expect(result.current.currentPage).toBe(initialPage + 1);
  });

  it('should navigate to previous page', async () => {
    const { result } = renderHook(() => useCustomPagination());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.goToNextPage();
    });

    expect(result.current.currentPage).toBe(2);
    act(() => {
      result.current.goToPreviousPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('should not go to previous page when on first page', async () => {
    const { result } = renderHook(() => useCustomPagination());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.canGoPrevious).toBe(false);

    act(() => {
      result.current.goToPreviousPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('should retry fetch when retryFetch is called', async () => {
    mockGetCharacters.mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useCustomPagination());

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to fetch characters');
    });

    mockGetCharacters.mockResolvedValue(mockApiResponse);

    act(() => {
      result.current.retryFetch();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.characters).toHaveLength(12);
  });

  it('should provide correct navigation flags', async () => {
    const { result } = renderHook(() => useCustomPagination());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // En la página 1: no se puede ir atrás, sí se puede ir adelante
    expect(result.current.canGoPrevious).toBe(false);
    expect(result.current.canGoNext).toBe(true);

    act(() => {
      result.current.goToNextPage();
    });

    // En la página 2: sí se puede ir atrás, y también adelante (hay muchas páginas)
    expect(result.current.canGoPrevious).toBe(true);
    expect(result.current.canGoNext).toBe(true); // Ahora hay más páginas disponibles
  });

  it('should not navigate beyond last page', async () => {
    // Mock small dataset that fits in one page to test edge case
    const smallApiResponse = {
      info: {
        count: 5,
        pages: 1,
        next: null,
        prev: null,
      },
      results: Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: `Character ${i + 1}`,
        status: 'Alive' as const,
        species: 'Human',
        type: '',
        gender: 'Male' as const,
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        image: '',
        episode: [],
        url: '',
        created: '',
      })),
    };

    mockGetCharacters.mockResolvedValue(smallApiResponse);

    const { result } = renderHook(() => useCustomPagination());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.canGoNext).toBe(false);

    // Try to go to next page when already at last page
    act(() => {
      result.current.goToNextPage();
    });

    // Should remain on the same page
    expect(result.current.currentPage).toBe(1);
  });

  it('should respect ITEMS_PER_PAGE configuration', async () => {
    // This test covers the ITEMS_PER_PAGE constant usage (line 5)
    const { result } = renderHook(() => useCustomPagination());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // The hook uses ITEMS_PER_PAGE to slice characters
    // Default should be 12 items per page based on the constant
    expect(result.current.characters).toHaveLength(12);
    expect(result.current.totalPages).toBeGreaterThan(1);
  });

  it('should automatically fetch more data when reaching end of current characters', async () => {
    // Create a large mock response that will trigger automatic loading
    const largeApiResponse = {
      info: {
        count: 1000,
        pages: 50,
        next: 'https://rickandmortyapi.com/api/character?page=2',
        prev: null,
      },
      results: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Character ${i + 1}`,
        status: 'Alive' as const,
        species: 'Human',
        type: '',
        gender: 'Male' as const,
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        image: '',
        episode: [],
        url: '',
        created: '',
      })),
    };

    const secondPageResponse = {
      info: {
        count: 1000,
        pages: 50,
        next: 'https://rickandmortyapi.com/api/character?page=3',
        prev: 'https://rickandmortyapi.com/api/character?page=1',
      },
      results: Array.from({ length: 20 }, (_, i) => ({
        id: i + 21,
        name: `Character ${i + 21}`,
        status: 'Alive' as const,
        species: 'Human',
        type: '',
        gender: 'Male' as const,
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        image: '',
        episode: [],
        url: '',
        created: '',
      })),
    };

    mockGetCharacters.mockResolvedValueOnce(largeApiResponse);
    mockGetCharacters.mockResolvedValueOnce(secondPageResponse);

    const { result } = renderHook(() => useCustomPagination());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Navigate to page 2 (items 13-24), which should trigger automatic fetch
    act(() => {
      result.current.goToNextPage();
    });

    // Wait for the automatic fetch to complete
    await waitFor(() => {
      expect(mockGetCharacters).toHaveBeenCalledWith(2);
    });

    expect(mockGetCharacters).toHaveBeenCalledTimes(2);
  });
});
