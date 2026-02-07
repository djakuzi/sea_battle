import { JSX, useEffect, useState } from "react";
import styles from './Ship.module.css';
import cn from "classnames";
import { PropsShip } from "./Ship.props";

export default function Ship({ style, cls, view = 'blue', size, plane }: PropsShip): JSX.Element {
    const [imgShip, setImgShip] = useState();
    const shipStyle: React.CSSProperties & {
        '--width': string | number;
    } = {
        '--width': +style.width + 'px',
    };
    useEffect(() => {
        import(`../../../../assets/icons/game/ships/${view}-${size}-ship.${view == 'blue' ? 'png': 'svg'}`)
            .then((module) => {
                setImgShip(module.default);
            })
            .catch((error) => {
                console.error('Error loading image ship:', error);
            });
    }, []);

    return (
        <div className={cn(styles['ship'], cls)} style={shipStyle} data-ship data-ship-size={size} data-plane={plane}>
            <img className={styles['--horizontal']} src={imgShip} alt={`param of ship: view= ${view}; size= ${size}`} />
        </div>
    );
};

