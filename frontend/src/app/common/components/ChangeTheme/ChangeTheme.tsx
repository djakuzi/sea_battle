import { JSX } from "react";
import styles from './ChangeTheme.module.css';
import { PropsChangeTheme } from "./ChangeTheme.props";
import changeTheme from "../../script/modules/changeTheme.module";
import cn from "classnames";

export default function ChangeTheme({ cls }: PropsChangeTheme): JSX.Element {
    return (
        <div className={cn(styles['switch'], cls)} onClick={() => { changeTheme('toggle'); }}>
            <div className={styles['switch__toggle']}>
            </div>
        </div>
    );
}