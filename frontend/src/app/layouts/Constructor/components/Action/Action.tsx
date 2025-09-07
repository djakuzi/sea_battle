import styles from './Action.module.css';
import cn from "classnames";
import { JSX } from "react";
import { PropsAction } from './Action.props';

export default function Action({ cls = '', onClick, children, icon = '', desc = "взаимодействие с полем"}: PropsAction): JSX.Element {

    return (
        <div className={cn(styles['action'], cls)} onClick={() => onClick()}>
            <img className={cn(styles['action-bg'])} src={icon} alt={desc}/>
            <div className={cn(styles['action-content'], cls)}>{children}</div>
        </div>
    );
}