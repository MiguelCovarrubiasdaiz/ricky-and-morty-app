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
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Rick & Morty Explorer"
          subtitle="Explore characters and their episodes from the multiverse"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <CharacterSection
            title="Character #1"
            selectedCharacter={character1}
            onCharacterSelect={selectCharacter1}
          />
          <CharacterSection
            title="Character #2"
            selectedCharacter={character2}
            onCharacterSelect={selectCharacter2}
          />
        </div>

        {character1 && character2 && (
          <div className="space-y-8">
            <EpisodeAnalysisHeader />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <EpisodeSection
                title={`${character1.name} - Only Episodes`}
                episodes={episodeFilters.character1Only}
                loading={loadingEpisodes}
                emptyMessage={`${character1.name} has no unique episodes`}
              />

              <EpisodeSection
                title="Shared Episodes"
                episodes={episodeFilters.sharedEpisodes}
                loading={loadingEpisodes}
                emptyMessage={`${character1.name} and ${character2.name} share no episodes`}
              />

              <EpisodeSection
                title={`${character2.name} - Only Episodes`}
                episodes={episodeFilters.character2Only}
                loading={loadingEpisodes}
                emptyMessage={`${character2.name} has no unique episodes`}
              />
            </div>
          </div>
        )}

        {(character1 || character2) && !(character1 && character2) && (
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Almost There!
              </h3>
              <p className="text-white/90 mb-4">
                To see episode analysis, please select both Character #1 and Character #2.
              </p>
              <div className="text-sm text-white/80">
                {!character1 && character2 && 'Select Character #1 to continue'}
                {character1 && !character2 && 'Select Character #2 to continue'}
              </div>
            </div>
          </div>
        )}

        {!hasAnyCharacter && <WelcomeMessage />}
      </div>
    </div>
  )
}
