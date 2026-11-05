import { useId, useState, type ReactNode } from 'react'
import pontoDourado from '../../assets/comum/ponto-dourado.svg'
import pontoVerde from '../../assets/comum/ponto-verde.svg'
import chevronCima from '../../assets/comum/chevron-cima-verde.svg'
import chevronSelect from '../../assets/pesquisadores-pagina/chevron-select.svg'
import iconeBusca from '../../assets/pesquisadores-pagina/icone-busca.svg'
import iconePin from '../../assets/pesquisadores-pagina/icone-pin-tooltip.svg'
import kpiInstituicoes from '../../assets/pesquisadores-pagina/kpi-instituicoes.svg'
import kpiNucleos from '../../assets/pesquisadores-pagina/kpi-nucleos.svg'
import kpiNucleos2 from '../../assets/pesquisadores-pagina/kpi-nucleos2.svg'
import kpiPesquisadores from '../../assets/pesquisadores-pagina/kpi-pesquisadores.svg'
import { FaixaMarca } from '../../components/FaixaMarca'
import { LegendaMapa, MapaPiaui, corFaixa, type MunicipioMapa } from '../../components/MapaInterativo'
import { IndicadorTopo, TopoPagina } from '../../components/pagina'
import { Container, Eyebrow } from '../../components/ui'
import { NUCLEOS, buscarNucleo } from '../../dados/nucleos'
import {
  ATUACAO_NUCLEOS,
  COM_NUCLEO_INDICADO,
  FORA_DO_MAPA,
  MAPA_MUNICIPIOS,
  MUNICIPIOS,
  PERFIL,
  QUANTIDADE_NUCLEOS,
  TOTAL_MUNICIPIOS_PIAUI,
  TOTAL_PESQUISADORES,
  percentual,
  type GrupoPerfil,
  type MunicipioPesquisadores,
  type NivelAtuacao,
} from '../../dados/pesquisadores'

type Filtros = Record<'nucleo' | 'nivel' | 'municipio' | GrupoPerfil['id'], string>
type Grupo = keyof Filtros
const SEM_FILTROS: Filtros = {
  nucleo: '',
  nivel: '',
  instituicao: '',
  municipio: '',
  grandeArea: '',
  formacao: '',
  cargo: '',
  infraestrutura: '',
}
/** Onde a busca procura, como diz o placeholder. */
const GRUPOS_BUSCA: Grupo[] = ['municipio', 'instituicao', 'formacao', 'cargo']
const MUNICIPIO_PADRAO = 'Teresina'
const TOP_MUNICIPIOS = 10

/**
 * Os dados são agregados, então os filtros não recalculam os totais: destacam as linhas
 * correspondentes em cada gráfico e esmaecem as demais. null = grupo sem filtro.
 */
type Realce = (grupo: Grupo, nome: string) => boolean | null
const estiloRealce = (realce: boolean | null) =>
  realce === null ? '' : realce ? 'bg-yellow-50 ring-1 ring-gold-300' : 'opacity-35'

const normalizar = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

const NIVEIS: { id: NivelAtuacao; rotulo: string; cor: string; texto: string }[] = [
  { id: 'alto', rotulo: 'Alto', cor: 'bg-green-800', texto: 'text-white' },
  { id: 'medio', rotulo: 'Médio', cor: 'bg-green-400', texto: 'text-green-900' },
  { id: 'baixo', rotulo: 'Baixo', cor: 'bg-green-200', texto: 'text-green-900' },
  { id: 'naoInformado', rotulo: 'Não informado', cor: 'bg-[#dde3df]', texto: 'text-green-900' },
]

const nomeNucleo = (slug: string) => buscarNucleo(slug)?.nome ?? slug
const grupoPerfil = (id: GrupoPerfil['id']) => PERFIL.find((g) => g.id === id)!
const comMaisDeUmNucleo = QUANTIDADE_NUCLEOS.slice(1).reduce((soma, n) => soma + n, 0)
const pluralPesquisadores = (n: number) => `${n} ${n === 1 ? 'pesquisador' : 'pesquisadores'}`

function Cartao({ className = '', children }: { className?: string; children: ReactNode }) {
  return <section className={`rounded-[20px] border border-border bg-background p-5 sm:p-8 ${className}`}>{children}</section>
}

