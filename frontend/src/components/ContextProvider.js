import React, {createContext} from 'react';
import useUser from "../hooks/useUser";
import setupStore from "../store/store";
import { Provider } from 'react-redux';

export const Context = createContext(null);
const store = setupStore();

const ContextProvider = ({children}) => {
    const user = useUser();
    return (
        <Context.Provider value={{user}}>
            <Provider store={store}>
                {children}
            </Provider>
        </Context.Provider>
    );
};

export default ContextProvider;