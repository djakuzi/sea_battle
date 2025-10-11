import { JSX, useEffect } from "react";
import styles from './FullLoad.module.css';
import { PropsFullLoad } from "./FullLoad.props";
import cn from "classnames";
import changeTheme from "../../script/modules/Theme/methods/changeTheme.module";

export default function FullLoad({ cls = '', text = "Загрузка..", isBackground = true, posText = 'top' }: PropsFullLoad): JSX.Element {

	useEffect(() => {
		changeTheme('set');
	});

	return (
		<div className={cn(styles['load'], { [styles['--background']]: isBackground }, cls)}>
			<div className={cn(styles['load__wrapper'])}>
				{posText === 'top' && <div className={styles['title']}>{text}</div>}
				<div className={styles['anchor']}>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
					<div className={styles['anchor__front']}></div>
				</div>
				{posText === 'bottom' && <div className={styles['title']}>{text}</div>}
			</div>
		</div>
	);

	// return (
	//     <div className={cn(styles['logo'], cls)}>
	//         загрузка
	//     </div>
	// );
}