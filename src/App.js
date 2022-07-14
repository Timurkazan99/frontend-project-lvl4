import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/NavBar";
import {Context} from "./components/ContextProvider";
import {Spinner} from "react-bootstrap";

const App = () => {
    const {user} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('username');
        if (token) {
          user.setIsAuth(true);
          user.setName(name);
        } else {
          user.setIsAuth(false);
        }
        setIsLoading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(isLoading) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <span>Loading</span>
            <Spinner animation={"grow"} />
        </div>
      )
    }

    return (
        <BrowserRouter>
            <div className="d-flex flex-column h-100">
                <Navbar />
                <AppRouter />
            </div>
        </BrowserRouter>
    );
};

export default App;
