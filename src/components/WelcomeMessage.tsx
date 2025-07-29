import { HiCheckCircle, HiSparkles } from 'react-icons/hi2'

export default function WelcomeMessage() {
  return (
    <div className="text-center py-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-md mx-auto shadow-sm">
        <div className="mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
            <HiCheckCircle className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          Welcome!
        </h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Select characters above to explore their episodes and discover connections.
        </p>
        <div className="bg-blue-50 rounded-lg p-3 text-xs text-gray-700 border border-blue-200">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <HiSparkles className="w-3 h-3 text-blue-600" />
            <span className="font-semibold text-blue-900">Tip:</span>
          </div>
          Select two characters to see their shared episodes!
        </div>
      </div>
    </div>
  )
}