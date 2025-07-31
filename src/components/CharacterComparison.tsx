import Button from '@/components/ui/Button';
import { Character } from '@/types/api';
import { FaExchangeAlt, FaExclamationTriangle } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface CharacterComparisonProps {
  character1: Character | null;
  character2: Character | null;
  onClearSelection: () => void;
}

export default function CharacterComparison({
  character1,
  character2,
  onClearSelection,
}: CharacterComparisonProps) {
  const hasBothCharacters = character1 && character2;
  const hasOnlyOneCharacter = (character1 && !character2) || (!character1 && character2);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (hasBothCharacters || hasOnlyOneCharacter) {
      // Small delay to ensure smooth entrance animation
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setIsExiting(false);
    }
  }, [hasBothCharacters, hasOnlyOneCharacter]);

  const handleClearSelection = () => {
    setIsExiting(true);
    setIsVisible(false);

    // Delay the actual clear to allow exit animation to complete
    setTimeout(() => {
      onClearSelection();
    }, 600); // Match this with the exit animation duration
  };

  if (hasOnlyOneCharacter) {
    const selectedCharacter = character1 || character2;
    return (
      <div className="mb-8" id="character-alert">
        <div
          className={`
            transform rounded-lg border border-yellow-500 bg-yellow-900/20 p-6
            backdrop-blur-sm transition-all duration-500 ease-out
            ${
              isVisible && !isExiting
                ? 'translate-y-0 scale-100 opacity-100'
                : isExiting
                  ? 'translate-y-8 rotate-1 scale-90 opacity-0'
                  : 'translate-y-4 scale-95 opacity-0'
            }
          `}
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-4">
              <FaExclamationTriangle
                className={`
                  h-6 w-6 text-yellow-400 transition-all delay-100 duration-500
                  ${isVisible ? 'rotate-0 opacity-100' : 'rotate-12 opacity-0'}
                `}
              />
              <div className="text-center sm:text-left">
                <h3
                  className={`
                    text-lg font-semibold text-yellow-100 transition-all delay-150 duration-500
                    ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}
                  `}
                >
                  Almost there! One more character needed
                </h3>
                <p
                  className={`
                    text-sm text-yellow-200 transition-all delay-200 duration-500
                    ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}
                  `}
                >
                  You've selected <span className="font-medium">{selectedCharacter?.name}</span>.
                  Please select a second character to compare episodes and see their shared
                  adventures.
                </p>
              </div>
            </div>
            <Button
              variant="scroll"
              size="sm"
              onClick={handleClearSelection}
              className={`
                shrink-0 transition-all delay-300 duration-500
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
              `}
            >
              <FaExchangeAlt className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              <span>Reset Selection</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!hasBothCharacters) {
    return null;
  }

  return (
    <div className="mb-8">
      <div
        className={`
          transform rounded-lg border border-rick-green bg-gray-800/50 p-6
          backdrop-blur-sm transition-all duration-700 ease-out
          ${
            isVisible && !isExiting
              ? 'translate-y-0 scale-100 opacity-100'
              : isExiting
                ? 'scale-85 translate-y-12 rotate-2 opacity-0'
                : 'translate-y-6 scale-95 opacity-0'
          }
        `}
      >
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div
              className={`
                duration-600 flex items-center gap-3 transition-all ease-out
                ${
                  isVisible && !isExiting
                    ? 'translate-x-0 opacity-100 delay-100'
                    : isExiting
                      ? '-translate-x-16 scale-75 opacity-0 delay-75'
                      : '-translate-x-8 opacity-0 delay-100'
                }
              `}
            >
              <img
                src={character1.image}
                alt={character1.name}
                className={`
                  h-16 w-16 rounded-full border-2 border-blue-400 transition-all delay-200 duration-500
                  ${isVisible ? 'rotate-0 scale-100' : '-rotate-12 scale-75'}
                `}
              />
              <div>
                <h3
                  className={`
                    delay-250 font-semibold text-white transition-all duration-500
                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
                  `}
                >
                  {character1.name}
                </h3>
                <p
                  className={`
                    text-sm text-gray-400 transition-all delay-300 duration-500
                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
                  `}
                >
                  {character1.species}
                </p>
              </div>
            </div>

            <div
              className={`
                text-xl font-bold text-gray-400 transition-all duration-500 ease-out
                ${
                  isVisible && !isExiting
                    ? 'delay-350 rotate-0 scale-100 opacity-100'
                    : isExiting
                      ? 'delay-50 rotate-180 scale-150 opacity-0'
                      : 'delay-350 rotate-180 scale-125 opacity-0'
                }
              `}
            >
              VS
            </div>

            <div
              className={`
                duration-600 flex items-center gap-3 transition-all ease-out
                ${
                  isVisible && !isExiting
                    ? 'translate-x-0 opacity-100 delay-100'
                    : isExiting
                      ? 'translate-x-16 scale-75 opacity-0 delay-75'
                      : 'translate-x-8 opacity-0 delay-100'
                }
              `}
            >
              <img
                src={character2.image}
                alt={character2.name}
                className={`
                  h-16 w-16 rounded-full border-2 border-green-400 transition-all delay-200 duration-500
                  ${isVisible ? 'rotate-0 scale-100' : 'rotate-12 scale-75'}
                `}
              />
              <div>
                <h3
                  className={`
                    delay-250 font-semibold text-white transition-all duration-500
                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
                  `}
                >
                  {character2.name}
                </h3>

                <p
                  className={`
                    text-sm text-gray-400 transition-all delay-300 duration-500
                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
                  `}
                >
                  {character2.species}
                </p>
              </div>
            </div>
          </div>
          <Button
            variant="scroll"
            size="sm"
            onClick={handleClearSelection}
            className={`
              delay-400 mb-4 transition-all duration-500 ease-out
              ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-90 opacity-0'}
            `}
          >
            <FaExchangeAlt className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-1" />
            <span>Select Other Characters</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
