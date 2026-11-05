import { useId, useState } from 'react'
import chevronBaixo from '../assets/faq/chevron-baixo.svg'
import chevronCima from '../assets/faq/chevron-cima.svg'

export type ItemAcordeao = { pergunta: string; resposta: string }

type AcordeaoProps = {
  itens: ItemAcordeao[]
  /** Classes do cartão que envolve as perguntas (borda, raio, padding lateral). */
  className: string
  /** Padding vertical de cada pergunta. */
  espacamento?: string
}

/** Lista de perguntas frequentes; uma aberta por vez, a primeira começa aberta. */
export function Acordeao({ itens, className, espacamento = 'py-[22px]' }: AcordeaoProps) {
  const [aberta, setAberta] = useState<number | null>(0)
  const id = useId()

  return (
    <div className={`min-w-0 bg-background ${className}`}>
      {itens.map((item, i) => {
        const estaAberta = aberta === i
        const idResposta = `${id}-resposta-${i}`
        return (
          <div key={item.pergunta} className={`${espacamento} ${i > 0 ? 'border-t border-border' : ''}`}>
            <h3>
              <button
                type="button"
                aria-expanded={estaAberta}
                aria-controls={idResposta}
                onClick={() => setAberta(estaAberta ? null : i)}
                className="flex w-full items-center gap-3 text-left"
              >
                <span className="flex-1 text-[16px] font-semibold text-ink">{item.pergunta}</span>
                <img src={estaAberta ? chevronCima : chevronBaixo} alt="" className="size-5 shrink-0" />
              </button>
            </h3>
            <div
              id={idResposta}
              inert={!estaAberta}
              className={`grid transition-[grid-template-rows] duration-300 ${estaAberta ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <p className="overflow-hidden text-[15px] leading-[1.5] text-muted">
                <span className="block pt-2">{item.resposta}</span>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
