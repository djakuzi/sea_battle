import { ReactNode } from "react";
import { SizeChoise } from "../../types/sizeChoise.type";

export interface PropsTitle {
  children: ReactNode;
  cls?: string;
  size?: SizeChoise;
  type?: 'v1' | '';
};