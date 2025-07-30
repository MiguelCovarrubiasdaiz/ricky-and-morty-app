import { renderHook, act, waitFor } from '@testing-library/react';
import { useCharacterSelection } from '@/hooks/useCharacterSelection';
import { Character } from '@/types/api';

const mockAlert = jest.fn();
global.alert = mockAlert;

describe('useCharacterSelection', () => {
  const mockCharacter1: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  };

  const mockCharacter2: Character = {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  };

  beforeEach(() => {
    mockAlert.mockClear();
  });

  it('should initialize with no characters selected', () => {
    const { result } = renderHook(() => useCharacterSelection());

    expect(result.current.character1).toBeNull();
    expect(result.current.character2).toBeNull();
    expect(result.current.hasCharacter1).toBe(false);
    expect(result.current.hasCharacter2).toBe(false);
    expect(result.current.hasAnyCharacter).toBe(false);
    expect(result.current.hasBothCharacters).toBe(false);
  });

  it('should select character1 successfully', () => {
    const { result } = renderHook(() => useCharacterSelection());

    act(() => {
      result.current.selectCharacter1(mockCharacter1);
    });

    expect(result.current.character1).toEqual(mockCharacter1);
    expect(result.current.hasCharacter1).toBe(true);
    expect(result.current.hasAnyCharacter).toBe(true);
  });

  it('should select character2 successfully', () => {
    const { result } = renderHook(() => useCharacterSelection());

    act(() => {
      result.current.selectCharacter2(mockCharacter2);
    });

    expect(result.current.character2).toEqual(mockCharacter2);
    expect(result.current.hasCharacter2).toBe(true);
    expect(result.current.hasAnyCharacter).toBe(true);
  });

  it('should prevent selecting same character in both slots and show alert', () => {
    const { result } = renderHook(() => useCharacterSelection());

    act(() => {
      result.current.selectCharacter1(mockCharacter1);
    });

    act(() => {
      result.current.selectCharacter2(mockCharacter1);
    });

    expect(result.current.character1).toEqual(mockCharacter1);
    expect(result.current.character2).toBeNull();
    expect(mockAlert).toHaveBeenCalledWith('Este personaje ya está seleccionado en Character #1');
  });

  it('should prevent selecting same character in reverse order and show alert', () => {
    const { result } = renderHook(() => useCharacterSelection());

    act(() => {
      result.current.selectCharacter2(mockCharacter2);
    });

    act(() => {
      result.current.selectCharacter1(mockCharacter2);
    });

    expect(result.current.character2).toEqual(mockCharacter2);
    expect(result.current.character1).toBeNull();
    expect(mockAlert).toHaveBeenCalledWith('Este personaje ya está seleccionado en Character #2');
  });

  it('should clear character1', () => {
    const { result } = renderHook(() => useCharacterSelection());

    act(() => {
      result.current.selectCharacter1(mockCharacter1);
    });

    act(() => {
      result.current.clearCharacter1();
    });

    expect(result.current.character1).toBeNull();
    expect(result.current.hasCharacter1).toBe(false);
  });

  it('should clear character2', () => {
    const { result } = renderHook(() => useCharacterSelection());

    act(() => {
      result.current.selectCharacter2(mockCharacter2);
    });

    act(() => {
      result.current.clearCharacter2();
    });

    expect(result.current.character2).toBeNull();
    expect(result.current.hasCharacter2).toBe(false);
  });

  it('should clear all characters', () => {
    const { result } = renderHook(() => useCharacterSelection());

    act(() => {
      result.current.selectCharacter1(mockCharacter1);
      result.current.selectCharacter2(mockCharacter2);
    });

    act(() => {
      result.current.clearAllCharacters();
    });

    expect(result.current.character1).toBeNull();
    expect(result.current.character2).toBeNull();
    expect(result.current.hasAnyCharacter).toBe(false);
    expect(result.current.hasBothCharacters).toBe(false);
  });

  it('should have correct boolean states when both characters are selected', () => {
    const { result } = renderHook(() => useCharacterSelection());

    act(() => {
      result.current.selectCharacter1(mockCharacter1);
      result.current.selectCharacter2(mockCharacter2);
    });

    expect(result.current.hasCharacter1).toBe(true);
    expect(result.current.hasCharacter2).toBe(true);
    expect(result.current.hasAnyCharacter).toBe(true);
    expect(result.current.hasBothCharacters).toBe(true);
  });

  it('should initialize showEpisodes and shouldRenderEpisodes as false', () => {
    const { result } = renderHook(() => useCharacterSelection());

    expect(result.current.showEpisodes).toBe(false);
    expect(result.current.shouldRenderEpisodes).toBe(false);
  });

  it('should set shouldRenderEpisodes to true and showEpisodes to true after delay when both characters are selected', async () => {
    const { result } = renderHook(() => useCharacterSelection());

    act(() => {
      result.current.selectCharacter1(mockCharacter1);
      result.current.selectCharacter2(mockCharacter2);
    });

    // shouldRenderEpisodes should be true immediately
    expect(result.current.shouldRenderEpisodes).toBe(true);
    expect(result.current.showEpisodes).toBe(false);

    // showEpisodes should be true after 100ms delay
    await waitFor(() => {
      expect(result.current.showEpisodes).toBe(true);
    });
  });

  it('should set showEpisodes to false immediately and shouldRenderEpisodes to false after delay when characters are cleared', async () => {
    const { result } = renderHook(() => useCharacterSelection());

    // First select both characters
    act(() => {
      result.current.selectCharacter1(mockCharacter1);
      result.current.selectCharacter2(mockCharacter2);
    });

    await waitFor(() => {
      expect(result.current.showEpisodes).toBe(true);
      expect(result.current.shouldRenderEpisodes).toBe(true);
    });

    // Then clear them
    act(() => {
      result.current.clearAllCharacters();
    });

    // showEpisodes should be false immediately
    expect(result.current.showEpisodes).toBe(false);
    // shouldRenderEpisodes should still be true initially
    expect(result.current.shouldRenderEpisodes).toBe(true);

    // shouldRenderEpisodes should be false after 700ms delay
    await waitFor(
      () => {
        expect(result.current.shouldRenderEpisodes).toBe(false);
      },
      { timeout: 800 }
    );
  });

  it('should reset animation states when clearing individual characters', async () => {
    const { result } = renderHook(() => useCharacterSelection());

    // Select both characters
    act(() => {
      result.current.selectCharacter1(mockCharacter1);
      result.current.selectCharacter2(mockCharacter2);
    });

    await waitFor(() => {
      expect(result.current.showEpisodes).toBe(true);
      expect(result.current.shouldRenderEpisodes).toBe(true);
    });

    // Clear just character1
    act(() => {
      result.current.clearCharacter1();
    });

    expect(result.current.showEpisodes).toBe(false);
    expect(result.current.shouldRenderEpisodes).toBe(true);

    await waitFor(
      () => {
        expect(result.current.shouldRenderEpisodes).toBe(false);
      },
      { timeout: 800 }
    );
  });

  it('should handle rapid character selection changes', async () => {
    const { result } = renderHook(() => useCharacterSelection());

    // Select both characters
    act(() => {
      result.current.selectCharacter1(mockCharacter1);
      result.current.selectCharacter2(mockCharacter2);
    });

    // Quickly clear and select again
    act(() => {
      result.current.clearCharacter1();
    });

    act(() => {
      result.current.selectCharacter1(mockCharacter1);
    });

    // Should handle the state correctly
    expect(result.current.hasBothCharacters).toBe(true);
    expect(result.current.shouldRenderEpisodes).toBe(true);

    await waitFor(() => {
      expect(result.current.showEpisodes).toBe(true);
    });
  });
});
