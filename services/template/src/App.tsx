import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './App.route';
function App() {
  const element = useRoutes(routes);
  return <>{element}</>;
}

export default App;
