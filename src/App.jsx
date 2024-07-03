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
import Categoria from './pages/administrador/Categoria';
import Registro from './pages/Registro';
import Equipo from './pages/Equipo';
import Administrador from './pages/Administrador';
import Lista_categoria from './pages/administrador/Lista_categoria';
import Formulario_pregunta from './pages/administrador/Formulario_pregunta';
import Categorias_preguntas from './pages/administrador/Categorias_preguntas';
import Preguntas from './pages/administrador/Preguntas';
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
      element: <Index/>
    },
    {
      path: "/administrador",
      element: <Panel componente={<Administrador/>}/>
    },
    {
      path:"/equipo/:codigo_sala",
      element: <Equipo/>
    },
    {
      path: "/administrador/categoria",
      element: <Panel componente={<Categoria/>}/>
    },
    {
      path: "/administrador/lista_categoria",
      element: <Panel componente={<Lista_categoria/>}/>
    },
    {
      path: "/administrador/formulario_pregunta",
      element: <Panel componente={<Formulario_pregunta/>}/>
    },
    {
      path: "/administrador/categorias_preguntas",
      element: <Panel componente={<Categorias_preguntas/>}/>
    },
    {
      path: "/administrador/preguntas/:pk_categoria",
      element: <Panel componente={<Preguntas/>}/>
    },
  ]);

  return (
      <RouterProvider router={router} />
    )
}

export default App