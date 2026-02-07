import { JSX } from "react";
import styles from './ListFriends.module.css';
import cn from "classnames";
import { PropsListFriends } from "./ListFriends.props";
import CardPlayer from "../../ui/CardPlayer/CardPlayer";
import { useListFriend } from "../../../../../../../common/script/hooks/api-hooks/useFriend.hook";
import ErrorMessage from "@app-common/components/ErrorMessage/ErrorMessage";

export default function ListFriends({
	cls = '',
	listPlayers,
	idPlayer,
}: PropsListFriends): JSX.Element {
	const { listFriend, error, updateListFriend } = useListFriend(idPlayer, listPlayers);

	if (error || !listFriend) {
		return (
			<div className={cn(styles['list'], cls)} style={{ margin: 'auto 0' }}>
				{<ErrorMessage cls={styles['list-error']}>{error ?? 'Что-то пошло не так'}</ErrorMessage>}
			</div>
		);
	}

	return (
		<div className={cn(styles['list'], cls)}>
			{...listFriend.map((el, i) => {
				if (el) {
					el.actionFriends = {
						idPlayer: el.id,
						action: 'delete',
					}

					return (
						<CardPlayer
							key={i}
							player={el}
							isSetBtnFriend={true}
						/>
					);
				}
			})}
		</div>
	);
}