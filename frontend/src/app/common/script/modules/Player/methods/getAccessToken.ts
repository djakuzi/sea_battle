import store from "@app-redux/store";

export function getAccessToken() {
    const accessToken = store.getState().auth.accessToken;
    return accessToken ? accessToken + '' : null;
}