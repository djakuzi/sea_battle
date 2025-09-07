import { cloneElement, JSX, ReactElement} from "react";
import cn from "classnames";
import styles from './ThreeDimensionalElement.module.css';
import { PropsThreeDimensionalElement } from "./ThreeDimensionalElement.props";

export default function ThreeDimensionalElement({ 
    cls = '',
    children,
    is3D = true,
    type = 'repeating-element',
    count = 20,
    zStep = .01,
    zUnit = 'vw',
    perspective = '1000px',
    direction = 'forward',
}: PropsThreeDimensionalElement ): JSX.Element | undefined {
    const stylesParent = {
        perspective: perspective,
    }

    const stylesItem = {
        styles
    }

    if (type == 'repeating-element') {
        const sign = direction === 'backward' ? -1 : 1;

        return (
            <div className={cn(styles['threeDimensional-element'], cls, {
                    [styles['threeDimensional-element--active']]: is3D,
                })}
                data-animation={is3D}
                style={stylesParent}
            >
                {Array.from({ length: count }).map((_, i) => {
                    const depth = sign * (i + 1) * zStep;
                    const transformValue = `translateZ(${depth}${zUnit})`;

                    return cloneElement(children as ReactElement<{ 'data-index'?: number; 'className': string; style: React.CSSProperties }>, {
                        key: i,
                        'className': cn((children as ReactElement<any>).props.className, styles['threeDimensional-element__item']),
                        'data-index': i,
                        style: {
                            ...(children as ReactElement<any>).props.style,
                            transform: transformValue,
                        },
                    })
                }
                )}
            </div>
        );
    }
};

