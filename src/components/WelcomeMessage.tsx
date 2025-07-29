import { HiCheckCircle, HiSparkles } from 'react-icons/hi2'

export default function WelcomeMessage() {
  return (
    <div className="text-center py-8">
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-rick-green/30 shadow-lg shadow-rick-green/10 p-6 max-w-md mx-auto">
        <div className="mb-4">
          <div className="w-12 h-12 bg-rick-green/20 rounded-full mx-auto flex items-center justify-center">
            <HiCheckCircle className="w-6 h-6 text-rick-green" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-rick-green mb-3 glow-text">
          Welcome to the Multiverse!
        </h3>
        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          Select characters above to explore their episodes and discover interdimensional connections.
        </p>
        <div className="bg-portal-blue/10 rounded-lg p-3 text-xs text-gray-300 border border-portal-blue/30">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <HiSparkles className="w-3 h-3 text-portal-blue" />
            <span className="font-semibold text-portal-blue">Portal Tip:</span>
          </div>
          Select two characters to see their shared adventures!
        </div>
      </div>
    </div>
  )
}