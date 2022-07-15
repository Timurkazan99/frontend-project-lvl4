import {CHAT_ROUTE, LOGIN_ROUTE, NOTFOUND_ROUTE, REGISTRATION_ROUTE} from "./utils/const.js";
import Chat from "./pages/Chat.js";
import Auth from "./pages/Auth.js";
import ErrorPage from "./pages/ErrorPage.js";


export const routes = [
    {
        path: CHAT_ROUTE,
        Component: Chat,
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: NOTFOUND_ROUTE,
        Component: ErrorPage
    },
]
