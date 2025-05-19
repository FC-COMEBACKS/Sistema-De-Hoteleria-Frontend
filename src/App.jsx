import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { routes } from './routes';
import Navbar from './components/navs/navbar';

export const App = () => {
  let element = useRoutes(routes);
  return (
    <div>
      <Navbar />
      <main style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
        {element}
      </main>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};