import { JSX } from "react";
import styles from './BattleCountShip.module.css';
import cn from 'classnames';
import { PropsBattleCountShip } from "./BattleCountShip.props";
import { CONFIG_SHIPS } from "../../../../core/settings/ships.settings";

export default function BattleCountShip({ cls = '', count = 0 }: PropsBattleCountShip): JSX.Element {
    //another
    return (
        <div className={cn(styles['count'], cls)}>
            {count + ' / ' + CONFIG_SHIPS.quantityShips}
        </div>
    );
}