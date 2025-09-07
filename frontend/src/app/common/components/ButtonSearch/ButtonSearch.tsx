import { JSX} from "react";
import styles from './ButtonSearch.module.css';
import cn from "classnames";
import SearchIcon from '../../../../assets/icons/game/common/exite-line.svg?react';
import { PropsButtonSearch } from "./ButtonSearch.props";

export default function ButtonSearch({ 
    cls = '',
    onSearch,
    text, 
    posText = 'right',
    type
}: PropsButtonSearch ): JSX.Element {
    const isRightPos = posText === 'right';

    return (
        <button className={cn(styles['button'], cls)} onClick={onSearch} type={type}>
            {(!isRightPos &&text) && <div className={styles['button-text']}>{text}</div>}
            <div className={styles['button-img']}>
                {/* <SearchIcon /> */}
            </div>
            {(isRightPos && text) && <div className={styles['button-text']}>{text}</div>}
        </button>
    );
};

