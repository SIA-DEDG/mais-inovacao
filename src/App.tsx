import { Outlet, ScrollRestoration } from 'react-router'
import { FaixaMarca } from './components/FaixaMarca'
import { Header } from './components/Header'
import { Rodape } from './components/Rodape'

/** Layout do site de acesso público: cabeçalho, conteúdo da rota e rodapé. */
export default function LayoutPublico() {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <main>
        <Outlet />
      </main>
      <FaixaMarca />
      <Rodape />
    </>
  )
}
