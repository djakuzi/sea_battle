import { JSX } from "react";
import styles from './TitlePage.module.css';
import { PropsTitlePage } from "./TitlePage.props";


export default function TitlePage({children, cls, size = 'big'}:PropsTitlePage):JSX.Element {

    const classNameTitle = styles['title'] + ' ' + cls;

    return (
        <div className={classNameTitle}>
            <div className={styles['title-txt'] + ' ' + styles['title-txt--' + size]}>
                {children}
            </div>
        </div>
    );
}