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
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600">
      <div>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <PageHeader
            title="Rick & Morty Explorer"
            subtitle="Explore characters and their episodes from the multiverse"
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
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

          {character1 && character2 && (
            <div className="space-y-8">
              <EpisodeAnalysisHeader />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <EpisodeSection
                  title={`${character1.name} Episodes`}
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
                  title={`${character2.name} Episodes`}
                  episodes={episodeFilters.character2Only}
                  loading={loadingEpisodes}
                  emptyMessage={`${character2.name} has no unique episodes`}
                />
              </div>
            </div>
          )}

          {(character1 || character2) && !(character1 && character2) && (
            <div className="text-center py-16">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto shadow-2xl border border-white/20">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Almost There!
                </h3>
                <p className="text-white/90 mb-4 leading-relaxed">
                  To see episode analysis, please select both Character #1 and Character #2.
                </p>
                <div className="text-sm text-white/80 bg-white/10 rounded-lg p-3">
                  {!character1 && character2 && '👈 Select Character #1 to continue'}
                  {character1 && !character2 && '👉 Select Character #2 to continue'}
                </div>
              </div>
            </div>
          )}

          {!hasAnyCharacter && <WelcomeMessage />}
        </div>
      </div>
    </div>
  )
}
