import { JSX } from "react";
import styles from './ListBattleOneVsOne.module.css';
import cn from "classnames";
import ErrorMessage from "@app-common/components/ErrorMessage/ErrorMessage";
import { PropsListBattleOneVsOne } from "./ListBattleOneVsOne.props";
import { useGetBattle } from "@app-common/script/hooks/api-hooks/useGetBattle.hook";
import { EnumVariantPlayType } from "@app-core/data/list-component/interfaces/variantsPlay.interface";
import CardBattle from "../../ui/CardBattle/CardBattle";
import { useSelector } from "react-redux";
import { RootState } from "@app-redux/store";
import ScrollContainer from "@app-common/components/ScrollContainer/ScrollContainer";

export default function ListBattleOneVsOne({
	cls = '',
}: PropsListBattleOneVsOne): JSX.Element {
	const { listBattles, error } = useGetBattle(EnumVariantPlayType.ONE_VS_ONE);
	const id = useSelector( (s: RootState) => s.auth.player?.id);

	if (error || !listBattles || typeof id === 'undefined') {
		return (
			<div className={cn(styles['list'], cls)} style={{ margin: 'auto 0' }}>
				{<ErrorMessage cls={styles['list-error']}>{error ?? 'Что-то пошло не так'}</ErrorMessage>}
			</div>
		);
	}

	return (
		<ScrollContainer >
			<div className={cn(styles['list'], cls)}>
				{...listBattles.map((el, i) => {
					return (
						<CardBattle
							cls={styles['list__card']}
							data={{
								id: el.id,
								durationGame: el.durationGame,
								status: id === el.idWinner ? 'win' : 'lose',
							}}
						/>
					)
				})}
			</div>
		</ScrollContainer>

	);
}