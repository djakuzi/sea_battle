import { JSX } from "react";
import styles from './ListPlayer.module.css';
import cn from "classnames";
import { PropsListPlayer } from "./ListPlayer.props";
import CardFriend from "../../ui/CardPlayer/CardPlayer";
import ScrollContainer from "@app-common/components/ScrollContainer/ScrollContainer";

export default function ListPlayer({
	cls = '',
	listPlayers,
	isSetBtnFriend = true,
	isScroll = true,
}: PropsListPlayer): JSX.Element {

	if (isScroll) {
		return (
			<ScrollContainer >
				<div className={cn(styles['list'], cls)}>
					{...listPlayers.map((el, i) => {
						if (el) {
							return (
								<CardFriend key={i} player={el} isSetBtnFriend={isSetBtnFriend} />
							);
						}
					})}
				</div>
			</ScrollContainer>
		)
	}

	return (
		<div className={cn(styles['list'], cls)}>
			{...listPlayers.map((el, i) => {
				if (el) {
					return (
						<CardFriend key={i} player={el} isSetBtnFriend={isSetBtnFriend} />
					);
				}
			})}
		</div>
	);
}