import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import AppRouter from './components/AppRouter.jsx';
import Navbar from './components/NavBar.jsx';
import { Context } from './components/ContextProvider.jsx';
import './styles/main.css';
import useCheckMobileScreen from './hooks/useCheckMobileScreen';

function App() {
  const { user, device } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useCheckMobileScreen();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('username');
    if (token) {
      user.setIsAuth(true);
      user.setName(name);
    } else {
      user.setIsAuth(false);
    }
    device.setIsMobile(isMobile);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <span>Loading</span>
        <Spinner animation="grow" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        { isMobile ? null : <Navbar /> }
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
