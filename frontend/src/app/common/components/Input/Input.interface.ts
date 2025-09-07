import { InputHTMLAttributes } from "react";

export interface PropsInput extends InputHTMLAttributes<HTMLInputElement> {
    cls: string;
    placeholder: string;
    design?: '' | 'input--label-top';
}