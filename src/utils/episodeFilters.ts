import { Episode, Character } from '@/types/api'
import { getEpisodesForCharacter } from '@/services/api'

export interface EpisodeFilters {
  character1Only: Episode[]
  sharedEpisodes: Episode[]
  character2Only: Episode[]
}

export const filterEpisodesByCharacters = async (
  character1: Character | null,
  character2: Character | null
): Promise<EpisodeFilters> => {
  if (!character1 && !character2) {
    return {
      character1Only: [],
      sharedEpisodes: [],
      character2Only: [],
    }
  }

  if (!character1) {
    const character2Episodes = await getEpisodesForCharacter(character2!)
    return {
      character1Only: [],
      sharedEpisodes: [],
      character2Only: character2Episodes,
    }
  }

  if (!character2) {
    const character1Episodes = await getEpisodesForCharacter(character1)
    return {
      character1Only: character1Episodes,
      sharedEpisodes: [],
      character2Only: [],
    }
  }

  const [character1Episodes, character2Episodes] = await Promise.all([
    getEpisodesForCharacter(character1),
    getEpisodesForCharacter(character2),
  ])

  const character1EpisodeIds = new Set(character1Episodes.map((ep) => ep.id))
  const character2EpisodeIds = new Set(character2Episodes.map((ep) => ep.id))

  const sharedEpisodes = character1Episodes.filter((episode) =>
    character2EpisodeIds.has(episode.id)
  )

  const character1Only = character1Episodes.filter(
    (episode) => !character2EpisodeIds.has(episode.id)
  )

  const character2Only = character2Episodes.filter(
    (episode) => !character1EpisodeIds.has(episode.id)
  )

  return {
    character1Only,
    sharedEpisodes,
    character2Only,
  }
}

export const sortEpisodesByNumber = (episodes: Episode[]): Episode[] => {
  return episodes.sort((a, b) => {
    const aMatch = a.episode.match(/S(\d+)E(\d+)/)
    const bMatch = b.episode.match(/S(\d+)E(\d+)/)

    if (!aMatch || !bMatch) return 0

    const aSeason = parseInt(aMatch[1])
    const aEpisode = parseInt(aMatch[2])
    const bSeason = parseInt(bMatch[1])
    const bEpisode = parseInt(bMatch[2])

    if (aSeason !== bSeason) {
      return aSeason - bSeason
    }

    return aEpisode - bEpisode
  })
}
