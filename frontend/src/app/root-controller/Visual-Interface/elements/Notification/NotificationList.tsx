import styles from './NotificationList.module.css';
import cn from "classnames";
import { JSX } from "react";
import Notification from './components/Notification/Notification';
import { PropsNotificationList } from './NotificationList.props';
import { useSelector } from 'react-redux';
import { RootState } from '@app-redux/store';

export default function NotificationList({ cls = '' }: PropsNotificationList): JSX.Element {
    const { list, oneNotification } = useSelector((store: RootState) => store.notification);

    return (
        <div className={cn(styles['notification-list'], cls)}>
            {...list.map(objNotification => {

                return <Notification key={objNotification.id} {...objNotification}></Notification>;
            })}
            {oneNotification && <Notification key={oneNotification.id + '-no-list'} {...oneNotification}></Notification>}
        </div>
    );
}