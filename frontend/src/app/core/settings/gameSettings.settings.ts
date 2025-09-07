import { IntrStatusConnectionServer, IntrGameSettings, IntrAnimationUi } from "./types/gameSettings.interface";


export const statusConnectionServer: IntrStatusConnectionServer = {
    isShow: true,
};

export const animationUi: IntrAnimationUi = {
    isInterface: true,
}

export const STANDART_SETTINGS: IntrGameSettings = {
    statusConnectionServer,
    animationUi
};