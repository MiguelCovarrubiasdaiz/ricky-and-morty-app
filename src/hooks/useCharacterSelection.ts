import { useState, useEffect } from 'react';
import { Character } from '@/types/api';

export function useCharacterSelection() {
  const [character1, setCharacter1] = useState<Character | null>(null);
  const [character2, setCharacter2] = useState<Character | null>(null);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [shouldRenderEpisodes, setShouldRenderEpisodes] = useState(false);

  const selectCharacter1 = (character: Character) => {
    if (character2 && character2.id === character.id) {
      alert('Este personaje ya está seleccionado en Character #2');
      return;
    }
    setCharacter1(character);
  };

  const selectCharacter2 = (character: Character) => {
    if (character1 && character1.id === character.id) {
      alert('Este personaje ya está seleccionado en Character #1');
      return;
    }
    setCharacter2(character);
  };

  const clearCharacter1 = () => {
    setCharacter1(null);
  };

  const clearCharacter2 = () => {
    setCharacter2(null);
  };

  const clearAllCharacters = () => {
    setCharacter1(null);
    setCharacter2(null);
  };

  useEffect(() => {
    const hasBothCharacters = Boolean(character1 && character2);
    if (hasBothCharacters) {
      setShouldRenderEpisodes(true);
      const timer = setTimeout(() => setShowEpisodes(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowEpisodes(false);
      // Delay unmounting to allow exit animation
      const timer = setTimeout(() => setShouldRenderEpisodes(false), 700);
      return () => clearTimeout(timer);
    }
  }, [character1, character2]);

  return {
    character1,
    character2,
    selectCharacter1,
    selectCharacter2,
    clearCharacter1,
    clearCharacter2,
    clearAllCharacters,
    hasCharacter1: Boolean(character1),
    hasCharacter2: Boolean(character2),
    hasAnyCharacter: Boolean(character1 || character2),
    hasBothCharacters: Boolean(character1 && character2),
    showEpisodes,
    shouldRenderEpisodes,
  };
}
