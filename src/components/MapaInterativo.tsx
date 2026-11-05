import { useMemo, useState, type MouseEvent } from 'react'

type Dica = { nome: string; total: number; x: number; y: number }

/**
 * Mapa coroplético exportado do Figma. Cada <path> tem id "Município (N)",
 * então o hover mostra o total de pesquisadores sem precisar de outra fonte.
 */
export function MapaInterativo({ svg, rotulo, className = '' }: { svg: string; rotulo: string; className?: string }) {
  const [dica, setDica] = useState<Dica | null>(null)
  // Troca o tamanho fixo da tag <svg> (só ela) para acompanhar a largura do container.
  const html = useMemo(
    () => svg.replace(/<svg[^>]*>/, (tag) => tag.replace(/\s(width|height)="[\d.]+"/g, '').replace('<svg', '<svg width="100%"')),
    [svg],
  )

  function aoMover(e: MouseEvent<HTMLDivElement>) {
    const alvo = e.target as Element
    const casamento = alvo.tagName === 'path' ? /^(.*) \((\d+)\)$/.exec(alvo.id) : null
    if (!casamento) return setDica(null)
    const caixa = e.currentTarget.getBoundingClientRect()
    setDica({ nome: casamento[1], total: Number(casamento[2]), x: e.clientX - caixa.left, y: e.clientY - caixa.top })
  }

  return (
    <div
      role="img"
      aria-label={rotulo}
      className={`relative [&_path:hover]:brightness-90 [&_path]:transition-[filter] ${className}`}
      onMouseMove={aoMover}
      onMouseLeave={() => setDica(null)}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
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
