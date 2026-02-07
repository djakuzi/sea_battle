import { JSX, useEffect, useRef, useState } from "react";
import styles from './BattleBot.module.css';
import FullLoad from "../../../../common/components/FullLoad/FullLoad";
import IMGbg from '../../../../../assets/image/game/constructor/ship.jpg';
import BattleField from "../../components/BattleField/BattleField";
import BattleAction from "../../components/BattleAction/BattleAction";
import { BotBattle } from "../../modules/bot";
import { GameBot } from "../../modules/gameBot";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import ModalWindow from "../../../../common/components/ModalWindow/ModalWindow";
import ModalPause from "../../components/ModalPause/ModalPause";
import ModalLose from "../../components/ModalLose/ModalLose";
import ModalWinner from "../../components/ModalWinner/ModalWinner";
import { standartSetTimeout } from "../../../../common/script/modules/TimeOut/methods/standartSetTimeout";
import { useNavigate } from "react-router-dom";
import { actionsBattle } from "@app-redux/slice/battle/battle.slice";

const statusLoad = {
    status: false,
    steps: 'Бот расставляет корабли',
};

interface IntrStatusLaod {
    status: boolean;
    steps: string;
}

export default function BattleBot(): JSX.Element {
    //redux
    const { error, status, winner } = useSelector((state: RootState) => state.battle.battle);
	const dispatch = useDispatch();
    //state
    const [statusLoadBattle, setStatusLoadBattle] = useState<IntrStatusLaod>(statusLoad);
    //ref
    const isMounted = useRef(true);
    const refBot = useRef<BotBattle>(null);
	const refBattle = useRef<GameBot>(null);
    const refFielCoordUser = useRef<HTMLDivElement>(null);
    const refFielCoordBot = useRef<HTMLDivElement>(null);
	//another
	const navigate = useNavigate();

	const callbackAction = {
		exit: () => {
			navigate('/menu');
			dispatch(actionsBattle.clearDataBattle());
		}
	}

    function initBattle(): void {
        if (!isMounted.current) return;
        refBot.current = new BotBattle();
		refBattle.current = new GameBot(refBot.current);
        refBot.current.placeShip();

        function firstStep(): void {
            if (!refBattle.current) return;

            refBattle.current.setFirstMove();
            setStatusLoadBattle((prev) => {
                return { ...prev, steps: 'Определяем, кто первый атакует' };
            });
            standartSetTimeout(1000, secondStep);
        }

        function secondStep(): void {
            if (!refBattle.current) return;

            refBattle.current.setFieldCoord(refFielCoordUser.current, refFielCoordBot.current);
            setStatusLoadBattle((prev) => {
                return { ...prev, steps: 'Бой' };
            });
            standartSetTimeout(500, threeStep);
        }

        function threeStep(): void {
            if (!refBattle.current) return;
            setStatusLoadBattle((prev) => {
                return { ...prev, status: true };
            });
            refBattle.current.init();
        }

        standartSetTimeout(1000, firstStep);
    }

    function unMountComponent(): void {
        isMounted.current = false;

        if (!refBattle.current) return;
        refBattle.current.unInit();
    }

    useEffect(() => {
        initBattle();

        return (): void => unMountComponent();
    }, []);

    if (error) {
        return (
            <div>{error}</div>
        );
    }

    return (
        <div className={styles['battle']} style={{ backgroundImage: `url(${IMGbg})` }}>
            {!statusLoadBattle.status && <FullLoad isBackground={false} text={statusLoadBattle.steps} cls={styles['load__anchor']} ></FullLoad>}
            <div className={styles['battle__wrapper']}>
				<BattleAction callback={callbackAction}/>
                <BattleField cls={styles['battle__field']} inputRefFielCoordEnemy={refFielCoordBot} inputRefFielCoordUser={refFielCoordUser} />
            </div>
            {status == 'pause' && <ModalWindow isShow={status == 'pause'}> <ModalPause /> </ModalWindow>}
            {winner == 'enemy' && <ModalWindow isShow={winner == 'enemy'}> <ModalLose /> </ModalWindow>}
            {winner == 'player' && <ModalWindow isShow={winner == 'player'}> <ModalWinner /></ModalWindow>}
        </div>
    );
}