import { JSX } from "react";
import styles from './Title.module.css';
import { PropsTitle } from "./Title.props";
import cn from "classnames";

export default function Title({children, cls, size = 'big', type=''}:PropsTitle):JSX.Element {
    const mainClass = cn(styles['title'], styles[type], cls);
    const textClass = cn(styles['title-txt'], styles['title-txt--' + size], styles[type]);

    return (
        <div className={cn(mainClass)}>
            <div className={cn(textClass)}>
                {children}
            </div>
        </div>
    );
}