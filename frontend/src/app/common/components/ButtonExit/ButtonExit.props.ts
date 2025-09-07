import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface PropsButtonExit extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (...args: unknown[]) => void;
  cls?: string;
  children?: ReactNode;
  text?: string;
}
