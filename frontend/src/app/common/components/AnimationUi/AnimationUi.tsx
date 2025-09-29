import { JSX} from "react";
import cn from "classnames";
import { PropsAnimationUi } from "./AnimationUi.props";

export default function AnimationUi({ 
    cls = '',
    isAnimation = true,
    children,
    onClick,
    type = 'block'
}: PropsAnimationUi ): JSX.Element {
    
    return (
        <div className={cn(cls,  {
            'animation': isAnimation,
        })}
        data-animation={isAnimation}
        >
            {children}
        </div>
    );
};

