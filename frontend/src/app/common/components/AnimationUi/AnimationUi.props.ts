import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface PropsAnimationUi {
  cls?: string;
  children?: ReactNode;
  isAnimation?: boolean;
  onClick?: () => {};
  type?: 'block' | 'p' | 'h';
}
