import { JSX, useEffect } from "react";
import styles from './FullLoad.module.css';
import { PropsFullLoad } from "./FullLoad.props";
import cn from "classnames";
import changeTheme from "../../script/modules/Theme/methods/changeTheme.module";
import Button from "../Button/Button";

export default function FullLoad({
	cls = '',
	text = "Загрузка..",
	isBackground = true,
	posText = 'top',
	btnData
}: PropsFullLoad): JSX.Element {

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
				{btnData && btnData.map((el, i) => {
					const {
						onClick = () => { },
					} = el;

					return <Button
						key={el.text + i}
						cls={cn(
							styles['btn'],
							el.cls ?? '',
						)}
						onClick={onClick}
						isBtn={true}
						visual="button-action"
					>
						Отменить
					</Button>
				})}
			</div>
		</div>
	);

	// return (
	//     <div className={cn(styles['logo'], cls)}>
	//         загрузка
	//     </div>
	// );
}