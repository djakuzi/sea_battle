import { JSX, useEffect, useRef } from "react";
import styles from './MainScreenSlider.module.css';
import cn from "classnames";
import { PropsMainScreenSlider } from "./MainScreenSlider.props";
import ScreenMenu from "./ScreenMenu/ScreenMenu";
import Profile from "./ScreenProfile/ScreenProfile";
import Settings from "./ScreenSettings/ScreenSettings";
import { useSelector } from "react-redux";
import { LIST_TOGGLE_MAIN_SCREEN_MENU } from "../../../core/data/list-component/screenMenu";
import ScreenAuth from "./ScreenAuth/ScreenAuth";
import ScreenSidebar from "../components/ScreenSidebar/ScreenAuth/ScreenSidebar";
import { EnumScreenName } from "../../../core/data/list-component/interfaces/screenMenu.interface";
import { RootState } from "../../../redux/store";
import { useAuthCheck } from "@app-common/script/hooks/api-hooks/useAuthCheck.hook";

export default function MainScreenSlider({ cls = '' }: PropsMainScreenSlider): JSX.Element {
    //redux
    const nameScreen = useSelector((state: RootState) => state.menuSlider.nameScreen);
    const { isAuthorized, isAuthChecked } = useAuthCheck();

    const refSlider = useRef<HTMLDivElement>(null);
    //style
    const varStyle = {
        screen: {
            ['--index-screen']: getIndexActiveScreen(nameScreen),
        } as React.CSSProperties,
    };

    const inlineStyle = {
        screen: {
            ...varStyle.screen,
        }
    };

    useEffect(() => {
        translateSlider();
    }, [nameScreen]);

    function getIndexActiveScreen(name: EnumScreenName): number {
        return LIST_TOGGLE_MAIN_SCREEN_MENU.findIndex(el => el.name == name);
    }

    function translateSlider(): void {
        if (!refSlider.current) return;

        const index = getIndexActiveScreen(nameScreen);
        varStyle.screen['--index-screen'] = String(index);
    }

    if (!isAuthChecked) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className={cn(styles['screen'], cls)}>
            <div ref={refSlider} style={inlineStyle.screen} className={styles["screen__slider"]}>
                {isAuthorized ? <Profile /> : <ScreenAuth />}
                <ScreenMenu />
                <Settings />
            </div>
            <ScreenSidebar cls={styles['screen__panel']} />
        </div>
    );
}
