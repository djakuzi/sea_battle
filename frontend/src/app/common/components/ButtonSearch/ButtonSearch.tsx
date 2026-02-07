import { JSX} from "react";
import styles from './ButtonSearch.module.css';
import cn from "classnames";
import SearchIcon from '../../../../assets/icons/game/common/search.svg?react';
import { PropsButtonSearch } from "./ButtonSearch.props";

export default function ButtonSearch({ 
    cls = '',
    onSearch,
    text, 
    posText = 'right',
    type,
	visual = 'standart'
}: PropsButtonSearch ): JSX.Element {
    const isRightPos = posText === 'right';

    return (
        <button className={cn(
				styles['button'],
				cls, 
				styles[visual]
			)} 
			onClick={onSearch} 
			type={type}
		>
			{(posText === 'left' && text) && <div className={styles['button-text']}>{text}</div>}
            <div className={styles['button-img']}>
                <SearchIcon />
            </div>
			{(posText === 'right' && text) && <div className={styles['button-text']}>{text}</div>}
        </button>
    );
};

