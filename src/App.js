import React, {useContext, useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/NavBar";
import {Context} from "./components/ContextProvider";

const App = () => {
    const {user} = useContext(Context);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            user.setIsAuth(false);
            return;
        }
        user.setIsAuth(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;