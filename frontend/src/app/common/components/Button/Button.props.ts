import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface PropsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  paramsLink?: {
    type: string;
    link: string;
  } | undefined;
  isBtn?: boolean;
  onClick: (...args: unknown[]) => void;
  cls?: string;
  children: ReactNode;
  versionBtn?: 'button-action';
}
