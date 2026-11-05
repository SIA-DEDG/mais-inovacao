import { Link } from 'react-router'
import iconeCheck from '../../assets/comum/icone-check-verde.svg'
import iconeEntrarEscuro from '../../assets/comum/icone-entrar-escuro.svg'
import iconeEntrarVerde from '../../assets/comum/icone-entrar-verde.svg'
import pontoAmarelo from '../../assets/comum/ponto-amarelo.svg'
import pontoDourado from '../../assets/comum/ponto-dourado.svg'
import setaDiagonal from '../../assets/comum/seta-diagonal-amarela.svg'
import setaDiagonalEscura from '../../assets/comum/seta-diagonal-escura.svg'
import anel1 from '../../assets/inscricoes/anel-1.svg'
import anel2 from '../../assets/inscricoes/anel-2.svg'
import anel3 from '../../assets/inscricoes/anel-3.svg'
import decorTopo from '../../assets/inscricoes/decor-topo.svg'
import iconeBanco from '../../assets/inscricoes/icone-banco.svg'
import iconeDesafios from '../../assets/inscricoes/icone-desafios.svg'
import kpiChamadas from '../../assets/inscricoes/kpi-chamadas.svg'
import kpiInstituicoes from '../../assets/inscricoes/kpi-instituicoes.svg'
import kpiNucleos from '../../assets/inscricoes/kpi-nucleos.svg'
import kpiPesquisadores from '../../assets/inscricoes/kpi-pesquisadores.svg'
import { Acordeao } from '../../components/Acordeao'
import { FaixaMarca } from '../../components/FaixaMarca'
import { Trilha } from '../../components/pagina'
import { Container, Eyebrow } from '../../components/ui'

const INDICADORES = [
  { icone: kpiChamadas, valor: '2', unidade: 'chamadas', legenda: 'abertas, sem prazo final' },
  { icone: kpiPesquisadores, valor: '475', unidade: 'pesquisadores', legenda: 'cadastrados no banco' },
  { icone: kpiInstituicoes, valor: '9', unidade: 'instituições', legenda: 'com pesquisadores no banco' },
  { icone: kpiNucleos, valor: '7', unidade: 'núcleos', legenda: 'Núcleos de Referência em P&D' },
]

const CHAMADAS = [
  {
    numero: '01',
    publico: 'EMPRESAS, ÓRGÃOS PÚBLICOS E INSTITUIÇÕES',
    titulo: 'Tenho um desafio para resolver',
    descricao:
      'Apresente um problema real que dependa de pesquisa, desenvolvimento tecnológico ou inovação. O comitê avalia e indica o Núcleo de Referência.',
    formulario: 'Termo de Apresentação de Desafio',
    botao: 'Apresentar desafio',
    href: '/inscricoes/desafio',
  },
  {
    numero: '02',
    publico: 'PESQUISADORES E PESQUISADORAS',
    titulo: 'Quero integrar o Banco de Competências dos Pesquisadores',
    descricao:
      'É o banco de dados com o perfil, a formação e as competências dos pesquisadores do Piauí. Cadastre-se e seja chamado(a) para resolver desafios nos 7 Núcleos de Referência. Já são 475 pesquisadores de 9 instituições.',
    formulario: 'Cadastro em 8 seções',
    botao: 'Cadastrar perfil',
    href: '/inscricoes/banco-de-competencias',
  },
]

const CAMINHOS = [
  {
    nome: 'Desafios',
    publico: 'Empresas, órgãos públicos e instituições',
    passos: [
      ['Preencha o termo', 'Descreva o problema, o contexto e o resultado esperado.'],
      ['Receba o protocolo', 'O número do termo chega no seu e-mail.'],
      ['Avaliação do comitê', 'O desafio é analisado e ligado a um Núcleo de Referência.'],
      ['Seleção da equipe', 'Pesquisadores do banco são chamados para o desafio.'],
    ],
  },
  {
    nome: 'Pesquisadores',
    publico: 'Banco de Competências dos Pesquisadores',
    passos: [
      ['Preencha o cadastro', 'Vínculo, formação, Lattes e competências em PD&I.'],
      ['Receba o protocolo', 'A confirmação do cadastro chega no seu e-mail.'],
      ['Validação do perfil', 'O comitê confere o Lattes e os núcleos indicados.'],
      ['Entrada no banco', 'Seu perfil fica disponível para os desafios do núcleo.'],
    ],
  },
]

