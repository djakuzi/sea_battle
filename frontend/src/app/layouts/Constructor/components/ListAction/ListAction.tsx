import styles from './ListAction.module.css';
import cn from "classnames";
import { JSX } from "react";
import { PropsListAction } from './ListAction.props';
import Action from '../Action/Action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { actionsConstructor } from '../../../../redux/slice/constructor.slice';
import { LIST_ACTION_CONSTRUCTOR_FIELD } from '../../../../core/data/list-component/actionConstructorField';
import { CONFIG_SHIPS } from '../../../../core/settings/ships.settings';
import { inDevelopment } from '../../../../common/script/modules/Developer/methods/inDevelopment';

const classDev = inDevelopment(false);

export default function ListAction({ cls = '', actions }: PropsListAction): JSX.Element {
    const { lastCoordPuttingShip } = useSelector((store: RootState) => store.constructorField);
    const dispatch = useDispatch();

    const handlerAction = (name: string): void => {
        const { random, reset, openModalListSaveCoord} = actions.current;
        const { quantityShips } = CONFIG_SHIPS;
        const isSave = name == 'save';
        const isList = name == 'listSave';
        const isRandom = name == 'random';
        const isReset = name == 'reset';

        if (isSave && lastCoordPuttingShip.length == quantityShips) {
            dispatch(actionsConstructor.addItemCoordByList(lastCoordPuttingShip));
            return;
        }

        if (isList && openModalListSaveCoord) {
            openModalListSaveCoord();
            return;
        }

        if (isRandom && random) {
            random();
            return;
        }

        if (isReset && reset) {
            reset();
            return;
        }
    };

    return (
        <div className={cn(styles['list-action'], cls, classDev)}>
            {...LIST_ACTION_CONSTRUCTOR_FIELD.map((obj, i) => {
                const onClick = (): void => handlerAction(obj.name);

                return <Action key={i + obj.name} icon={obj.icon} desc={obj.desc} onClick={onClick}>{obj.children}</Action>;
            })}
        </div>
    );
}