function CabecalhoCartao({ eyebrow, titulo, descricao }: { eyebrow: ReactNode; titulo: string; descricao: string }) {
  return (
    <header className="flex flex-col items-start gap-2.5">
      {eyebrow}
      <h2 className="font-display text-[22px] font-bold text-green-900 sm:text-[24px]">{titulo}</h2>
      <p className="text-[14px] leading-[1.5] text-muted">{descricao}</p>
    </header>
  )
}

type SelecaoFiltroProps = { rotulo: string; valor: string; todos: string; opcoes: [valor: string, rotulo: string][]; aoMudar: (v: string) => void }

function SelecaoFiltro({ rotulo, valor, todos, opcoes, aoMudar }: SelecaoFiltroProps) {
  const id = useId()
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-semibold tracking-[0.44px] text-muted uppercase">
        {rotulo}
      </label>
      <div className="relative flex items-center">
        <select
          id={id}
          value={valor}
          onChange={(e) => aoMudar(e.target.value)}
          className={`w-full appearance-none truncate rounded-lg border bg-background py-2.5 pr-9 pl-3 text-[13px] text-ink outline-none focus:border-green-700 ${valor ? 'border-gold-500' : 'border-border'}`}
        >
          <option value="">{todos}</option>
          {opcoes.map(([v, r]) => (
            <option key={v} value={v}>
              {r}
            </option>
          ))}
        </select>
        <img src={chevronSelect} alt="" className="pointer-events-none absolute right-3 size-4" />
      </div>
    </div>
  )
}

type PainelFiltrosProps = {
  busca: string
  aoBuscar: (v: string) => void
  filtros: Filtros
  aoFiltrar: (grupo: Grupo, valor: string) => void
  aoLimpar: () => void
}

function PainelFiltros({ busca, aoBuscar, filtros, aoFiltrar, aoLimpar }: PainelFiltrosProps) {
  // Abertos como no Figma; no celular começam recolhidos para não empurrar o mapa para baixo.
  const [avancados, setAvancados] = useState(() => window.matchMedia('(min-width: 640px)').matches)
  const algumAtivo = Boolean(busca) || Object.values(filtros).some(Boolean)
  const opcoesPerfil = (id: GrupoPerfil['id']) => grupoPerfil(id).itens.map(({ nome }): [string, string] => [nome, nome])
  const selecao = (grupo: Grupo, rotulo: string, todos: string, opcoes: [string, string][]) => (
    <SelecaoFiltro rotulo={rotulo} valor={filtros[grupo]} todos={todos} opcoes={opcoes} aoMudar={(v) => aoFiltrar(grupo, v)} />
  )

  return (
    <section aria-label="Filtros" className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-3.5 focus-within:border-green-700">
          <img src={iconeBusca} alt="" className="size-[18px] shrink-0" />
          <input
            type="search"
            value={busca}
            onChange={(e) => aoBuscar(e.target.value)}
            placeholder="Buscar por município, instituição, área de formação ou cargo"
            aria-label="Buscar por município, instituição, área de formação ou cargo"
            className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted"
          />
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-expanded={avancados}
            aria-controls="filtros-avancados"
            onClick={() => setAvancados((a) => !a)}
            className="flex items-center gap-1.5 rounded-full border border-green-700 px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap text-green-700 transition-colors hover:bg-green-50"
          >
            {avancados ? 'Ocultar filtros avançados' : 'Mostrar filtros avançados'}
            <img src={chevronCima} alt="" className={`size-3.5 transition-transform ${avancados ? '' : 'rotate-180'}`} />
          </button>
          <button
            type="button"
            onClick={aoLimpar}
            disabled={!algumAtivo}
            className="px-1 text-[13px] font-semibold whitespace-nowrap text-ink hover:text-green-700 disabled:cursor-default disabled:text-muted/60"
          >
            Limpar tudo
          </button>
        </div>
      </div>
      {avancados && (
        <div id="filtros-avancados" className="grid gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
          {selecao('nucleo', 'Núcleo', `Todos os ${NUCLEOS.length} núcleos`, NUCLEOS.map((n) => [n.slug, n.nome]))}
          {selecao('nivel', 'Nível de atuação', 'Alto, médio e baixo', NIVEIS.slice(0, 3).map((n) => [n.id, n.rotulo]))}
          {selecao('instituicao', 'Instituição', `Todas (${grupoPerfil('instituicao').categorias})`, opcoesPerfil('instituicao'))}
          {selecao('municipio', 'Município', `Todos (${MUNICIPIOS.length})`, MUNICIPIOS.map((m) => [m.nome, m.nome]))}
          {selecao('grandeArea', 'Grande área (CNPq)', `Todas (${grupoPerfil('grandeArea').categorias})`, opcoesPerfil('grandeArea'))}
          {selecao('formacao', 'Área de formação', `Todas (${grupoPerfil('formacao').categorias})`, opcoesPerfil('formacao'))}
          {selecao('cargo', 'Cargo / função', `Todos (${grupoPerfil('cargo').categorias})`, opcoesPerfil('cargo'))}
          {selecao(
            'infraestrutura',
            'Infraestrutura utilizada',
            `Qualquer (${grupoPerfil('infraestrutura').categorias} tipos)`,
            opcoesPerfil('infraestrutura'),
          )}
        </div>
      )}
    </section>
  )
}

