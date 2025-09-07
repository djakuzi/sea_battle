import { getIdGuest } from "@app-common/script/modules/Guest/methods/getIdGuest";
import store from "@app-redux/store";

export function getPlayerId(): string {
    const player = store.getState().auth.player;

    return player ? player.id + '' : getIdGuest();
}