import {CHAT_ROUTE, LOGIN_ROUTE, NOTFOUND_ROUTE} from "./utils/const.js";
import Chat from "./pages/Chat.js";
import Auth from "./pages/Auth.js";
import ErrorPage from "./pages/ErrorPage.js";


export const authRoutes = [
    {
        path: CHAT_ROUTE,
        Component: Chat,
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: NOTFOUND_ROUTE,
        Component: ErrorPage
    },
]