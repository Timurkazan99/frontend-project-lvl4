import React, {useEffect, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {Context} from "../components/ContextProvider";
import {LOGIN_ROUTE} from "../utils/const";

const Chat = () => {
    const navigate = useNavigate();
    const {user} = useContext(Context);

    useEffect(() => {
      console.log('Chat');
      if (!user.isAuth) {
        navigate(LOGIN_ROUTE)
        return;
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            Chat
        </div>
    );
};

export default Chat;
