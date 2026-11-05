import { useState, type CSSProperties, type ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import pontoVerde from '../../assets/comum/ponto-verde.svg'
import setaDireita from '../../assets/comum/seta-direita-verde.svg'
import setaDourada from '../../assets/comum/seta-dourada-pequena.svg'
import setaLink from '../../assets/comum/seta-link-verde.svg'
import setaVoltarBranca from '../../assets/comum/seta-voltar-branca.svg'
import anel1 from '../../assets/desafio/anel-1.svg'
import anel2 from '../../assets/desafio/anel-2.svg'
import anel3 from '../../assets/desafio/anel-3.svg'
import anel4 from '../../assets/desafio/anel-4.svg'
import brilho from '../../assets/desafio/brilho.svg'
import equipeAnel1 from '../../assets/desafio/equipe-anel-1.svg'
import equipeAnel2 from '../../assets/desafio/equipe-anel-2.svg'
import equipeAnel3 from '../../assets/desafio/equipe-anel-3.svg'
import iconeAlvo from '../../assets/desafio/icone-alvo.svg'
import iconeArquivo from '../../assets/desafio/icone-arquivo-branco.svg'
import iconeAtencao from '../../assets/desafio/icone-atencao.svg'
import iconeAvancou from '../../assets/desafio/icone-avancou.svg'
import iconeCadeado from '../../assets/desafio/icone-cadeado.svg'
import iconeCalendario from '../../assets/desafio/icone-calendario.svg'
import iconeCheck from '../../assets/desafio/icone-check-branco.svg'
import iconeGrafico from '../../assets/desafio/icone-grafico-branco.svg'
import iconePonto from '../../assets/desafio/icone-ponto.svg'
import iconeProximos from '../../assets/desafio/icone-proximos.svg'
import marcaDagua from '../../assets/desafio/marca-dagua.png'
import pontoDourado from '../../assets/desafio/ponto-dourado.svg'
import { FaixaMarca } from '../../components/FaixaMarca'
import { ChipStatus, EstadoVazio } from '../../components/pagina'
import { Container, Eyebrow, LinkSeta } from '../../components/ui'
import {
  buscarDetalheDesafio,
  situacaoEtapa,
  type BarraComposicao,
  type DetalheDesafio,
  type SituacaoMeta,
} from '../../dados/desafios'
import { buscarNucleo, type Desafio, type Nucleo } from '../../dados/nucleos'
import { Abas, SeletorNucleos, TopoNucleos } from './comum'

const ABAS = [
  { id: 'andamento', label: 'Andamento' },
  { id: 'metas', label: 'Metas e entregas' },
  { id: 'equipe', label: 'Equipe' },
  { id: 'documentos', label: 'Documentos' },
]

const SITUACAO: Record<SituacaoMeta, { label: string; classe: string }> = {
  cumprida: { label: 'Cumprida', classe: 'bg-green-50 text-green-700' },
  andamento: { label: 'Em andamento', classe: 'bg-blue-50 text-blue-700' },
  prevista: { label: 'Prevista', classe: 'bg-surface text-muted' },
}

function ChipSituacao({ situacao }: { situacao: SituacaoMeta }) {
  const { label, classe } = SITUACAO[situacao]
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ${classe}`}>{label}</span>
}

/** Título de seção com a última palavra destacada ("Etapas do desafio"). */
function TituloSecao({ inicio, destaque, claro = false }: { inicio: string; destaque: string; claro?: boolean }) {
  return (
    <h2 className={`font-display text-[26px] font-extrabold md:text-[32px] ${claro ? 'text-white' : 'text-green-900'}`}>
      {inicio} <span className={claro ? 'text-gold-300' : 'text-green-600'}>{destaque}</span>
    </h2>
  )
}

function CabecalhoSecao({ eyebrow, children, descricao }: { eyebrow: string; children: ReactNode; descricao?: string }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <Eyebrow pequeno ponto={pontoVerde} className="bg-green-50 text-green-700">
        {eyebrow}
      </Eyebrow>
      {children}
      {descricao && <p className="max-w-[860px] text-[16px] leading-[1.5] text-muted">{descricao}</p>}
    </div>
  )
}

function CardNucleoDesafio({ nucleo, desafio, detalhe }: { nucleo: Nucleo; desafio: Desafio; detalhe?: DetalheDesafio }) {
  const mascara: CSSProperties = { maskImage: `url("${marcaDagua}")`, maskSize: '360px 360px', maskRepeat: 'no-repeat' }
  const kpis: [string | number, string][] = detalhe
    ? [
        [desafio.pesquisadores.split(' ')[0], 'pesquisadores na equipe'],
        [detalhe.instituicoes, 'instituições'],
        [detalhe.municipios, 'municípios'],
        [detalhe.etapas.length, `etapas · ${detalhe.etapas.findIndex((e) => situacaoEtapa(e, detalhe.leituras.at(-1)!.referencia) === 'andamento') + 1}ª em curso`],
        [detalhe.entregas, 'entregas concluídas'],
      ]
    : []

  return (
    <Container largo className="py-8">
      <div className="overflow-hidden rounded-3xl border border-border bg-background">
        <div className="flex flex-wrap items-center gap-4 bg-green-800 px-7 py-[18px]">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10">
            <img src={nucleo.icone} alt="" className="size-7" />
          </span>
          <p className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-[11px] font-bold tracking-[0.66px] text-gold-300">NÚCLEO {nucleo.numero} DE 07</span>
            <span className="font-display text-[22px] font-extrabold text-white">{nucleo.nome}</span>
          </p>
          <p className="text-[13px] text-green-200">
            {nucleo.pesquisadores} pesquisadores · {nucleo.municipios} municípios · {nucleo.desafios} desafios
          </p>
          <Link
            to={`/nucleos/${nucleo.slug}`}
            className="flex items-center gap-2 rounded-full border-[1.5px] border-white/70 py-[9px] pr-[18px] pl-4 text-[14px] font-semibold text-white hover:bg-white/10"
          >
            <img src={setaVoltarBranca} alt="" className="size-4" />
            Voltar ao núcleo
          </Link>
        </div>

        <div className="flex flex-col gap-3 border-b border-border bg-[#eef5f0] px-7 py-3.5 md:flex-row md:items-center">
          <p className="text-[11px] font-bold tracking-[0.66px] text-green-700">DESAFIOS</p>
          <ul className="flex flex-wrap gap-2">
            {nucleo.detalhe?.desafios.map((d) => {
              const ativo = d.numero === desafio.numero
              return (
                <li key={d.numero}>
                  <Link
                    to={`/nucleos/${nucleo.slug}/desafios/${d.numero}`}
                    aria-current={ativo ? 'page' : undefined}
                    className={`flex items-center gap-2 rounded-full border py-2.5 pr-4 pl-3.5 ${
                      ativo ? 'border-green-800 bg-green-800' : 'border-border bg-background hover:bg-green-50'
                    }`}
                  >
                    <span className={`text-[12px] font-bold ${ativo ? 'text-yellow-500' : 'text-muted'}`}>{d.numero}</span>
                    <span className={`text-[14px] font-semibold ${ativo ? 'text-white' : 'text-green-800'}`}>{d.titulo}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="relative flex flex-col gap-6 overflow-hidden bg-linear-to-r from-white via-[#f8f9f8] via-55% to-[#eef1ef] px-7 py-8">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img src={brilho} alt="" className="absolute -top-[380px] -left-[260px] size-[700px] max-w-none" />
            <div className="absolute -top-20 left-[800px] size-[360px] bg-green-700 opacity-7" style={mascara} />
            <img src={anel1} alt="" className="absolute -top-[410px] left-[880px] size-[900px] max-w-none" />
            <img src={anel2} alt="" className="absolute -top-[310px] left-[980px] size-[700px] max-w-none" />
            <img src={anel3} alt="" className="absolute -top-[210px] left-[1080px] size-[500px] max-w-none" />
            <img src={anel4} alt="" className="absolute -top-[110px] left-[1180px] size-[300px] max-w-none" />
          </div>

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-12">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-3.5">
              <span className="flex items-center gap-1.5 rounded-full bg-green-800 py-1.5 pr-3 pl-2.5 text-[12px] font-bold tracking-[0.72px] text-white">
                <img src={iconeAlvo} alt="" className="size-3.5" />
                DESAFIO {desafio.numero}
              </span>
              <h1 className="font-display text-[28px] leading-[1.18] font-extrabold text-green-900 md:text-[36px]">{desafio.titulo}</h1>
              <p className="text-[16px] leading-[1.55] text-muted">{detalhe?.descricao ?? desafio.resumo}</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ink">
                <ChipStatus status={desafio.status} />
                {detalhe && (
                  <>
                    <span className="flex items-center gap-1.5">
                      <img src={iconeCalendario} alt="" className="size-3.5" />
                      {detalhe.periodo}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <img src={iconePonto} alt="" className="size-3.5" />
                      {detalhe.origem}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 rounded-[20px] border border-green-200 bg-background p-6 lg:w-[400px]">
              <p className="text-[13px] font-medium text-muted">Metas cumpridas</p>
              <p className="flex items-end gap-2.5">
                <span className="font-display text-[44px] font-extrabold text-green-800">
                  {desafio.metas === null ? '—' : `${desafio.metas}%`}
                </span>
                {detalhe && (
                  <span className="pb-2 text-[14px] text-muted">
                    {detalhe.metasCumpridas} de {detalhe.metasTotal} metas
                  </span>
                )}
              </p>
              <div className="h-2.5 overflow-hidden rounded-[5px] bg-green-100">
                <div className="h-2.5 rounded-[5px] bg-green-600" style={{ width: `${desafio.metas ?? 0}%` }} />
              </div>
              {detalhe && <p className="text-[12px] text-muted">Situação no {detalhe.situacaoEm}</p>}
            </div>
          </div>

          {kpis.length > 0 && (
            <dl className="relative grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {kpis.map(([valor, legenda]) => (
                <div key={legenda} className="flex flex-col-reverse gap-0.5 rounded-2xl border border-border bg-background px-5 py-4">
                  <dt className="text-[13px] text-muted">{legenda}</dt>
                  <dd className="font-display text-[28px] font-extrabold text-green-900">{valor}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </Container>
  )
}

function SecaoAndamento({ detalhe }: { detalhe: DetalheDesafio }) {
  const [leituraId, setLeituraId] = useState(detalhe.leituras.at(-1)!.id)
  const leitura = detalhe.leituras.find((l) => l.id === leituraId)!

  return (
    <section id="andamento" className="scroll-mt-24 py-20 lg:scroll-mt-52">
      <Container largo className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <CabecalhoSecao
            eyebrow="Andamento"
            descricao="Linha do tempo do desafio conforme o plano de trabalho. A situação é atualizada a cada relatório."
          >
            <TituloSecao inicio="Etapas do" destaque="desafio" />
          </CabecalhoSecao>
          <div role="radiogroup" aria-label="Relatório de referência" className="flex shrink-0 gap-1 self-start rounded-full bg-surface p-1">
            {detalhe.leituras.map((l) => (
              <button
                key={l.id}
                type="button"
                role="radio"
                aria-checked={l.id === leituraId}
                onClick={() => setLeituraId(l.id)}
                className={`rounded-full px-3.5 py-2 text-[12px] font-semibold ${
                  l.id === leituraId ? 'bg-green-800 text-white' : 'text-muted hover:text-green-800'
                }`}
              >
                {l.rotulo}
              </button>
            ))}
          </div>
        </div>

        <ol className="grid gap-6 rounded-3xl border border-green-100 bg-green-50 p-7 sm:grid-cols-2 lg:flex lg:gap-0">
          {detalhe.etapas.map((etapa, i) => {
            const situacao = situacaoEtapa(etapa, leitura.referencia)
            const ultima = i === detalhe.etapas.length - 1
            return (
              <li key={etapa.titulo} className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex items-center">
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                      situacao === 'cumprida'
                        ? 'bg-green-700'
                        : situacao === 'andamento'
                          ? 'border-2 border-green-700 bg-background text-green-700'
                          : 'border-2 border-border bg-surface text-muted'
                    }`}
                  >
                    {situacao === 'cumprida' ? <img src={iconeCheck} alt="" className="size-[18px]" /> : i + 1}
                  </span>
                  {!ultima && (
                    <span className={`hidden h-[3px] flex-1 lg:block ${situacao === 'cumprida' ? 'bg-green-700' : 'bg-border'}`} />
                  )}
                </div>
                <div className="flex flex-col items-start gap-1 pr-4">
                  <p className="text-[11px] font-bold tracking-[0.66px] text-muted">ETAPA {i + 1}</p>
                  <p className="text-[14px] leading-[1.35] font-semibold text-ink">{etapa.titulo}</p>
                  <p className="text-[12px] text-muted">{etapa.periodo}</p>
                  <ChipSituacao situacao={situacao} />
                </div>
              </li>
            )
          })}
        </ol>

        {leitura.resumo ? (
          <div className="grid gap-6 md:grid-cols-3 md:gap-10">
            {(
              [
                [iconeAvancou, 'O que avançou', leitura.resumo.avancou, 'border-green-600'],
                [iconeAtencao, 'Pontos de atenção', leitura.resumo.atencao, 'border-gold-600'],
                [iconeProximos, 'Próximos passos', leitura.resumo.proximos, 'border-blue-700'],
              ] as const
            ).map(([icone, titulo, texto, borda]) => (
              <div key={titulo} className={`flex flex-col gap-2.5 border-l-3 py-1 pl-5 ${borda}`}>
                <h3 className="flex items-center gap-2 font-display text-[16px] font-bold text-green-900">
                  <img src={icone} alt="" className="size-5" />
                  {titulo}
                </h3>
                <p className="text-[14px] leading-[1.5] text-ink">{texto}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-muted">O resumo do período está disponível a partir do relatório parcial de 2026.</p>
        )}
      </Container>
    </section>
  )
}

function SecaoMetas({ detalhe }: { detalhe: DetalheDesafio }) {
  const contar = (s: SituacaoMeta) => detalhe.metas.filter((m) => m.situacao === s).length
  const total = detalhe.metas.length
  const etapasPrevistas = [...new Set(detalhe.metas.filter((m) => m.situacao === 'prevista').map((m) => m.etapa))]
  const resumo = [
    { valor: contar('cumprida'), label: 'metas cumpridas', sub: `de ${total} pactuadas`, borda: 'border-green-600', cor: 'text-green-800', barra: 'bg-green-600' },
    { valor: contar('andamento'), label: 'em andamento', sub: `previstas para ${detalhe.metasEmAndamentoAte}`, borda: 'border-blue-500', cor: 'text-blue-700', barra: 'bg-blue-500' },
    { valor: contar('prevista'), label: 'previstas', sub: `etapas ${etapasPrevistas.join(' e ')}`, borda: 'border-[#8a9a90]', cor: 'text-muted', barra: 'bg-[#8a9a90]' },
  ]

  return (
    <section id="metas" className="relative scroll-mt-24 overflow-hidden bg-green-50 py-20 lg:scroll-mt-52">
      <p aria-hidden className="pointer-events-none absolute -top-6 left-[565px] font-display text-[250px] leading-[0.8] font-extrabold whitespace-nowrap text-[rgb(21_94_51/0.04)]">
        METAS
      </p>
      <Container largo className="relative flex flex-col gap-6">
        <CabecalhoSecao eyebrow="Metas e entregas" descricao="Metas pactuadas no plano de trabalho e o que já foi entregue.">
          <TituloSecao inicio="Metas do" destaque="desafio" />
        </CabecalhoSecao>
        <div className="grid gap-6 md:grid-cols-3 md:gap-10">
          {resumo.map((item) => (
            <div key={item.label} className={`flex flex-col gap-1.5 border-l-3 py-1 pl-5 ${item.borda}`}>
              <p className="flex items-baseline gap-3">
                <span className={`font-display text-[48px] font-extrabold ${item.cor}`}>{item.valor}</span>
                <span className="text-[16px] font-semibold text-ink">{item.label}</span>
              </p>
              <p className="text-[13px] text-muted">{item.sub}</p>
              <div className="h-1.5 overflow-hidden rounded-full bg-border">
                <div className={`h-1.5 rounded-full ${item.barra}`} style={{ width: `${(item.valor / total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto rounded-3xl border border-green-200 bg-background">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-green-100 text-[11px] font-bold tracking-[0.44px] text-green-700">
              <tr>
                <th className="px-5 py-3.5">META</th>
                <th className="w-[110px] px-2 py-3.5">ETAPA</th>
                <th className="w-[140px] px-2 py-3.5">PRAZO</th>
                <th className="w-[260px] px-2 py-3.5">ENTREGA</th>
                <th className="w-[160px] px-5 py-3.5">SITUAÇÃO</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {detalhe.metas.map((meta, i) => (
                <tr key={meta.descricao} className="border-t border-border first:border-t-0">
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-2.5">
                      <span className="text-[12px] font-bold text-muted">{String(i + 1).padStart(2, '0')}</span>
                      <span className="leading-[1.4] text-ink">{meta.descricao}</span>
                    </span>
                  </td>
                  <td className="px-2 py-3.5 text-muted">Etapa {meta.etapa}</td>
                  <td className="px-2 py-3.5 text-muted">{meta.prazo}</td>
                  <td className={`px-2 py-3.5 ${meta.entrega ? 'text-ink' : 'text-muted'}`}>{meta.entrega ?? '—'}</td>
                  <td className="px-5 py-3.5">
                    <ChipSituacao situacao={meta.situacao} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  )
}

function CartaoComposicao({ titulo, itens, cor }: { titulo: string; itens: BarraComposicao[]; cor: 'azul' | 'verde' }) {
  const maior = Math.max(...itens.map((i) => i.total))
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-white/14 bg-white/7 p-6">
      <h3 className="font-display text-[15px] font-bold text-white">{titulo}</h3>
      <ul className="flex flex-col gap-3">
        {itens.map((item) => (
          <li key={item.rotulo} className="flex items-center gap-3">
            <span className="w-[140px] shrink-0 text-[13px] text-white">{item.rotulo}</span>
            <span className="h-2 min-w-0 flex-1 overflow-hidden rounded bg-white/14">
              <span
                className={`block h-2 rounded ${cor === 'azul' ? 'bg-blue-500' : 'bg-green-400'}`}
                style={{ width: `${(item.total / maior) * 100}%` }}
              />
            </span>
            <span className="w-[30px] shrink-0 text-right text-[12px] font-semibold text-white">{item.total}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SecaoEquipe({ detalhe }: { detalhe: DetalheDesafio }) {
  const { equipe } = detalhe
  return (
    <section
      id="equipe"
      className="relative scroll-mt-24 overflow-hidden bg-[linear-gradient(155.2deg,#04331c_0%,#155e33_83.33%)] py-20 lg:scroll-mt-52"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img src={equipeAnel1} alt="" className="absolute -top-[250px] left-[1070px] size-[620px] max-w-none" />
        <img src={equipeAnel2} alt="" className="absolute -top-40 left-[1160px] size-[440px] max-w-none" />
        <img src={equipeAnel3} alt="" className="absolute -top-[70px] left-[1250px] size-[260px] max-w-none" />
        <p className="absolute top-[399px] -left-5 font-display text-[280px] font-extrabold whitespace-nowrap text-white/4">EQUIPE</p>
      </div>
      <Container largo className="relative flex flex-col gap-6">
        <div className="flex flex-col items-start gap-2">
          <Eyebrow pequeno ponto={pontoDourado} className="bg-white/8 text-gold-300">
            Equipe
          </Eyebrow>
          <TituloSecao inicio="Quem compõe a" destaque="equipe" claro />
          <p className="text-[16px] leading-[1.5] text-green-200">Composição da equipe do desafio de forma agregada.</p>
        </div>
        <p className="flex items-center gap-2.5 rounded-xl bg-white/8 px-4 py-3 text-[13px] text-green-200">
          <img src={iconeCadeado} alt="" className="size-4 shrink-0" />
          Para proteger os dados pessoais, os nomes e contatos dos pesquisadores não são exibidos no site público. As informações abaixo
          são agregadas.
        </p>
        <div className="grid gap-5 lg:grid-cols-3">
          <CartaoComposicao titulo="Instituições" itens={equipe.instituicoes} cor="azul" />
          <CartaoComposicao titulo="Papel na equipe" itens={equipe.papeis} cor="verde" />
          <CartaoComposicao titulo="Grande área (CNPq)" itens={equipe.areas} cor="verde" />
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <CartaoComposicao titulo="Municípios da equipe" itens={equipe.municipios} cor="verde" />
          <div className="flex flex-col gap-2.5 rounded-3xl border border-white/14 bg-white/7 p-6">
            <h3 className="font-display text-[15px] font-bold text-white">Parceiros externos</h3>
            <ul className="flex flex-wrap gap-2">
              {equipe.parceiros.map((p) => (
                <li key={p} className="rounded-full bg-white/8 px-3 py-1.5 text-[12px] text-white">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

function SecaoDocumentos({ detalhe }: { detalhe: DetalheDesafio }) {
  return (
    <section id="documentos" className="scroll-mt-24 py-20 lg:scroll-mt-52">
      <Container largo className="flex flex-col gap-6">
        <CabecalhoSecao eyebrow="Documentos">
          <TituloSecao inicio="Documentos do" destaque="desafio" />
        </CabecalhoSecao>
        <ul className="grid gap-4 lg:grid-cols-3">
          {detalhe.documentos.map((doc) => (
            <li key={doc.titulo}>
              <Link
                to={doc.href}
                className="group flex h-full items-center gap-3.5 rounded-3xl border border-border p-[22px] transition-colors hover:border-green-200 hover:bg-green-50"
              >
                <span
                  className={`flex size-[52px] shrink-0 items-center justify-center rounded-2xl ${
                    doc.tipo === 'relatorio'
                      ? 'bg-[linear-gradient(135deg,#0784c2_0%,#05608e_83.33%)]'
                      : 'bg-[linear-gradient(135deg,#d4a419_0%,#b8860b_83.33%)]'
                  }`}
                >
                  <img src={doc.tipo === 'relatorio' ? iconeGrafico : iconeArquivo} alt="" className="size-5" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-[15px] font-semibold text-ink">{doc.titulo}</span>
                  <span className="text-[12px] text-muted">{doc.detalhe}</span>
                </span>
                <span className="shrink-0 rounded-full bg-green-800 p-[11px]">
                  <img src={setaDourada} alt="" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function OutrosDesafios({ nucleo, atual }: { nucleo: Nucleo; atual: string }) {
  const outros = nucleo.detalhe?.desafios.filter((d) => d.numero !== atual) ?? []
  if (outros.length === 0) return null
  return (
    <section className="bg-green-50 py-20">
      <Container largo className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-[24px] font-extrabold text-green-900 md:text-[28px]">
            Outros desafios do <span className="text-green-600">núcleo</span>
          </h2>
          <LinkSeta href={`/nucleos/${nucleo.slug}`} seta={setaLink}>
            Voltar para {nucleo.nome}
          </LinkSeta>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {outros.map((d) => (
            <li key={d.numero}>
              <Link
                to={`/nucleos/${nucleo.slug}/desafios/${d.numero}`}
                className="group flex h-full min-h-[175px] flex-col justify-between gap-4 rounded-3xl border border-border bg-background p-6 transition-colors hover:border-green-200"
              >
                <span className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-[0.66px] text-muted">DESAFIO {d.numero}</span>
                  <ChipStatus status={d.status} />
                </span>
                <span className="font-display text-[16px] leading-[1.3] font-bold text-green-900">{d.titulo}</span>
                <span className="h-1.5 overflow-hidden rounded-full bg-green-100">
                  <span className="block h-1.5 rounded-full bg-green-600" style={{ width: `${d.metas ?? 0}%` }} />
                </span>
                <span className="flex items-center justify-between text-[12px] text-muted">
                  Metas: {d.metas === null ? '—' : `${d.metas}%`}
                  <span className="rounded-full bg-green-100 p-2 transition-colors group-hover:bg-green-200">
                    <img src={setaDireita} alt="" className="size-4" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default function DesafioDetalhe() {
  const { slug, numero } = useParams()
  const nucleo = buscarNucleo(slug)
  const desafio = nucleo?.detalhe?.desafios.find((d) => d.numero === numero)
  if (!nucleo || !desafio) return <Navigate to={nucleo ? `/nucleos/${nucleo.slug}` : '/nucleos'} replace />
  const detalhe = buscarDetalheDesafio(nucleo.slug, desafio.numero)

  return (
    <>
      <FaixaMarca />
      <TopoNucleos
        trilha={[
          { label: 'Núcleos', href: '/nucleos' },
          { label: nucleo.nome, href: `/nucleos/${nucleo.slug}` },
          { label: `Desafio ${desafio.numero}` },
        ]}
      />
      <SeletorNucleos
        ativo={nucleo.slug}
        rotulo="você está vendo um desafio deste núcleo"
        voltarPara={{ href: '/nucleos', label: 'Ver todos os núcleos' }}
      />
      <div key={desafio.numero}>
        <CardNucleoDesafio nucleo={nucleo} desafio={desafio} detalhe={detalhe} />
        {detalhe ? (
          <>
            <Abas abas={ABAS} rotulo="Seções do desafio" />
            <SecaoAndamento detalhe={detalhe} />
            <SecaoMetas detalhe={detalhe} />
            <SecaoEquipe detalhe={detalhe} />
            <SecaoDocumentos detalhe={detalhe} />
          </>
        ) : (
          <Container largo className="pb-16">
            <EstadoVazio>O andamento, as metas e a equipe deste desafio ainda não foram publicados.</EstadoVazio>
          </Container>
        )}
        <OutrosDesafios nucleo={nucleo} atual={desafio.numero} />
      </div>
    </>
  )
}