const REQUISITOS = [
  {
    icone: iconeDesafios,
    titulo: 'Desafios — empresas e instituições',
    borda: 'border-gold-600',
    itens: [
      'Para instituições, órgãos públicos e empresas com um problema real.',
      'O problema deve demandar pesquisa, desenvolvimento tecnológico ou inovação.',
      'O termo pede título, identificação e participação prevista da entidade.',
      'Descrição do problema, contexto no Piauí e resultado esperado.',
      'Potencial de inovação e Núcleo(s) sugerido(s), que o comitê confirma.',
    ],
  },
  {
    icone: iconeBanco,
    titulo: 'Banco de Competências dos Pesquisadores',
    borda: 'border-green-600',
    itens: [
      'Para docentes, pesquisadores, pós-doutorandos, técnicos e bolsistas de PD&I.',
      'Com vínculo em universidades, institutos e ICTs que atuam no Piauí.',
      'O cadastro pede dados pessoais, vínculo institucional e Currículo Lattes.',
      'Formação, linhas de pesquisa e nível de atuação em cada um dos 7 núcleos.',
      'Inovação, infraestrutura, redes de parceria, demandas e gargalos.',
    ],
  },
]

const PERGUNTAS = [
  {
    pergunta: 'Existe prazo para se inscrever?',
    resposta:
      'Não. As duas chamadas são abertas e permanentes: os formulários ficam disponíveis o tempo todo, e cada inscrição é analisada depois de enviada.',
  },
  {
    pergunta: 'Como acompanho minha inscrição?',
    resposta:
      'Entre com a sua conta, usando o e-mail e o número de protocolo recebidos na inscrição, para acompanhar o andamento do seu desafio ou do seu cadastro de pesquisador.',
  },
  {
    pergunta: 'Quem pode se cadastrar no Banco de Competências dos Pesquisadores?',
    resposta:
      'Docentes, pesquisadores, pós-doutorandos, técnicos e bolsistas de PD&I com vínculo em universidades, institutos e ICTs que atuam no Piauí.',
  },
  {
    // Resposta não consta no Figma: texto provisório até a equipe do programa definir.
    pergunta: 'Posso inscrever um desafio e também me cadastrar como pesquisador(a)?',
    resposta: 'Resposta em definição pela equipe do programa.',
  },
]

/** Título com a última palavra em dourado, padrão desta página. */
function Titulo({ inicio, destaque, claro = false, className = '' }: { inicio: string; destaque: string; claro?: boolean; className?: string }) {
  return (
    <h2 className={`font-display font-extrabold ${claro ? 'text-white' : 'text-green-900'} ${className}`}>
      {inicio} <span className={claro ? 'text-yellow-500' : 'text-gold-600'}>{destaque}</span>
    </h2>
  )
}

function EyebrowDourado({ children }: { children: string }) {
  return (
    <Eyebrow ponto={pontoDourado} className="bg-yellow-100 text-[#8a6508]">
      {children}
    </Eyebrow>
  )
}

