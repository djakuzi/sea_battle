import { ReactNode } from "react";
import { SizeChoise } from "../../types/sizeChoise.type";

export interface PropsTitlePage {
  children: ReactNode;
  cls?: string;
  size?: SizeChoise;
};