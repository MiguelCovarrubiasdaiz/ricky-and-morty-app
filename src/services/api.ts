import { Character, Episode, CharacterResponse } from '@/types/api';
import httpClient from './httpClient';

export const getCharacters = async (
  page: number = 1,
  name?: string,
  status?: string
): Promise<CharacterResponse> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  if (name) params.append('name', name);
  if (status) params.append('status', status);

  return await httpClient.get<CharacterResponse>(`/character?${params.toString()}`);
};

export const getCharacterById = async (id: number): Promise<Character> => {
  return await httpClient.get<Character>(`/character/${id}`);
};

export const getEpisodeById = async (id: number): Promise<Episode> => {
  return await httpClient.get<Episode>(`/episode/${id}`);
};

export const getMultipleEpisodes = async (ids: number[]): Promise<Episode[]> => {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const episode = await getEpisodeById(ids[0]);
    return [episode];
  }
  return await httpClient.get<Episode[]>(`/episode/${ids.join(',')}`);
};

export const extractIdFromUrl = (url: string): number => {
  const id = url.split('/').pop();
  const parsedId = parseInt(id || '0', 10);
  return isNaN(parsedId) ? 0 : parsedId;
};

export const getEpisodesForCharacter = async (character: Character): Promise<Episode[]> => {
  const episodeIds = character.episode.map(extractIdFromUrl);
  return await getMultipleEpisodes(episodeIds);
};
