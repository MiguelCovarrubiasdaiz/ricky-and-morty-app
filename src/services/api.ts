import axios from 'axios'
import {
  Character,
  Episode,
  CharacterResponse,
} from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://rickandmortyapi.com/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const getCharacters = async (
  page: number = 1
): Promise<CharacterResponse> => {
  const response = await api.get<CharacterResponse>(`/character?page=${page}`)
  return response.data
}

export const getCharacterById = async (id: number): Promise<Character> => {
  const response = await api.get<Character>(`/character/${id}`)
  return response.data
}

export const getEpisodeById = async (id: number): Promise<Episode> => {
  const response = await api.get<Episode>(`/episode/${id}`)
  return response.data
}

export const getMultipleEpisodes = async (
  ids: number[]
): Promise<Episode[]> => {
  if (ids.length === 0) return []
  if (ids.length === 1) {
    const episode = await getEpisodeById(ids[0])
    return [episode]
  }
  const response = await api.get<Episode[]>(`/episode/${ids.join(',')}`)
  return response.data
}

export const extractIdFromUrl = (url: string): number => {
  const id = url.split('/').pop()
  return parseInt(id || '0', 10)
}

export const getEpisodesForCharacter = async (
  character: Character
): Promise<Episode[]> => {
  const episodeIds = character.episode.map(extractIdFromUrl)
  return await getMultipleEpisodes(episodeIds)
}
