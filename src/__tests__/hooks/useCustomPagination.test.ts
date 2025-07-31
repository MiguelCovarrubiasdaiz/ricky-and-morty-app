import { renderHook, act, waitFor } from '@testing-library/react';
import { useCustomPagination } from '@/hooks/useCustomPagination';
import * as api from '@/services/api';
import { CharacterResponse } from '@/types/api';
import { AxiosError } from 'axios';

jest.mock('../../services/api');
const mockGetCharacters = api.getCharacters as jest.MockedFunction<typeof api.getCharacters>;

const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

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
    mockConsoleError.mockClear();
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

  it('should handle 404 errors gracefully by clearing data', async () => {
    const error404 = new AxiosError('Not Found');

    Object.defineProperty(error404, 'response', {
      value: { status: 404 },
      writable: false,
    });
    mockGetCharacters.mockRejectedValueOnce(error404);

    const { result } = renderHook(() => useCustomPagination());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.characters).toEqual([]);
    expect(result.current.totalPages).toBe(0);
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

    expect(result.current.canGoPrevious).toBe(false);
    expect(result.current.canGoNext).toBe(true);

    act(() => {
      result.current.goToNextPage();
    });

    expect(result.current.canGoPrevious).toBe(true);
    expect(result.current.canGoNext).toBe(true);
  });

  it('should not navigate beyond last page', async () => {
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

    act(() => {
      result.current.goToNextPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('should respect ITEMS_PER_PAGE configuration', async () => {
    const { result } = renderHook(() => useCustomPagination());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.characters).toHaveLength(12);
    expect(result.current.totalPages).toBeGreaterThan(1);
  });

  it('should automatically fetch more data when reaching end of current characters', async () => {
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

    act(() => {
      result.current.goToNextPage();
    });

    await waitFor(() => {
      expect(mockGetCharacters).toHaveBeenCalledTimes(2);
    });

    expect(mockGetCharacters).toHaveBeenCalledWith(2, '', '');
  });
});
