import { HiCheckCircle, HiSparkles, HiArrowDown } from 'react-icons/hi2';
import Button from '@/components/ui/Button';

export default function WelcomeMessage() {
  const scrollToCharacters = () => {
    const charactersSection = document.getElementById('characters-section');
    if (charactersSection) {
      charactersSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="py-8 text-center">
      <div className="mx-auto max-w-md rounded-lg border border-rick-green/30 bg-gray-900/80 p-6 shadow-lg shadow-rick-green/10 backdrop-blur-sm">
        <div className="mb-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rick-green/20">
            <HiCheckCircle className="h-6 w-6 text-rick-green" />
          </div>
        </div>
        <h3 className="glow-text mb-3 text-lg font-bold text-rick-green">
          Welcome to the Multiverse!
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-300">
          Select characters below to explore their episodes and discover interdimensional
          connections.
        </p>

        <Button variant="scroll" size="sm" onClick={scrollToCharacters} className="mb-4">
          <span>Select Characters</span>
          <HiArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-1" />
        </Button>

        <div className="rounded-lg border border-portal-blue/30 bg-portal-blue/10 p-3 text-xs text-gray-300">
          <div className="mb-1 flex items-center justify-center space-x-1">
            <HiSparkles className="h-3 w-3 text-portal-blue" />
            <span className="font-semibold text-portal-blue">Portal Tip:</span>
          </div>
          Select two characters to see their shared adventures!
        </div>
      </div>
    </div>
  );
}
