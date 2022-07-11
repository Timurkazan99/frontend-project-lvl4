import React, {useEffect, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {Context} from "../components/ContextProvider";
import {LOGIN_ROUTE} from "../utils/const";
import {thunkFetchData} from "../store/thunks/fetchData";

const Chat = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const navigate = useNavigate();
    const {user} = useContext(Context);

    useEffect(() => {
      console.log('Chat');
      if (!user.isAuth) {
        navigate(LOGIN_ROUTE)
        return;
      }

      dispatch(thunkFetchData());
      console.log(state)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            Chat
        </div>
    );
};

export default Chat;
