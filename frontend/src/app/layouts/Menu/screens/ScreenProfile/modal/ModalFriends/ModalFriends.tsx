import { JSX, useState } from "react";
import styles from './ModalFriends.module.css';
import cn from "classnames";
import HeaderModal from "../../components/ui/HeaderModal/HeaderModal";
import { useModalClose } from "../../../../../../common/context/ModalCloseContext";
import SearchPlayer from "../../components/SearchPlayer/SearchPlayer";
import ListFriends from "../../components/list/ListFriends/ListFriends";
import { useGetHeight } from "@app-common/script/hooks/util/useGetHeight.hook";
import Tabs from "../../components/ui/Tabs/Tabs";

export default function ModalFriends(): JSX.Element {
	//custom context
	const resetJsx = useModalClose();
	//state
	const [idTab, setIdTab] = useState<number>(0);
	const { ref, height } = useGetHeight();

	const clickExit = (): void => {
		resetJsx();
	};

	return (
		<div className={cn(styles['friends'])}>
			<div className={cn(styles['friends__wrapper'])}>
				<div className={styles['friends__top']} ref={ref}>
					<HeaderModal cls={styles['friends-header']} title="Друзья" onExit={clickExit} />
					<Tabs
						cls={styles['friends-tabs']}
						tabs={["Мои друзья", 'Поиск друга']}
						setIdTab={(i) => setIdTab(i)}
					/>
				</div>

				<div className={styles['friends__body']} style={{ paddingTop: height }}>
					<div className={cn(
						styles['tab'],
						{
							[styles['tab--show']]: idTab === 0,
						}
					)}
					>
						<ListFriends
							cls={styles['friends-list']}
						/>
					</div>
					<div className={cn(
						styles['tab'],
						{
							[styles['tab--show']]: idTab === 1,
						}
					)}
					>
						<SearchPlayer
							cls={styles['friend-search']}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}