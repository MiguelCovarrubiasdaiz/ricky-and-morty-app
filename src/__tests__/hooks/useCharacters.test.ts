import { renderHook, waitFor, act } from '@testing-library/react';
import { useCharacters } from '@/hooks/useCharacters';
import * as api from '@/services/api';
import { CharacterResponse } from '@/types/api';

jest.mock('../../services/api');
const mockGetCharacters = api.getCharacters as jest.MockedFunction<typeof api.getCharacters>;

const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('useCharacters Hook', () => {
  const mockResponse: CharacterResponse = {
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
        image: '',
        episode: [],
        url: '',
        created: '',
      },
    ],
    info: {
      count: 1,
      pages: 3,
      next: null,
      prev: null,
    },
  };

  const mockPage2Response: CharacterResponse = {
    results: [
      {
        id: 2,
        name: 'Morty Smith',
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
      },
    ],
    info: {
      count: 2,
      pages: 3,
      next: null,
      prev: null,
    },
  };

  beforeEach(() => {
    mockGetCharacters.mockClear();
    mockConsoleError.mockClear();
  });

  it('loads characters on mount', async () => {
    mockGetCharacters.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCharacters());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.characters).toEqual(mockResponse.results);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.currentPage).toBe(1);
    expect(mockGetCharacters).toHaveBeenCalledWith(1);
  });

  it('handles errors', async () => {
    mockGetCharacters.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to fetch characters');
    expect(result.current.characters).toEqual([]);
  });

  it('navigates to next page when possible', async () => {
    mockGetCharacters.mockResolvedValueOnce(mockResponse).mockResolvedValueOnce(mockPage2Response);

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.canGoNext).toBe(true);

    act(() => {
      result.current.goToNextPage();
    });

    expect(result.current.currentPage).toBe(2);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockGetCharacters).toHaveBeenCalledWith(2);
    expect(result.current.characters).toEqual(mockPage2Response.results);
  });

  it('does not navigate beyond last page', async () => {
    const singlePageResponse = {
      ...mockResponse,
      info: { ...mockResponse.info, pages: 1 },
    };
    mockGetCharacters.mockResolvedValue(singlePageResponse);

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.canGoNext).toBe(false);

    act(() => {
      result.current.goToNextPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(mockGetCharacters).toHaveBeenCalledTimes(1);
  });

  it('navigates to previous page when possible', async () => {
    mockGetCharacters
      .mockResolvedValueOnce(mockResponse)
      .mockResolvedValueOnce(mockPage2Response)
      .mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Navigate to page 2 first
    act(() => {
      result.current.goToNextPage();
    });

    await waitFor(() => {
      expect(result.current.currentPage).toBe(2);
    });

    expect(result.current.canGoPrevious).toBe(true);

    // Now navigate back to page 1
    act(() => {
      result.current.goToPreviousPage();
    });

    expect(result.current.currentPage).toBe(1);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockGetCharacters).toHaveBeenCalledWith(1);
  });

  it('does not navigate before first page', async () => {
    mockGetCharacters.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.canGoPrevious).toBe(false);

    act(() => {
      result.current.goToPreviousPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(mockGetCharacters).toHaveBeenCalledTimes(1);
  });

  it('retries fetch on current page', async () => {
    mockGetCharacters
      .mockRejectedValueOnce(new Error('API Error'))
      .mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to fetch characters');
    });

    expect(result.current.characters).toEqual([]);

    act(() => {
      result.current.retryFetch();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.characters).toEqual(mockResponse.results);
    expect(mockGetCharacters).toHaveBeenCalledTimes(2);
    expect(mockGetCharacters).toHaveBeenLastCalledWith(1);
  });

  it('provides correct navigation flags', async () => {
    mockGetCharacters.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.canGoNext).toBe(true); // page 1 of 3
    expect(result.current.canGoPrevious).toBe(false); // on first page
  });

  it('clears error on successful retry', async () => {
    mockGetCharacters
      .mockRejectedValueOnce(new Error('API Error'))
      .mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to fetch characters');
    });

    expect(result.current.characters).toEqual([]);

    act(() => {
      result.current.retryFetch();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.characters).toEqual(mockResponse.results);
  });
});
