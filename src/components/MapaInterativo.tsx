import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react'

export type MunicipioMapa = { nome: string; total: number }
type Dica = MunicipioMapa & { x: number; y: number }

/** Sobe do elemento sob o cursor até o <path>/<g> com id "Município (N)". */
function municipioDe(alvo: EventTarget, raiz: Element): MunicipioMapa | null {
  for (let el = alvo as Element | null; el && el !== raiz; el = el.parentElement) {
    const casamento = /^(.*) \((\d+)\)$/.exec(el.id)
    if (casamento) return { nome: casamento[1], total: Number(casamento[2]) }
  }
  return null
}

type MapaInterativoProps = {
  svg: string
  rotulo: string
  className?: string
  /** Município com contorno dourado. */
  selecionado?: string
  /** Com este callback, o hover é tratado fora (cartão de detalhe) e a dica interna não aparece. */
  aoPassar?: (municipio: MunicipioMapa | null) => void
  aoEscolher?: (municipio: MunicipioMapa) => void
}

/**
 * Mapa coroplético exportado do Figma. Cada <path> tem id "Município (N)",
 * então o hover mostra o total de pesquisadores sem precisar de outra fonte.
 */
export function MapaInterativo({ svg, rotulo, className = '', selecionado, aoPassar, aoEscolher }: MapaInterativoProps) {
  const [dica, setDica] = useState<Dica | null>(null)
  const svgRef = useRef<HTMLDivElement>(null)
  const ultimo = useRef<string | null>(null)
  // Troca o tamanho fixo da tag <svg> (só ela) para acompanhar a largura do container.
  const html = useMemo(
    () => svg.replace(/<svg[^>]*>/, (tag) => tag.replace(/\s(width|height)="[\d.]+"/g, '').replace('<svg', '<svg width="100%"')),
    [svg],
  )

  useEffect(() => {
    const raiz = svgRef.current
    if (!raiz) return
    raiz.querySelectorAll('[data-selecionado]').forEach((el) => el.removeAttribute('data-selecionado'))
    if (!selecionado) return
    const alvo = Array.from(raiz.querySelectorAll('[id]')).find((el) => el.id.startsWith(`${selecionado} (`))
    if (!alvo) return
    alvo.setAttribute('data-selecionado', '')
    // Último filho é desenhado por cima: o contorno não fica escondido pelos vizinhos.
    alvo.parentNode?.appendChild(alvo)
  }, [html, selecionado])

  function aoMover(e: MouseEvent<HTMLDivElement>) {
    const municipio = municipioDe(e.target, e.currentTarget)
    if (aoPassar) {
      if (municipio?.nome !== ultimo.current) aoPassar(municipio)
      ultimo.current = municipio?.nome ?? null
      return
    }
    if (!municipio) return setDica(null)
    const caixa = e.currentTarget.getBoundingClientRect()
    setDica({ ...municipio, x: e.clientX - caixa.left, y: e.clientY - caixa.top })
  }

  function aoSair() {
    setDica(null)
    if (aoPassar && ultimo.current !== null) aoPassar(null)
    ultimo.current = null
  }

  function aoClicar(e: MouseEvent<HTMLDivElement>) {
    const municipio = aoEscolher && municipioDe(e.target, e.currentTarget)
    if (municipio) aoEscolher(municipio)
  }

  return (
    <div
      role="img"
      aria-label={rotulo}
      className={`relative [&_[data-selecionado]]:stroke-gold-500 [&_[data-selecionado]]:[stroke-width:2.5] [&_[data-selecionado]_path]:stroke-gold-500 [&_[data-selecionado]_path]:[stroke-width:2.5] [&_path:hover]:brightness-90 [&_path]:transition-[filter] ${aoEscolher ? '[&_path]:cursor-pointer' : ''} ${className}`}
      onMouseMove={aoMover}
      onMouseLeave={aoSair}
      onClick={aoClicar}
    >
      <div ref={svgRef} dangerouslySetInnerHTML={{ __html: html }} />
      {dica && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-lg bg-green-900 px-3 py-2 text-[12px] whitespace-nowrap text-white shadow-card-sm"
          style={{ left: dica.x, top: dica.y }}
        >
          <span className="font-semibold">{dica.nome}</span>
          <span className="text-green-200">
            {' · '}
            {dica.total === 0 ? 'sem pesquisadores' : `${dica.total} ${dica.total === 1 ? 'pesquisador' : 'pesquisadores'}`}
          </span>
        </div>
      )}
    </div>
  )
}

/** Posição dos nomes de cidade no quadro de 600×763 do Figma. */
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

type MapaPiauiProps = Omit<MapaInterativoProps, 'className'> & { children?: ReactNode }

/** Mapa do Piauí no quadro do Figma (mapa à direita, 520 de 600px) com os nomes das cidades principais. */
export function MapaPiaui({ children, ...mapa }: MapaPiauiProps) {
  return (
    <div className="relative aspect-[600/763] w-full">
      {/* Wrapper posicionado: o MapaInterativo é `relative` (âncora da dica) e anularia um `absolute` vindo do className. */}
      <div className="absolute top-0 right-0 w-[86.67%]">
        <MapaInterativo {...mapa} />
      </div>
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
      {children}
    </div>
  )
}

const FAIXAS: [minimo: number, cor: string, rotulo: string][] = [
  [0, 'bg-[#e4ebe6]', 'Sem pesquisadores'],
  [1, 'bg-green-200', '1–5'],
  [6, 'bg-green-400', '6–10'],
  [11, 'bg-green-600', '11–20'],
  [21, 'bg-green-800', '21–50'],
  [51, 'bg-green-900', '51 ou mais'],
]

/** Cor da faixa do mapa para um total (a mesma da legenda). */
export const corFaixa = (total: number) => [...FAIXAS].reverse().find(([minimo]) => total >= minimo)![1]

export function LegendaMapa() {
  return (
    <ul className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
      <li className="text-[12px] font-semibold text-ink">Pesquisadores por município</li>
      {FAIXAS.map(([, cor, rotulo]) => (
        <li key={rotulo} className="flex items-center gap-1.5 text-[12px] text-muted">
          <span className={`size-3.5 rounded-[3px] ${cor}`} />
          {rotulo}
        </li>
      ))}
    </ul>
  )
}
