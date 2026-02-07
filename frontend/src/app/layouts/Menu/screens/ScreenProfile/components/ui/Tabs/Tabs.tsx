import { JSX } from "react";
import styles from './Tabs.module.css';
import { PropsTabs } from "./Tabs.props";
import cn from "classnames";

export default function Tabs({ 
    cls = '', 
    tabs,
	setIdTab
}: PropsTabs):JSX.Element {

    return (
		<div className={cn(styles['tabs'], cls) }>
			{...tabs.map( (el, i) => {
				return (
					<div className={styles['tabs__item']} onClick={() => setIdTab(i)}>
						{el}
					</div>
				)
			})}
		</div>
    );
}