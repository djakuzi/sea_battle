import "./RootController.css";
import { JSX, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NonVisualnterface from "./NonVisualnterface/NonVisualnterface";
import VusualInterface from "./Visual-Interface/VusualInterface";
import { useAspectRatio } from "../common/script/hooks/ui/getAspectRatioScreen";

export default function RootController(): JSX.Element {
    //hook
    const location = useLocation();
    const navigate = useNavigate();
    //custom hook
    const aspectRatio = useAspectRatio();

    const route = (path: string | null = null): void => {
        if (path) {
            navigate(path);
            return;
        } else if (location.pathname == '/') {
            navigate('/menu');
        }
    };

    useEffect(() => {
        route();
    }, []);


    return (
        <div className="root-controller" data-aspect-ratio={aspectRatio}>
            <Outlet />
            <VusualInterface />
            <NonVisualnterface />
        </div>
    );
}