function TopoInscricoes() {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-[#fffbeb] via-yellow-100 via-55% to-[#f8e3a0] pt-9 pb-10">
      <img src={decorTopo} alt="" className="pointer-events-none absolute -top-[260px] left-0 h-[640px] w-[1600px] max-w-none" />
      <Container largo className="relative flex flex-col gap-5">
        <Trilha claro itens={[{ label: 'Inscrições' }]} />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-[32px] font-extrabold text-green-900 md:text-[40px]">Inscrições</h1>
          <Link
            to="/entrar"
            className="flex items-center gap-2 rounded-full border-[1.5px] border-green-700 bg-background py-[9px] pr-[18px] pl-4 text-[14px] font-semibold text-green-700 hover:bg-green-50"
          >
            <img src={iconeEntrarVerde} alt="" className="size-4" />
            Acompanhar inscrição
          </Link>
        </div>
        <p className="text-[15px] leading-[1.5] text-[#2b2a14]">
          Duas chamadas abertas e permanentes do Programa Mais Inovação: empresas, órgãos públicos e instituições apresentam desafios, e
          pesquisadores se cadastram no Banco de Competências dos Pesquisadores dos 7 Núcleos de Referência em P&D. Não há prazo final:
          inscreva-se quando quiser e acompanhe cada etapa com o número de protocolo.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {INDICADORES.map((kpi) => (
            <div key={kpi.unidade} className="flex items-center gap-3.5 rounded-xl border border-gold-600/22 bg-white/60 px-5 py-4">
              <span className="shrink-0 rounded-[10px] bg-green-900 p-2.5">
                <img src={kpi.icone} alt="" className="size-5" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="flex items-center gap-1.5 text-green-900">
                  <span className="font-display text-[22px] font-bold">{kpi.valor}</span>
                  <span className="text-[14px] font-medium">{kpi.unidade}</span>
                </span>
                <span className="text-[12px] text-muted">{kpi.legenda}</span>
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function EscolhaChamada() {
  return (
    <section className="pt-20">
      <Container largo className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-12">
          <Titulo inicio="Escolha sua" destaque="chamada" className="flex-1 text-[28px] md:text-[32px]" />
          <p className="text-[15px] leading-[1.5] text-muted lg:w-[460px]">
            Duas portas de entrada para o mesmo programa: quem tem o problema e quem tem o conhecimento para resolvê-lo.
          </p>
        </div>
        <ul className="border-b border-border">
          {CHAMADAS.map((c) => (
            <li
              key={c.numero}
              className="group flex flex-col gap-6 rounded-2xl border-t border-border px-6 py-9 transition-colors duration-200 ease-out hover:bg-surface lg:flex-row lg:items-center lg:gap-10"
            >
              <p className="w-[92px] shrink-0 font-display text-[56px] font-extrabold text-gold-600 transition-colors duration-200 group-hover:text-green-900">
                {c.numero}
              </p>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p className="text-[12px] font-semibold tracking-[0.96px] text-muted">{c.publico}</p>
                <h3 className="font-display text-[22px] font-bold text-green-900 md:text-[26px]">{c.titulo}</h3>
                <p className="text-[15px] leading-[1.5] text-muted">{c.descricao}</p>
              </div>
              <dl className="flex shrink-0 flex-col gap-3.5 border-border lg:w-[300px] lg:border-l lg:pl-6">
                {[
                  ['Formulário', c.formulario],
                  ['Quem avalia', 'Comitê do programa'],
                ].map(([rotulo, valor]) => (
                  <div key={rotulo} className="flex flex-col gap-0.5">
                    <dt className="text-[12px] text-muted">{rotulo}</dt>
                    <dd className="text-[14px] leading-[1.4] font-semibold text-ink">{valor}</dd>
                  </div>
                ))}
              </dl>
              <Link
                to={c.href}
                className="relative flex w-[220px] shrink-0 items-center justify-center gap-2 rounded-full bg-green-900 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 group-hover:bg-yellow-500 group-hover:text-green-900"
              >
                {c.botao}
                <span className="relative size-4">
                  <img src={setaDiagonal} alt="" className="absolute inset-0 transition-opacity group-hover:opacity-0" />
                  <img src={setaDiagonalEscura} alt="" className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function ComoFuncionaInscricao() {
  return (
    <section className="py-20">
      <Container largo className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Titulo inicio="Como funciona a" destaque="inscrição" className="text-[26px] font-bold" />
          <p className="max-w-[760px] text-[16px] leading-[1.5] text-muted">
            Cada chamada segue seu próprio caminho até a etapa 5, quando os dois se encontram.
          </p>
        </div>
        <div className="flex flex-col gap-4 xl:flex-row">
          <div className="min-w-0 flex-1 overflow-x-auto">
            <div className="min-w-[860px]">
              <div className="flex items-end pb-1">
                <div className="w-[210px] shrink-0" />
                {['01', '02', '03', '04'].map((n) => (
                  <div key={n} className="flex flex-1 flex-col gap-2.5 pr-5">
                    <p className="font-display text-[14px] font-bold text-gold-600">{n}</p>
                    <span className="h-0.5 rounded-[1px] bg-gold-600/35" />
                  </div>
                ))}
              </div>
              {CAMINHOS.map((caminho, i) => (
                <div key={caminho.nome} className={`flex py-7 ${i === 0 ? 'border-b border-border' : ''}`}>
                  <div className="flex w-[210px] shrink-0 flex-col gap-1 pr-6">
                    <h3 className="font-display text-[18px] font-bold text-green-900">{caminho.nome}</h3>
                    <p className="text-[13px] leading-[1.45] text-muted">{caminho.publico}</p>
                  </div>
                  {caminho.passos.map(([titulo, texto]) => (
                    <div key={titulo} className="flex flex-1 flex-col gap-1.5 pr-5">
                      <p className="text-[15px] leading-[1.35] font-semibold text-green-900">{titulo}</p>
                      <p className="text-[13px] leading-[1.5] text-muted">{texto}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 flex-col xl:w-[300px]">
            <div className="flex flex-col gap-2.5 pb-1">
              <p className="font-display text-[14px] font-bold text-gold-600">05</p>
              <span className="h-0.5 rounded-[1px] bg-gold-600/35" />
            </div>
            <div className="mt-[34px] flex flex-1 flex-col justify-center gap-2.5 rounded-2xl bg-yellow-50 px-6 py-7">
              <p className="text-[11px] font-semibold tracking-[0.88px] text-[#8a6508]">OS DOIS CAMINHOS SE ENCONTRAM</p>
              <h3 className="font-display text-[22px] font-bold text-green-900">Trabalho conjunto</h3>
              <p className="text-[14px] leading-[1.5] text-ink">
                Os pesquisadores selecionados no Banco de Competências dos Pesquisadores e a entidade demandante desenvolvem a solução
                juntos, com acompanhamento do núcleo.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function AntesDeInscrever() {
  return (
    <section className="bg-surface py-20">
      <Container className="flex flex-col gap-9 xl:px-[98px]">
        <div className="flex flex-col items-start gap-3">
          <EyebrowDourado>Antes de inscrever</EyebrowDourado>
          <Titulo inicio="O que você precisa" destaque="saber" className="text-[28px] md:text-[32px]" />
          <p className="max-w-[760px] text-[16px] leading-[1.5] text-muted">Confira qual chamada é a sua e o que cada formulário vai pedir.</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {REQUISITOS.map((bloco) => (
            <div key={bloco.titulo} className={`flex flex-col gap-4 border-l-3 py-1 pl-6 ${bloco.borda}`}>
              <h3 className="flex items-center gap-2.5 font-display text-[19px] font-bold text-green-900">
                <img src={bloco.icone} alt="" className="size-[22px]" />
                {bloco.titulo}
              </h3>
              <ul className="flex flex-col gap-4">
                {bloco.itens.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.5] text-ink">
                    <img src={iconeCheck} alt="" className="mt-0.5 size-[18px] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Acompanhe() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(159.2deg,#483206_0%,#a57e0c_100%)] py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img src={anel1} alt="" className="absolute -top-[270px] left-[1050px] size-[620px] max-w-none" />
        <img src={anel2} alt="" className="absolute -top-[180px] left-[1140px] size-[440px] max-w-none" />
        <img src={anel3} alt="" className="absolute -top-[90px] left-[1230px] size-[260px] max-w-none" />
        <p className="absolute top-[253px] -left-6 font-display text-[200px] leading-[0.8] font-extrabold whitespace-nowrap text-white/4">
          INSCRIÇÃO
        </p>
      </div>
      <Container largo className="relative">
        <div className="flex max-w-[560px] flex-col items-start gap-5">
          <div className="flex flex-col items-start gap-3">
            <Eyebrow ponto={pontoAmarelo} className="bg-white/12 text-yellow-500">
              Depois de inscrever
            </Eyebrow>
            <Titulo inicio="Acompanhe sua" destaque="inscrição" claro className="text-[28px] md:text-[32px]" />
            <p className="text-[16px] leading-[1.5] text-white/88">
              Entre com a sua conta para acompanhar o andamento do seu desafio ou do seu cadastro de pesquisador.
            </p>
          </div>
          <Link
            to="/entrar"
            className="flex items-center gap-2 rounded-full bg-background px-[22px] py-3.5 text-[15px] font-semibold text-ink hover:bg-yellow-50"
          >
            <img src={iconeEntrarEscuro} alt="" className="size-4" />
            Entrar para acompanhar
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default function InscricoesVisao() {
  return (
    <>
      <FaixaMarca />
      <TopoInscricoes />
      <EscolhaChamada />
      <ComoFuncionaInscricao />
      <AntesDeInscrever />
      <Acompanhe />
      <section className="bg-surface py-20">
        <Container largo className="flex flex-col gap-9">
          <div className="flex flex-col items-start gap-3">
            <EyebrowDourado>Dúvidas</EyebrowDourado>
            <Titulo inicio="Perguntas" destaque="frequentes" className="text-[28px] md:text-[32px]" />
          </div>
          <Acordeao itens={PERGUNTAS} espacamento="py-5" className="rounded-3xl border border-yellow-100 px-6" />
        </Container>
      </section>
    </>
  )
}
