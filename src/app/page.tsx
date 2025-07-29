'use client'

import { useCharacterSelection } from '@/hooks/useCharacterSelection'
import { useEpisodeFilters } from '@/hooks/useEpisodeFilters'
import PageHeader from '@/components/PageHeader'
import CharacterSection from '@/components/CharacterSection'
import EpisodeSection from '@/components/EpisodeSection'
import EpisodeAnalysisHeader from '@/components/EpisodeAnalysisHeader'
import WelcomeMessage from '@/components/WelcomeMessage'

export default function Home() {
  const {
    character1,
    character2,
    selectCharacter1,
    selectCharacter2,
    hasAnyCharacter,
  } = useCharacterSelection()

  const {
    episodeFilters,
    loading: loadingEpisodes,
  } = useEpisodeFilters(character1, character2)

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <PageHeader
            title="Rick & Morty Explorer"
            subtitle="Explore characters and their episodes from the multiverse"
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
            <div className="space-y-6">
              <CharacterSection
                title="Character #1"
                selectedCharacter={character1}
                onCharacterSelect={selectCharacter1}
              />
            </div>
            <div className="space-y-6">
              <CharacterSection
                title="Character #2"
                selectedCharacter={character2}
                onCharacterSelect={selectCharacter2}
              />
            </div>
          </div>

          {(character1 || character2) && (
            <div className="space-y-8">
              <EpisodeAnalysisHeader />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

          {!hasAnyCharacter && <WelcomeMessage />}
        </div>
      </div>
    </div>
  )
}
