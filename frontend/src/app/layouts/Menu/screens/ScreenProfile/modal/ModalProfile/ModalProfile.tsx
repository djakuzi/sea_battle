import { JSX } from "react";
import styles from './ModalProfile.module.css';
import cn from "classnames";
import { IntrProfileProps } from "./ModalProfile.props";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store";
import IMGavatar from '../../../../../../../assets/icons/game/avatarsPlayer/default.svg';
import VerificationService from "../../../../../../common/components/VerificationService/VerificationService";
import Input from "../../../../../../common/components/Input/Input";
import Button from "../../../../../../common/components/Button/Button";
import { useModalClose } from "../../../../../../common/context/ModalCloseContext";
import HeaderModal from "../../components/HeaderModal/HeaderModal";

export default function ModalProfile({cls=''}: IntrProfileProps):JSX.Element {
    const { player, error} = useSelector((s: RootState) => s.auth);
    const resetJsx = useModalClose();
    
    if (!player) {
        return (<div>
            {'Произошла ошибка при получении данных пользователя.' + error ? error : ''};
        </div>
        );
    }

    const clickExit = ():void => {
        resetJsx();
    };

    return (
        <div className={cn(styles['profile'], cls)}>
            <form className={cn(styles['profile__wrapper'])}>
                <HeaderModal cls={styles['profile-header']}title="Профиль" onExit={clickExit}/>
                <div className={styles['profile-body']}>
                    <div className={cn(styles['profile-top'], 'flex-row')}>
                        <div className={cn('flex-column')}>
                            <div className={styles['profile-avatar']}>
                                <img src={player.avatar ? player.avatar : IMGavatar + ''} alt={player.nickname} />
                            </div>
                        </div>
                        <div className={cn('flex-column', 'flex-center')}>
                            <Input cls={styles['profile-input']} placeholder="Логин" name='email' type='text' required={false} value={'djakuzi'} />
                            <Input cls={styles['profile-input']} placeholder="Имя в игре" name='password' type='text' required={false} value={player.nickname} />
                        </div>
                    </div>
                    <div className={cn(styles['profile__center'], 'flex-row', 'flex-between')}>
                        <div className={cn('flex-column', 'flex-1')}>
                            <Input cls={styles['profile-input']}
                                placeholder="Email"
                                name='email'
                                type='text'
                                required={false}
                                value={'matvey.ananev.02@mail.ru'}
                                design="input--label-top" />
                            <VerificationService cls={styles['profile-auth-service']} />
                        </div>
                        <div className={cn('flex-column', 'flex-1')}>
                            <Input cls={styles['profile-input']}
                                placeholder="Пароль"
                                name='password'
                                type='text'
                                required={false}
                                value={'***********'}
                                design="input--label-top" />
                            <Input cls={styles['profile-input']}
                                placeholder="Новый пароль"
                                name='password'
                                type='text'
                                required={false}
                                design="input--label-top" />
                        </div>
                    </div>
                    <div className={cn(styles['profile__bottom'], 'flex-row', 'flex-between')}>
                        <div className={cn('flex-column', 'flex-1')}>
                            <div className={styles['profile-update']}>
                                <div>
                                    Дата обновления профиля:
                                </div>
                                <div>
                                    {player.updated_at.toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <div className={cn('flex-column', 'flex-1')}>
                            <Button isBtn={true} onClick={() => 'll'} cls={cn(styles['profile-save'], 'button-action')}>Сохранить</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}