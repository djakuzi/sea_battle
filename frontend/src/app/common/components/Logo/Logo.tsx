import { JSX } from "react";
import styles from './Logo.module.css';
import { PropsLogo } from "./Logo.props";
import cn from "classnames";

export default function Logo({cls = '', size = 'big'}:PropsLogo):JSX.Element {

    return (
        <div className={cn(styles['logo'], cls)}>
            <div className={styles['logo__title']}>
                <div className={styles['logo__title-txt'] + ' ' + styles['--' + size]}>
                    МОРСКОЙ БОЙ
                </div>
            </div>
            <div className={styles['logo__author']}>
                <div className={styles['logo__author-txt'] + ' ' + styles['--' + size]}>
                    By djakuzi
                </div>
            </div>
        </div>
    );
}