import { JSX, useEffect, useRef } from "react";
import AUDIOmenu from '@/assets/audio/menuAudio.mp3';
import audioOnOff from "../../../../common/script/modules/audioMainMenu.module";

export default function MenuAudio(): JSX.Element {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioOnOff(audioRef.current);
        }
    }, []);

    return (
        <audio ref={audioRef} src={AUDIOmenu + ''} loop muted></audio>
    );
}