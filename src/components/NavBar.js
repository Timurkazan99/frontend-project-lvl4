import React, {useContext} from 'react';
import {Button, Container, Navbar} from 'react-bootstrap';
import {NavLink, useNavigate} from "react-router-dom";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/const";
import {Context} from "./ContextProvider";

const NavBar = () => {
    const {user} = useContext(Context);
    const navigate = useNavigate()

    const logout = () => {
        user.setIsAuth(false);
        user.setName('');
        localStorage.clear();
        navigate(LOGIN_ROUTE);
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container className="d-flex justify-content-between">
                <NavLink style={{color: "white"}} to={CHAT_ROUTE}>Slack chat</NavLink>
                { user.isAuth ?
                    <div>
                        <span className="mx-3" style={{color: "white"}}>{user.name}</span>
                        <Button variant={"primary"} onClick={logout}>Выйти</Button>
                    </div>
                    :
                    null
                }
            </Container>
        </Navbar>
    );
};

export default NavBar;