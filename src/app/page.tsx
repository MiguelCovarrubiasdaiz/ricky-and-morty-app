'use client';

import { useCharacterSelection } from '@/hooks/useCharacterSelection';
import { useEpisodeFilters } from '@/hooks/useEpisodeFilters';
import PageHeader from '@/components/PageHeader';
import CharacterSection from '@/components/CharacterSection';
import EpisodeSection from '@/components/EpisodeSection';
import WelcomeMessage from '@/components/WelcomeMessage';
import Button from '@/components/ui/Button';
import { FaExchangeAlt } from 'react-icons/fa';

export default function Home() {
  const {
    character1,
    character2,
    selectCharacter1,
    selectCharacter2,
    clearAllCharacters,
    hasBothCharacters,
  } = useCharacterSelection();

  const { episodeFilters, loading: loadingEpisodes } = useEpisodeFilters(character1, character2);

  return (
    <div className="relative min-h-screen overflow-hidden  bg-stars bg-cover bg-fixed bg-center">
      <div className="bg-space absolute inset-0"></div>

      <div className="relative z-10">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <PageHeader
            title="Rick & Morty Explorer"
            subtitle="Explore characters and their episodes from the multiverse"
          />
          {!(character1 && character2) && <WelcomeMessage />}
          {!hasBothCharacters ? (
            <div id="characters-section" className="mb-8 grid grid-cols-1 gap-4 xl:grid-cols-2">
              <div className="space-y-6">
                <CharacterSection
                  title="Character #1"
                  selectedCharacter={character1}
                  otherSelectedCharacter={character2}
                  onCharacterSelect={selectCharacter1}
                />
              </div>
              <div className="space-y-6">
                <CharacterSection
                  title="Character #2"
                  selectedCharacter={character2}
                  otherSelectedCharacter={character1}
                  onCharacterSelect={selectCharacter2}
                />
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <div className="rounded-lg border border-rick-green bg-gray-800/50 p-6 backdrop-blur-sm">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <div className="flex flex-col items-center gap-6 sm:flex-row">
                    <div className="flex items-center gap-3">
                      <img
                        src={character1?.image}
                        alt={character1?.name}
                        className="h-16 w-16 rounded-full border-2 border-blue-400"
                      />
                      <div>
                        <h3 className="font-semibold text-white">{character1?.name}</h3>
                        <p className="text-sm text-gray-400">{character1?.species}</p>
                      </div>
                    </div>

                    <div className="text-xl font-bold text-gray-400">VS</div>

                    <div className="flex items-center gap-3">
                      <img
                        src={character2?.image}
                        alt={character2?.name}
                        className="h-16 w-16 rounded-full border-2 border-green-400"
                      />
                      <div>
                        <h3 className="font-semibold text-white">{character2?.name}</h3>
                        <p className="text-sm text-gray-400">{character2?.species}</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="scroll" size="sm" onClick={clearAllCharacters} className="mb-4">
                    <FaExchangeAlt className="h-4 w-4  transition-transform duration-200 group-hover:translate-y-1" />
                    <span>Select Other Characters</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {character1 && character2 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <EpisodeSection
                  title={character1 ? `${character1.name} Episodes` : 'Character #1 Episodes'}
                  episodes={episodeFilters.character1Only}
                  loading={loadingEpisodes}
                  emptyMessage={
                    character1
                      ? character2
                        ? `${character1.name} has no unique episodes`
                        : `${character1.name} has no episodes`
                      : 'Select Character #1 to see episodes'
                  }
                />

                <EpisodeSection
                  title="Shared Episodes"
                  episodes={episodeFilters.sharedEpisodes}
                  loading={loadingEpisodes}
                  emptyMessage={
                    character1 && character2
                      ? `${character1.name} and ${character2.name} share no episodes`
                      : 'Select both characters to see shared episodes'
                  }
                />

                <EpisodeSection
                  title={character2 ? `${character2.name} Episodes` : 'Character #2 Episodes'}
                  episodes={episodeFilters.character2Only}
                  loading={loadingEpisodes}
                  emptyMessage={
                    character2
                      ? character1
                        ? `${character2.name} has no unique episodes`
                        : `${character2.name} has no episodes`
                      : 'Select Character #2 to see episodes'
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
