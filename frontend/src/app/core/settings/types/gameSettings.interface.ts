

export interface IntrStatusConnectionServer {
    isShow: boolean;
    isPing: boolean;
    pingTimeMS: number;
}

export interface IntrAnimationUi {
    isInterface: boolean;
}


/**
 * @description - стадартные настройки игры
 * @param {number} statusConnectionServer - количество кораблей на поле
 */
export interface IntrGameSettings {
    statusConnectionServer: IntrStatusConnectionServer;
    animationUi: IntrAnimationUi;
	isOnlinePlayer: boolean;
}