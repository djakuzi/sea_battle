import { JSX } from 'react';
import styles from './Ping.module.css';
import cn from "classnames";
import { PropsPing } from './Ping.props';

export default function Ping({ cls = '', ref}: PropsPing): JSX.Element {
    
    return (
        <div className={cn(styles['ping'], cls)}>
            <div className={styles['ping-current']}>

            </div>
        </div>
    )
}