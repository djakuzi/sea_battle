import { JSX } from "react";
import { PropsInput } from "./Input.interface";
import cn from "classnames";
import styles from './Input.module.css';

export default function Input({ cls, placeholder, type, name, required, value, defaultValue, design=''}: PropsInput): JSX.Element {

    return (
        <div className={cn(styles['input'], cls, styles[design])}>
            {placeholder && <div className={styles['input__placeholder']}>{placeholder}</div>}
            <input 
                className={styles['input__field']}
                type={type}
                name={name}
                required={required}
                value={value}
                defaultValue={defaultValue}
            />
        </div>

    );
}