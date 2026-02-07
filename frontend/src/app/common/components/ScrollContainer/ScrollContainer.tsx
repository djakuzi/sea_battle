import styles from './ScrollContainer.module.css';
import cn from "classnames";
import { JSX } from "react";
import { PropsScrollContainer } from './ScrollContainer.props';

export default function ScrollContainer({
	children,
	cls,
	type='vertical'
}: PropsScrollContainer): JSX.Element {
	console.log(`scroll-${type}`)
	return (
		<div className={cn(
				styles['scroll'], 
				styles[`scroll-${type}`], 
				cls
			)}
		>
			{children}
		</div>
	)
}