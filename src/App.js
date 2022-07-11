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
      console.log('App');
        const token = localStorage.getItem('token');
        if (token) {
          user.setIsAuth(true);
        } else {
          user.setIsAuth(false);
        }
        setIsLoading(false);
        console.log(user.isAuth, token);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    if(isLoading) {
      return (
        <div className="m-auto d-absolute">
          <Spinner animation={"grow"} />
        </div>
      )
    }

    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
