import { IntrAnimationUi } from "@app-core/settings/types/gameSettings.interface";
import { RootState } from "@app-redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// export interface ReturnAnimation<K extends keyof IntrAnimationUi> {
//     [key in K]: boolean;
// }

export function useAnimationUi<K extends keyof IntrAnimationUi>(key: K): Record<K, boolean> {
    const isAnimnation = useSelector((s: RootState) => s.gameSettings.animationUi[key] as boolean);

    useEffect(() => {

    }, [isAnimnation])

    return {
        [key]: !!isAnimnation,
    } as Record<K, boolean>;
}