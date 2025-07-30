import { renderHook, act } from '@testing-library/react';
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
});
