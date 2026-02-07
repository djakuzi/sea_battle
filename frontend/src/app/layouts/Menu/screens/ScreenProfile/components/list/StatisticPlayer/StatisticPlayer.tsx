import { JSX } from "react";
import styles from './StatisticPlayer.module.css';
import cn from "classnames";
import { PropsStatisticPlayer } from "./StatisticPlayer.props";
import Title from "../../../../../../../common/components/Title/Title";

export default function StatisticPlayer({
	cls = '',
	dataStatisticPlayer
}: PropsStatisticPlayer): JSX.Element {

	return (
		<div className={cn(
			styles['statistic'],
			cls,
			'flex-column'
		)}
		>
			<div className={styles['statistic-row']}>
				<Title cls={styles['statistic-title']}>Общее</Title>
				<div className={cn(styles['statistic-box'], 'flex-column')}>
					<div className={cn(styles['statistic-row'], 'flex-row', 'flex-between')}>
						<div className={styles['statistic-name']}>Общее количество боев:</div>
						<div className={styles['statistic-result']}>{dataStatisticPlayer.quantity_battles}</div>
					</div>
					<div className={cn(styles['statistic-row'], 'flex-row', 'flex-between')}>
						<div className={styles['statistic-name']}>Количество побед в боях:</div>
						<div className={styles['statistic-result']}>{dataStatisticPlayer.quantity_wins}</div>
					</div>
					<div className={cn(styles['statistic-row'], 'flex-row', 'flex-between')}>
						<div className={styles['statistic-name']}>Количество проигрышей в боях:</div>
						<div className={styles['statistic-result']}>{dataStatisticPlayer.quantity_losses}</div>
					</div>
					<div className={cn(styles['statistic-row'], 'flex-row', 'flex-between')}>
						<div className={styles['statistic-name']}>Максимальная серия побед подряд:</div>
						<div className={styles['statistic-result']}>{dataStatisticPlayer.longest_win_streak}</div>
					</div>
					<div className={cn(styles['statistic-row'], 'flex-row', 'flex-between')}>
						<div className={styles['statistic-name']}>Процент побед:</div>
						<div className={styles['statistic-result']}>{dataStatisticPlayer.win_percentage + '%'}</div>
					</div>
				</div>
			</div>
			<div className={styles['statistic-row']}>
				<Title cls={styles['statistic-title']}>Бои</Title>
				<div className={cn(styles['statistic-box'], 'flex-column')}>
					<div className={cn(styles['statistic-row'], 'flex-row', 'flex-between')}>
						<div className={styles['statistic-name']}>Побед в классическом режиме:</div>
						<div className={styles['statistic-result']}>{dataStatisticPlayer.classic_battles_wins}</div>
					</div>
					<div className={cn(styles['statistic-row'], 'flex-row', 'flex-between')}>
						<div className={styles['statistic-name']}>Побед в командных боях:</div>
						<div className={styles['statistic-result']}>{dataStatisticPlayer.team_battles_wins}</div>
					</div>
					<div className={cn(styles['statistic-row'], 'flex-row', 'flex-between')}>
						<div className={styles['statistic-name']}>Общее количество сыгранных турнирных боёв:</div>
						<div className={styles['statistic-result']}>{dataStatisticPlayer.total_tournament_battles}</div>
					</div>
					<div className={cn(styles['statistic-row'], 'flex-row', 'flex-between')}>
						<div className={styles['statistic-name']}>Побед в турнирных боях:</div>
						<div className={styles['statistic-result']}>{dataStatisticPlayer.tournament_battles_wins}</div>
					</div>
				</div>
			</div>
			<div className={styles['statistic-row']}>
				<Title cls={styles['statistic-title']}>Стрельба</Title>
				<div className={cn(styles['statistic-box'], 'flex-column')}>
					<div className={cn(styles['statistic-row'], 'flex-row', 'flex-between')}>
						<div className={styles['statistic-name']}>Общее количество выстрелов:</div>
						<div className={styles['statistic-result']}>{dataStatisticPlayer.shots_taken}</div>
					</div>
					<div className={cn(styles['statistic-row'], 'flex-row', 'flex-between')}>
						<div className={styles['statistic-name']}>Количество попаданий:</div>
						<div className={styles['statistic-result']}>{dataStatisticPlayer.shots_hit}</div>
					</div>
					<div className={cn(styles['statistic-row'], 'flex-row', 'flex-between')}>
						<div className={styles['statistic-name']}>Точность попаданий:</div>
						<div className={styles['statistic-result']}>{dataStatisticPlayer.hit_accuracy + '%'}</div>
					</div>
				</div>
			</div>
			<div className={styles['statistic-row']}>
				<Title cls={styles['statistic-title']}>Прочее</Title>
				<div className={cn(styles['statistic-box'], 'flex-column')}>
					<div className={cn(styles['statistic-row'], 'flex-row', 'flex-between')}>
						<div className={styles['statistic-name']}>Респект, полученный от других игроков:</div>
						<div className={styles['statistic-result']}>{dataStatisticPlayer.total_respect_received}</div>
					</div>
				</div>
			</div>
		</div>
	);
}