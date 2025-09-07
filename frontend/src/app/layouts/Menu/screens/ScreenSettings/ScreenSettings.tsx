import { JSX } from "react";
import { PropsScreenSettings } from "./ScreenProfile.props";

export default function ScreenSettings({inputRef}:PropsScreenSettings): JSX.Element {
    return (
        <div ref={inputRef}>
            настройки
        </div>
    );
}