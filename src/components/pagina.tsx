import type { ReactNode } from 'react'
import { Link } from 'react-router'
import chevronDireita from '../assets/comum/chevron-direita.svg'
import chevronEsquerda from '../assets/comum/chevron-esquerda.svg'
// import iconeCalendario from '../assets/comum/icone-calendario.svg'
import iconeHome from '../assets/comum/icone-home.svg'
import iconeHomeEscuro from '../assets/comum/icone-home-escuro.svg'
import type { StatusDesafio } from '../dados/nucleos'
import { Container } from './ui'

/** Faixa "Última atualização" que fica logo abaixo do menu nas páginas de dados. */
// export function BarraAtualizacao() {
//   return (
//     <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 bg-[#e3f8ec] px-4 py-2.5 font-display text-[12.5px] text-black sm:px-6">
//       <p className="flex items-center gap-2.5">
//         <img src={iconeCalendario} alt="" className="size-[18px]" />
//         Última atualização dessa página feita em XX/YY/ZZZZ, 00:00 horas
//       </p>
//       <p>Período dos dados: XX/YY/ZZZZ - XX/YY/ZZZZ</p>
//     </div>
//   )
// }

export type ItemTrilha = { label: string; href?: string }

/** Trilha de navegação. `claro`: versão para topos de fundo claro (ex.: Inscrições). */
export function Trilha({ itens, claro = false }: { itens: ItemTrilha[]; claro?: boolean }) {
  const link = claro ? 'text-green-900' : 'text-gold-300 underline decoration-1'
  return (
    <nav aria-label="Você está aqui" className="pb-1">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px]">
        <li>
          <Link to="/" className={`flex items-center gap-1 ${link}`}>
            <img src={claro ? iconeHomeEscuro : iconeHome} alt="" className="size-4" />
            Início
          </Link>
        </li>
        {itens.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <span aria-hidden className={claro ? 'text-[#5c4a10]' : 'text-[#7fa58c]'}>
              /
            </span>
            {item.href ? (
              <Link to={item.href} className={link}>
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className={`font-medium ${claro ? 'text-green-900' : 'text-white underline decoration-[1.5px]'}`}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

type TopoPaginaProps = {
  trilha: ItemTrilha[]
  titulo: string
  descricao: string
  children?: ReactNode
}

/** Cabeçalho verde das páginas internas: trilha, título, descrição e indicadores. */
export function TopoPagina({ trilha, titulo, descricao, children }: TopoPaginaProps) {
  return (
    <section className="bg-[linear-gradient(164.18deg,#04331c_0%,#0e5a31_71.43%)] pt-9 pb-10">
      <Container largo className="flex flex-col gap-5">
        <Trilha itens={trilha} />
        <h1 className="font-display text-[32px] font-extrabold text-white md:text-[40px]">{titulo}</h1>
        <p className="text-[15px] leading-[1.5] text-green-200">{descricao}</p>
        {children}
      </Container>
    </section>
  )
}

type IndicadorTopoProps = { icone: string; valor: string; unidade: string; legenda: string }

export function IndicadorTopo({ icone, valor, unidade, legenda }: IndicadorTopoProps) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3.5 rounded-xl border border-white/15 bg-white/7 px-5 py-4">
      <span className="shrink-0 rounded-[10px] bg-gold-500 p-2.5">
        <img src={icone} alt="" className="size-5" />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="flex items-center gap-1.5">
          <span className="font-display text-[22px] font-bold text-gold-300">{valor}</span>
          <span className="text-[14px] font-medium text-white">{unidade}</span>
        </span>
        <span className="text-[12px] text-green-200">{legenda}</span>
      </span>
    </div>
  )
}

const STATUS: Record<StatusDesafio, { label: string; classe: string }> = {
  andamento: { label: 'Em andamento', classe: 'bg-blue-50 text-blue-700' },
  atraso: { label: 'Com atraso', classe: 'bg-red-50 text-red-700' },
  'nao-iniciado': { label: 'Não iniciado', classe: 'bg-surface text-muted' },
}

export function ChipStatus({ status, children }: { status: StatusDesafio; children?: ReactNode }) {
  const { label, classe } = STATUS[status]
  return (
    <span className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ${classe}`}>
      {children ?? label}
    </span>
  )
}

type PaginacaoProps = {
  pagina: number
  totalPaginas: number
  aoMudar: (pagina: number) => void
  resumo: string
}

export function Paginacao({ pagina, totalPaginas, aoMudar, resumo }: PaginacaoProps) {
  const botao = 'flex size-9 items-center justify-center rounded-[10px] text-[14px] font-semibold'
  const primeira = pagina === 1
  const ultima = pagina === totalPaginas
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
      <p className="text-[13px] text-muted">{resumo}</p>
      <nav aria-label="Paginação" className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Página anterior"
          disabled={primeira}
          onClick={() => aoMudar(pagina - 1)}
          className={`${botao} border border-border bg-background disabled:opacity-60`}
        >
          <img src={primeira ? chevronEsquerda : chevronDireita} alt="" className={`size-4 ${primeira ? '' : 'rotate-180'}`} />
        </button>
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            aria-current={n === pagina ? 'page' : undefined}
            onClick={() => aoMudar(n)}
            className={`${botao} ${n === pagina ? 'bg-green-800 text-white' : 'border border-border bg-background text-green-900 hover:bg-green-50'}`}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          aria-label="Próxima página"
          disabled={ultima}
          onClick={() => aoMudar(pagina + 1)}
          className={`${botao} border border-border bg-background disabled:opacity-60`}
        >
          <img src={chevronDireita} alt="" className="size-4" />
        </button>
      </nav>
    </div>
  )
}

/** Mensagem para seções sem dados publicados (núcleos sem detalhamento no Figma). */
export function EstadoVazio({ children }: { children: ReactNode }) {
  return (
    <p className="w-full rounded-2xl border border-dashed border-border bg-surface px-6 py-10 text-center text-[14px] text-muted">
      {children}
    </p>
  )
}
