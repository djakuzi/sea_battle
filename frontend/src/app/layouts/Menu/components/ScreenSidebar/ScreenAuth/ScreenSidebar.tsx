import styles from './ScreenSidebar.module.css';
import cn from "classnames";
import { JSX } from "react";
import { PropsScreenSidebar } from "./ScreenSidebar.props";
import { LIST_TOGGLE_MAIN_SCREEN_MENU } from '../../../../../core/data/list-component/screenMenu';

export default function ScreenSidebar({ cls = '', nameScreen, setScreen}: PropsScreenSidebar): JSX.Element {

    return (
        <div className={cn(styles['screen__panel'], cls)}>
            {...LIST_TOGGLE_MAIN_SCREEN_MENU.map((el, i) => {
                return (
                    <div key={i} data-index={i} onClick={() => setScreen(el.name)} className={cn(styles['panel__item'], {
                        [styles['--active']]: nameScreen === el.name,
                    })}>
                        <img src={el.icon + ''} alt={el.name} />
                    </div>
                );
            })}
        </div>
    );
}