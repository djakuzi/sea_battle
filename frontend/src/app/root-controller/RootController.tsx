import "./RootController.css";
import { JSX, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NonVisualnterface from "./NonVisualnterface/NonVisualnterface";
import VusualInterface from "./Visual-Interface/VusualInterface";
import { useAuthCheck } from "./script/hook/useAuthCheck.hook";
import { useRoute } from "./script/hook/useRoute.hook";
import { useAspectRatio } from "./script/hook/useAspectRatio.hook";

export default function RootController(): JSX.Element {
    //custom hook
    const { route } = useRoute();
    const { aspectRatio } = useAspectRatio();
    const { checkAuth } = useAuthCheck()

    useEffect(() => {
        route();
        checkAuth();
    }, []);

    return (
        <div className="root-controller" data-aspect-ratio={aspectRatio}>
            <Outlet />
            <VusualInterface />
            <NonVisualnterface />
        </div>
    );
}