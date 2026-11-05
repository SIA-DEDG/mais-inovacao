import { AcessoRapido } from '../components/AcessoRapido'
import { ComoFunciona } from '../components/ComoFunciona'
import { CtaBanner } from '../components/CtaBanner'
import { FaixaMarca } from '../components/FaixaMarca'
import { Hero } from '../components/Hero'
import { Instituicoes } from '../components/Instituicoes'
import { Numeros } from '../components/Numeros'
import { PerguntasFrequentes } from '../components/PerguntasFrequentes'
import { Pesquisadores } from '../components/Pesquisadores'

export default function Inicio() {
  return (
    <>
      <Hero />
      <FaixaMarca />
      <Instituicoes />
      <AcessoRapido />
      <Numeros />
      <ComoFunciona />
      <CtaBanner
        tema="escuro"
        className="pt-10"
        titulo="Sua empresa tem um desafio?"
        descricao="As inscrições estão em chamada aberta, sem prazo final. Inscreva o desafio e acompanhe tudo pelo protocolo."
        botao={{ label: 'Inscrever desafio', href: '/inscricoes' }}
      />
      <Pesquisadores />
      <CtaBanner
        tema="claro"
        className="pb-10"
        titulo="Quer participar do Projeto Mais Inovação como pesquisador(a)?"
        descricao="O chamamento está aberto e é permanente. Cadastre-se no Banco de Competências e passe a integrar as equipes que desenvolvem soluções para os desafios do Piauí."
        botao={{ label: 'Quero participar', href: '/inscricoes/banco-de-competencias' }}
      />
      <PerguntasFrequentes />
    </>
  )
}
