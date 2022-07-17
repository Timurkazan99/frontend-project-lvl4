import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from '../routes';
import { NOTFOUND_ROUTE } from '../utils/const.js';

function AppRouter() {
  return (
    <Routes>
      {routes.map(({ path, Component }) =>
          <Route key={path} path={path} element={<Component />} exact />
      )}
      <Route path="*" element={<Navigate to={NOTFOUND_ROUTE} />} />
    </Routes>
  );
}

export default AppRouter;
