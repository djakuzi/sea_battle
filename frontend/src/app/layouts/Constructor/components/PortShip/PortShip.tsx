import styles from './PortShip.module.css';
import cn from "classnames";
import { JSX } from "react";
import Ship from '../../../../common/components/Ship/Ship';
import { PropsShip } from './PortShip.props';
import { IntrWidthShip } from '../../../../common/types/Ship.interface';
import { getWidthShip } from '../../../../common/script/modules/ship.module';

export default function PortShip({ widthRect, cls }: PropsShip): JSX.Element {
    const objWidthRect: IntrWidthShip = getWidthShip(widthRect);

    return (
        <div className={cn(styles['constructor'], cls)} data-port>
            <div className={styles['contsturtor-title']}>Расставь корабли</div>
            <div className={styles['contsturtor-positon__port-station']} >
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.four + 'px' }} data-port-ship>
                    <Ship size={4} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
            </div>
            <div className={styles['contsturtor-positon__port-station']}>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.three + 'px' }} data-port-ship>
                    <Ship size={3} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.three + 'px' }} data-port-ship>
                    <Ship size={3} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
            </div>
            <div className={styles['contsturtor-positon__port-station']}>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.two + 'px' }} data-port-ship>
                    <Ship size={2} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.two + 'px' }} data-port-ship>
                    <Ship size={2} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.two + 'px' }} data-port-ship>
                    <Ship size={2} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
            </div>
            <div className={cn(styles['contsturtor-positon__port-station'])}>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.one + 'px' }} data-port-ship>
                    <Ship size={1} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.one + 'px' }} data-port-ship>
                    <Ship size={1} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.one + 'px' }} data-port-ship>
                    <Ship size={1} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
                <div className={styles['contsturtor-positon__port-wrapper']} style={{ width: objWidthRect.one + 'px' }} data-port-ship>
                    <Ship size={1} view='blue' plane={'horizontal'} style={{ width: widthRect }} cls={styles['ship']} />
                </div>
            </div>
        </div>
    );
}