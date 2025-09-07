import { JSX } from "react";
import styles from './VerificationService.module.css';
import cn from "classnames";
import { LIST_VERIFICATION_SERVICES } from "../../../core/data/list-component/verification-services";


export default function VerificationService({
    isColumn = false,
    cls = '',

}): JSX.Element {

    return (
        <div className={
            cn(styles['verification-services'], cls,
                {
                    [styles['--column']]: isColumn,
                }
            )}
        >
            {...LIST_VERIFICATION_SERVICES.map((el) => {
                return (
                    <div className={styles['verification-services__item']} data-name-service={el.name}>
                        <img src={el.icon} alt={el.name} />
                    </div>
                );
            })}
        </div>
    );
}