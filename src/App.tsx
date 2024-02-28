import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import Home from './pages/Home';
import { dataRoutes, RouteConfig } from './common/router'
import Dynamic from './common/Dynamic'

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        {
          dataRoutes.map((cfg: RouteConfig) => (
            <Route key={cfg.key} path={'/' + cfg.key} element={
              <Dynamic name={cfg.key}/>
            }/>
          ))
        }
      </Routes>
    </>
  );
}

export default App;
