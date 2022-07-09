import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {NOTFOUND_ROUTE} from "../utils/const.js";

const AppRouter = () => {
    const user = {
        isAuth: true
    }
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            <Route path='*' element={<Navigate to={NOTFOUND_ROUTE}/>}/>
        </Routes>
    );
};

export default AppRouter;