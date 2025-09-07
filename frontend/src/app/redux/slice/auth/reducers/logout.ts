import { initialStateAuth } from "../auth.slice";

export function logout(state: initialStateAuth): void {
    state.accessToken = null;
    state.player = null;
}