import { useLocation, useNavigate } from "react-router-dom";

interface IntrUseRoute {
    route: (path?: string | null) => void;
}

export function useRoute(): IntrUseRoute {
    const location = useLocation();
    const navigate = useNavigate();

    const route = (path: string | null = null): void => {
        if (path) {
            navigate(path);
            return;
        } else if (location.pathname == '/') {
            navigate('/menu');
        }
    };

    return {
        route
    }
}