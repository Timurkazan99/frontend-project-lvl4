import React, { createContext } from 'react';
import { Provider } from 'react-redux';
import useUser from '../hooks/useUser';
import setupStore from '../store/store';
import useDevice from "../hooks/useDevice";

export const Context = createContext(null);
const store = setupStore();

function ContextProvider({ children }) {
  const user = useUser();
  const device = useDevice();
  return (
    <Context.Provider value={{ user, device }}>
      <Provider store={store}>
        {children}
      </Provider>
    </Context.Provider>
  );
}

export default ContextProvider;
