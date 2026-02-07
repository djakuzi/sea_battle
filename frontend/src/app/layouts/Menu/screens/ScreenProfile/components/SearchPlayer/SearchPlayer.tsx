import { JSX, useEffect, useRef } from "react";
import styles from './SearchPlayer.module.css';
import cn from "classnames";
import { PropsSearchPlayer } from "./SearchPlayer.props";
import ListPlayer from "../list/ListPlayer/ListPlayer";
import { useFindPlayers } from "@app-common/script/hooks/api-hooks/useFIndPlayers.hook";
import ErrorMessage from "@app-common/components/ErrorMessage/ErrorMessage";
import Search from "../../../../../../common/components/Search/Search";
import { useGetHeight } from "@app-common/script/hooks/util/useGetHeight.hook";

export default function SearchPlayer({
	cls = '',
}: PropsSearchPlayer): JSX.Element {
	//hook
	const { listPlayers, error, findFindPlayers, setError } = useFindPlayers();
	const { ref, height, updateIfNoHeight } = useGetHeight();
	const stylesContainer = {
		['--list-margin-top']: height + 'px',
	} as React.CSSProperties;

	const onSubmit = async (formData: FormData): Promise<void> => {
		const data = {
			nickname: formData.get('nickname'),
		};

		if (data.nickname === '') {
			setError('Не заполнено имя игрока');
			return;
		}

		updateIfNoHeight();

		findFindPlayers(data);
	};

	const onInput = async () => {
		if (error) {
			setError(null);
		}

		updateIfNoHeight();
	}

	return (
		<div className={cn(
			styles['search'],
			cls
		)}
			style={stylesContainer}
		>
			<div className={styles['search-form']} ref={ref}>
				<Search
					cls={styles['search-field']}
					onSubmit={onSubmit}
					search={{
						cls: styles['search-input'],
						type: "text",
						name: "nickname",
						placeholder: "Имя игрока",
						onInput: onInput,
					}}
					btn={{
						text: "",
						type: "submit",
						visual: 'only-img'
					}}
				/>
			</div>

			{error && <ErrorMessage cls={styles['search__error']}>{error}</ErrorMessage>}
			{listPlayers && <ListPlayer cls={styles['search-list']} listPlayers={listPlayers} />}
		</div>
	);
}