import { JSX, useState } from "react";
import styles from './ModalListBattle.module.css';
import cn from "classnames";
import HeaderModal from "../../components/ui/HeaderModal/HeaderModal";
import { useModalClose } from "../../../../../../common/context/ModalCloseContext";
import Tabs from "../../components/ui/Tabs/Tabs";
import ListBattleOneVsOne from "../../components/list/ListBattleOneVsOne/ListBattleOneVsOne";
import { useGetHeight } from "@app-common/script/hooks/util/useGetHeight.hook";

export default function ModalListBattle(): JSX.Element {
	//custom context
	const resetJsx = useModalClose();
	//state
	const [idTab, setIdTab] = useState<number>(0);
	const { ref, height } = useGetHeight();

	const clickExit = (): void => {
		resetJsx();
	};

	return (
		<div className={cn(styles['battle'])}>
			<div className={cn(styles['battle__wrapper'])}>
				<div className={cn(styles['battle__top'])} ref={ref}>
					<HeaderModal cls={styles['battle-header']} title="Список боев" onExit={clickExit} />
					<Tabs
						cls={styles['friends-tabs']}
						tabs={["Онлайн", 'Турнир', 'По приглашению']}
						setIdTab={(i) => setIdTab(i)}
					/>
				</div>

				<div className={styles['battle-body']} style={{ paddingTop: height }}>
					<div className={cn(
						styles['tab'],
						{
							[styles['tab--show']]: idTab === 0,
						}
					)}
					>
						<ListBattleOneVsOne cls={styles['one-vs-one']}/>
					</div>
				</div>
			</div>
		</div>
	);
}