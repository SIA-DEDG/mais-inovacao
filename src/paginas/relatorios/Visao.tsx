import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import iconeBusca from '../../assets/comum/icone-busca-cinza.svg'
import chevronFiltros from '../../assets/relatorios/chevron-filtros.svg'
import iconeBaixarCinza from '../../assets/relatorios/icone-baixar-cinza.svg'
import iconeBaixarPdf from '../../assets/relatorios/icone-baixar-pdf.svg'
import iconeFiltros from '../../assets/relatorios/icone-filtros.svg'
import iconePrevisto from '../../assets/relatorios/icone-previsto.svg'
import iconeRelatorio from '../../assets/relatorios/icone-relatorio-branco.svg'
import iconeSino from '../../assets/relatorios/icone-sino.svg'
import kpiDesafios from '../../assets/relatorios/kpi-desafios.svg'
import kpiMetas from '../../assets/relatorios/kpi-metas.svg'
import kpiProximo from '../../assets/relatorios/kpi-proximo.svg'
import kpiRelatorios from '../../assets/relatorios/kpi-relatorios.svg'
import setaBranca from '../../assets/relatorios/seta-branca.svg'
import setaVerde from '../../assets/relatorios/seta-verde.svg'
import { FaixaMarca } from '../../components/FaixaMarca'
import { CaixaMarcacao } from '../../components/formulario'
import { EstadoVazio, IndicadorTopo, TopoPagina } from '../../components/pagina'
import { Container } from '../../components/ui'
import { NUCLEOS } from '../../dados/nucleos'
import { BIBLIOTECA, RELATORIO_PREVISTO, type ItemBiblioteca, type TipoRelatorio } from '../../dados/relatorios'

type Filtros = { ano: 'todos' | number; tipo: 'todos' | TipoRelatorio; nucleos: string[] }
const SEM_FILTRO: Filtros = { ano: 'todos', tipo: 'todos', nucleos: [] }

const TIPOS: ['todos' | TipoRelatorio, string][] = [
  ['todos', 'Todos'],
  ['anual', 'Anual consolidado'],
  ['nucleo', 'Por núcleo'],
  ['parcial', 'Parcial'],
]

const NUCLEOS_ALFABETICO = [...NUCLEOS].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))

