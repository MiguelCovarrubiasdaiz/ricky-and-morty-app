'use client';

import { useCharacterSelection } from '@/hooks/useCharacterSelection';
import { useEpisodeFilters } from '@/hooks/useEpisodeFilters';
import PageHeader from '@/components/PageHeader';
import CharacterSection from '@/components/CharacterSection';
import EpisodeSection from '@/components/EpisodeSection';
import WelcomeMessage from '@/components/WelcomeMessage';
import CharacterComparison from '@/components/CharacterComparison';

export default function Home() {
  const {
    character1,
    character2,
    selectCharacter1,
    selectCharacter2,
    clearAllCharacters,
    hasBothCharacters,
    showEpisodes,
    shouldRenderEpisodes,
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
          {!(character1 || character2) && <WelcomeMessage />}

          <CharacterComparison
            character1={character1}
            character2={character2}
            onClearSelection={clearAllCharacters}
          />

          {!hasBothCharacters && (
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
          )}

          {shouldRenderEpisodes && (
            <div
              className={`
                mb-8 transform space-y-8 transition-all duration-700 ease-out
                ${
                  showEpisodes
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-6 scale-95 opacity-0'
                }
              `}
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div
                  className={`
                    duration-600 transform transition-all ease-out
                    ${
                      showEpisodes
                        ? 'translate-x-0 opacity-100 delay-100'
                        : '-translate-x-8 opacity-0 delay-100'
                    }
                  `}
                >
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
                </div>

                <div
                  className={`
                    duration-600 transform transition-all ease-out
                    ${
                      showEpisodes
                        ? 'delay-350 translate-y-0 opacity-100'
                        : 'delay-350 translate-y-6 opacity-0'
                    }
                  `}
                >
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
                </div>

                <div
                  className={`
                    duration-600 transform transition-all ease-out
                    ${
                      showEpisodes
                        ? 'translate-x-0 opacity-100 delay-100'
                        : 'translate-x-8 opacity-0 delay-100'
                    }
                  `}
                >
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
