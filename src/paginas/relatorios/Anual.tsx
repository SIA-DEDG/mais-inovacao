import { Link } from 'react-router'
import ponto from '../../assets/acesso/ponto.svg'
import iconeBaixarBranco from '../../assets/relatorios/icone-baixar-branco.svg'
import iconeLerOnline from '../../assets/relatorios/icone-ler-online.svg'
import iconeRelatorioVerde from '../../assets/relatorios/icone-relatorio-verde.svg'
import iconeResumo from '../../assets/relatorios/icone-resumo.svg'
import iconeSumario from '../../assets/relatorios/icone-sumario.svg'
import kpiDesafios from '../../assets/relatorios/kpi-desafios.svg'
import kpiMetas from '../../assets/relatorios/kpi-metas.svg'
import kpiProximo from '../../assets/relatorios/kpi-proximo.svg'
import kpiRelatorios from '../../assets/relatorios/kpi-relatorios.svg'
import { FaixaMarca } from '../../components/FaixaMarca'
import {IndicadorTopo, TopoPagina } from '../../components/pagina'
import { Container, Eyebrow } from '../../components/ui'
import { NUCLEOS } from '../../dados/nucleos'

type Situacao = 'concluido' | 'andamento' | 'atraso' | 'nao-iniciado'

const SITUACOES: Record<Situacao, { singular: string; plural: string; cor: string; fundo: string }> = {
  concluido: { singular: 'concluído', plural: 'concluídos', cor: 'bg-green-800', fundo: 'bg-surface' },
  andamento: { singular: 'em andamento', plural: 'em andamento', cor: 'bg-green-400', fundo: 'bg-surface' },
  atraso: { singular: 'com atraso', plural: 'com atraso', cor: 'bg-gold-500', fundo: 'bg-yellow-50' },
  'nao-iniciado': { singular: 'não iniciado', plural: 'não iniciados', cor: 'bg-[#dde3df]', fundo: 'bg-surface' },
}
const ORDEM: Situacao[] = ['concluido', 'andamento', 'atraso', 'nao-iniciado']

// Situação dos desafios de cada núcleo em 31/12/2025 (Figma: "Relatório Anual 2025").
const ANDAMENTO: { nucleo: string; desafios: Situacao[]; destaque: string }[] = [
  { nucleo: 'agroindustria-e-bioeconomia', desafios: ['concluido', 'andamento', 'andamento'], destaque: 'Bioinsumo para soja validado em campo' },
  { nucleo: 'saude-e-biotecnologia', desafios: ['concluido', 'concluido', 'andamento'], destaque: 'Kit de diagnóstico rápido de arboviroses' },
  { nucleo: 'industria-verde', desafios: ['andamento', 'andamento', 'atraso'], destaque: 'Planta-piloto de biogás em fase de testes' },
  { nucleo: 'economia-digital', desafios: ['concluido', 'andamento', 'atraso'], destaque: 'Plataforma de capacitação com 3,2 mil alunos' },
  { nucleo: 'governo-digital-e-infraestrutura', desafios: ['concluido', 'andamento', 'andamento'], destaque: 'Painel de dados abertos do estado no ar' },
  { nucleo: 'turismo-e-economia-criativa', desafios: ['andamento', 'andamento', 'nao-iniciado'], destaque: 'Roteiro Serra da Capivara–Delta mapeado' },
  { nucleo: 'industria-mineral', desafios: ['andamento', 'atraso', 'nao-iniciado'], destaque: 'Mapeamento de minerais críticos iniciado' },
]

const SUMARIO = ['Resumo executivo', 'Andamento por núcleo', 'Resultados por desafio', 'Execução financeira', 'Equipes e bolsistas', 'Próximos passos']

const DESTAQUES: [string, string][] = [
  ['12', 'protótipos entregues'],
  ['5', 'patentes depositadas'],
  ['86', 'bolsistas envolvidos'],
  ['R$ 4,2 mi', 'de R$ 5,6 mi executados'],
]

/** "1 concluído · 2 em andamento"; "concluído" sempre aparece, mesmo com zero. */
function resumoSituacoes(desafios: Situacao[]) {
  return ORDEM.map((s) => [s, desafios.filter((d) => d === s).length] as const)
    .filter(([s, n]) => n > 0 || s === 'concluido')
    .map(([s, n]) => `${n} ${n === 1 ? SITUACOES[s].singular : SITUACOES[s].plural}`)
    .join(' · ')
}

