import React, {createContext} from 'react';
import useUser from "../hooks/useUser";
export const Context = createContext(null);

const ContextProvider = ({children}) => {
    const user = useUser();
    return (
        <Context.Provider value={{user}}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;