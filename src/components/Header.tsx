import { Link, NavLink } from 'react-router'
import iconeBusca from '../assets/header/icone-busca.svg'
import iconeChevron from '../assets/header/icone-chevron.svg'
import iconeEntrar from '../assets/header/icone-entrar.svg'
import iconeMic from '../assets/header/icone-mic.svg'
import logoMaisInovacao from '../assets/header/logo-mais-inovacao.png'
import logoSia from '../assets/header/logo-sia.png'

const MENU = [
  { label: 'Início', href: '/' },
  { label: 'Núcleos', href: '/nucleos' },
  { label: 'Inscrições', href: '/inscricoes' },
  { label: 'Relatórios', href: '/relatorios' },
  { label: 'Pesquisadores', href: '/pesquisadores' },
]

function BotaoAcessibilidade({ label, descricao }: { label: string; descricao: string }) {
  return (
    <button
      type="button"
      aria-label={descricao}
      className="flex size-8 items-center justify-center rounded bg-background font-display text-[14px] tracking-[0.4px] text-[#262626] shadow-[0_4px_2px_rgb(0_0_0/0.1)]"
    >
      {label}
    </button>
  )
}

export function Header() {
  return (
    <header>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4 bg-green-50 px-4 py-2 sm:px-12">
        <div className="flex items-center gap-2 font-display text-[14px] font-semibold text-[#404040]">
          <a
            href="#"
            className="flex h-8 items-center rounded-lg bg-background px-4 drop-shadow-[0_0_2px_rgb(135_135_135/0.25)]"
          >
            Site SIA
          </a>
          <span className="h-5 w-px bg-[#bfbfbf]" />
          <button type="button" className="flex h-10 items-center gap-2 px-4">
            Projetos
            <img src={iconeChevron} alt="" className="size-4" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={logoSia}
            alt="Secretaria de Inteligência Artificial, Economia Digital, Ciência, Tecnologia e Inovação – SIA · Governo do Piauí"
            className="h-12 w-[173px]"
          />
          <div className="flex items-center gap-2">
            <BotaoAcessibilidade label="A-" descricao="Diminuir fonte" />
            <BotaoAcessibilidade label="A+" descricao="Aumentar fonte" />
          </div>
        </div>
      </div>

      <div className="flex h-[100px] items-center gap-8 bg-background px-4 py-3 sm:px-12">
        <div className="flex flex-1 items-center">
          <Link to="/">
            <img src={logoMaisInovacao} alt="Projeto Mais Inovação — início" className="h-[76px] w-[151px]" />
          </Link>
        </div>
        <form role="search" className="hidden w-[320px] md:block" onSubmit={(e) => e.preventDefault()}>
          <label className="flex min-h-10 items-center gap-2 rounded border border-[#404040] bg-[#f9fcff] px-4 py-2">
            <img src={iconeBusca} alt="" className="size-5" />
            <input
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
              className="min-w-0 flex-1 bg-transparent font-display text-[14px] tracking-[0.4px] text-[#404040] outline-none placeholder:text-[#bfbfbf]"
            />
            <button type="button" aria-label="Buscar por voz">
              <img src={iconeMic} alt="" className="size-5" />
            </button>
          </label>
        </form>
        <div className="flex flex-1 items-center justify-end">
          <Link
            to="/entrar"
            className="flex items-center gap-3 rounded-md bg-green-700 py-[6.5px] pr-5 pl-4 text-white transition-colors hover:bg-green-800"
          >
            <img src={iconeEntrar} alt="" className="size-[18px]" />
            <span className="flex flex-col">
              <span className="text-[11px] leading-[13px]">Já participa?</span>
              <span className="text-[14px] leading-[18px] font-bold">Entrar</span>
            </span>
          </Link>
        </div>
      </div>

      <nav aria-label="Principal" className="overflow-x-auto bg-green-800 px-8">
        <ul className="mx-auto flex w-max items-center gap-2">
          {MENU.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  `group flex h-14 items-center px-4 font-display text-[14px] font-semibold whitespace-nowrap ${
                    isActive ? 'border-b-3 border-[#e3f8ec] bg-green-900 text-gold-300' : 'text-[#d7e6db]'
                  }`
                }
              >
                {({ isActive }) => (
                  <span className={isActive ? '' : 'border-b border-transparent group-hover:border-gold-500'}>{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
