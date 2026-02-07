import { JSX, useEffect } from "react";
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
import HeaderModal from "../../components/ui/HeaderModal/HeaderModal";
import { AuthService } from "@app-network/api/client.api/services/Auth/Auth.service";
import { useMeVerification } from "@app-common/script/hooks/api-hooks/useMeVerification.hook";

export default function ModalProfile({ cls = '' }: IntrProfileProps): JSX.Element {
	const { player, error } = useSelector((s: RootState) => s.auth);
	const { verification } = useMeVerification()
	const resetJsx = useModalClose();

	if (!player || !verification || !verification[0].login) {
		return (<div>
			{error ? error : 'Произошла ошибка при получении данных пользователя.'};
		</div>
		);
	}

	const clickExit = (): void => {
		resetJsx();
	};

	return (
		<div className={cn(styles['profile'], cls)}>
			<form className={cn(styles['profile__wrapper'])}>
				<HeaderModal cls={styles['profile-header']} title="Профиль" onExit={clickExit} />
				<div className={styles['profile-body']}>
					<div className={cn(styles['profile-top'], 'flex-row')}>
						<div className={cn('flex-column')}>
							<div className={styles['profile-avatar']}>
								<img src={player.avatar ? player.avatar : IMGavatar + ''} alt={player.nickname} />
							</div>
						</div>
						<div className={cn('flex-column', 'flex-center')}>
							<Input cls={styles['profile-input']} placeholder="Логин" name='login' type='text' required={false} defaultValue={verification[0].login} />
							<Input cls={styles['profile-input']} placeholder="Имя в игре" name='nickname' type='text' required={false} defaultValue={player.nickname} />
						</div>
					</div>
					<div className={cn(styles['profile__center'], 'flex-row', 'flex-between')}>
						<div className={cn('flex-column', 'flex-1')}>
							<Input cls={styles['profile-input']}
								placeholder={verification.find(el => el.email)?.email ? 'Email' : 'Введите email'}
								name='email'
								type='text'
								required={false}
								defaultValue={verification.find(el => el.email)?.email ?? ''}
								design="input--label-top" />
							<VerificationService cls={styles['profile-auth-service']} />
						</div>
						<div className={cn('flex-column', 'flex-1')}>
							<Input cls={styles['profile-input']}
								placeholder={verification.find(el => el.email)?.email ? 'Новый пароль' : 'Введите пароль'}
								name='password'
								type='text'
								required={false}
								design="input--label-top" />
							<div className={styles['profile-update']}>
								<div>
									Дата обновления профиля:
								</div>
								<div>
									{player.updated_at.toLocaleString()}
								</div>
							</div>
						</div>
					</div>
					<div className={cn(styles['profile__bottom'], 'flex-row', 'flex-between')}>
						{/* <div className={cn('flex-column', 'flex-1')}>
                            <div className={styles['profile-update']}>
                                <div>
                                    Дата обновления профиля:
                                </div>
                                <div>
                                    {player.updated_at.toLocaleString()}
                                </div>
                            </div>
                        </div> */}
						<div className={cn('flex-column', 'flex-1')}>
							<Button
								isBtn={true}
								onClick={() => 'll'}
								cls={cn(styles['profile-save'])}
								visual='button-action'
							>
								Сохранить
							</Button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}