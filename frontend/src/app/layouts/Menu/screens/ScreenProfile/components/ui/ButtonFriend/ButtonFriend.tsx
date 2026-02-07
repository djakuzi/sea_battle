import { JSX } from "react";
import styles from './ButtonFriend.module.css';
import cn from "classnames";
import { PropsButtonFriend } from "./ButtonFriend.props";
import { useActionFriend } from "@app-common/script/hooks/api-hooks/useActionFriend.hook";
import СloseIcon from '@assets/icons/game/common/cross.svg?react';

export default function ButtonFriend({
    cls = '',
    statusFriend,
}: PropsButtonFriend): JSX.Element {
    if (!statusFriend) {
        return (
            <div style={{display: 'none'}}></div>
        )
    }
    const { action, changeAction}= useActionFriend(statusFriend);

    const onClick = async (event: React.MouseEvent<HTMLDivElement>): Promise<void> => {
        const target = event.target as HTMLElement ;
        const parent = target.closest('[data-close-request]');
        console.log(target, parent)
        if (parent && action === 'accept') {
            changeAction('close');
            return;
        }

        changeAction();
    };

    const onClickClose = async (): Promise<void> => {
    };

    return (
        <div className={cn(
            styles['button-friend'],
            cls,
            {
                [styles['button-friend--add']]: action === 'add',
                [styles['button-friend--accept']]: action === 'accept',
                [styles['button-friend--delete']]: action === 'delete',
                [styles['button-friend--close']]: action === 'close',
            }
        )}
            onClick={onClick}
        >
            <div className={styles['button-friend__text']}>
                {action === 'add' && 'Добавить'}
                {action === 'close' && 'Отменить запрос'}
                {action === 'delete' && 'Удалить'}
                {action === 'accept' && 'Принять'}
            </div>
            {action === 'accept' && (
                <div className={styles['button-friend__img']} onClick={onClickClose} data-close-request>
                    {action === 'accept' && <СloseIcon />}
                </div>
            )}
        </div>
    );
}