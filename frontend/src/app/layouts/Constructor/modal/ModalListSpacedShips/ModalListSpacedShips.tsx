import { JSX } from "react";
import styles from './ModalListSpacedShips.module.css';
import cn from 'classnames';
import { PropsModalListSpacedShips } from "./ModalListSpacedShips.props";
import { useSelector } from "react-redux";
import { RootState } from "@app-redux/store";
import CoordRect from "@app-common/components/CoordRect/CoordRect";
import { useModalClose } from "@app-common/context/ModalCloseContext";
import ButtonExit from "@app-common/components/ButtonExit/ButtonExit";

export function ModalListSpacedShips({cls = '' }: PropsModalListSpacedShips): JSX.Element {
    //redux
    const listSaveCoordPuttingShip = useSelector((s: RootState) => s.constructorField.listSaveCoordPuttingShip);
    //custom context
    const resetJsx = useModalClose();
    return (
        <div className={cn(cls, styles['save'])}>
            <ButtonExit cls={styles['header-exit']} onClick={resetJsx} />
            <div className={styles['save-list']}>
                {
                    ...listSaveCoordPuttingShip.map(el => {
                        return <CoordRect />
                    })
                }
            </div>
        </div>
    );
};