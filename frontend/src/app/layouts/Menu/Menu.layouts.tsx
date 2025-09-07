import { JSX, useEffect } from "react";
import styles from './Menu.module.css';
import changeTheme from "../../common/script/modules/changeTheme.module";
import ChangeTheme from "../../common/components/ChangeTheme/ChangeTheme";
import Logo from "../../common/components/Logo/Logo";
import MainScreenSlider from "./screens/MainScreenSlider";

export default function Menu(): JSX.Element {
    useEffect(() => {
        changeTheme('set');
    }, []);

    return (
        <div className={styles["menu"]}>
            <div className={styles["menu-window"]}>
                <div className={styles['menu-interaction']}>
                    <ChangeTheme cls={styles['menu-theme']} />
                    <Logo cls={styles['menu-logo']} size="big"></Logo>
                </div>

                <MainScreenSlider></MainScreenSlider>
            </div>
        </div>
    );
};


