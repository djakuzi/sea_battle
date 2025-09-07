import { JSX } from "react";
import styles from './ScreenMenu.module.css';
import TitlePage from "../../../../common/components/TitlePage/TitlePage";
import { PropsScreenMenu } from "./ScreenMenu.props";
import { useNavigate } from "react-router-dom";
import { LIST_VARIANT_PLAY } from "../../../../core/data/list-component/variantsPlay";

export default function ScreenMenu({ inputRef }: PropsScreenMenu): JSX.Element {
    const navigate = useNavigate();

    function handleNavigate(typeGame: string): void {
        navigate('/constructor?typegame=' + typeGame);
    }

    return (
        <div ref={inputRef} className={styles['menu']}>
            <div className={styles['menu__wrapper']}>
                <TitlePage cls={styles['title-page']}>МЕНЮ</TitlePage>
                <div className={styles['menu__box']}>
                    <div className={styles['game']}>

                        <div className={styles['game__title']}>
                            ВЫБЕРИ ТИП ИГРЫ
                        </div>

                        <div className={styles['game__types']}>
                            {...LIST_VARIANT_PLAY.map(el => {
                                return (
                                    <div onClick={() => handleNavigate(el.type)} className={styles['game__types-item']}>
                                        <div className={styles['game__types-item-hide']}>{el.title}</div>
                                        <div className={styles['game__types-item-front']}>{el.title}</div>
                                        <div className={styles['game__types-item-back']}>ИГРАТЬ</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles['game__leaders']}>
                        Таблица лидеров
                    </div>
                </div>
            </div>
        </div>
    );
};