import { JSX} from "react";
import styles from './Search.module.css';
import cn from "classnames";
import ButtonSearch from "../ButtonSearch/ButtonSearch";
import { PropsSearch } from "./Search.props";

export default function Search({ 
	onSubmit,
	cls = '',
	search,
	btn,
	visual = 'blur-gradient'
}: PropsSearch ): JSX.Element {
	return (
		<form
			className={cn(styles['search'], cls, styles[visual])}
			action={onSubmit}
		>
			<div className={cn(styles['search__wrapper'])}>
				<input
					className={cn(styles['search__input'], search?.cls)}
					{...search}
				/>
				<ButtonSearch {...btn} cls={styles['search__btn']} />
			</div>

		</form>
	)

};

