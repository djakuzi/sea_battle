import { ReactNode } from 'react';

export interface PropsThreeDimensionalElement {
  cls?: string;
  children?: ReactNode;
  type?: 'repeating-element';
  is3D?: boolean;
  count?: number;
  zUnit?: 
  | 'px'
  | 'em'
  | 'rem'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
  | '%'
  | 'ch'
  | 'ex'
  | 'cm'
  | 'mm'
  | 'in'
  | 'pt'
  | 'pc';
  perspective?: string;
  direction?: 'forward' | 'backward';
  zStep?: number;
}
