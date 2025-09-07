import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface PropsAnimationUi {
  cls?: string;
  children?: ReactNode;
  isAnimation?: boolean;
  type?: 'block' | 'p' | 'h';
}
