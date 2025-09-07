import styles from './ScreenSidebar.module.css';
import cn from "classnames";
import { JSX } from "react";
import { PropsScreenSidebar } from "./ScreenSidebar.props";
import { LIST_TOGGLE_MAIN_SCREEN_MENU } from '../../../../../core/data/list-component/screenMenu';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../redux/store';
import { actionsMainSliderScreen } from '../../../../../redux/slice/menuSlider.slice';
import { EnumScreenName } from '../../../../../core/data/list-component/interfaces/screenMenu.interface';

export default function ScreenSidebar({ cls = '' }: PropsScreenSidebar): JSX.Element {
    //redux
    const dispatch = useDispatch<AppDispatch>();
    const nameScreen = useSelector((state: RootState) => state.menuSlider.nameScreen);

    const handleClick = (name: EnumScreenName): void => {
        if (name !== nameScreen) dispatch(actionsMainSliderScreen.changeScreen(name));
    };

    return (
        <div className={cn(styles['screen__panel'], cls)}>
            {...LIST_TOGGLE_MAIN_SCREEN_MENU.map((el, i) => {
                return (
                    <div key={i} data-index={i} onClick={() => handleClick(el.name)} className={cn(styles['panel__item'], {
                        [styles['--active']]: nameScreen === el.name,
                    })}>
                        <img src={el.icon + ''} alt={el.name} />
                    </div>
                );
            })}
        </div>
    );
}