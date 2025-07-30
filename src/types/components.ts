import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Character, Episode } from '@/types/api';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'scroll';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

export interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export interface SelectedCharacterBadgeProps {
  character: Character | null;
  placeholder: string;
}

export interface EpisodeSectionProps {
  title: string;
  episodes: Episode[];
  loading?: boolean;
  emptyMessage?: string;
}

export interface EpisodeGridProps {
  episodes: Episode[];
}

export interface EpisodeCardProps {
  episode: Episode;
}

export interface CharacterSectionProps {
  title: string;
  selectedCharacter: Character | null;
  otherSelectedCharacter: Character | null;
  onCharacterSelect: (_character: Character) => void;
}

export interface CharacterGridProps {
  characters: Character[];
  selectedCharacter: Character | null;
  otherSelectedCharacter: Character | null;
  onCharacterSelect: (_character: Character) => void;
}

export interface CharacterCardProps {
  character: Character;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}
