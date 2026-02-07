import styles from './ModalList.module.css';
import { JSX } from "react";
import { PropsModalList } from './ModalList.props';
import ModalWindow from '@app-common/components/ModalWindow/ModalWindow';

export default function ModalList({ cls = '' }: PropsModalList): JSX.Element {
	
    return (
		<ModalWindow isShow={false} cls={styles['modal-list']}>
			<div></div>
		</ModalWindow>
    );
}