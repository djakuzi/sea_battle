import { JSX} from "react";
import styles from './Button.module.css';
import cn from "classnames";
import { Link } from "react-router-dom";
import { PropsButton } from "./Button.props";

export default function Button({ paramsLink, isBtn, children, cls, type = "button", onClick}:PropsButton ): JSX.Element {
    if (paramsLink) {
        return (
            <Link to={paramsLink.link} className={cn(styles['button'], cls)}>{children}</Link>
        );
    }

    if (isBtn) {
        return (
            <button className={cn(styles['button'], cls)} type={type} onClick={() => onClick()}>{children}</button>
        );
    }
    
    return (
        <div className={cn(styles['button'], cls)}>
            Произошла ошибка
        </div>
    );
};

