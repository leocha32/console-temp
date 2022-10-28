import React from 'react';
import './App.css';
import { useRoutes, RouteObject } from 'react-router-dom';
import routes from './App.route';
function App() {
  const element = useRoutes(routes as RouteObject[]);
  return <>{element}</>;
}

export default App;
