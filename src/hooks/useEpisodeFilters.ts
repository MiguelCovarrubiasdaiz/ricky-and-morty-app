import { useState, useEffect } from 'react'
import { Character } from '@/types/api'
import { filterEpisodesByCharacters, EpisodeFilters } from '@/utils/episodeFilters'

export function useEpisodeFilters(character1: Character | null, character2: Character | null) {
  const [episodeFilters, setEpisodeFilters] = useState<EpisodeFilters>({
    character1Only: [],
    sharedEpisodes: [],
    character2Only: [],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const updateEpisodes = async () => {
      // Solo procesar episodios cuando ambos personajes estén seleccionados
      if (!character1 || !character2) {
        setEpisodeFilters({
          character1Only: [],
          sharedEpisodes: [],
          character2Only: [],
        })
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      
      try {
        const filters = await filterEpisodesByCharacters(character1, character2)
        setEpisodeFilters(filters)
      } catch (err) {
        setError('Error filtering episodes')
        console.error('Error filtering episodes:', err)
      } finally {
        setLoading(false)
      }
    }

    updateEpisodes()
  }, [character1, character2])

  return {
    episodeFilters,
    loading,
    error,
    hasAnyCharacter: Boolean(character1 || character2),
    hasBothCharacters: Boolean(character1 && character2),
  }
}