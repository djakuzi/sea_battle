import { JSX, useEffect, useRef, useState } from "react";
import '../../styles/game/fieldCoord.css';
import styles from './Constructor.module.css';
import cn from "classnames";
import CoordRect from "../../common/components/CoordRect/CoordRect";
import Button from "../../common/components/Button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import ManagerConstructor from "./modules/Constructor";
import IMGbg from '../../../assets/image/game/constructor/ship.jpg';
import IMGBang from '../../../assets/icons/game/constructor/bang.png';
import IMGSearchShip from '../../../assets/icons/game/constructor/search-tanker.svg';
import PortShip from "./components/PortShip/PortShip";
import FullLoad from "../../common/components/FullLoad/FullLoad";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { actionsBattle } from "../../redux/slice/battle.slice";
import { TypeBattle } from "../Battle/types/battle";
import ListAction from "./components/ListAction/ListAction";
import { actionsConstructor } from "../../redux/slice/constructor.slice";
import { createOneNotificftion } from "../../root-controller/Visual-Interface/elements/Notification/modules/notification";
import { useGetWidthRect } from "../../common/script/hooks/getWidthRect";
import { useListJSXElement } from "@app-common/script/hooks/useListJSXelement";
import { EnumConstructorModals, LIST_CONSTRUCTOR_MODALS } from "./data/list-modal";
import { ModalCloseContext } from "@app-common/context/ModalCloseContext";
import ModalWindow from "@app-common/components/ModalWindow/ModalWindow";

const textbtn = {
    'bot': 'Порвать ботяру',
    'online': 'Найти соперника',
    'tournament': 'Найти соперника',
    'invite': 'Победить друга'
};

const textBattle = {
    'bot': 'Бот готовится',
    'online': 'Поиск соперника',
    'tournament': 'Поиск соперника',
    'invite': 'Ожидание друга'
};

export default function Constructor(): JSX.Element {
    // dispatch redux
    const dispatch = useDispatch<AppDispatch>();
    //ref
    const isMounted = useRef(false);
    const refCoordRect = useRef<HTMLDivElement>(null);
    const refConstructor = useRef<HTMLDivElement>(null);
    const refManagerConstructor = useRef<ManagerConstructor>(null);
    const refActions = useRef({
        openModalListSaveCoord: ():void => {},
        reset: refManagerConstructor.current?.resetPositionShips,
        random: refManagerConstructor.current?.randomPositionShips,
    });
    //another
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isload, setIsLoad] = useState<boolean>(false);

    //custom hook
    const widthRect = useGetWidthRect(refCoordRect);
    const { jsxElement, setJSXByName, resetJSX } = useListJSXElement<EnumConstructorModals>(LIST_CONSTRUCTOR_MODALS);
    
    const typeGame = searchParams.get('typegame') as TypeBattle;
    const testGame = typeGame == "invite" || typeGame == "bot";

    const exit = (): void => {
        navigate(-1);
    };

    const play = (): void => {
        if (document.querySelector('[data-port-ship] [data-ship]')) {
            createOneNotificftion('warn', 'Расставлены не все корабли', false, 3000);
            return;
        }

        if (!refManagerConstructor.current || !typeGame) {
            console.log('произошла ошибка');
            return;
        }

        setIsLoad(true);

        dispatch(actionsBattle.setCoordPuttingShips({
            typePlayers: 'player',
            coordPuttingShips: refManagerConstructor.current.arrCoordPuttingShip,
        }));

        dispatch(actionsBattle.setTypeBattle(typeGame));
        dispatch(actionsConstructor.resetLastCoordsShips());
        navigate('/battle');
    };

    const loadClose = (): void => {
        setIsLoad(false);
    };

    const initManagerConstructor = (): void => {
        if (!refCoordRect.current || isMounted.current) return;
        
        refManagerConstructor.current = new ManagerConstructor(refCoordRect.current!, refConstructor.current!);
        refManagerConstructor.current.init();

        refActions.current = {
            openModalListSaveCoord: () => setJSXByName(EnumConstructorModals.ListSaveCoordsShips),
            reset: refManagerConstructor.current?.resetPositionShips,
            random: refManagerConstructor.current?.randomPositionShips,
        };

        refManagerConstructor.current.setLastCoordsShips();

        isMounted.current = true;
    };

    useEffect(() => {
        initManagerConstructor();

        return (): void => {
            isMounted.current = false;
            if (refManagerConstructor.current) {
                refManagerConstructor.current!.unInit();
            }
        };
    }, []);

    return (
        <div ref={refConstructor} className={cn(styles['constructor'], { [styles['--loading']]: isload })} style={{ backgroundImage: `url(${IMGbg})` }}>
            <div className={styles['load']}>
                <FullLoad isBackground={false} text={textBattle[typeGame + '']} cls={styles['load__anchor']}></FullLoad>
                <Button cls={cn(styles['load__close'], 'button-action')} onClick={loadClose} isBtn={true}>Отменить</Button>
            </div>

            <div className={cn(styles['constructor__box'])}>
                <div className={styles['constructor__action']}>
                    <Button cls={cn(styles['constructor-action__exit'], 'button-action')} isBtn={true} onClick={exit}>Назад</Button>
                </div>

                <div className={styles['constructor__positon']}>
                    <div className={styles['constructor__positon-wrapper']}>
                        <CoordRect inputRef={refCoordRect} cls={styles['constructor-positon__coord']} />
                        <ListAction widthRect={0} cls={styles['list-action']} actions={refActions} />
                    </div>

                    <PortShip widthRect={widthRect} cls={styles["contsturtor-positon__port"]} />
                </div>

                <div className={styles['constructor__action']}>
                    <Button cls={cn(styles['constructor-action__play'], 'button-action', {
                        [styles['red']]: testGame
                    })} isBtn={true} onClick={play}>
                        <div className={styles['constructor-action-play__text']}>{textbtn[typeGame + '']}</div>
                        <div className={styles['constructor-action-play__bang']}>
                            <img src={testGame ? IMGBang + '' : IMGSearchShip + ''} alt="" />
                        </div>
                    </Button>
                </div>
            </div>
            <ModalWindow isShow={Boolean(jsxElement)} cls={styles['constructor-modal']}>
                <ModalCloseContext.Provider value={resetJSX}>
                    {jsxElement}
                </ModalCloseContext.Provider>
            </ModalWindow>
        </div>
    );
};