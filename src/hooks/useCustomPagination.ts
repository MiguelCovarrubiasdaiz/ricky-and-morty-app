import { useState, useEffect } from 'react';
import { Character, CharacterResponse } from '@/types/api';
import { getCharacters } from '@/services/api';
import { AxiosError } from 'axios';

const ITEMS_PER_PAGE = parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE || '12', 10);

export function useCustomPagination(searchName: string = '', statusFilter: string = '') {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiPage, setApiPage] = useState(1);
  const [apiTotalPages, setApiTotalPages] = useState(1);
  const [totalCharactersCount, setTotalCharactersCount] = useState(0);

  const fetchCharacters = async (page: number, isNewSearch: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      const response: CharacterResponse = await getCharacters(page, searchName, statusFilter);

      if (page === 1 || isNewSearch) {
        setAllCharacters(response.results);
      } else {
        setAllCharacters((prev) => [...prev, ...response.results]);
      }

      setApiTotalPages(response.info.pages);
      setTotalCharactersCount(response.info.count);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 404) {
        setAllCharacters([]);
        setTotalCharactersCount(0);
        setApiTotalPages(0);
        setError(null);
      } else {
        setError('Failed to fetch characters');
        console.error('Error fetching characters:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAllCharacters([]);
    setCurrentPage(1);
    setApiPage(1);
    fetchCharacters(1, true);
  }, [searchName, statusFilter]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const displayed = allCharacters.slice(startIndex, endIndex);

    setDisplayedCharacters(displayed);

    const calculatedTotalPages =
      totalCharactersCount > 0
        ? Math.ceil(totalCharactersCount / ITEMS_PER_PAGE)
        : Math.ceil(allCharacters.length / ITEMS_PER_PAGE);
    setTotalPages(calculatedTotalPages);

    if (endIndex >= allCharacters.length && apiPage < apiTotalPages && !loading) {
      const nextApiPage = apiPage + 1;
      setApiPage(nextApiPage);
      fetchCharacters(nextApiPage);
    }
  }, [currentPage, allCharacters, apiPage, apiTotalPages, loading, totalCharactersCount]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const retryFetch = () => {
    setAllCharacters([]);
    setCurrentPage(1);
    setApiPage(1);
    fetchCharacters(1);
  };

  return {
    characters: displayedCharacters,
    currentPage,
    totalPages,
    loading,
    error,
    goToNextPage,
    goToPreviousPage,
    retryFetch,
    canGoNext: currentPage < totalPages,
    canGoPrevious: currentPage > 1,
  };
}
