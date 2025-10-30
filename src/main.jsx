import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inicio from './componentes/Inicio.jsx';
import Viagem from './componentes/Viagem.jsx';
import Trecho from './componentes/Trecho.jsx';
import Estatisticas from './componentes/Estatisticas.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {path: '/', element: <Inicio />},
      {path: '/viagem', element: <Viagem />},
      {path: '/trecho', element: <Trecho />},
      {path: '/estatisticas', element: <Estatisticas/>}
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
