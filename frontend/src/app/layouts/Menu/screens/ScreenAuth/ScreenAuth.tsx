import styles from './ScreenAuth.module.css';
import cn from "classnames";
import { JSX, useRef, useState } from "react";
import { PropsScreenProfile } from "./ScreenAuth.props";
import Button from '../../../../common/components/Button/Button';
import { TypeAuth } from '../../../../common/types/auth.type';
import { ValidationModule } from '../../../../common/script/modules/Validation/validation.module';
import { notification } from '../../../../root-controller/Visual-Interface/elements/Notification/modules/notification';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { registerThunk } from '../../../../redux/slice/auth/asyncThunk/register';
import { signInThunk } from '../../../../redux/slice/auth/asyncThunk/signIn';
import VerificationService from '../../../../common/components/VerificationService/VerificationService';
import Input from '../../../../common/components/Input/Input';
import { IntrRegister } from '../../../../network/api/client.api/services/Auth/types/Register.interface';
import { IntrSignIn } from '../../../../network/api/client.api/services/Auth/types/SignIn.interface';
import { Verification } from '../../../../network/api/client.api/services/Auth/types/Verification';
import { isDisconnectedServer } from '@app-common/script/utils/statusServer/method/isDisconnectedServer';

export default function ScreenAuth({ cls = '', inputRef }: PropsScreenProfile): JSX.Element {
    //redux
    const dispatch = useDispatch<AppDispatch>();
    //state
    const [typeAuth, setTypeAuth] = useState<TypeAuth>('sign-in');
    //ref
    const refForm = useRef<HTMLFormElement>(null);

    const changeTypeAuth = (type: TypeAuth): void => {
        setTypeAuth(type);
    };

    const onSubmit = async (formData: FormData): Promise<void> => {
        try {
            if (isDisconnectedServer({})) return;

            const validation = new ValidationModule().checkValidation();
            const login = formData.get('login');
            const email = formData.get('email');
            const password = formData.get('password');

            const data = {
                login: typeof login === 'string' ? login : undefined,
                email: typeof email === 'string' ? email : undefined,
                password: typeof password === 'string' ? password : undefined,
                verification: Verification.EMAIL,
                serviceData: undefined,
            };

            if (!validation.isValid) {
                return;
            }

            if (typeAuth == 'sign-in') {
                const dataSignIn: IntrSignIn = {
                    email: data.email,
                    password: data.password,
                    verification: data.verification,
                    serviceData: data.serviceData,
                };

                await dispatch(signInThunk(dataSignIn));
            }

            if (typeAuth == 'registration') {
                const dataReg: IntrRegister = {
                    login: data.login as string,
                    email: data.email,
                    password: data.password,
                    verification: data.verification,
                    serviceData: data.serviceData,
                };

                await dispatch(registerThunk(dataReg));
            }
        } catch (error) {
            if (error instanceof Error) {
                notification.createOneNotificftion('error', error.message, true);
                console.error(error.message);
            } else {
                console.error('Unknown error:', error);
            }
        }
    };

    return (
        <div ref={inputRef} className={cn(styles["auth"], cls)}>
            <div className={styles["auth__wrapper"]}>
                <div className={styles['auth__box']}>
                    <div className={styles["auth__tab"]}>
                        <Button cls={cn(
                            styles['auth__tab-sign-in'],
                            styles['auth__tab-btn'],
                            typeAuth !== 'registration' && styles['--active']
                        )}
                            isBtn={true}
                            onClick={() => changeTypeAuth('sign-in')}>
                            Вход
                        </Button>
                        <Button cls={cn(
                            styles['auth__tab-registation'],
                            styles['auth__tab-btn'],
                            typeAuth == 'registration' && styles['--active']
                        )}
                            isBtn={true}
                            onClick={() => changeTypeAuth('registration')}>
                            Регистрация
                        </Button>
                    </div>
                    <form className={styles['form']} ref={refForm} action={onSubmit}>
                        {typeAuth === 'registration' && <Input cls={styles['input']} placeholder="Логин" name="login" type={'text'} required={false} />}
                        <Input cls={styles['input']} placeholder="Почта" name='email' type={'email'} required={false} defaultValue={'matvey.ananev.02@mail.ru'} />
                        <Input cls={styles['input']} placeholder="Пароль" name='password' type={'password'} required={false} defaultValue={'849465'} />

                        <div className={styles['form-entry']}>
                            <VerificationService cls={styles['form-verification-service']} />
                            <Button 
                                cls={cn(styles['submit'], 'button-action')} 
                                isBtn={true} 
                                onClick={() => { }} 
                                type="submit"
                                versionBtn='button-action'
                            >
                                Войти
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}