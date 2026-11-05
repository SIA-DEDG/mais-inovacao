import decorPlusClaro from '../assets/cta/decor-plus-claro.svg'
import decorPlusEscuro from '../assets/cta/decor-plus-escuro.svg'
import iconeSeta from '../assets/hero/icone-seta.svg'
import { BotaoPilula, Container } from './ui'

const TEMAS = {
  escuro: { banner: 'bg-green-800', titulo: 'text-white', descricao: 'text-green-200', decor: decorPlusEscuro },
  claro: { banner: 'bg-green-100', titulo: 'text-green-900', descricao: 'text-[#40544a]', decor: decorPlusClaro },
}

type CtaBannerProps = {
  tema: keyof typeof TEMAS
  titulo: string
  descricao: string
  botao: { label: string; href: string }
  className?: string
}

export function CtaBanner({ tema, titulo, descricao, botao, className = '' }: CtaBannerProps) {
  const cores = TEMAS[tema]
  return (
    <section className={`bg-background ${className}`}>
      <Container>
        <div
          className={`relative flex flex-col items-start gap-8 overflow-hidden rounded-[32px] px-8 py-12 md:flex-row md:items-center md:justify-between md:px-14 ${cores.banner}`}
        >
          <img src={cores.decor} alt="" className="absolute top-10 -right-[60px] hidden size-80 max-w-none md:block" />
          <div className="relative flex max-w-[997px] flex-col gap-2.5">
            <h2 className={`font-display text-[26px] font-bold tracking-[-0.32px] md:text-[32px] ${cores.titulo}`}>
              {titulo}
            </h2>
            <p className={`text-[16px] ${cores.descricao}`}>{descricao}</p>
          </div>
          <BotaoPilula href={botao.href} seta={iconeSeta} className="relative">
            {botao.label}
          </BotaoPilula>
        </div>
      </Container>
    </section>
  )
}
