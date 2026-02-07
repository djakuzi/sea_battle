import { JSX } from "react";
import styles from './Button.module.css';
import cn from "classnames";
import { Link } from "react-router-dom";
import { PropsButton } from "./Button.props";

export default function Button({
	paramsLink,
	isBtn = true,
	children,
	cls,
	type = "button",
	visual,
	onClick
}: PropsButton): JSX.Element {
	const resClass = cn(styles['button'], cls, visual ? styles[visual] : '');

	if (paramsLink) {
		return (
			<Link to={paramsLink.link} className={resClass}>{children}</Link>
		);
	}

	if (isBtn) {
		return (
			<button className={resClass} type={type} onClick={() => onClick()}>{children}</button>
		);
	}

	return (
		<div className={cn(resClass)}>
			Произошла ошибка
		</div>
	);
};

