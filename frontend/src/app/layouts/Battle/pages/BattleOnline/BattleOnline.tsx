import { JSX } from "react";
import styles from './BattleOnline.module.css';
import CoordRect from "../../../../common/components/CoordRect/CoordRect";
import FullLoad from "../../../../common/components/FullLoad/FullLoad";

export default function BattleOnline(): JSX.Element {

    return (
        <div className={styles['battle']}>
            <FullLoad isBackground={false} text={''} cls={styles['load__anchor']} ></FullLoad>
            <div className={styles['battle__action']}></div>
            <div className={styles['battle__status']}></div>
            <CoordRect>
            </CoordRect>
            <CoordRect>

            </CoordRect>
            <div className={styles['battle_ship']}>

            </div>
        </div>
    );
}