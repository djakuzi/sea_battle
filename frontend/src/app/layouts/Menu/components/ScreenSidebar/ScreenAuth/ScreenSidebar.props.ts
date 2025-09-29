import { EnumScreenName } from "@app-core/data/list-component/interfaces/screenMenu.interface";
import { IntrUseSliderScreen } from "@app-layouts/Menu/script/hook/useSliderScreen.hook";

export interface PropsScreenSidebar {
  cls?: string;
  nameScreen: EnumScreenName;
  setScreen: IntrUseSliderScreen['setScreen'];
};