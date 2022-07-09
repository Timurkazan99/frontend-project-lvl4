import React from 'react';
import {Container, Navbar} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import {CHAT_ROUTE} from "../utils/const";

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: "white"}} to={CHAT_ROUTE}>Slack chat</NavLink>
            </Container>
        </Navbar>
    );
};

export default NavBar;