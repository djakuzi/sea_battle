import { JSX } from "react";
import "./NonVisualnterface.css";
import MenuAudio from "./components/MenuAudio/MenuAudio";

export default function NonVisualnterface():JSX.Element {
    return (
        <div className="non-visual-interface">
            <MenuAudio></MenuAudio>
        </div>
    );
} 