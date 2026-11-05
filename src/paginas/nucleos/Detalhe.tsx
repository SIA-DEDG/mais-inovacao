import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import chevronBaixo from '../../assets/comum/chevron-baixo-escuro.svg'
import iconeArquivo from '../../assets/comum/icone-arquivo-dourado.svg'
import iconeDownload from '../../assets/comum/icone-download-branco.svg'
import iconeFixado from '../../assets/comum/icone-fixado.svg'
import iconeGrafico from '../../assets/comum/icone-grafico-azul.svg'
import iconeOrdenar from '../../assets/comum/icone-ordenar.svg'
import iconePin from '../../assets/comum/icone-pin-cinza.svg'
import iconeUsuarios from '../../assets/comum/icone-usuarios-verde.svg'
import pontoVerde from '../../assets/comum/ponto-verde.svg'
import pontoVerdeClaro from '../../assets/comum/ponto-verde-claro.svg'
import setaDireita from '../../assets/comum/seta-direita-verde.svg'
import setaLink from '../../assets/comum/seta-link-verde.svg'
import setaVerdeEscura from '../../assets/comum/seta-verde-escura.svg'
import setaVoltarClara from '../../assets/comum/seta-voltar-clara.svg'
import circuloIcone from '../../assets/nucleos/circulo-icone.svg'
import { FaixaMarca } from '../../components/FaixaMarca'
import { MapaInterativo } from '../../components/MapaInterativo'
import { ChipStatus, EstadoVazio, Paginacao } from '../../components/pagina'
import { Container, Eyebrow, LinkSeta } from '../../components/ui'
import {
  NUCLEOS,
  buscarNucleo,
  formatarData,
  type Desafio,
  type DetalheNucleo,
  type ItemRanking,
  type Nucleo,
  type Relatorio,
} from '../../dados/nucleos'
import { Abas, SeletorNucleos, TopoNucleos } from './comum'

const POR_PAGINA = 4

function CabecalhoSecao({ eyebrow, titulo, descricao }: { eyebrow: string; titulo: string; descricao: string }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <Eyebrow pequeno ponto={pontoVerde} className="bg-green-50 text-green-700">
        {eyebrow}
      </Eyebrow>
      <h2 className="font-display text-[26px] font-bold text-green-900">{titulo}</h2>
      <p className="max-w-[900px] text-[14px] leading-[1.5] text-muted">{descricao}</p>
    </div>
  )
}

