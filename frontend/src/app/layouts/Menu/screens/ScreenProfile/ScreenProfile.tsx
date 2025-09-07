import styles from './ScreenProfile.module.css';
import cn from "classnames";
import { JSX } from "react";
import { PropsScreenProfile } from "./ScreenProfile.props";
import TitlePage from '../../../../common/components/TitlePage/TitlePage';
import { LIST_PROFILE_MENU } from '../../../../core/data/list-component/profileMenu';
import ModalWindow from '../../../../common/components/ModalWindow/ModalWindow';
import { PROFILE_COMPONENTS } from '../../data/list-profile-interface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { signOutThunk } from '../../../../redux/slice/auth/asyncThunk/signOut';
import { EnumProfileList } from '../../../../core/data/list-component/interfaces/profileMenu.interface';
import { ModalCloseContext } from '../../../../common/context/ModalCloseContext';
import { useListJSXElement } from '../../../../common/script/hooks/useListJSXelement';

export default function ScreenProfile({ cls = '', inputRef }: PropsScreenProfile): JSX.Element {
    //redux
    const dispatch = useDispatch<AppDispatch>();
    //custom hook
    const { jsxElement, setJSXByName, resetJSX } = useListJSXElement<EnumProfileList>(PROFILE_COMPONENTS);

    function handleElementMenu(name: EnumProfileList): void {
        if (!name) return;
        if (name === 'exit') {
            dispatch(signOutThunk());
            return;
        }

        setJSXByName(name);
    }

    return (
        <div ref={inputRef} className={cn(styles["profile"], cls)}>
            <div className={cn(styles["profile__wrapper"], {
                [styles['profile-hide']]: Boolean(jsxElement),
            })}>
                <TitlePage cls={styles['title-page']}>Профиль</TitlePage>

                <div className={styles['profile-menu']}>
                    {...LIST_PROFILE_MENU.map((el, i) => {
                        return (
                            <div key={i}
                                onClick={() => handleElementMenu(el.name)}
                                data-profile-name={el.name}
                                className={cn(styles['profile-menu__item'], {
                                    [styles['--exit']]: 'exit' === el.name,
                                })}>
                                {el.title}
                            </div>
                        );
                    })}
                </div>
            </div>

            <ModalWindow isShow={Boolean(jsxElement)} cls={styles['profile-modal']}>
                <ModalCloseContext.Provider value={resetJSX}>
                    {jsxElement}
                </ModalCloseContext.Provider>
            </ModalWindow>
        </div>
    );
}