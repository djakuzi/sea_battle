import { JSX } from 'react';
import styles from './Ping.module.css';
import cn from "classnames";
import { PropsPing } from './Ping.props';
import { usePing } from '@app-common/script/hooks/ws-hooks/usePing.hook';

export default function Ping({ cls = ''}: PropsPing): JSX.Element {
    const {ping} = usePing();

    if (!ping) {
        return <div style={{display: 'none'}}></div>
    }

    return (
        <div className={cn(styles['ping'], cls)}>
            <div className={styles['ping-current']}>
                {`${ping} ms`}
            </div>
        </div>
    )
}