function OpcaoPilula({ ativo, onClick, children }: { ativo: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={ativo}
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium ${
        ativo ? 'bg-green-800 text-white' : 'border border-border bg-background text-ink hover:bg-green-50'
      }`}
    >
      {children}
    </button>
  )
}

/** Painel "Filtrar relatórios": as escolhas só valem depois de "Aplicar filtros". */
function PainelFiltros({ aplicados, aoAplicar, aoFechar }: { aplicados: Filtros; aoAplicar: (f: Filtros) => void; aoFechar: () => void }) {
  const [rascunho, setRascunho] = useState(aplicados)
  const grupo = 'text-[11px] font-bold tracking-[0.66px] text-muted'
  return (
    <div
      role="dialog"
      aria-label="Filtrar relatórios"
      className="absolute top-[calc(100%+8px)] right-0 z-30 flex w-[min(360px,calc(100vw-32px))] flex-col gap-[18px] rounded-2xl border border-border bg-background p-5 shadow-[0_12px_32px_rgb(5_38_20/0.14)]"
    >
      <p className="font-display text-[16px] font-bold text-green-900">Filtrar relatórios</p>
      <div className="flex flex-col gap-2">
        <p className={grupo}>ANO</p>
        <div className="flex flex-wrap gap-2">
          {(['todos', 2026, 2025] as const).map((ano) => (
            <OpcaoPilula key={ano} ativo={rascunho.ano === ano} onClick={() => setRascunho({ ...rascunho, ano })}>
              {ano === 'todos' ? 'Todos' : String(ano)}
            </OpcaoPilula>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className={grupo}>TIPO</p>
        <div className="flex flex-wrap gap-2">
          {TIPOS.map(([tipo, rotulo]) => (
            <OpcaoPilula key={tipo} ativo={rascunho.tipo === tipo} onClick={() => setRascunho({ ...rascunho, tipo })}>
              {rotulo}
            </OpcaoPilula>
          ))}
        </div>
      </div>
      <fieldset className="flex flex-col gap-2">
        <legend className={`${grupo} mb-2`}>NÚCLEO</legend>
        {NUCLEOS_ALFABETICO.map((n) => (
          <label key={n.slug} className="flex cursor-pointer items-center gap-2.5 py-1 text-[13px] text-ink">
            <CaixaMarcacao
              checked={rascunho.nucleos.includes(n.slug)}
              onChange={(e) =>
                setRascunho({
                  ...rascunho,
                  nucleos: e.target.checked ? [...rascunho.nucleos, n.slug] : rascunho.nucleos.filter((s) => s !== n.slug),
                })
              }
            />
            {n.nome}
          </label>
        ))}
      </fieldset>
      <div className="flex gap-2.5 border-t border-border pt-3.5">
        <button
          type="button"
          onClick={() => setRascunho(SEM_FILTRO)}
          className="flex-1 rounded-full border border-border px-[18px] py-2.5 text-[13px] font-semibold text-ink hover:bg-surface"
        >
          Limpar filtros
        </button>
        <button
          type="button"
          onClick={() => {
            aoAplicar(rascunho)
            aoFechar()
          }}
          className="flex-1 rounded-full bg-green-800 px-[18px] py-2.5 text-[13px] font-semibold text-white hover:bg-green-700"
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  )
}

function Capa({ item }: { item: ItemBiblioteca }) {
  const nucleo = NUCLEOS.find((n) => n.slug === item.nucleo)
  return (
    <span className="relative h-[86px] w-16 shrink-0 overflow-hidden rounded-md bg-[linear-gradient(134.8deg,#04331c_0%,#155e33_71.43%)]">
      <span aria-hidden className="absolute inset-x-0 top-0 flex h-1">
        <span className="flex-1 bg-green-600" />
        <span className="flex-1 bg-yellow-500" />
        <span className="flex-1 bg-blue-500" />
        <span className="flex-1 bg-red-500" />
      </span>
      {nucleo ? (
        <img src={nucleo.icone} alt="" className="absolute top-[18px] left-[15px] size-[34px]" />
      ) : (
        <span className="absolute top-7 left-2 font-display text-[16px] font-extrabold text-white">{item.ano}</span>
      )}
      <span className="absolute top-[70px] left-2 text-[8px] font-bold text-gold-300">{nucleo ? item.ano : 'ANUAL'}</span>
    </span>
  )
}

function CartaoRelatorio({ item }: { item: ItemBiblioteca }) {
  return (
    <li className="relative flex gap-3.5 rounded-2xl border border-border bg-background p-3.5 transition-colors hover:border-green-200">
      <Capa item={item} />
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <Link to={item.href} className="text-[13px] leading-[1.35] font-semibold text-ink after:absolute after:inset-0">
          {item.titulo}
        </Link>
        <p className="text-[11px] text-muted">{item.detalhe}</p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[12px] font-semibold text-green-700 underline">
            Ver resumo e andamento
            <img src={setaVerde} alt="" className="size-[13px]" />
          </span>
          {/* Fica acima do link do cartão; o PDF ainda não existe no protótipo. */}
          <button
            type="button"
            aria-label={`Baixar PDF — ${item.titulo}`}
            className="relative z-10 flex size-7 items-center justify-center rounded-lg border border-border hover:bg-surface"
          >
            <img src={iconeBaixarPdf} alt="" className="size-3.5" />
          </button>
        </div>
      </div>
    </li>
  )
}

export default function RelatoriosVisao() {
  const [filtros, setFiltros] = useState<Filtros>(SEM_FILTRO)
  const [busca, setBusca] = useState('')
  const [painelAberto, setPainelAberto] = useState(false)
  const [aviso, setAviso] = useState(false)
  const refFiltros = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!painelAberto) return
    const fechar = (e: PointerEvent) => !refFiltros.current?.contains(e.target as Node) && setPainelAberto(false)
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setPainelAberto(false)
    document.addEventListener('pointerdown', fechar)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', fechar)
      document.removeEventListener('keydown', esc)
    }
  }, [painelAberto])

  const visiveis = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase('pt-BR')
    return BIBLIOTECA.filter(
      (r) =>
        (filtros.ano === 'todos' || r.ano === filtros.ano) &&
        (filtros.tipo === 'todos' || r.tipo === filtros.tipo) &&
        (filtros.nucleos.length === 0 || (r.nucleo && filtros.nucleos.includes(r.nucleo))) &&
        (!termo || r.titulo.toLocaleLowerCase('pt-BR').includes(termo)),
    )
  }, [filtros, busca])

  const ativos = (filtros.ano !== 'todos' ? 1 : 0) + (filtros.tipo !== 'todos' ? 1 : 0) + filtros.nucleos.length
  // O anual 2026 ainda não existe: só aparece quando nenhum filtro o exclui.
  const mostrarPrevisto = (filtros.ano === 'todos' || filtros.ano === 2026) && ['todos', 'anual'].includes(filtros.tipo) && filtros.nucleos.length === 0 && !busca
  const de2026 = visiveis.filter((r) => r.ano === 2026)
  const de2025 = visiveis.filter((r) => r.ano === 2025)

  return (
    <>
      <FaixaMarca />
      <TopoPagina
        trilha={[{ label: 'Relatórios' }]}
        titulo="Relatórios"
        descricao="Relatórios anuais sobre o andamento e os resultados dos desafios de cada núcleo: metas, entregas, recursos executados e próximos passos."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <IndicadorTopo icone={kpiRelatorios} valor="9" unidade="relatórios" legenda="publicados desde 2025" />
          <IndicadorTopo icone={kpiDesafios} valor="21" unidade="desafios" legenda="acompanhados no 1º ciclo" />
          <IndicadorTopo icone={kpiMetas} valor="74%" unidade="das metas" legenda="cumpridas em 2025" />
          <IndicadorTopo icone={kpiProximo} valor="mar/2027" unidade="próximo" legenda="Relatório Anual 2026" />
        </div>
      </TopoPagina>

      <section className="pt-10 pb-14">
        <Container largo className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-[560px] flex-col gap-1.5">
              <h2 className="font-display text-[26px] font-bold text-green-900">Todos os relatórios</h2>
              <p className="text-[14px] text-muted">
                Relatório anual consolidado e um relatório por núcleo, publicados todo mês de março. Clique em um relatório para ver o
                resumo do ano e o andamento dos desafios.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <label className="flex h-10 w-full items-center gap-2 rounded-full border border-border bg-background px-3.5 focus-within:border-green-700 sm:w-[360px]">
                <img src={iconeBusca} alt="" className="size-[15px]" />
                <input
                  type="search"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar relatório"
                  aria-label="Buscar relatório"
                  className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-[#8a9a90]"
                />
              </label>
              <div ref={refFiltros} className="relative">
                <button
                  type="button"
                  aria-expanded={painelAberto}
                  onClick={() => setPainelAberto((a) => !a)}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-2.5 text-[13px] text-ink ${
                    painelAberto || ativos ? 'border-[1.5px] border-green-800 bg-green-50' : 'border border-border bg-background'
                  }`}
                >
                  <img src={iconeFiltros} alt="" className="size-4" />
                  Filtros
                  {ativos > 0 && <span className="rounded-full bg-green-800 px-1.5 text-[11px] font-semibold text-white">{ativos}</span>}
                  <img src={chevronFiltros} alt="" className={`size-3.5 transition-transform ${painelAberto ? '' : 'rotate-180'}`} />
                </button>
                {painelAberto && <PainelFiltros aplicados={filtros} aoAplicar={setFiltros} aoFechar={() => setPainelAberto(false)} />}
              </div>
            </div>
          </div>

          {(mostrarPrevisto || de2026.length > 0) && (
            <div className="flex flex-col gap-3.5">
              <p className="flex items-center gap-3">
                <span className="font-display text-[22px] font-extrabold text-green-900">2026</span>
                <span className="text-[12px] font-medium text-gold-600">em andamento</span>
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                {mostrarPrevisto && (
                  <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-dashed border-gold-300 bg-yellow-50 p-[18px]">
                    <span className="rounded-[10px] border border-gold-300 bg-background p-3">
                      <img src={iconePrevisto} alt="" className="size-[22px]" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                      <span className="font-display text-[16px] font-bold text-green-900">{RELATORIO_PREVISTO.titulo}</span>
                      <span className="text-[12px] text-muted">{RELATORIO_PREVISTO.detalhe}</span>
                    </span>
                    <button
                      type="button"
                      aria-pressed={aviso}
                      onClick={() => setAviso((a) => !a)}
                      className={`flex items-center gap-1.5 rounded-full border border-green-700 px-3 py-2 text-[12px] font-semibold ${
                        aviso ? 'bg-green-700 text-white' : 'text-green-700 hover:bg-green-50'
                      }`}
                    >
                      <img src={iconeSino} alt="" className={`size-[13px] ${aviso ? 'brightness-0 invert' : ''}`} />
                      {aviso ? 'Aviso ativado' : 'Avise-me'}
                    </button>
                  </div>
                )}
                {de2026.map((r) => (
                  <div key={r.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-background p-[18px]">
                    <span className="rounded-[10px] bg-green-800 p-3">
                      <img src={iconeRelatorio} alt="" className="size-[22px]" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                      <span className="font-display text-[16px] font-bold text-green-900">{r.titulo}</span>
                      <span className="text-[12px] text-muted">{r.detalhe}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Link
                        to={r.href}
                        className="flex items-center gap-1.5 rounded-full bg-green-700 px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-green-800"
                      >
                        Ver resumo e andamento
                        <img src={setaBranca} alt="" className="size-[13px]" />
                      </Link>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-[12px] font-semibold text-muted hover:bg-surface"
                      >
                        <img src={iconeBaixarCinza} alt="" className="size-[13px]" />
                        Baixar
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {de2025.length > 0 && (
            <div className="flex flex-col gap-3.5">
              <p className="flex flex-wrap items-center gap-3">
                <span className="font-display text-[22px] font-extrabold text-green-900">2025</span>
                <span className="text-[12px] text-muted">
                  {de2025.length} {de2025.length === 1 ? 'relatório' : 'relatórios'} · publicados em 15/03/2026
                </span>
              </p>
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {de2025.map((r) => (
                  <CartaoRelatorio key={r.id} item={r} />
                ))}
              </ul>
            </div>
          )}

          {!mostrarPrevisto && visiveis.length === 0 && (
            <EstadoVazio>Nenhum relatório encontrado com esses filtros. Ajuste a busca ou limpe os filtros.</EstadoVazio>
          )}
        </Container>
      </section>
    </>
  )
}
