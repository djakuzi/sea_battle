import { JSX } from "react";
import styles from './HeaderModal.module.css';
import cn from "classnames";
import { PropsHeaderModal } from "./HeaderModal.props";
import ButtonExit from "@app-common/components/ButtonExit/ButtonExit";
import Title from "@app-common/components/Title/Title";

export default function HeaderModal({ cls = '', onExit, title }: PropsHeaderModal):JSX.Element {
    
    return (
        <div className={cn(styles['header'], cls)}>
            <ButtonExit cls={styles['header-exit']} onClick={onExit}/>
            <Title cls={styles['header-title']} type="v1">{title}</Title>
        </div>
    );
}