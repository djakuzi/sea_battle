import { IntrPlayerFull } from "../../../../../../common/types/Player.interface";

export interface ResponseRefresh {
    accessToken: string;
    player: IntrPlayerFull;
}

export interface ResponseAuth {
    accessToken: string;
    player: IntrPlayerFull;
}

export interface ResponseSignOut {
    isLogout: boolean;
}

export interface ResponseVerificationUser {
    login: string;
    email: string | null;
    verification_name: string;
}