import styles from './Rules.module.css';
import cn from "classnames";
import { JSX } from "react";
import { PropsRules } from './Rules.props';

export default function Rules({ cls = '' }: PropsRules): JSX.Element {

    return (
        <div className={cn(styles['rules'], cls)}>
            <img src="" alt="" />
        </div>
    );
}