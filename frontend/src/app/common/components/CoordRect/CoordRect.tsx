import styles from './CoordRect.module.css';
import cn from "classnames";
import { PropsCoordRect } from './CoordRect.props';
import { JSX } from 'react';
import PortShip from '../../../layouts/Constructor/components/PortShip/PortShip';
import { useGetWidthRect } from '../../script/hooks/getWidthRect';

export default function CoordRect({ cls = '', inputRef, isMountPort = false, isHoverCoord = false }: PropsCoordRect): JSX.Element {

    const widthRect = useGetWidthRect(inputRef);
	const resCls = cn(cls, styles['box']);

	const resClsRect = cn(styles['box-row__rect'], {
		[styles['rect--coord-hover']]: isHoverCoord
	});

    return (
		<div ref={inputRef} className={resCls} data-field-battle>
            {isMountPort && <PortShip widthRect={widthRect} cls={styles["port"]} />}
            <div className={styles['box__row']}>
                <div className={resClsRect} data-coord-x='0' data-coord-y='0'></div>
                <div className={resClsRect} data-coord-x='1' data-coord-y='0'></div>
                <div className={resClsRect} data-coord-x='2' data-coord-y='0'></div>
                <div className={resClsRect} data-coord-x='3' data-coord-y='0'></div>
                <div className={resClsRect} data-coord-x='4' data-coord-y='0'></div>
                <div className={resClsRect} data-coord-x='5' data-coord-y='0'></div>
                <div className={resClsRect} data-coord-x='6' data-coord-y='0'></div>
                <div className={resClsRect} data-coord-x='7' data-coord-y='0'></div>
                <div className={resClsRect} data-coord-x='8' data-coord-y='0'></div>
                <div className={resClsRect} data-coord-x='9' data-coord-y='0'></div>
            </div>
            <div className={styles['box__row']}>
                <div className={resClsRect} data-coord-x='0' data-coord-y='1'></div>
                <div className={resClsRect} data-coord-x='1' data-coord-y='1'></div>
                <div className={resClsRect} data-coord-x='2' data-coord-y='1'></div>
                <div className={resClsRect} data-coord-x='3' data-coord-y='1'></div>
                <div className={resClsRect} data-coord-x='4' data-coord-y='1'></div>
                <div className={resClsRect} data-coord-x='5' data-coord-y='1'></div>
                <div className={resClsRect} data-coord-x='6' data-coord-y='1'></div>
                <div className={resClsRect} data-coord-x='7' data-coord-y='1'></div>
                <div className={resClsRect} data-coord-x='8' data-coord-y='1'></div>
                <div className={resClsRect} data-coord-x='9' data-coord-y='1'></div>
            </div>
            <div className={styles['box__row']}>
                <div className={resClsRect} data-coord-x='0' data-coord-y='2'></div>
                <div className={resClsRect} data-coord-x='1' data-coord-y='2'></div>
                <div className={resClsRect} data-coord-x='2' data-coord-y='2'></div>
                <div className={resClsRect} data-coord-x='3' data-coord-y='2'></div>
                <div className={resClsRect} data-coord-x='4' data-coord-y='2'></div>
                <div className={resClsRect} data-coord-x='5' data-coord-y='2'></div>
                <div className={resClsRect} data-coord-x='6' data-coord-y='2'></div>
                <div className={resClsRect} data-coord-x='7' data-coord-y='2'></div>
                <div className={resClsRect} data-coord-x='8' data-coord-y='2'></div>
                <div className={resClsRect} data-coord-x='9' data-coord-y='2'></div>
            </div>
            <div className={styles['box__row']}>
                <div className={resClsRect} data-coord-x='0' data-coord-y='3'></div>
                <div className={resClsRect} data-coord-x='1' data-coord-y='3'></div>
                <div className={resClsRect} data-coord-x='2' data-coord-y='3'></div>
                <div className={resClsRect} data-coord-x='3' data-coord-y='3'></div>
                <div className={resClsRect} data-coord-x='4' data-coord-y='3'></div>
                <div className={resClsRect} data-coord-x='5' data-coord-y='3'></div>
                <div className={resClsRect} data-coord-x='6' data-coord-y='3'></div>
                <div className={resClsRect} data-coord-x='7' data-coord-y='3'></div>
                <div className={resClsRect} data-coord-x='8' data-coord-y='3'></div>
                <div className={resClsRect} data-coord-x='9' data-coord-y='3'></div>
            </div>
            <div className={styles['box__row']}>
                <div className={resClsRect} data-coord-x='0' data-coord-y='4'></div>
                <div className={resClsRect} data-coord-x='1' data-coord-y='4'></div>
                <div className={resClsRect} data-coord-x='2' data-coord-y='4'></div>
                <div className={resClsRect} data-coord-x='3' data-coord-y='4'></div>
                <div className={resClsRect} data-coord-x='4' data-coord-y='4'></div>
                <div className={resClsRect} data-coord-x='5' data-coord-y='4'></div>
                <div className={resClsRect} data-coord-x='6' data-coord-y='4'></div>
                <div className={resClsRect} data-coord-x='7' data-coord-y='4'></div>
                <div className={resClsRect} data-coord-x='8' data-coord-y='4'></div>
                <div className={resClsRect} data-coord-x='9' data-coord-y='4'></div>
            </div>
            <div className={styles['box__row']}>
                <div className={resClsRect} data-coord-x='0' data-coord-y='5'></div>
                <div className={resClsRect} data-coord-x='1' data-coord-y='5'></div>
                <div className={resClsRect} data-coord-x='2' data-coord-y='5'></div>
                <div className={resClsRect} data-coord-x='3' data-coord-y='5'></div>
                <div className={resClsRect} data-coord-x='4' data-coord-y='5'></div>
                <div className={resClsRect} data-coord-x='5' data-coord-y='5'></div>
                <div className={resClsRect} data-coord-x='6' data-coord-y='5'></div>
                <div className={resClsRect} data-coord-x='7' data-coord-y='5'></div>
                <div className={resClsRect} data-coord-x='8' data-coord-y='5'></div>
                <div className={resClsRect} data-coord-x='9' data-coord-y='5'></div>
            </div>
            <div className={styles['box__row']}>
                <div className={resClsRect} data-coord-x='0' data-coord-y='6'></div>
                <div className={resClsRect} data-coord-x='1' data-coord-y='6'></div>
                <div className={resClsRect} data-coord-x='2' data-coord-y='6'></div>
                <div className={resClsRect} data-coord-x='3' data-coord-y='6'></div>
                <div className={resClsRect} data-coord-x='4' data-coord-y='6'></div>
                <div className={resClsRect} data-coord-x='5' data-coord-y='6'></div>
                <div className={resClsRect} data-coord-x='6' data-coord-y='6'></div>
                <div className={resClsRect} data-coord-x='7' data-coord-y='6'></div>
                <div className={resClsRect} data-coord-x='8' data-coord-y='6'></div>
                <div className={resClsRect} data-coord-x='9' data-coord-y='6'></div>
            </div>
            <div className={styles['box__row']}>
                <div className={resClsRect} data-coord-x='0' data-coord-y='7'></div>
                <div className={resClsRect} data-coord-x='1' data-coord-y='7'></div>
                <div className={resClsRect} data-coord-x='2' data-coord-y='7'></div>
                <div className={resClsRect} data-coord-x='3' data-coord-y='7'></div>
                <div className={resClsRect} data-coord-x='4' data-coord-y='7'></div>
                <div className={resClsRect} data-coord-x='5' data-coord-y='7'></div>
                <div className={resClsRect} data-coord-x='6' data-coord-y='7'></div>
                <div className={resClsRect} data-coord-x='7' data-coord-y='7'></div>
                <div className={resClsRect} data-coord-x='8' data-coord-y='7'></div>
                <div className={resClsRect} data-coord-x='9' data-coord-y='7'></div>
            </div>
            <div className={styles['box__row']}>
                <div className={resClsRect} data-coord-x='0' data-coord-y='8'></div>
                <div className={resClsRect} data-coord-x='1' data-coord-y='8'></div>
                <div className={resClsRect} data-coord-x='2' data-coord-y='8'></div>
                <div className={resClsRect} data-coord-x='3' data-coord-y='8'></div>
                <div className={resClsRect} data-coord-x='4' data-coord-y='8'></div>
                <div className={resClsRect} data-coord-x='5' data-coord-y='8'></div>
                <div className={resClsRect} data-coord-x='6' data-coord-y='8'></div>
                <div className={resClsRect} data-coord-x='7' data-coord-y='8'></div>
                <div className={resClsRect} data-coord-x='8' data-coord-y='8'></div>
                <div className={resClsRect} data-coord-x='9' data-coord-y='8'></div>
            </div>
            <div className={styles['box__row']}>
                <div className={resClsRect} data-coord-x='0' data-coord-y='9'></div>
                <div className={resClsRect} data-coord-x='1' data-coord-y='9'></div>
                <div className={resClsRect} data-coord-x='2' data-coord-y='9'></div>
                <div className={resClsRect} data-coord-x='3' data-coord-y='9'></div>
                <div className={resClsRect} data-coord-x='4' data-coord-y='9'></div>
                <div className={resClsRect} data-coord-x='5' data-coord-y='9'></div>
                <div className={resClsRect} data-coord-x='6' data-coord-y='9'></div>
                <div className={resClsRect} data-coord-x='7' data-coord-y='9'></div>
                <div className={resClsRect} data-coord-x='8' data-coord-y='9'></div>
                <div className={resClsRect} data-coord-x='9' data-coord-y='9'></div>
            </div>
        </div>
    );
}