function RotuloCartao({ children }: { children: ReactNode }) {
  return <p className="text-[10px] font-semibold tracking-[0.4px] text-muted">{children}</p>
}

/** Cartão do município sob o cursor (ou escolhido): total, núcleos e instituições. */
function CartaoMunicipio({ municipio, realce, className = '' }: { municipio: MunicipioPesquisadores; realce: Realce; className?: string }) {
  const { nome, total, instituicoes, detalhe } = municipio
  const maiorNucleo = detalhe ? Math.max(...detalhe.nucleos.map(([, n]) => n)) : 0
  const chips = detalhe ? detalhe.instituicoes.map(([inst, n]) => `${inst} ${n}`) : instituicoes
  const visiveis = chips.slice(0, 4)
  return (
    <div
      aria-live="polite"
      className={`pointer-events-none flex flex-col gap-2.5 rounded-[14px] border border-border bg-background p-4 shadow-[0_10px_28px_rgb(5_51_28/0.18)] ${className}`}
    >
      <p className="flex items-center gap-2">
        <span className="rounded-lg bg-gold-500 p-[5px]">
          <img src={iconePin} alt="" className="size-3.5" />
        </span>
        <span className="font-display text-[15px] font-bold text-green-900">{nome}</span>
      </p>
      <p className="text-[13px] font-medium text-ink">
        {total === 0 ? 'Sem pesquisadores cadastrados' : `${pluralPesquisadores(total)} · ${percentual(total)} do banco`}
      </p>
      {detalhe && (
        <>
          <hr className="border-border" />
          <RotuloCartao>NÚCLEOS ESTRATÉGICOS</RotuloCartao>
          <ul className="flex flex-col gap-2.5">
            {detalhe.nucleos.map(([slug, n]) => (
              <li key={slug} className={`-mx-1 flex items-center gap-2 rounded px-1 ${estiloRealce(realce('nucleo', slug))}`}>
                <span className="w-[160px] shrink-0 text-[12px] text-ink">{nomeNucleo(slug)}</span>
                <span className="h-1.5 w-[60px] shrink-0 overflow-hidden rounded-[3px] bg-green-100">
                  <span className="block h-1.5 rounded-[3px] bg-green-600" style={{ width: `${(n / maiorNucleo) * 100}%` }} />
                </span>
                <span className="text-[12px] font-bold text-green-800">{n}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {visiveis.length > 0 && (
        <>
          <hr className="border-border" />
          <RotuloCartao>INSTITUIÇÕES</RotuloCartao>
          <ul className="flex flex-wrap gap-1.5">
            {visiveis.map((chip) => (
              <li key={chip} className="rounded-full bg-green-50 px-2 py-1 text-[11px] font-medium text-green-800">
                {chip}
              </li>
            ))}
            {chips.length > visiveis.length && (
              <li className="rounded-full bg-green-50 px-2 py-1 text-[11px] font-medium text-green-800">+{chips.length - visiveis.length}</li>
            )}
          </ul>
        </>
      )}
      {detalhe ? (
        <p className="text-[10px] text-muted">Um pesquisador pode atuar em mais de um núcleo.</p>
      ) : (
        total > 0 && <p className="text-[10px] text-muted">A distribuição por núcleo deste município ainda não foi publicada.</p>
      )}
    </div>
  )
}

const resumoInstituicoes = (instituicoes: string[]) =>
  instituicoes.slice(0, 3).join(' · ') + (instituicoes.length > 3 ? ` · +${instituicoes.length - 3}` : '')

type SecaoMapaProps = { realce: Realce; escolhido: string; aoEscolher: (nome: string) => void; expandir: boolean }

function SecaoMapa({ realce, escolhido, aoEscolher, expandir }: SecaoMapaProps) {
  const [sobCursor, setSobCursor] = useState<MunicipioMapa | null>(null)
  const [todos, setTodos] = useState(false)
  const nomeAtivo = sobCursor?.nome ?? (escolhido || MUNICIPIO_PADRAO)
  const ativo = MUNICIPIOS.find((m) => m.nome === nomeAtivo) ?? { nome: nomeAtivo, total: sobCursor?.total ?? 0, instituicoes: [] }
  const maior = MUNICIPIOS[0].total
  const lista = todos || expandir ? MUNICIPIOS : MUNICIPIOS.slice(0, TOP_MUNICIPIOS)

  return (
    <section className="flex flex-col gap-10 rounded-2xl border border-border bg-background p-5 shadow-[0_4px_16px_rgb(3_46_102/0.08)] sm:p-8 xl:flex-row">
      <div className="flex w-full max-w-[600px] shrink-0 flex-col gap-3.5">
        <h2 className="font-display text-[22px] font-bold text-green-900">Pesquisadores por município do Piauí</h2>
        <p className="text-[14px] leading-[1.5] text-muted">
          Cada município é colorido pelo número de pesquisadores vinculados a instituições sediadas nele. Passe o cursor para ver em quais
          núcleos estratégicos eles atuam.
        </p>
        <div className="relative">
          <MapaPiaui
            svg={MAPA_MUNICIPIOS}
            rotulo="Mapa do Piauí com o número de pesquisadores do Banco de Competências por município"
            selecionado={ativo.nome}
            aoPassar={setSobCursor}
            aoEscolher={(m) => m.total > 0 && aoEscolher(m.nome)}
          />
          <CartaoMunicipio municipio={ativo} realce={realce} className="mt-4 lg:absolute lg:top-0 lg:left-0 lg:mt-0 lg:w-[304px]" />
        </div>
        <LegendaMapa />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <div className="flex gap-3">
          <p className="flex flex-1 flex-col gap-0.5 rounded-2xl bg-green-800 px-[18px] py-4">
            <span className="font-display text-[28px] font-extrabold text-gold-300">{MUNICIPIOS.length}</span>
            <span className="text-[12px] text-green-200">municípios com pesquisadores</span>
          </p>
          <p className="flex flex-1 flex-col gap-0.5 rounded-2xl bg-green-50 px-[18px] py-4">
            <span className="font-display text-[28px] font-extrabold text-green-800">{TOTAL_MUNICIPIOS_PIAUI - MUNICIPIOS.length}</span>
            <span className="text-[12px] text-muted">municípios ainda sem pesquisadores</span>
          </p>
        </div>
        <div className="flex flex-col gap-3.5">
          <h3 className="font-display text-[17px] font-bold text-green-900">Municípios com mais pesquisadores</h3>
          <ol className="flex flex-col gap-2">
            {lista.map((m, i) => (
              <li key={m.nome}>
                <button
                  type="button"
                  aria-pressed={escolhido === m.nome}
                  onClick={() => aoEscolher(escolhido === m.nome ? '' : m.nome)}
                  className={`-mx-2 flex w-[calc(100%+16px)] flex-col gap-1.5 rounded-lg px-2 py-1 text-left transition-[opacity,background-color] hover:bg-surface ${estiloRealce(realce('municipio', m.nome))}`}
                >
                  <span className="flex w-full items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <span className="font-display text-[11px] font-bold text-gold-600">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[13px] font-medium text-ink">{m.nome}</span>
                    </span>
                    <span className="text-[13px] font-bold text-green-800">{m.total}</span>
                  </span>
                  {/* Escala de raiz quadrada, como no Figma: Teresina não achata as demais barras. */}
                  <span className="h-2 w-full overflow-hidden rounded bg-green-50">
                    <span className={`block h-2 rounded ${corFaixa(m.total)}`} style={{ width: `${Math.sqrt(m.total / maior) * 100}%` }} />
                  </span>
                  {m.instituicoes.length > 0 && <span className="text-[11px] text-muted">{resumoInstituicoes(m.instituicoes)}</span>}
                </button>
              </li>
            ))}
          </ol>
          {!expandir && (
            <button
              type="button"
              aria-expanded={todos}
              onClick={() => setTodos((t) => !t)}
              className="self-start text-[13px] font-semibold text-green-700 hover:text-green-900 hover:underline"
            >
              {todos ? `Mostrar só os ${TOP_MUNICIPIOS} primeiros` : `Ver todos os ${MUNICIPIOS.length} municípios`}
            </button>
          )}
        </div>
        <p className="rounded-xl bg-[#fbf3dc] px-3.5 py-3 text-[12px] leading-[1.5] text-[#5c4a0e]">
          Fora do mapa: {FORA_DO_MAPA} pesquisadores sem município informado
        </p>
      </div>
    </section>
  )
}

function SecaoNucleos({ realce }: { realce: Realce }) {
  const linhas = ATUACAO_NUCLEOS.map(({ slug, niveis }) => {
    const total = Object.values(niveis).reduce((soma, n) => soma + n, 0)
    return { slug, niveis, total, altoMedio: Math.round(((niveis.alto + niveis.medio) / total) * 100) }
  })
  const maior = Math.max(...linhas.map((l) => l.total))
  const maiorQuantidade = Math.max(...QUANTIDADE_NUCLEOS)

  return (
    <Cartao className="flex flex-col gap-6">
      <CabecalhoCartao
        eyebrow={
          <Eyebrow ponto={pontoVerde} pequeno className="bg-green-100 text-green-700">
            Núcleos estratégicos
          </Eyebrow>
        }
        titulo="Em quais núcleos os pesquisadores atuam"
        descricao={`Cada pesquisador indicou os núcleos em que atua e o seu nível de atuação em cada um (alto, médio ou baixo). Como um pesquisador pode estar em vários núcleos, a soma passa de ${TOTAL_PESQUISADORES}.`}
      />
      <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-[18px]">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {NIVEIS.map((n) => (
              <li key={n.id} className="flex items-center gap-1.5 text-[12px] text-muted">
                <span className={`size-3 rounded-[3px] ${n.cor}`} />
                {n.rotulo}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-[18px]">
            {linhas.map((linha) => (
              <li
                key={linha.slug}
                className={`-mx-2 flex flex-col gap-2 rounded-lg px-2 py-1 transition-opacity sm:flex-row sm:items-center sm:gap-4 ${estiloRealce(realce('nucleo', linha.slug))}`}
              >
                <p className="flex flex-col gap-0.5 sm:w-[230px] sm:shrink-0">
                  <span className="text-[14px] font-semibold text-ink">{nomeNucleo(linha.slug)}</span>
                  <span className="text-[12px] text-muted">{pluralPesquisadores(linha.total)}</span>
                </p>
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <div
                      role="img"
                      aria-label={NIVEIS.map((n) => `${n.rotulo}: ${linha.niveis[n.id]}`).join(', ')}
                      className="flex h-[26px] gap-0.5 overflow-hidden rounded-md"
                      style={{ width: `${(linha.total / maior) * 100}%` }}
                    >
                      {NIVEIS.map((n) => {
                        const valor = linha.niveis[n.id]
                        const apagado = filtrosNivelApagam(realce, n.id)
                        return (
                          <span
                            key={n.id}
                            title={`${n.rotulo}: ${valor}`}
                            className={`flex min-w-0 basis-0 items-center justify-center overflow-hidden text-[11px] font-semibold transition-opacity ${n.cor} ${n.texto} ${apagado ? 'opacity-35' : ''}`}
                            style={{ flexGrow: valor }}
                          >
                            {valor / linha.total >= 0.08 && valor}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  <p className="flex w-[72px] shrink-0 flex-col items-end">
                    <span className="font-display text-[16px] font-bold text-green-800">{linha.altoMedio}%</span>
                    <span className="text-[11px] text-muted">alto + médio</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex w-full shrink-0 flex-col gap-4 rounded-[18px] bg-green-900 p-6 xl:w-[340px]">
          <h3 className="font-display text-[16px] font-bold text-white">Atuação em mais de um núcleo</h3>
          <p className="flex items-center gap-2.5">
            <span className="font-display text-[36px] font-extrabold text-gold-300">{percentual(comMaisDeUmNucleo, COM_NUCLEO_INDICADO)}</span>
            <span className="text-[12px] leading-[1.4] text-[#d7e6db]">
              dos {COM_NUCLEO_INDICADO} pesquisadores com núcleo atuam em 2 ou mais núcleos
            </span>
          </p>
          <p className="text-[10px] font-semibold text-[#7fa58c]">PESQUISADORES POR QUANTIDADE DE NÚCLEOS</p>
          <ul className="flex flex-col gap-[9px]">
            {QUANTIDADE_NUCLEOS.map((n, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <span className="w-[78px] shrink-0 text-[12px] text-white">
                  {i === 0 ? 'Só 1 núcleo' : i === QUANTIDADE_NUCLEOS.length - 1 ? `Todos os ${i + 1}` : `${i + 1} núcleos`}
                </span>
                <span className="h-2 min-w-0 flex-1 overflow-hidden rounded bg-white/12">
                  <span className="block h-2 rounded bg-gold-500" style={{ width: `${(n / maiorQuantidade) * 100}%` }} />
                </span>
                <span className="w-7 shrink-0 text-right text-[12px] font-semibold text-white">{n}</span>
              </li>
            ))}
          </ul>
          <p className="text-[11px] leading-[1.4] text-[#7fa58c]">
            No cadastro, cada pesquisador indicou em quais núcleos quer atuar, por isso a soma dos núcleos passa do total de pesquisadores.
          </p>
        </aside>
      </div>
    </Cartao>
  )
}

/** O filtro de nível só esmaece os outros segmentos das barras empilhadas. */
const filtrosNivelApagam = (realce: Realce, nivel: NivelAtuacao) => realce('nivel', nivel) === false

function ListaPerfil({ grupo, realce }: { grupo: GrupoPerfil; realce: Realce }) {
  const maior = Math.max(...grupo.itens.map((i) => i.total))
  const nome = grupo.multipla ? 'sm:w-[220px]' : 'sm:w-[200px]'
  const valor = grupo.multipla ? 'w-20' : 'w-[74px]'
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <div className="flex items-end justify-between gap-3 pb-2">
        <h3 className="font-display text-[16px] font-bold text-green-900">{grupo.titulo}</h3>
        <span className="text-right text-[12px] text-muted">{grupo.resumo}</span>
      </div>
      <ul className="flex flex-col gap-1">
        {grupo.itens.map((item) => (
          <li
            key={item.nome}
            className={`flex items-center gap-3 rounded-lg px-2.5 transition-opacity ${grupo.multipla ? 'py-1.5' : 'py-[7px]'} ${estiloRealce(realce(grupo.id, item.nome))}`}
          >
            <span className={`w-32 shrink-0 text-[13px] ${nome} ${item.neutra ? 'text-muted italic' : 'text-ink'}`}>{item.nome}</span>
            <span className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-[5px] bg-green-50">
              <span
                className={`block h-2.5 min-w-[3px] rounded-[5px] ${item.neutra ? 'bg-[#c9d1cc]' : grupo.cor}`}
                style={{ width: `${(item.total / maior) * 100}%` }}
              />
            </span>
            <span className={`shrink-0 text-right text-[12px] font-semibold ${valor} ${item.neutra ? 'text-muted' : 'text-green-800'}`}>
              {item.total} · {percentual(item.total)}
            </span>
          </li>
        ))}
        {/* Escolha única e lista completa: as categorias somam o banco inteiro. */}
        {!grupo.multipla && grupo.id !== 'formacao' && (
          <li className="flex items-center gap-3 border-t border-border p-2.5 text-ink">
            <span className="flex-1 text-[13px] font-bold">Total</span>
            <span className="text-[12px] font-bold">{TOTAL_PESQUISADORES} · 100%</span>
          </li>
        )}
      </ul>
    </div>
  )
}

function SecaoPerfil({ realce }: { realce: Realce }) {
  return (
    <Cartao className="flex flex-col gap-6">
      <CabecalhoCartao
        eyebrow={
          <Eyebrow ponto={pontoDourado} pequeno className="bg-yellow-100 text-gold-600">
            Perfil
          </Eyebrow>
        }
        titulo="Quem são os pesquisadores"
        descricao="Todas as categorias informadas no cadastro, inclusive “não informada” e “não classificada”."
      />
      <div className="grid items-start gap-x-10 gap-y-8 lg:grid-cols-2">
        {PERFIL.filter((g) => !g.multipla).map((grupo) => (
          <ListaPerfil key={grupo.id} grupo={grupo} realce={realce} />
        ))}
      </div>
      {PERFIL.filter((g) => g.multipla).map((grupo) => (
        <div key={grupo.id} className="pt-2">
          <ListaPerfil grupo={grupo} realce={realce} />
        </div>
      ))}
    </Cartao>
  )
}

export default function PesquisadoresVisao() {
  const [busca, setBusca] = useState('')
  const [filtros, setFiltros] = useState<Filtros>(SEM_FILTROS)
  const termo = normalizar(busca.trim())
  const instituicoes = grupoPerfil('instituicao')

  const realce: Realce = (grupo, nome) => {
    const selecionado = filtros[grupo]
    const buscaAplica = termo !== '' && GRUPOS_BUSCA.includes(grupo)
    if (!selecionado && !buscaAplica) return null
    return (!selecionado || selecionado === nome) && (!buscaAplica || normalizar(nome).includes(termo))
  }
  const filtrar = (grupo: Grupo, valor: string) => setFiltros((atual) => ({ ...atual, [grupo]: valor }))

  return (
    <>
      <FaixaMarca />
      <TopoPagina
        trilha={[{ label: 'Pesquisadores' }]}
        titulo="Pesquisadores"
        descricao="Banco de Competências em PD&I do Mais INOVA: quantos são os pesquisadores, onde estão, em quais núcleos estratégicos atuam e qual o seu perfil."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <IndicadorTopo
            icone={kpiPesquisadores}
            valor={String(TOTAL_PESQUISADORES)}
            unidade="pesquisadores"
            legenda={`em ${MUNICIPIOS.length} municípios do Piauí`}
          />
          <IndicadorTopo
            icone={kpiNucleos2}
            valor={String(comMaisDeUmNucleo)}
            unidade="em 2+ núcleos"
            legenda={`de ${COM_NUCLEO_INDICADO} com núcleo indicado`}
          />
          <IndicadorTopo
            icone={kpiInstituicoes}
            valor={String(instituicoes.categorias)}
            unidade="instituições"
            legenda={instituicoes.itens
              .slice(0, 3)
              .map((i) => `${i.nome} ${i.total}`)
              .join(' · ')}
          />
          <IndicadorTopo icone={kpiNucleos} valor={String(NUCLEOS.length)} unidade="núcleos" legenda="todos com pesquisadores" />
        </div>
      </TopoPagina>

      <section className="bg-surface pt-8 pb-14">
        <Container largo className="flex flex-col gap-6">
          <PainelFiltros
            busca={busca}
            aoBuscar={setBusca}
            filtros={filtros}
            aoFiltrar={filtrar}
            aoLimpar={() => {
              setBusca('')
              setFiltros(SEM_FILTROS)
            }}
          />
          <SecaoMapa realce={realce} escolhido={filtros.municipio} aoEscolher={(nome) => filtrar('municipio', nome)} expandir={termo !== ''} />
          <SecaoNucleos realce={realce} />
          <SecaoPerfil realce={realce} />
        </Container>
      </section>
    </>
  )
}
