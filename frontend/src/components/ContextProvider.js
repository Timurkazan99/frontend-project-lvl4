import React, { createContext } from 'react';
import { Provider } from 'react-redux';
import useUser from '../hooks/useUser';
import setupStore from '../store/store';

export const Context = createContext(null);
const store = setupStore();

function ContextProvider({ children }) {
  const user = useUser();
  return (
    <Context.Provider value={{ user }}>
      <Provider store={store}>
        {children}
      </Provider>
    </Context.Provider>
  );
}

export default ContextProvider;
