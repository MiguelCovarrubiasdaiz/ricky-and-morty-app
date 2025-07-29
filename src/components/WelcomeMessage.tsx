export default function WelcomeMessage() {
  return (
    <div className="text-center py-16">
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 max-w-lg mx-auto shadow-2xl border border-white/20">
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">
          Welcome to the Multiverse! 🚀
        </h3>
        <p className="text-white/90 mb-6 leading-relaxed">
          Select characters from the sections above to explore their
          episodes and discover amazing connections between them.
        </p>
        <div className="bg-white/10 rounded-lg p-4 text-sm text-white/80">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-lg">✨</span>
            <span className="font-semibold">Pro Tip:</span>
          </div>
          Choose any character to see their unique episodes, or select two
          characters to discover which episodes they share!
        </div>
      </div>
    </div>
  )
}