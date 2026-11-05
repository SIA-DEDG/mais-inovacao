import { useState } from 'react'

export type Logo = {
  nome: string
  src: string
  largura: number
  altura: number
}

/**
 * Faixa de logos em rolagem contínua (loop infinito). A lista é renderizada
 * duas vezes e a trilha anda -50%, então cada item precisa carregar o próprio
 * espaçamento (pr) para o ponto de emenda bater exatamente.
 * Pausa no hover/foco e fica estática para quem prefere movimento reduzido.
 */
export function CarrosselLogos({ logos, rotulo }: { logos: Logo[]; rotulo: string }) {
  const [pausado, setPausado] = useState(false)

  return (
    <div role="region" aria-roledescription="carrossel" aria-label={rotulo} className="group relative w-full">
      <button
        type="button"
        onClick={() => setPausado((p) => !p)}
        className="sr-only z-10 rounded-full bg-green-800 px-3 py-1 text-[12px] font-semibold text-white focus:not-sr-only focus:absolute focus:top-1/2 focus:left-1/2 focus:-translate-1/2 motion-reduce:hidden"
      >
        {pausado ? 'Retomar animação' : 'Pausar animação'}
      </button>

      <div className="overflow-hidden">
        <ul
          className="flex w-max animate-carrossel group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6"
          style={pausado ? { animationPlayState: 'paused' } : undefined}
        >
          {[...logos, ...logos].map((logo, i) => {
            const copia = i >= logos.length
            return (
              <li
                key={i}
                aria-hidden={copia || undefined}
                className={`flex h-[84px] shrink-0 items-center pr-24 motion-reduce:px-6 ${copia ? 'motion-reduce:hidden' : ''}`}
              >
                <img
                  src={logo.src}
                  alt={copia ? '' : logo.nome}
                  width={logo.largura}
                  height={logo.altura}
                  draggable={false}
                  className="opacity-80 mix-blend-multiply"
                  style={{ width: logo.largura, height: logo.altura }}
                />
              </li>
            )
          })}
        </ul>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-[120px] bg-linear-to-r from-background to-transparent motion-reduce:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[120px] bg-linear-to-l from-background to-transparent motion-reduce:hidden" />
    </div>
  )
}
