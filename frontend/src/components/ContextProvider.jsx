import React, { createContext, useMemo } from 'react';
import { Provider } from 'react-redux';
import useUser from '../hooks/useUser';
import setupStore from '../store/store';
import useDevice from '../hooks/useDevice';

export const Context = createContext(null);
const store = setupStore();

function ContextProvider({ children }) {
  const user = useUser();
  const device = useDevice();
  const providerValue = useMemo(() => ({ user, device }), [user, device]);
  return (
    <Context.Provider value={providerValue}>
      <Provider store={store}>
        {children}
      </Provider>
    </Context.Provider>
  );
}

export default ContextProvider;
