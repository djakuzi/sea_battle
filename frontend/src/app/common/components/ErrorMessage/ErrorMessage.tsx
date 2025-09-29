import { JSX} from "react";
import styles from './ErrorMessage.module.css';
import cn from "classnames";
import { PropsErrorMessage } from "./ErrorMessage.props";

export default function ErrorMessage({ 
    cls = '',
    children,
    onClick,
    modificator = 'in-list'
}: PropsErrorMessage ): JSX.Element {
    const resCls = cn(cls, styles['error-message'], styles['error-message--' + modificator]);

    return (
        <div className={resCls}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

