import { JSX, useEffect } from "react";
import styles from './Menu.module.css';
import changeTheme from "../../common/script/modules/Theme/methods/changeTheme.module";
import ChangeTheme from "../../common/components/ChangeTheme/ChangeTheme";
import Logo from "../../common/components/Logo/Logo";
import MainScreenSlider from "./screens/MainScreenSlider";
import CountOnlinePlayers from "./components/CountOnlinePlayers/CountOnlinePlayers";
import { useSelector } from "react-redux";
import { RootState } from "@app-redux/store";

export default function Menu(): JSX.Element {
	const { isOnlinePlayer } = useSelector((s: RootState) => s.gameSettings);

	useEffect(() => {
		changeTheme('set');
	}, []);

	return (
		<div className={styles["menu"]}>
			<div className={styles["menu-window"]}>
				<div className={styles['menu-interaction']}>
					<ChangeTheme cls={styles['menu-theme']} />
					<Logo cls={styles['menu-logo']} size="big"></Logo>
				</div>

				<MainScreenSlider></MainScreenSlider>
				{<CountOnlinePlayers cls={styles["menu-online-players"]} />}
			</div>
		</div>
	);
};


