import React from 'react';
import ReactDOM from 'react-dom/client';
import ContextProvider from './components/ContextProvider.jsx';
import init from './init.jsx';

const app = async () => {
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
