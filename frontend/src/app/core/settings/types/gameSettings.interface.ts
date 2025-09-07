

export interface IntrStatusConnectionServer {
    isShow: boolean;
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
}