import { useState, useEffect } from 'react'
import { Character, CharacterResponse } from '@/types/api'
import { getCharacters } from '@/services/api'

const ITEMS_PER_PAGE = parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE || '12', 10)

export function useCustomPagination() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([])
  const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [apiPage, setApiPage] = useState(1)
  const [apiTotalPages, setApiTotalPages] = useState(1)

  const fetchCharacters = async (page: number) => {
    try {
      setLoading(true)
      setError(null)
      const response: CharacterResponse = await getCharacters(page)
      
      if (page === 1) {
        setAllCharacters(response.results)
      } else {
        setAllCharacters(prev => [...prev, ...response.results])
      }
      
      setApiTotalPages(response.info.pages)
    } catch (err) {
      setError('Failed to fetch characters')
      console.error('Error fetching characters:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacters(1)
  }, [])

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const displayed = allCharacters.slice(startIndex, endIndex)
    
    setDisplayedCharacters(displayed)
    setTotalPages(Math.ceil(allCharacters.length / ITEMS_PER_PAGE))

    // Si necesitamos más personajes y no hemos cargado todas las páginas de la API
    if (endIndex >= allCharacters.length && apiPage < apiTotalPages && !loading) {
      const nextApiPage = apiPage + 1
      setApiPage(nextApiPage)
      fetchCharacters(nextApiPage)
    }
  }, [currentPage, allCharacters, apiPage, apiTotalPages, loading])

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
    setAllCharacters([])
    setCurrentPage(1)
    setApiPage(1)
    fetchCharacters(1)
  }

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
  }
}