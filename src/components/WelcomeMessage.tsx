export default function WelcomeMessage() {
  return (
    <div className="text-center py-16">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
        <h3 className="text-2xl font-bold text-white mb-4">
          Get Started
        </h3>
        <p className="text-white/90 mb-4">
          Select characters from the sections above to explore their
          episodes and find connections between them.
        </p>
        <div className="text-sm text-white/80">
          Choose any character to see their unique episodes, or select two
          characters to discover which episodes they share!
        </div>
      </div>
    </div>
  )
}