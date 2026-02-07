import { IntrStatusConnectionServer, IntrGameSettings, IntrAnimationUi } from "./types/gameSettings.interface";

export const statusConnectionServer: IntrStatusConnectionServer = {
    isShow: true,
    isPing: true,
    pingTimeMS: 5000,
};

export const animationUi: IntrAnimationUi = {
    isInterface: true,
}

export const isOnlinePlayer = true;

export const STANDART_SETTINGS: IntrGameSettings = {
    statusConnectionServer,
    animationUi,
	isOnlinePlayer
};