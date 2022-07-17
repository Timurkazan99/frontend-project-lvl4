import React from 'react';
import ReactDOM from 'react-dom/client';
import ContextProvider from './components/ContextProvider';
import init from './init';

const app = async () => {
  // eslint-disable-next-line no-undef
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await init();
  root.render(
    <ContextProvider>
      <React.StrictMode>
        {vdom}
      </React.StrictMode>
    </ContextProvider>,
  );
};

app();
