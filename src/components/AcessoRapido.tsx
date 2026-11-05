import inscricoesFundo from '../assets/acesso/inscricoes-fundo.svg'
import inscricoesFundoHover from '../assets/acesso/inscricoes-fundo-hover.svg'
import inscricoesIcone from '../assets/acesso/inscricoes-icone.svg'
import inscricoesIconeHover from '../assets/acesso/inscricoes-icone-hover.svg'
import nucleosFundo from '../assets/acesso/nucleos-fundo.svg'
import nucleosFundoHover from '../assets/acesso/nucleos-fundo-hover.svg'
import nucleosIcone from '../assets/acesso/nucleos-icone.svg'
import nucleosIconeHover from '../assets/acesso/nucleos-icone-hover.svg'
import pesquisadoresFundo from '../assets/acesso/pesquisadores-fundo.svg'
import pesquisadoresFundoHover from '../assets/acesso/pesquisadores-fundo-hover.svg'
import pesquisadoresIcone from '../assets/acesso/pesquisadores-icone.svg'
import pesquisadoresIconeHover from '../assets/acesso/pesquisadores-icone-hover.svg'
import ponto from '../assets/acesso/ponto.svg'
import relatoriosFundo from '../assets/acesso/relatorios-fundo.svg'
import relatoriosFundoHover from '../assets/acesso/relatorios-fundo-hover.svg'
import relatoriosIcone from '../assets/acesso/relatorios-icone.svg'
import relatoriosIconeHover from '../assets/acesso/relatorios-icone-hover.svg'
import setaAzul from '../assets/acesso/seta-azul.svg'
import setaBranca from '../assets/acesso/seta-branca.svg'
import setaEscura from '../assets/acesso/seta-escura.svg'
import setaInscricoesHover from '../assets/acesso/seta-inscricoes-hover.svg'
import setaVermelha from '../assets/acesso/seta-vermelha.svg'
import { Container, Eyebrow, Ligacao } from './ui'

/** Par de imagens [padrão, hover] — o card troca de cor cheia no hover. */
type Par = [string, string]

type Cartao = {
  titulo: string
  descricao: string
  href: string
  destaque: { valor: string; legenda: string } | { nota: string }
  fundo: Par
  icone: Par
  seta: Par
  cores: {
    card: string
    caixaIcone: string
    botao: string
    titulo: string
    descricao: string
    valor: string
    legenda: string
  }
}

const CARTOES: Cartao[] = [
  {
    titulo: 'Núcleos',
    descricao: 'As 7 áreas estratégicas, com seus desafios, equipes e resultados esperados.',
    href: '/nucleos',
    destaque: { valor: '7', legenda: 'núcleos' },
    fundo: [nucleosFundo, nucleosFundoHover],
    icone: [nucleosIcone, nucleosIconeHover],
    seta: [setaBranca, setaEscura],
    cores: {
      card: 'bg-green-100 hover:bg-green-800',
      caixaIcone: 'bg-background group-hover:bg-white/12',
      botao: 'bg-green-800 group-hover:bg-gold-500',
      titulo: 'text-green-900 group-hover:text-white',
      descricao: 'text-muted group-hover:text-green-200',
      valor: 'text-green-700 group-hover:text-gold-500',
      legenda: 'text-green-800 group-hover:text-green-200',
    },
  },
  {
    titulo: 'Inscrições',
    descricao:
      'Apresente o desafio da sua instituição ou cadastre-se como pesquisador(a) no Banco de Competências dos Pesquisadores.',
    href: '/inscricoes',
    destaque: { nota: '2 chamadas abertas · sem prazo final' },
    fundo: [inscricoesFundo, inscricoesFundoHover],
    icone: [inscricoesIcone, inscricoesIconeHover],
    seta: [setaEscura, setaInscricoesHover],
    cores: {
      card: 'bg-yellow-100 hover:bg-yellow-500',
      caixaIcone: 'bg-background group-hover:bg-white/30',
      botao: 'bg-yellow-500 group-hover:bg-green-900',
      titulo: 'text-green-900',
      descricao: 'text-muted group-hover:text-[#3a3210]',
      valor: '',
      legenda: 'text-gold-600 group-hover:text-[#3a3210]',
    },
  },
  {
    titulo: 'Relatórios',
    descricao: 'Relatórios técnicos, de acompanhamento e de resultados dos desafios',
    href: '/relatorios',
    destaque: { valor: '9', legenda: 'relatórios' },
    fundo: [relatoriosFundo, relatoriosFundoHover],
    icone: [relatoriosIcone, relatoriosIconeHover],
    seta: [setaBranca, setaAzul],
    cores: {
      card: 'bg-blue-100 hover:bg-blue-500',
      caixaIcone: 'bg-background group-hover:bg-white/16',
      botao: 'bg-blue-500 group-hover:bg-background',
      titulo: 'text-blue-700 group-hover:text-white',
      descricao: 'text-muted group-hover:text-blue-100',
      valor: 'text-blue-700 group-hover:text-white',
      legenda: 'text-blue-700 group-hover:text-blue-100',
    },
  },
  {
    titulo: 'Pesquisadores',
    descricao: 'Perfil, instituições e áreas de atuação, com distribuição pelo Piauí.',
    href: '/pesquisadores',
    destaque: { valor: '475', legenda: 'em 21 municípios' },
    fundo: [pesquisadoresFundo, pesquisadoresFundoHover],
    icone: [pesquisadoresIcone, pesquisadoresIconeHover],
    seta: [setaBranca, setaVermelha],
    cores: {
      card: 'bg-red-100 hover:bg-red-500',
      caixaIcone: 'bg-background group-hover:bg-white/16',
      botao: 'bg-red-500 group-hover:bg-background',
      titulo: 'text-red-700 group-hover:text-white',
      descricao: 'text-muted group-hover:text-red-100',
      valor: 'text-red-700 group-hover:text-white',
      legenda: 'text-red-700 group-hover:text-red-100',
    },
  },
]

