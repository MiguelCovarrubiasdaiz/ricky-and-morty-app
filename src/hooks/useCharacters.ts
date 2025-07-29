import { useState, useEffect } from 'react'
import { Character, CharacterResponse } from '@/types/api'
import { getCharacters } from '@/services/api'

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCharacters = async (page: number) => {
    try {
      setLoading(true)
      setError(null)
      const response: CharacterResponse = await getCharacters(page)
      setCharacters(response.results)
      setTotalPages(response.info.pages)
    } catch (err) {
      setError('Failed to fetch characters')
      console.error('Error fetching characters:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacters(currentPage)
  }, [currentPage])

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const retryFetch = () => {
    fetchCharacters(currentPage)
  }

  return {
    characters,
    currentPage,
    totalPages,
    loading,
    error,
    goToNextPage,
    goToPreviousPage,
    retryFetch,
    canGoNext: currentPage < totalPages,
    canGoPrevious: currentPage > 1,
  }
}