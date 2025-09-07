import { JSX } from "react";
import styles from './HeaderModal.module.css';
import cn from "classnames";
import Title from "../../../../../../common/components/Title/Title";
import ButtonExit from "../../../../../../common/components/ButtonExit/ButtonExit";
import { PropsHeaderModal } from "./HeaderModal.props";

export default function HeaderModal({ cls = '', onExit, title }: PropsHeaderModal):JSX.Element {
    
    return (
        <div className={cn(styles['header'], cls)}>
            <ButtonExit cls={styles['header-exit']} onClick={onExit}/>
            <Title cls={styles['header-title']} type="v1">{title}</Title>
        </div>
    );
}