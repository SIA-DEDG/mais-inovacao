import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LayoutPublico from './App.tsx'
import './index.css'
import Inicio from './paginas/Inicio.tsx'
import NaoEncontrada from './paginas/NaoEncontrada.tsx'

const rotas = createBrowserRouter([
  {
    element: <LayoutPublico />,
    children: [
      { index: true, element: <Inicio /> },
      { path: '*', element: <NaoEncontrada /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)
