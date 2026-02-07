import { JSX, useEffect, useLayoutEffect, useRef } from 'react';
import styles from './MainScreenSlider.module.css';
import cn from 'classnames';
import { PropsMainScreenSlider } from './MainScreenSlider.props';
import ScreenMenu from './ScreenMenu/ScreenMenu';
import Profile from './ScreenProfile/ScreenProfile';
import Settings from './ScreenSettings/ScreenSettings';
import ScreenAuth from './ScreenAuth/ScreenAuth';
import ScreenSidebar from '../components/ScreenSidebar/ScreenAuth/ScreenSidebar';
import { useAuthCheck } from '../../../root-controller/script/hook/useAuthCheck.hook';
import { useSliderScreen } from '../script/hook/useSliderScreen.hook';
import { useSelector } from 'react-redux';
import { RootState } from '@app-redux/store';

export default function MainScreenSlider({ cls = '' }: PropsMainScreenSlider): JSX.Element {
    const { nameScreen, screenIndex, setScreen } = useSliderScreen();
    const { isAuth } = useSelector((s: RootState) => s.auth)
    const refSlider = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (refSlider.current) {
            refSlider.current.style.setProperty('--index-screen', String(screenIndex));
        } else {
            console.warn('refSlider.current is null on screenIndex change:', screenIndex);
        }
    }, [screenIndex]);

    return (
        <div className={cn(styles['screen'], cls)}>
            <div ref={refSlider} className={styles['screen__slider']}>
                {isAuth ? <Profile /> : <ScreenAuth />}
                <ScreenMenu />
                <Settings />
            </div>
            <ScreenSidebar cls={styles['screen__panel']} setScreen={setScreen} nameScreen={nameScreen} />
        </div>
    );
}