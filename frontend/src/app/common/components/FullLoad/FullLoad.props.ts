export interface PropsFullLoad {
  cls?: string;
  text?: string;
  isBackground?: boolean;
  posText?: 'top' | 'bottom';
  btnData?: {
	text: string,
	onClick?: () => void,
	cls?: string,
  }[]
}