const TRANSICAO = 'transition-colors duration-300'

function ImagemDupla({ par, className }: { par: Par; className: string }) {
  return (
    <span className={`block ${className}`}>
      <img src={par[0]} alt="" className="absolute inset-0 size-full transition-opacity duration-300 group-hover:opacity-0" />
      <img src={par[1]} alt="" className="absolute inset-0 size-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </span>
  )
}

function CartaoAcesso({ cartao }: { cartao: Cartao }) {
  const { cores, destaque } = cartao
  return (
    <Ligacao
      href={cartao.href}
      className={`group relative flex h-[400px] flex-col justify-between overflow-hidden rounded-3xl p-7 outline-offset-4 focus-visible:outline-2 focus-visible:outline-green-800 ${TRANSICAO} ${cores.card}`}
    >
      <ImagemDupla par={cartao.fundo} className="absolute top-[210px] left-[140px] size-[220px]" />

      <div className="relative flex items-center justify-between">
        <span className={`rounded-[14px] p-3 ${TRANSICAO} ${cores.caixaIcone}`}>
          <ImagemDupla par={cartao.icone} className="relative size-6" />
        </span>
        <span className={`rounded-full p-2.5 ${TRANSICAO} ${cores.botao}`}>
          <ImagemDupla par={cartao.seta} className="relative size-[18px]" />
        </span>
      </div>

      <div className="relative flex flex-col gap-2.5">
        <h3 className={`font-display text-[26px] font-bold ${TRANSICAO} ${cores.titulo}`}>{cartao.titulo}</h3>
        <p className={`text-[14px] leading-[1.55] ${TRANSICAO} ${cores.descricao}`}>{cartao.descricao}</p>
        {'nota' in destaque ? (
          <p className={`text-[13px] font-medium ${TRANSICAO} ${cores.legenda}`}>{destaque.nota}</p>
        ) : (
          <p className="flex items-center gap-2">
            <span className={`font-display text-[40px] font-extrabold ${TRANSICAO} ${cores.valor}`}>{destaque.valor}</span>
            <span className={`text-[13px] font-medium ${TRANSICAO} ${cores.legenda}`}>{destaque.legenda}</span>
          </p>
        )}
      </div>
    </Ligacao>
  )
}

export function AcessoRapido() {
  return (
    <section className="bg-background py-10">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex flex-col items-start gap-[18px]">
            <Eyebrow ponto={ponto} className="bg-green-100 text-green-700">
              Acesso rápido
            </Eyebrow>
            <h2 className="max-w-[900px] font-display text-[32px] leading-[1.15] font-bold tracking-[-0.44px] text-green-900 md:text-[44px]">
              Tudo sobre o projeto<span className="text-green-600">, em um só lugar</span>
            </h2>
          </div>
          <p className="max-w-[340px] text-[15px] leading-[1.55] text-muted xl:text-right">
            Núcleos, inscrições, relatórios e pesquisadores — acesse direto o que você procura.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {CARTOES.map((cartao) => (
            <CartaoAcesso key={cartao.titulo} cartao={cartao} />
          ))}
        </div>
      </Container>
    </section>
  )
}
