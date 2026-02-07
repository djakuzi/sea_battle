import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface PropsButtonSearch extends ButtonHTMLAttributes<HTMLButtonElement> {
  onSearch?: (...args: unknown[]) => void;
  cls?: string;
  children?: ReactNode;
  text?: string
  posText?: 'left' | 'right';
visual?: 'standart' | 'only-img';
}