function SeletorAno() {
  return (
    <nav aria-label="Ver outro ano" className="flex flex-wrap items-center gap-1.5">
      <span className="text-[13px] text-green-200">Ver outro ano:</span>
      <span aria-current="page" className="rounded-full bg-gold-500 px-3 py-1.5 text-[12px] font-semibold text-green-900">
        2025
      </span>
      <Link to="/relatorios" className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-white/16">
        2026 · parcial
      </Link>
      <span aria-disabled className="rounded-full border border-white/25 bg-white/4 px-3 py-1.5 text-[12px] font-semibold text-[#7fa58c]">
        2026 · anual (mar/2027)
      </span>
    </nav>
  )
}

function Capa() {
  const agro = NUCLEOS[0]
  return (
    <div className="relative h-[400px] w-[300px] shrink-0 overflow-hidden rounded-xl bg-[linear-gradient(135deg,#04331c_0%,#155e33_71.43%)] shadow-[0_18px_36px_rgb(5_51_28/0.3)]">
      <img src={agro.foto} alt="" className="absolute inset-0 size-full object-cover opacity-22" />
      <span aria-hidden className="absolute inset-x-0 top-0 flex h-2">
        <span className="flex-1 bg-green-600" />
        <span className="flex-1 bg-yellow-500" />
        <span className="flex-1 bg-blue-500" />
        <span className="flex-1 bg-red-500" />
      </span>
      <p className="absolute top-9 left-6 font-display text-[18px] font-extrabold text-white">
        Projeto <span className="text-gold-500">Mais Inovação</span>
      </p>
      <p className="absolute top-[62px] left-6 text-[11px] text-green-200">Governo do Estado do Piauí · SIA</p>
      <p className="absolute top-[230px] left-6 text-[12px] font-bold tracking-[1.44px] text-gold-300">RELATÓRIO ANUAL</p>
      <p className="absolute top-[248px] left-[22px] font-display text-[64px] font-extrabold text-white">2025</p>
      <p className="absolute top-[330px] left-6 w-[250px] text-[13px] leading-[1.4] text-green-100">
        Andamento e resultados dos desafios dos núcleos estratégicos
      </p>
    </div>
  )
}

