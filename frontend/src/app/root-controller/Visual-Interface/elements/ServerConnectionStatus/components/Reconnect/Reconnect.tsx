import { JSX } from 'react';
import styles from './Reconnect.module.css';
import cn from "classnames";
import { PropsReconnect } from './Reconnect.props';
import Button from '@app-common/components/Button/Button';
import { WsServerStatus } from '../../../../../../network/ws/modules/ServerConnectionStatus/ServerStatus.module';

export default function Reconnect({ cls = '', useState }: PropsReconnect): JSX.Element {

	function reconnectServer() {
		WsServerStatus.reconnect();
		useState(false);
	}

	return (
		<div className={cn(styles['reconnect'], cls)}>
			<div className={styles['reconnect__title']}>
				Повторить попытку?
			</div>
			<div className={cn(styles['reconnect__action'])}>
				<Button cls={styles['reconnect__btn']} visual={'button-action'} onClick={reconnectServer}>ДА</Button>
				<Button cls={styles['reconnect__btn']} visual={'button-action'} onClick={() => useState(false)}>НЕТ</Button>
			</div>
		</div>
	)
}