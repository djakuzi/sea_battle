import styles from './CountOnlinePlayers.module.css';
import cn from "classnames";
import { JSX } from "react";
import { PropsCountOnlinePlayers } from './CountOnlinePlayers.props';
import useCountOnline from '@app-layouts/Menu/script/hook/useCountOnline';

export default function CountOnlinePlayers({ cls }: PropsCountOnlinePlayers): JSX.Element {
    const { countOnline } = useCountOnline();

    return (
        <div className={cn(styles['count-online'], cls)}>
			{'Игроков онлайн: ' + countOnline}
        </div>
    );
}