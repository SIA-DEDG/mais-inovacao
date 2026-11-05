import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'

type ContainerProps = { className?: string; largo?: boolean; children: ReactNode }

/** largo: margem de 48px das páginas internas (a landing usa 64px). */
export function Container({ className = '', largo = false, children }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-8 ${largo ? 'lg:px-12' : 'lg:px-16'} ${className}`}>{children}</div>
  )
}

/** Link que usa o roteador para caminhos internos ("/...") e <a> para o resto. */
export function Ligacao({ href, ...props }: ComponentProps<'a'> & { href: string }) {
  return href.startsWith('/') ? <Link to={href} {...props} /> : <a href={href} {...props} />
}

type EyebrowProps = {
  ponto: string
  className: string
  pequeno?: boolean
  children: ReactNode
}

export function Eyebrow({ ponto, className, pequeno = false, children }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
        pequeno ? 'px-2.5 py-1 text-[11px]' : 'px-3.5 py-1.5 text-[12px]'
      } ${className}`}
    >
      <img src={ponto} alt="" className="size-1.5" />
      {children}
    </span>
  )
}

const VARIANTES_BOTAO = {
  ouro: { botao: 'bg-gold-500 text-green-900', circulo: 'bg-green-900' },
  vermelho: { botao: 'bg-red-500 text-white', circulo: 'bg-background' },
}

type BotaoPilulaProps = {
  href: string
  seta: string
  variante?: keyof typeof VARIANTES_BOTAO
  className?: string
  children: ReactNode
}

export function BotaoPilula({ href, seta, variante = 'ouro', className = '', children }: BotaoPilulaProps) {
  const estilo = VARIANTES_BOTAO[variante]
  return (
    <Ligacao
      href={href}
      className={`inline-flex shrink-0 items-center gap-3 rounded-full py-1.5 pr-3.5 pl-6 text-[15px] font-bold whitespace-nowrap transition-[filter] hover:brightness-110 ${estilo.botao} ${className}`}
    >
      {children}
      <span className={`rounded-full p-2 ${estilo.circulo}`}>
        <img src={seta} alt="" className="size-4" />
      </span>
    </Ligacao>
  )
}

/** Link sublinhado com seta que desliza no hover (link/ver equipe e andamento). */
export function LinkSeta({ href, seta, className = '', children }: { href: string; seta: string; className?: string; children: ReactNode }) {
  return (
    <Ligacao
      href={href}
      className={`group/link inline-flex shrink-0 items-center gap-1.5 pr-1 text-[13px] font-semibold whitespace-nowrap text-green-700 underline decoration-1 underline-offset-2 hover:text-green-900 hover:decoration-2 ${className}`}
    >
      {children}
      <img src={seta} alt="" className="size-3.5 transition-transform group-hover/link:translate-x-1" />
    </Ligacao>
  )
}
