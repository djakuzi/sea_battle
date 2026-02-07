import { ReactNode } from 'react';

export interface PropsErrorMessage {
  cls?: string;
  children: ReactNode;
  modificator?: 'in-list'
  onClick?: () => {};
}
