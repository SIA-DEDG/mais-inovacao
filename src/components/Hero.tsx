import type { ReactNode } from 'react'
import anelExterno from '../assets/hero/anel-externo.png'
import anelInterno from '../assets/hero/anel-interno.png'
import brilho from '../assets/hero/brilho.svg'
import colmeia from '../assets/hero/colmeia.svg'
import decorPlus from '../assets/hero/decor-plus.svg'
import fotoEstudantes from '../assets/hero/foto-estudantes.jpg'
import iconePin from '../assets/hero/icone-pin.svg'
import iconeSeta from '../assets/hero/icone-seta.svg'
import logoMaisInovacao from '../assets/hero/logo-mais-inovacao.svg'
import mapaPiaui from '../assets/hero/mapa-piaui.webp'
import { BotaoPilula, Container } from './ui'

const AREAS = [
  'Agroindústria e Bioeconomia',
  'Saúde e Biotecnologia',
  'Indústria Verde',
  'Economia Digital',
  'Governo Digital e Infraestrutura',
  'Indústria Mineral',
  'Turismo e Economia Criativa',
]

function CartaoHero({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div className={`absolute flex flex-col gap-2 rounded-[18px] p-4 whitespace-nowrap shadow-card ${className}`}>
      {children}
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(145.84deg,#04331c_0%,#0e5a31_71.43%)]">
      <img src={fotoEstudantes} alt="" className="absolute inset-0 size-full object-cover blur-[2px]" />
      <div className="absolute inset-0 bg-[linear-gradient(145.84deg,rgb(4_51_28/0.7)_0%,rgb(14_90_49/0.7)_71.43%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(4_51_28/0.95)_0%,rgb(4_51_28/0.75)_38%,rgb(9_71_40/0.25)_50%,rgb(9_71_40/0.6)_60%,rgb(9_71_40/0.85)_75%,rgb(9_71_40/0.95)_100%)]" />

      <Container className="relative flex items-center justify-between gap-8 pt-16 pb-[72px]">
        <img src={decorPlus} alt="" className="absolute top-[380px] -left-[120px] size-[420px] max-w-none" />

        <div className="relative flex w-full max-w-[620px] flex-col items-start gap-6">
          <p className="flex items-center gap-2 rounded-full border border-white/18 bg-white/8 py-1.5 pr-3.5 pl-1.5">
            <span className="shrink-0 rounded-full bg-gold-500 px-2.5 py-[3px] text-[11px] font-bold tracking-[0.66px] text-green-900">
              CHAMADA ABERTA
            </span>
            <span className="text-[13px] font-medium text-white">Inscrições de desafios sem prazo final</span>
          </p>

          <h1>
            <img src={logoMaisInovacao} alt="Projeto Mais Inovação" className="h-[170px] w-[344px]" />
          </h1>

          <p className="font-display text-[22px] leading-[1.35] font-semibold text-green-100">
            Ciência, tecnologia e inovação a serviço dos desafios reais do Piauí.
          </p>
          <p className="text-[16px] leading-[1.6] text-green-200">
            O Mais Inovação é um programa do Governo do Piauí que conecta quem tem um problema real a quem pode
            resolvê-lo. Sua empresa ou instituição inscreve o desafio, e pesquisadores das universidades e institutos
            do estado desenvolvem a solução com você.
          </p>

          <BotaoPilula href="/inscricoes" seta={iconeSeta}>
            Inscrever desafio
          </BotaoPilula>

          <ul className="flex flex-wrap gap-2">
            {AREAS.map((area) => (
              <li key={area} className="rounded-full border border-white/25 px-3 py-1.5 text-[12px] font-medium text-green-100">
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative hidden h-[580px] w-[600px] shrink-0 xl:block">
          <img src={brilho} alt="" className="absolute top-[10px] left-[20px] size-[560px]" />
          <img src={anelExterno} alt="" className="absolute top-[55px] left-[65px] size-[470px]" />
          <img src={anelInterno} alt="" className="absolute top-[100px] left-[110px] size-[380px]" />
          <div className="absolute top-[32px] left-[117px] h-[510px] w-[354px] overflow-hidden drop-shadow-[2px_4px_50px_rgb(0_0_0/0.25)]">
            <img
              src={mapaPiaui}
              alt="Mapa do Piauí com ilustrações de ciência e tecnologia"
              className="absolute top-[-2.42%] left-[-90.14%] h-[108.76%] w-[278.26%] max-w-none"
            />
          </div>

          <CartaoHero className="top-[70px] -left-[10px] w-[210px] bg-background">
            <span className="text-[12px] font-medium text-muted">Pesquisadores</span>
            <span className="font-display text-[32px] font-extrabold text-green-800">475</span>
            <span className="text-[11px] text-muted">no Piauí</span>
          </CartaoHero>

          <CartaoHero className="top-[40px] left-[410px] w-[200px] bg-background">
            <span className="text-[12px] font-medium text-muted">Núcleos temáticos</span>
            <span className="flex items-center gap-3">
              <span className="font-display text-[32px] font-extrabold text-green-800">7</span>
              <img src={colmeia} alt="" className="h-[39px] w-[41px]" />
            </span>
            <span className="text-[11px] text-muted">áreas estratégicas do estado</span>
          </CartaoHero>

          <CartaoHero className="top-[430px] left-[400px] w-[210px] bg-gold-500 text-green-900">
            <span className="text-[12px] font-semibold">Instituições parceiras</span>
            <span className="font-display text-[32px] font-extrabold">9</span>
            <span className="text-[11px] font-medium">UFPI · UESPI · IFPI e mais 6</span>
          </CartaoHero>

          <div className="absolute top-[440px] left-[10px] flex items-center gap-2 rounded-full bg-background py-2 pr-3.5 pl-2 shadow-card">
            <span className="rounded-full bg-green-100 p-1.5">
              <img src={iconePin} alt="" className="size-3.5" />
            </span>
            <span className="flex flex-col whitespace-nowrap">
              <span className="text-[12px] font-bold text-ink">Todo o Piauí</span>
              <span className="text-[11px] text-muted">21 municípios com pesquisadores</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
