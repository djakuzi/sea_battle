import styles from './Standart.module.css';
import cn from "classnames";
import { JSX } from "react";
import { PropsPopup } from './Popup.props';

export default function Popup({ cls = '' }: PropsPopup): JSX.Element {

    return (
        <div className={cn(styles['popup'], cls)}>
        </div>
    );
}