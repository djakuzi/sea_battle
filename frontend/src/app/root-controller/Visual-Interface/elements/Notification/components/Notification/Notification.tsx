import styles from './Notification.module.css';
import cn from "classnames";
import { JSX, useEffect } from "react";
import { PropsNotification } from './Notification.props';
import React from 'react';
import { useDispatch } from 'react-redux';
import { actionsNotification } from '@app-redux/slice/notification.slice';
import { standartSetTimeout } from '@app-common/script/modules/TimeOut/methods/standartSetTimeout';

function Notification(props: PropsNotification): JSX.Element {
    const dispatch = useDispatch();

    function deleteNotification(): void {
        try {
            if (props.id == -1) {
                dispatch(actionsNotification.deleteOneNotification());
            } else {
                dispatch(actionsNotification.deleteNotificationByList(props.id));
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (props.settigsClose.time) {
            standartSetTimeout(props.settigsClose.time, deleteNotification);
        }
    }, []);

    return (
        <div className={cn(styles['notification'], styles["--" + props.type], props.cls)}>
            {props.settigsClose.isBtn && <div className={cn(styles['notification-close'])} onClick={() => deleteNotification()}></div>}
            {props.text}
        </div>
    );
}

export default React.memo(Notification);