export default function RelatorioAnual() {
  const todos = ANDAMENTO.flatMap((a) => a.desafios)

  return (
    <>
      <FaixaMarca />
      <TopoPagina
        trilha={[{ label: 'Relatórios', href: '/relatorios' }, { label: 'Relatório Anual 2025' }]}
        titulo="Relatório Anual 2025"
        descricao="Andamento e resultados dos 21 desafios do 1º ciclo nos 7 núcleos estratégicos, com dados de 31/12/2025."
      >
        <SeletorAno />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <IndicadorTopo icone={kpiRelatorios} valor="64" unidade="páginas" legenda="PDF · 8,4 MB" />
          <IndicadorTopo icone={kpiDesafios} valor="21" unidade="desafios" legenda="em execução no 1º ciclo" />
          <IndicadorTopo icone={kpiMetas} valor="74%" unidade="das metas" legenda="anuais cumpridas" />
          <IndicadorTopo icone={kpiProximo} valor="R$ 4,2 mi" unidade="executados" legenda="de R$ 5,6 mi previstos" />
        </div>
      </TopoPagina>

      <div className="flex flex-col gap-7 pt-10 pb-14">
        <Container largo>
          <section className="flex flex-col items-center gap-10 rounded-3xl border border-border bg-background p-7 lg:flex-row">
            <Capa />
            <div className="flex min-w-0 flex-1 flex-col items-start gap-[18px]">
              <p className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gold-500 px-2.5 py-1 text-[11px] font-bold text-green-900">Mais recente</span>
                <span className="text-[13px] text-muted">Publicado em 15/03/2026 · 64 páginas</span>
              </p>
              <h2 className="font-display text-[22px] font-bold text-green-900">Resumo do ano</h2>
              <p className="text-[15px] leading-[1.55] text-muted">
                Primeiro ciclo do Mais Inovação: 21 desafios em execução nos 7 núcleos, com 74% das metas anuais cumpridas, 12 protótipos
                entregues e R$ 4,2 milhões executados.
              </p>
              <dl className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
                {DESTAQUES.map(([valor, legenda]) => (
                  <div key={legenda} className="flex flex-col-reverse gap-0.5 rounded-[14px] bg-green-50 px-4 py-3.5">
                    <dt className="text-[12px] text-muted">{legenda}</dt>
                    <dd className="font-display text-[24px] font-extrabold text-green-800">{valor}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-semibold tracking-[0.66px] text-muted">O QUE TEM NO RELATÓRIO</p>
                <ul className="flex flex-wrap gap-2">
                  {SUMARIO.map((item) => (
                    <li key={item} className="flex items-center gap-1.5 rounded-full border border-border px-3 py-[5px] text-[12px] text-ink">
                      <img src={iconeSumario} alt="" className="size-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Os arquivos do relatório ainda não estão no protótipo. */}
              <div className="flex flex-wrap gap-3">
                <button type="button" className="flex items-center gap-2 rounded-full bg-green-800 px-[18px] py-3 text-[14px] font-semibold text-white hover:bg-green-700">
                  <img src={iconeBaixarBranco} alt="" className="size-4" />
                  Baixar PDF · 8,4 MB
                </button>
                <button type="button" className="flex items-center gap-2 rounded-full border border-green-700 px-[18px] py-3 text-[14px] font-semibold text-green-700 hover:bg-green-50">
                  <img src={iconeLerOnline} alt="" className="size-4" />
                  Ler versão online
                </button>
                <button type="button" className="flex items-center gap-2 rounded-full px-2 py-3 text-[14px] font-semibold text-green-700 hover:underline">
                  <img src={iconeResumo} alt="" className="size-4" />
                  Resumo executivo (4 p.)
                </button>
              </div>
            </div>
          </section>
        </Container>

        <Container largo>
          <section className="flex flex-col gap-[22px] rounded-[20px] border border-border bg-background p-5 md:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col items-start gap-2.5">
                <Eyebrow pequeno ponto={ponto} className="bg-green-100 text-green-700">
                  Situação em 31/12/2025
                </Eyebrow>
                <h2 className="font-display text-[24px] font-bold text-green-900">Andamento dos desafios por núcleo</h2>
                <p className="text-[14px] text-muted">Situação dos {todos.length} desafios do 1º ciclo em 31/12/2025.</p>
              </div>
              <ul className="flex flex-wrap gap-4">
                {ORDEM.map((s) => (
                  <li key={s} className="flex items-center gap-1.5 text-[12px] text-muted">
                    <span className={`size-3 rounded-[3px] ${SITUACOES[s].cor}`} />
                    {SITUACOES[s].singular.replace(/^./, (c) => c.toUpperCase())}
                  </li>
                ))}
              </ul>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ORDEM.map((s) => (
                <div key={s} className={`flex items-center gap-3 rounded-[14px] px-4 py-3.5 ${SITUACOES[s].fundo}`}>
                  <span className={`h-9 w-1.5 rounded-[3px] ${SITUACOES[s].cor}`} />
                  <span className="flex flex-col-reverse">
                    <dt className="text-[12px] text-muted">{SITUACOES[s].singular}</dt>
                    <dd className="font-display text-[26px] font-extrabold text-green-900">{todos.filter((d) => d === s).length}</dd>
                  </span>
                </div>
              ))}
            </dl>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left">
                <thead className="text-[10px] font-semibold tracking-[0.4px] text-muted">
                  <tr className="border-b border-border">
                    <th className="w-[320px] pr-5 pb-2.5">NÚCLEO</th>
                    <th className="w-[380px] pr-5 pb-2.5">DESAFIOS</th>
                    <th className="pr-5 pb-2.5">DESTAQUE DO ANO</th>
                    <th className="w-[110px] pb-2.5">
                      <span className="sr-only">Relatório do núcleo</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ANDAMENTO.map((linha) => {
                    const nucleo = NUCLEOS.find((n) => n.slug === linha.nucleo)!
                    return (
                      <tr key={linha.nucleo} className="border-b border-border">
                        <td className="py-3.5 pr-5">
                          <span className="flex items-center gap-3">
                            <span className="shrink-0 rounded-[10px] bg-green-800 p-[7px]">
                              <img src={nucleo.icone} alt="" className="size-[26px]" />
                            </span>
                            <span className="text-[14px] font-semibold text-ink">{nucleo.nome}</span>
                          </span>
                        </td>
                        <td className="py-3.5 pr-5">
                          <span className="flex flex-col gap-1.5">
                            <span className="flex gap-[3px]" aria-hidden>
                              {linha.desafios.map((s, i) => (
                                <span key={i} className={`h-[26px] flex-1 rounded-md ${SITUACOES[s].cor}`} />
                              ))}
                            </span>
                            <span className="text-[12px] text-muted">{resumoSituacoes(linha.desafios)}</span>
                          </span>
                        </td>
                        <td className="py-3.5 pr-5 text-[13px] leading-[1.4] text-ink">{linha.destaque}</td>
                        <td className="py-3.5">
                          <Link
                            to={`/nucleos/${nucleo.slug}#chamadas`}
                            aria-label={`Relatório de ${nucleo.nome}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-green-700 px-3 py-[7px] text-[12px] font-semibold text-green-700 hover:bg-green-50"
                          >
                            <img src={iconeRelatorioVerde} alt="" className="size-[13px]" />
                            Relatório
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </Container>
      </div>
    </>
  )
}
