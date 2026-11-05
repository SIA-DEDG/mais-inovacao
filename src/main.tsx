import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LayoutPublico from './App.tsx'
import './index.css'
import Inicio from './paginas/Inicio.tsx'
import NaoEncontrada from './paginas/NaoEncontrada.tsx'
import BancoCompetencias from './paginas/inscricoes/BancoCompetencias.tsx'
import TermoDesafio from './paginas/inscricoes/TermoDesafio.tsx'
import InscricoesVisao from './paginas/inscricoes/Visao.tsx'
import DesafioDetalhe from './paginas/nucleos/Desafio.tsx'
import NucleoDetalhe from './paginas/nucleos/Detalhe.tsx'
import NucleosVisao from './paginas/nucleos/Visao.tsx'

const rotas = createBrowserRouter([
  {
    element: <LayoutPublico />,
    children: [
      { index: true, element: <Inicio /> },
      { path: 'nucleos', element: <NucleosVisao /> },
      { path: 'nucleos/:slug', element: <NucleoDetalhe /> },
      { path: 'nucleos/:slug/desafios/:numero', element: <DesafioDetalhe /> },
      { path: 'inscricoes', element: <InscricoesVisao /> },
      { path: 'inscricoes/desafio', element: <TermoDesafio /> },
      { path: 'inscricoes/banco-de-competencias', element: <BancoCompetencias /> },
      { path: '*', element: <NaoEncontrada /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)
