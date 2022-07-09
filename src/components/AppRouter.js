import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {CHAT_ROUTE, LOGIN_ROUTE, NOTFOUND_ROUTE} from "../utils/const.js";
import {Context} from "./ContextProvider";

const AppRouter = () => {
    const user = useContext(Context);
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {!user.isAuth && <Route path={CHAT_ROUTE} element={<Navigate to={LOGIN_ROUTE}/>}/>}
            <Route path='*' element={<Navigate to={NOTFOUND_ROUTE}/>}/>
        </Routes>
    );
};

export default AppRouter;