function CardNucleo({ nucleo }: { nucleo: Nucleo }) {
  const kpis: [number, string][] = [
    [nucleo.pesquisadores, 'pesquisadores vinculados'],
    [nucleo.municipios, 'municípios do Piauí'],
    ...(nucleo.detalhe ? [[nucleo.detalhe.instituicoes, 'instituições de vínculo'] as [number, string]] : []),
    [nucleo.desafios, 'desafios do núcleo'],
  ]
  return (
    <Container largo className="py-8">
      <div className="flex flex-col gap-8 overflow-hidden rounded-3xl bg-green-800 px-6 pt-9 pb-10 md:px-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-[18px]">
            <Link to="/nucleos" className="flex items-center gap-1.5 text-[13px] font-medium text-green-200 underline">
              <img src={setaVoltarClara} alt="" className="size-4" />
              Todos os núcleos
            </Link>
            <p className="text-[12px] font-bold tracking-[0.96px] text-gold-300">NÚCLEO {nucleo.numero} DE 07</p>
            <h2 className="font-display text-[30px] leading-[1.15] font-extrabold text-white md:text-[38px]">{nucleo.nome}</h2>
            <p className="text-[17px] leading-[1.55] text-green-100">{nucleo.detalhe?.descricaoLonga ?? nucleo.resumo}</p>
            <ul className="flex flex-wrap gap-2">
              {nucleo.subareas.map((area) => (
                <li key={area} className="rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-[12px] text-white">
                  {area}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a
                href="#desafios"
                className="group flex items-center gap-2 rounded-full bg-yellow-500 px-5 py-3 text-[14px] font-semibold text-green-900 transition-[filter] hover:brightness-105"
              >
                Ver desafios do núcleo
                <img src={setaVerdeEscura} alt="" className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                to="/relatorios/anual-2025"
                className="flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-[14px] font-semibold text-white hover:bg-white/8"
              >
                <img src={iconeDownload} alt="" className="size-4" />
                Relatório 2025 do núcleo
              </Link>
            </div>
          </div>
          <div className="relative aspect-[540/420] w-full shrink-0 overflow-hidden rounded-3xl bg-[linear-gradient(142.1deg,#0a4a28_0%,#1e7a42_71.43%)] lg:w-[540px]">
            <img src={nucleo.foto} alt="" className="absolute inset-0 size-full object-cover opacity-38" />
            <div className="absolute inset-0 bg-[linear-gradient(37.9deg,rgb(4_51_28/0.85)_12.5%,rgb(10_74_40/0.25)_58.33%,rgb(10_74_40/0)_95.83%)]" />
            <div className="absolute bottom-7 left-7 size-[104px]">
              <img src={circuloIcone} alt="" className="absolute inset-[-17.31%_-26.92%_-36.54%_-26.92%] max-w-none" />
              <img src={nucleo.icone} alt="" className="absolute inset-5 size-16" />
            </div>
          </div>
        </div>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-flow-col lg:grid-cols-none">
          {kpis.map(([valor, legenda]) => (
            <div key={legenda} className="flex flex-col-reverse gap-0.5 rounded-2xl border border-white/14 bg-white/7 px-5 py-4">
              <dt className="text-[13px] text-green-100">{legenda}</dt>
              <dd className="font-display text-[30px] font-extrabold text-white">{valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Container>
  )
}

const ABAS = [
  { id: 'desafios', label: 'Desafios e equipes' },
  { id: 'chamadas', label: 'Chamadas e relatórios' },
  { id: 'onde-estao', label: 'Onde estão' },
]

function CardDesafio({ desafio, nucleo, marcaDagua }: { desafio: Desafio; nucleo: Nucleo; marcaDagua: string }) {
  const mascara: CSSProperties = { maskImage: `url("${marcaDagua}")`, maskSize: '190px 190px', maskRepeat: 'no-repeat' }
  return (
    <article className="relative flex min-h-[284px] flex-col gap-3.5 overflow-hidden rounded-2xl border border-green-200 bg-green-100 p-6">
      <div aria-hidden className="absolute right-1 -bottom-10 size-[190px] bg-green-700 opacity-8" style={mascara} />
      <div className="relative flex items-center justify-between">
        <p className="text-[11px] font-bold tracking-[0.66px] text-muted">DESAFIO {desafio.numero}</p>
        <ChipStatus status={desafio.status} />
      </div>
      <h3 className="relative font-display text-[18px] leading-[1.25] font-bold text-green-900">{desafio.titulo}</h3>
      <p className="relative flex-1 text-[13px] leading-[1.5] text-muted">{desafio.resumo}</p>
      <div className="relative flex flex-col gap-1.5">
        <p className="flex justify-between text-[12px]">
          <span className="text-muted">Metas cumpridas</span>
          <span className="font-semibold text-ink">{desafio.metas === null ? '—' : `${desafio.metas}%`}</span>
        </p>
        <div className="h-2 overflow-hidden rounded bg-background">
          <div className="h-2 rounded bg-green-600" style={{ width: `${desafio.metas ?? 0}%` }} />
        </div>
      </div>
      <hr className="relative border-green-200" />
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background">
            <img src={iconeUsuarios} alt="" className="size-5" />
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-[13px] font-semibold text-ink">{desafio.pesquisadores}</span>
            <span className="text-[12px] text-muted">{desafio.coordenacao}</span>
            <span className="flex items-center gap-1 text-[12px] text-muted">
              <img src={iconePin} alt="" className="size-3" />
              {desafio.municipios}
            </span>
          </span>
        </div>
        <LinkSeta href={`/nucleos/${nucleo.slug}/desafios/${desafio.numero}`} seta={setaLink}>
          Ver equipe e andamento
        </LinkSeta>
      </div>
    </article>
  )
}

function SecaoDesafios({ nucleo }: { nucleo: Nucleo }) {
  const [pagina, setPagina] = useState(1)
  const desafios = nucleo.detalhe?.desafios ?? []
  const totalPaginas = Math.max(1, Math.ceil(desafios.length / POR_PAGINA))
  const inicio = (pagina - 1) * POR_PAGINA
  const visiveis = desafios.slice(inicio, inicio + POR_PAGINA)
  const contar = (status: Desafio['status']) => desafios.filter((d) => d.status === status).length

  return (
    <section id="desafios" className="scroll-mt-24 pt-12 pb-16 lg:scroll-mt-52">
      <Container largo className="flex flex-col gap-6">
        <CabecalhoSecao
          eyebrow="Desafios"
          titulo="Desafios do núcleo e suas equipes"
          descricao="Cada desafio é executado por uma equipe de pesquisadores de diferentes instituições. Clique em um desafio para ver a equipe completa e o andamento."
        />
        {desafios.length === 0 ? (
          <EstadoVazio>Os desafios deste núcleo ainda não foram publicados.</EstadoVazio>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              <ChipStatus status="andamento">{contar('andamento')} em andamento</ChipStatus>
              <ChipStatus status="atraso">{contar('atraso')} com atraso</ChipStatus>
              <ChipStatus status="nao-iniciado">{contar('nao-iniciado')} não iniciados</ChipStatus>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {visiveis.map((desafio) => (
                <CardDesafio key={desafio.numero} desafio={desafio} nucleo={nucleo} marcaDagua={nucleo.detalhe!.marcaDagua} />
              ))}
            </div>
            <Paginacao
              pagina={pagina}
              totalPaginas={totalPaginas}
              aoMudar={setPagina}
              resumo={`Mostrando ${inicio + 1}–${inicio + visiveis.length} de ${desafios.length} desafios`}
            />
          </>
        )}
      </Container>
    </section>
  )
}

type Ordem = 'recentes' | 'antigos'

function MenuOrdenar({ ordem, aoMudar }: { ordem: Ordem; aoMudar: (o: Ordem) => void }) {
  const [aberto, setAberto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!aberto) return
    const fechar = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setAberto(false)
    document.addEventListener('pointerdown', fechar)
    return () => document.removeEventListener('pointerdown', fechar)
  }, [aberto])

  const opcoes: [Ordem, string][] = [
    ['recentes', 'Mais recentes'],
    ['antigos', 'Mais antigos'],
  ]
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={aberto}
        onClick={() => setAberto((a) => !a)}
        className="flex items-center gap-2 rounded-lg border border-border bg-background py-[7px] pr-2.5 pl-3 text-[13px] font-medium text-green-900"
      >
        <img src={iconeOrdenar} alt="" className="size-3.5" />
        {opcoes.find(([valor]) => valor === ordem)![1]}
        <img src={chevronBaixo} alt="" className={`size-3.5 transition-transform ${aberto ? 'rotate-180' : ''}`} />
      </button>
      {aberto && (
        <ul role="listbox" className="absolute right-0 z-10 mt-1 w-44 overflow-hidden rounded-lg border border-border bg-background py-1 shadow-card-sm">
          {opcoes.map(([valor, label]) => (
            <li key={valor}>
              <button
                type="button"
                role="option"
                aria-selected={valor === ordem}
                onClick={() => {
                  aoMudar(valor)
                  setAberto(false)
                }}
                className={`w-full px-3 py-2 text-left text-[13px] hover:bg-green-50 ${valor === ordem ? 'font-semibold text-green-800' : 'text-ink'}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function FiltroChip({ ativo, rotulo, total, aoClicar }: { ativo: boolean; rotulo: string; total: number; aoClicar: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={ativo}
      onClick={aoClicar}
      className={`flex items-center gap-1.5 rounded-full border py-1.5 pr-2 pl-3 text-[13px] font-medium ${
        ativo ? 'border-green-800 bg-green-800 text-white' : 'border-border bg-background text-green-900 hover:bg-green-50'
      }`}
    >
      {rotulo}
      <span className={`rounded-full px-[7px] py-px text-[11px] font-semibold ${ativo ? 'bg-white/16 text-white' : 'bg-green-50 text-green-700'}`}>
        {total}
      </span>
    </button>
  )
}

function ItemRelatorio({ relatorio }: { relatorio: Relatorio }) {
  const anual = relatorio.tipo === 'anual'
  return (
    <li>
      <Link
        to={anual ? '/relatorios/anual-2025' : '/relatorios'}
        className="group flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-border px-1 py-4 hover:bg-green-50/60"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <img src={iconeGrafico} alt="" className="size-[22px]" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-[15px] font-semibold text-ink">{relatorio.titulo}</span>
          <span className="text-[12px] text-muted">
            Publicado em {formatarData(relatorio.data)} · {relatorio.paginas} p. · {relatorio.tamanho}
          </span>
        </span>
        <span className="w-[130px] shrink-0">
          <span className="rounded-full bg-[#eef5f0] px-2.5 py-1 text-[12px] font-semibold text-green-700">
            {anual ? 'Relatório anual' : 'Relatório parcial'}
          </span>
        </span>
        <span className="flex w-[170px] shrink-0 items-center justify-end gap-1.5 text-[13px] font-semibold whitespace-nowrap text-green-700 underline group-hover:text-green-900">
          {anual ? 'Ver resumo e andamento' : 'Ver relatório'}
          <img src={setaLink} alt="" className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </li>
  )
}

function ColunaRelatorios({ relatorios }: { relatorios: Relatorio[] }) {
  const [tipo, setTipo] = useState<'todos' | Relatorio['tipo']>('todos')
  const [ordem, setOrdem] = useState<Ordem>('recentes')
  const [pagina, setPagina] = useState(1)

  const filtrados = useMemo(
    () =>
      relatorios
        .filter((r) => tipo === 'todos' || r.tipo === tipo)
        .sort((a, b) => (ordem === 'recentes' ? b.data.localeCompare(a.data) : a.data.localeCompare(b.data))),
    [relatorios, tipo, ordem],
  )
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA))
  const inicio = (pagina - 1) * POR_PAGINA
  const visiveis = filtrados.slice(inicio, inicio + POR_PAGINA)
  const filtrar = (t: typeof tipo) => {
    setTipo(t)
    setPagina(1)
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[18px] font-bold text-green-900">Relatórios do núcleo</h3>
        <MenuOrdenar ordem={ordem} aoMudar={setOrdem} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[13px] font-medium text-muted">Tipo:</span>
        <FiltroChip ativo={tipo === 'todos'} rotulo="Todos" total={relatorios.length} aoClicar={() => filtrar('todos')} />
        <FiltroChip
          ativo={tipo === 'anual'}
          rotulo="Anual"
          total={relatorios.filter((r) => r.tipo === 'anual').length}
          aoClicar={() => filtrar('anual')}
        />
        <FiltroChip
          ativo={tipo === 'parcial'}
          rotulo="Parcial"
          total={relatorios.filter((r) => r.tipo === 'parcial').length}
          aoClicar={() => filtrar('parcial')}
        />
      </div>
      <ul className="border-t border-border">
        {visiveis.map((r) => (
          <ItemRelatorio key={r.titulo} relatorio={r} />
        ))}
      </ul>
      <Paginacao
        pagina={pagina}
        totalPaginas={totalPaginas}
        aoMudar={setPagina}
        resumo={`Mostrando ${filtrados.length ? inicio + 1 : 0}–${inicio + visiveis.length} de ${filtrados.length} relatórios`}
      />
    </div>
  )
}

function SecaoChamadas({ detalhe }: { detalhe?: DetalheNucleo }) {
  return (
    <section id="chamadas" className="scroll-mt-24 border-y border-border bg-background py-16 lg:scroll-mt-52">
      <Container largo className="flex flex-col gap-12 lg:flex-row lg:gap-[72px]">
        <div className="flex flex-col gap-7 lg:w-[420px] lg:shrink-0">
          <CabecalhoSecao
            eyebrow="Chamadas e relatórios"
            titulo="Chamadas e relatórios"
            descricao="As chamadas abertas do núcleo e os relatórios de acompanhamento. As duas chamadas passam por aprovação do conselho."
          />
          {detalhe && (
            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.66px] text-green-700">
                <img src={iconeFixado} alt="" className="size-3.5" />
                CHAMADAS ABERTAS
              </p>
              {detalhe.chamadas.map((chamada) => (
                <article key={chamada.titulo} className="flex flex-col gap-2.5 rounded-2xl border border-yellow-100 bg-yellow-50 p-[18px]">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-yellow-50">
                      <img src={iconeArquivo} alt="" className="size-[22px]" />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[15px] font-semibold text-green-900">{chamada.titulo}</span>
                      <span className="flex items-center gap-1.5 text-[12px] font-medium text-green-700">
                        <img src={pontoVerdeClaro} alt="" className="size-1.5" />
                        Aberta · aprovação pelo conselho
                      </span>
                    </span>
                  </div>
                  <p className="text-[13px] leading-[1.45] text-muted">{chamada.descricao}</p>
                  <LinkSeta href="/inscricoes" seta={setaLink}>
                    Ver chamada
                  </LinkSeta>
                </article>
              ))}
            </div>
          )}
        </div>
        {detalhe ? (
          <ColunaRelatorios relatorios={detalhe.relatorios} />
        ) : (
          <EstadoVazio>As chamadas e os relatórios deste núcleo ainda não foram publicados.</EstadoVazio>
        )}
      </Container>
    </section>
  )
}

const ROTULOS_MAPA: [string, number, number][] = [
  ['Parnaíba', 450, 14],
  ['Cocal', 480, 59],
  ['Piripiri', 456, 145],
  ['José de Freitas', 363, 177],
  ['Floriano', 326, 392],
  ['Oeiras', 411, 389],
  ['Picos', 484, 396],
  ['Uruçuí', 197, 464],
  ['Paulistana', 497, 499],
  ['São João do Piauí', 382, 517],
  ['Bom Jesus', 188, 602],
  ['Corrente', 138, 708],
]

const LEGENDA = [
  ['bg-[#e4ebe6]', 'Sem pesquisadores'],
  ['bg-green-200', '1–5'],
  ['bg-green-400', '6–10'],
  ['bg-green-600', '11–20'],
  ['bg-green-800', '21–50'],
  ['bg-green-900', '51 ou mais'],
]

type RankingProps = { itens: ItemRanking[]; maior: number; nomeLargura: string; cor: 'verde' | 'azul' }

/** Barras proporcionais ao maior valor da lista completa (não só da coluna). */
function Ranking({ itens, maior, nomeLargura, cor }: RankingProps) {
  return (
    <ul className="flex flex-col gap-2.5">
      {itens.map((item) => (
        <li key={item.nome} className="flex items-center gap-3">
          <span className={`shrink-0 text-[13px] text-ink ${nomeLargura}`}>{item.nome}</span>
          <span className={`h-2 min-w-0 flex-1 overflow-hidden rounded ${cor === 'verde' ? 'bg-green-50' : 'bg-blue-50'}`}>
            <span
              className={`block h-2 min-w-[5px] rounded ${cor === 'verde' ? 'bg-green-600' : 'bg-blue-500'}`}
              style={{ width: `${(item.total / maior) * 100}%` }}
            />
          </span>
          <span className="w-[72px] shrink-0 text-right text-[12px] font-semibold text-green-900">
            {item.total} · {item.percentual}%
          </span>
        </li>
      ))}
    </ul>
  )
}

function SecaoOndeEstao({ nucleo }: { nucleo: Nucleo }) {
  const detalhe = nucleo.detalhe
  const metade = detalhe ? Math.ceil(detalhe.municipiosRanking.length / 2) : 0
  const maiorMunicipio = detalhe ? Math.max(...detalhe.municipiosRanking.map((i) => i.total)) : 0
  return (
    <section id="onde-estao" className="scroll-mt-24 py-16 lg:scroll-mt-52">
      <Container largo className="flex flex-col gap-6">
        <CabecalhoSecao
          eyebrow="Onde estão"
          titulo="Onde estão os pesquisadores do núcleo"
          descricao={`Os ${nucleo.municipios} municípios do Piauí onde há pesquisadores participando deste núcleo, pela sede da instituição. Passe o cursor no mapa para ver o total de cada município.`}
        />
        {!detalhe ? (
          <EstadoVazio>A distribuição dos pesquisadores deste núcleo ainda não foi publicada.</EstadoVazio>
        ) : (
          <div className="flex flex-col gap-10 xl:flex-row">
            <div className="flex w-full max-w-[600px] shrink-0 flex-col gap-4">
              <div className="relative aspect-[600/763] w-full">
                <MapaInterativo
                  svg={detalhe.mapa}
                  rotulo={`Mapa do Piauí com os pesquisadores do núcleo ${nucleo.nome} por município`}
                  className="absolute top-0 right-0 w-[86.67%]"
                />
                {ROTULOS_MAPA.map(([nome, x, y]) => (
                  <span
                    key={nome}
                    aria-hidden
                    className="pointer-events-none absolute hidden text-[10px] font-semibold whitespace-nowrap text-ink sm:block"
                    style={{ left: `${(x / 600) * 100}%`, top: `${(y / 763) * 100}%` }}
                  >
                    {nome}
                  </span>
                ))}
              </div>
              <ul className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
                <li className="text-[12px] font-semibold text-ink">Pesquisadores por município</li>
                {LEGENDA.map(([cor, faixa]) => (
                  <li key={faixa} className="flex items-center gap-1.5 text-[12px] text-muted">
                    <span className={`size-3.5 rounded-[3px] ${cor}`} />
                    {faixa}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <p className="flex flex-col gap-0.5 rounded-2xl bg-green-800 px-5 py-4">
                <span className="font-display text-[28px] font-extrabold text-yellow-500">{nucleo.municipios}</span>
                <span className="text-[12px] text-green-100">municípios com pesquisadores do núcleo</span>
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-[16px] font-bold text-green-900">Municípios do núcleo</h3>
                  <span className="text-[12px] text-muted">{detalhe.municipiosRanking.length} municípios</span>
                </div>
                <div className="grid gap-x-6 gap-y-2.5 md:grid-cols-2">
                  <Ranking itens={detalhe.municipiosRanking.slice(0, metade)} maior={maiorMunicipio} nomeLargura="w-[130px]" cor="verde" />
                  <Ranking itens={detalhe.municipiosRanking.slice(metade)} maior={maiorMunicipio} nomeLargura="w-[130px]" cor="verde" />
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-[16px] font-bold text-green-900">Instituições de vínculo</h3>
                  <span className="text-[12px] text-muted">{detalhe.instituicoesRanking.length} instituições</span>
                </div>
                <Ranking
                  itens={detalhe.instituicoesRanking}
                  maior={Math.max(...detalhe.instituicoesRanking.map((i) => i.total))}
                  nomeLargura="w-[140px]"
                  cor="azul"
                />
              </div>
              <p className="rounded-xl bg-yellow-50 px-3.5 py-2.5 text-[12px] text-ink">
                Fora do mapa: {detalhe.foraDoMapa} pesquisadores sem município identificado
              </p>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}

export function OutrosNucleos({ atual }: { atual: string }) {
  return (
    <section className="border-t border-border bg-background pt-12 pb-14">
      <Container largo className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-[22px] font-bold text-green-900">Conheça os outros núcleos</h2>
          <LinkSeta href="/nucleos" seta={setaLink}>
            Ver todos os núcleos
          </LinkSeta>
        </div>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {NUCLEOS.filter((n) => n.slug !== atual).map((nucleo) => (
            <li key={nucleo.slug}>
              <Link
                to={`/nucleos/${nucleo.slug}`}
                className="group flex h-[158px] flex-col justify-between rounded-2xl border border-border bg-background p-4 transition-colors hover:border-green-200 hover:bg-green-50"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-green-800">
                  <img src={nucleo.icone} alt="" className="size-[31px]" />
                </span>
                <span className="text-[14px] leading-[1.3] font-semibold text-ink">{nucleo.nome}</span>
                <span className="flex items-center justify-between text-[12px] text-muted">
                  {nucleo.pesquisadores} pesquisadores
                  <img src={setaDireita} alt="" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default function NucleoDetalhe() {
  const { slug } = useParams()
  const nucleo = buscarNucleo(slug)
  if (!nucleo) return <Navigate to="/nucleos" replace />

  return (
    <>
      <FaixaMarca />
      <TopoNucleos trilha={[{ label: 'Núcleos', href: '/nucleos' }, { label: nucleo.nome }]} />
      <SeletorNucleos
        ativo={nucleo.slug}
        rotulo="escolha outro núcleo abaixo ou volte para a visão geral"
        voltarPara={{ href: '/nucleos', label: 'Ver todos os núcleos' }}
      />
      {/* key: reinicia filtros e paginação ao trocar de núcleo */}
      <div key={nucleo.slug}>
        <CardNucleo nucleo={nucleo} />
        <Abas abas={ABAS} rotulo="Seções do núcleo" />
        <SecaoDesafios nucleo={nucleo} />
        <SecaoChamadas detalhe={nucleo.detalhe} />
        <SecaoOndeEstao nucleo={nucleo} />
        <OutrosNucleos atual={nucleo.slug} />
      </div>
    </>
  )
}
