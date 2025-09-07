export interface PropsListAction {
  widthRect: number;
  cls?: string;
  actions: React.RefObject<{
    openModalListSaveCoord: (() => void) | undefined;
    reset: (() => void) | undefined;
    random: (() => void) | undefined;
  }>;
}