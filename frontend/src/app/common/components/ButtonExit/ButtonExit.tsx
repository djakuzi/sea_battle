import { JSX} from "react";
import styles from './ButtonExit.module.css';
import cn from "classnames";
import { PropsButtonExit } from "./ButtonExit.props";
import ExitIcon from '@assets/icons/game/common/exite-line.svg?react';

export default function ButtonExit({ cls='', onClick, text}: PropsButtonExit ): JSX.Element {
    
    return (
        <div className={cn(styles['button'], cls)} onClick={onClick}>
            <div className={styles['button-img']}>
                <ExitIcon />
            </div>
            {text && <div className={styles['button-text']}>{text}</div>}
        </div>
    );
};

