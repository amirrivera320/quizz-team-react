import React from 'react'
//import { ConfigProvider} from 'antd';
//import esES from 'antd/lib/locale/es_ES'; // Importar el idioma español
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Index from './pages/Index';
import Panel from './pages/Panel';
import Ejemplo from './pages/Ejemplo';
import Registro from './pages/Registro';
//import Login from './pages/Login';
//import Registro from './pages/Registro';
//import Panel from './pages/Panel';
//import { GoogleOAuthProvider } from '@react-oauth/google';
//import ErrorElement from './pages/ErrorElement';

// En este archivo se encuentran todas las rutas
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/registro",
      element: <Registro/>
    },
    {
      path: "/index",
      element: <Panel componente={<Index/>}/>
    },
    {
      path: "/ejemplo",
      element: <Panel componente={<Ejemplo/>}/>
    },
  ]);

  return (
      <RouterProvider router={router} />
    )
}

export default App