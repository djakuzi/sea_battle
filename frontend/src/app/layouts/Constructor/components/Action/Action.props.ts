import {ReactNode} from "react";

export interface PropsAction {
  cls?: string;
  children?: ReactNode;
  icon?: string;
  desc: string;
  onClick: (...args: unknown[]) => void;
}