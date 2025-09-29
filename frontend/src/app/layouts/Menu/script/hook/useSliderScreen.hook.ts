import { EnumScreenName } from "@app-core/data/list-component/interfaces/screenMenu.interface";
import { LIST_TOGGLE_MAIN_SCREEN_MENU } from "@app-core/data/list-component/screenMenu";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface IntrUseSliderScreen {
    nameScreen: EnumScreenName;
    screenIndex: number;
    setScreen: (name: EnumScreenName) => void;
}

export function useSliderScreen(): IntrUseSliderScreen {
    const [searchParams, setSearchParams] = useSearchParams();

    const screenParam = searchParams.get("screen") as EnumScreenName;
    const nameScreen = screenParam || EnumScreenName.Menu;
    const screenIndex = LIST_TOGGLE_MAIN_SCREEN_MENU.findIndex(el => el.name === nameScreen);

    function setScreen(name: EnumScreenName) {
        if (name !== nameScreen) {
            setSearchParams({ screen: name });
        }
    }

    return {
        nameScreen,
        screenIndex,
        setScreen,
    };
}