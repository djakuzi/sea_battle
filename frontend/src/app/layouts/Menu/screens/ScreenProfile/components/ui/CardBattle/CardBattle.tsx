import { JSX } from "react";
import styles from './CardBattle.module.css';
import cn from "classnames";
import { createOneNotificftion } from "../../../../../../../root-controller/Visual-Interface/elements/Notification/modules/notification";
import { PropsCardBattle } from "./CardBattle.props";

export default function CardBattle({
	cls = '',
	data,
}: PropsCardBattle): JSX.Element {

	const onOpen = (): void => {
		if (!data.id) {
			createOneNotificftion(
				'error',
				`Не удалось открыть битву ${data.id}. Попробуйте обновить страницу.`,
				false,
				5000
			);

			return;
		}
	};

	return (
		<div className={cn(
			styles['card'],
			'flex-row',
			'flex-between',
			styles[data.status],
			cls
		)}
			onClick={onOpen}
		>
			<div className={ cn(styles['card__status'])}>
				{data.status == 'lose' ? 'Поражение': 'Победа'}
			</div>
			<div className={styles['card__duration']}>
				{"Длительность: " + data.durationGame}
			</div>
		</div>
	);
}