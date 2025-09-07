import { JSX, memo} from "react";
import styles from './ModalWindow.module.css';
import cn from 'classnames';
import { PropsModalWindow } from "./ModalWindow.props";

function ModalWindow({isShow, children, cls = ''}:PropsModalWindow):JSX.Element {

    return (
        <div className={cn(styles['modal'], cls, {
            [styles['--show']]: isShow,
        })}>
            {children}
        </div>
    );
}

export default memo(ModalWindow);