import { MiddlewareAuthChanged } from "./middleware/list/authChanged.middleware";
import { MiddlewareIsAuth } from "./middleware/list/isAuth.middleware";

export const ListAuthMiddleware = [
    MiddlewareAuthChanged,
    MiddlewareIsAuth,
]