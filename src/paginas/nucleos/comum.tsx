import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router'
import chevronCima from '../../assets/comum/chevron-cima-verde.svg'
import setaDourada from '../../assets/comum/seta-dourada-pequena.svg'
import setaVoltarVerde from '../../assets/comum/seta-voltar-verde.svg'
import kpiDesafios from '../../assets/nucleos/kpi-desafios.svg'
import kpiMunicipios from '../../assets/nucleos/kpi-municipios.svg'
import kpiNucleos from '../../assets/nucleos/kpi-nucleos.svg'
import kpiPesquisadores from '../../assets/nucleos/kpi-pesquisadores.svg'
import { IndicadorTopo, TopoPagina, type ItemTrilha } from '../../components/pagina'
import { Container } from '../../components/ui'
import { NUCLEOS } from '../../dados/nucleos'

export function TopoNucleos({ trilha }: { trilha: ItemTrilha[] }) {
  return (
    <TopoPagina
      trilha={trilha}
      titulo="Núcleos estratégicos"
      descricao="O Mais Inovação organiza a pesquisa em 7 áreas estratégicas para o desenvolvimento do Piauí. Cada núcleo reúne desafios do estado e as equipes de pesquisadores que trabalham neles."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <IndicadorTopo icone={kpiNucleos} valor="7" unidade="núcleos" legenda="áreas estratégicas do estado" />
        <IndicadorTopo icone={kpiPesquisadores} valor="435" unidade="pesquisadores" legenda="vinculados a pelo menos um núcleo" />
        <IndicadorTopo icone={kpiDesafios} valor="28" unidade="desafios" legenda="distribuídos entre os 7 núcleos" />
        <IndicadorTopo icone={kpiMunicipios} valor="21" unidade="municípios" legenda="do Piauí com pesquisadores nos núcleos" />
      </div>
    </TopoPagina>
  )
}

type SeletorProps = { ativo: string; rotulo: string; voltarPara: { href: string; label: string } }

/** Seletor de núcleos que acompanha a rolagem nas páginas de núcleo e de desafio. */
export function SeletorNucleos({ ativo, rotulo, voltarPara }: SeletorProps) {
  const [aberto, setAberto] = useState(true)
  const idLista = useId()
  return (
    <div className="z-20 border-b border-border bg-background py-5 shadow-[0_4px_12px_rgb(10_41_23/0.06)] lg:sticky lg:top-0">
      <Container largo className="flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            aria-expanded={aberto}
            aria-controls={idLista}
            onClick={() => setAberto((a) => !a)}
            className="-mx-2 -my-1 flex flex-wrap items-center gap-2 rounded-lg px-2 py-1 text-left hover:bg-green-50"
          >
            <span className="text-[12px] font-bold tracking-[0.72px] text-green-700">NÚCLEO SELECIONADO</span>
            <span className="text-[13px] text-muted">· {rotulo}</span>
            <img
              src={chevronCima}
              alt=""
              className={`size-3.5 transition-transform duration-300 ${aberto ? '' : 'rotate-180'}`}
            />
            <span className="sr-only">{aberto ? '(ocultar a lista de núcleos)' : '(mostrar a lista de núcleos)'}</span>
          </button>
          <Link
            to={voltarPara.href}
            className="flex items-center gap-2 rounded-full border-[1.5px] border-green-700 bg-background py-[9px] pr-[18px] pl-4 text-[14px] font-semibold text-green-700 hover:bg-green-50"
          >
            <img src={setaVoltarVerde} alt="" className="size-4" />
            {voltarPara.label}
          </Link>
        </div>
        {/* Só a lista recolhe; o rótulo e o botão de voltar continuam visíveis. */}
        <div
          id={idLista}
          inert={!aberto}
          className={`grid transition-[grid-template-rows] duration-300 ${aberto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-wrap gap-2 pt-3.5">
              {NUCLEOS.map((nucleo) => {
                const selecionado = nucleo.slug === ativo
                return (
                  <li key={nucleo.slug}>
                    <Link
                      to={`/nucleos/${nucleo.slug}`}
                      aria-current={selecionado ? 'page' : undefined}
                      className={`flex items-center gap-2 rounded-full border py-2.5 pr-4 pl-3.5 whitespace-nowrap ${
                        selecionado ? 'border-green-800 bg-green-800' : 'border-border bg-background hover:border-green-200 hover:bg-green-50'
                      }`}
                    >
                      <span className={`text-[12px] font-bold ${selecionado ? 'text-yellow-500' : 'text-muted'}`}>{nucleo.numero}</span>
                      <span className={`text-[14px] font-semibold ${selecionado ? 'text-white' : 'text-green-800'}`}>{nucleo.nome}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}

export function CtaDesafios() {
  return (
    <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-green-800 px-6 py-8 md:flex-row md:items-center md:px-10">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-[24px] font-bold text-white">Sua empresa tem um desafio?</h2>
        <p className="text-[14px] text-green-200">
          As inscrições são em chamada aberta, sem prazo final. Inscreva o desafio e acompanhe cada etapa pelo protocolo.
        </p>
      </div>
      <Link
        to="/inscricoes"
        className="flex shrink-0 items-center gap-2.5 rounded-full bg-gold-500 py-3 pr-3 pl-5 text-[14px] font-bold text-green-900 transition-[filter] hover:brightness-110"
      >
        Inscrever desafio
        <span className="rounded-full bg-green-900 p-[7px]">
          <img src={setaDourada} alt="" className="size-3.5" />
        </span>
      </Link>
    </div>
  )
}

type Aba = { id: string; label: string }

/** Abas que levam às seções da página e marcam a seção visível durante a rolagem. */
export function Abas({ abas, rotulo }: { abas: Aba[]; rotulo: string }) {
  const [ativa, setAtiva] = useState(abas[0].id)
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.find((e) => e.isIntersecting)
        if (visivel) setAtiva(visivel.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    abas.forEach(({ id }) => {
      const secao = document.getElementById(id)
      if (secao) observador.observe(secao)
    })
    return () => observador.disconnect()
  }, [abas])

  return (
    <nav aria-label={rotulo} className="overflow-x-auto border-b border-border bg-background">
      <Container largo className="flex gap-8">
        {abas.map((aba) => (
          <a
            key={aba.id}
            href={`#${aba.id}`}
            aria-current={ativa === aba.id ? 'location' : undefined}
            className={`border-b-3 py-[18px] text-[14px] font-semibold whitespace-nowrap ${
              ativa === aba.id ? 'border-green-700 text-green-800' : 'border-transparent text-muted hover:text-green-800'
            }`}
          >
            {aba.label}
          </a>
        ))}
      </Container>
    </nav>
  )
}
