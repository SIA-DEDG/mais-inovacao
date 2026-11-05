import { useEffect, useId, useRef, useState, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router'
import checkBranco from '../assets/form/check-branco.svg'
import chevronBaixo from '../assets/form/chevron-baixo.svg'
import iconeEscudo from '../assets/form/icone-escudo.svg'
import iconeInfo from '../assets/form/icone-info.svg'
import iconeMais from '../assets/form/icone-mais.svg'

/*
 * Componentes do formulário (Figma: "Componentes — formulário de desafio").
 * Os campos são não controlados: o formulário lê os valores no envio.
 */

const CAIXA = 'rounded-xl border border-[#d0d8d3] bg-background transition-[border-color,box-shadow] focus-within:border-green-700 focus-within:ring-3 focus-within:ring-green-100'
const TEXTO_CAMPO = 'w-full bg-transparent text-[15px] leading-[1.5] text-ink outline-none placeholder:text-[#8a9a90]'

export function Rotulo({ htmlFor, obrigatorio, children }: { htmlFor?: string; obrigatorio?: boolean; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="flex gap-1 text-[14px] font-semibold text-ink">
      {children}
      {obrigatorio && (
        <span aria-hidden className="text-gold-600">
          *
        </span>
      )}
    </label>
  )
}

function Ajuda({ id, children, contador }: { id: string; children?: ReactNode; contador?: string }) {
  if (!children && !contador) return null
  return (
    <p id={id} className="flex gap-3 text-[13px]">
      <span className="flex-1 leading-[1.45] text-muted">{children}</span>
      {contador && <span className="shrink-0 text-[#8a9a90]">{contador}</span>}
    </p>
  )
}

type CampoProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  ajuda?: ReactNode
  obrigatorio?: boolean
}

export function Campo({ label, ajuda, obrigatorio = true, className = '', ...input }: CampoProps) {
  const id = useId()
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <Rotulo htmlFor={id} obrigatorio={obrigatorio}>
        {label}
      </Rotulo>
      <div className={`flex items-center gap-2 px-4 py-[9.5px] ${CAIXA}`}>
        <input id={id} required={obrigatorio} aria-describedby={ajuda ? `${id}-ajuda` : undefined} className={TEXTO_CAMPO} {...input} />
      </div>
      <Ajuda id={`${id}-ajuda`}>{ajuda}</Ajuda>
    </div>
  )
}

type SelecaoProps = {
  label: string
  name: string
  opcoes: string[]
  placeholder: string
  ajuda?: ReactNode
  obrigatorio?: boolean
  className?: string
}

/** Seleção de uma opção (select nativo com o visual do campo). */
export function Selecao({ label, name, opcoes, placeholder, ajuda, obrigatorio = true, className = '' }: SelecaoProps) {
  const id = useId()
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <Rotulo htmlFor={id} obrigatorio={obrigatorio}>
        {label}
      </Rotulo>
      <div className={`relative flex items-center ${CAIXA}`}>
        <select
          id={id}
          name={name}
          required={obrigatorio}
          defaultValue=""
          aria-describedby={ajuda ? `${id}-ajuda` : undefined}
          className={`appearance-none py-[9.5px] pr-11 pl-4 invalid:text-[#8a9a90] ${TEXTO_CAMPO}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {opcoes.map((o) => (
            <option key={o} value={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
        <img src={chevronBaixo} alt="" className="pointer-events-none absolute right-4 size-5" />
      </div>
      <Ajuda id={`${id}-ajuda`}>{ajuda}</Ajuda>
    </div>
  )
}

type PerguntaProps = { rotulo: string; descricao?: string; obrigatorio?: boolean; children: ReactNode; className?: string }

/** Grupo de opções (radio ou checkbox) com enunciado, em <fieldset>. */
export function Pergunta({ rotulo, descricao, obrigatorio = false, children, className = '' }: PerguntaProps) {
  return (
    <fieldset className={`flex min-w-0 flex-col ${className}`}>
      <legend className="mb-3 flex flex-col gap-1">
        <span className="flex gap-1 text-[14px] font-semibold text-ink">
          {rotulo}
          {obrigatorio && (
            <span aria-hidden className="text-gold-600">
              *
            </span>
          )}
        </span>
        {descricao && <span className="text-[13px] leading-[1.45] text-muted">{descricao}</span>}
      </legend>
      {children}
    </fieldset>
  )
}

/** Pergunta Sim/Não (ou com "Em parte"), escolha única e obrigatória. */
export function SimNao({ rotulo, name, descricao, opcoes = ['Sim', 'Não'] }: { rotulo: string; name: string; descricao?: string; opcoes?: string[] }) {
  return (
    <Pergunta rotulo={rotulo} descricao={descricao} obrigatorio>
      <div className="flex flex-wrap gap-x-7 gap-y-3">
        {opcoes.map((o) => (
          <Radio key={o} name={name} value={o} rotulo={o} required />
        ))}
      </div>
    </Pergunta>
  )
}

type TextoLongoProps = {
  label: string
  name: string
  placeholder?: string
  ajuda?: ReactNode
  limite?: number
  obrigatorio?: boolean
  className?: string
}

export function TextoLongo({ label, name, placeholder, ajuda, limite = 2000, obrigatorio = true, className = '' }: TextoLongoProps) {
  const id = useId()
  const [tamanho, setTamanho] = useState(0)
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <Rotulo htmlFor={id} obrigatorio={obrigatorio}>
        {label}
      </Rotulo>
      <div className={`flex px-4 py-[13px] ${CAIXA}`}>
        <textarea
          id={id}
          name={name}
          required={obrigatorio}
          maxLength={limite}
          placeholder={placeholder}
          aria-describedby={`${id}-ajuda`}
          onChange={(e) => setTamanho(e.target.value.length)}
          className={`h-[102px] resize-y ${TEXTO_CAMPO}`}
        />
      </div>
      <Ajuda id={`${id}-ajuda`} contador={`${tamanho} / ${limite}`}>
        {ajuda}
      </Ajuda>
    </div>
  )
}

type SelecaoMultiplaProps = {
  label: string
  name: string
  opcoes: string[]
  placeholder: string
  ajuda?: ReactNode
  obrigatorio?: boolean
  className?: string
}

/** Seleção de várias opções com busca (municípios, setores…). Envia cada item marcado com o mesmo `name`. */
export function SelecaoMultipla({ label, name, opcoes, placeholder, ajuda, obrigatorio = true, className = '' }: SelecaoMultiplaProps) {
  const id = useId()
  const [aberta, setAberta] = useState(false)
  const [busca, setBusca] = useState('')
  const [marcadas, setMarcadas] = useState<string[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!aberta) return
    const fechar = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setAberta(false)
    document.addEventListener('pointerdown', fechar)
    return () => document.removeEventListener('pointerdown', fechar)
  }, [aberta])

  const alternar = (opcao: string) =>
    setMarcadas((atual) => (atual.includes(opcao) ? atual.filter((o) => o !== opcao) : [...atual, opcao]))
  const visiveis = opcoes.filter((o) => o.toLocaleLowerCase('pt-BR').includes(busca.toLocaleLowerCase('pt-BR')))
  const resumo =
    marcadas.length === 0 ? placeholder : marcadas.length <= 2 ? marcadas.join(', ') : `${marcadas.length} selecionados`

  return (
    <div ref={ref} className={`relative flex min-w-0 flex-col gap-2 ${className}`}>
      <Rotulo htmlFor={id} obrigatorio={obrigatorio}>
        {label}
      </Rotulo>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={aberta}
        onClick={() => setAberta((a) => !a)}
        className={`flex items-center gap-2 px-4 py-[9.5px] text-left ${CAIXA}`}
      >
        <span className={`flex-1 truncate text-[15px] leading-[1.5] ${marcadas.length ? 'text-ink' : 'text-[#8a9a90]'}`}>{resumo}</span>
        <img src={chevronBaixo} alt="" className={`size-5 shrink-0 transition-transform ${aberta ? 'rotate-180' : ''}`} />
      </button>
      {/* Campo oculto para a validação nativa de obrigatório. */}
      <input
        tabIndex={-1}
        aria-hidden
        required={obrigatorio}
        value={marcadas.length ? 'ok' : ''}
        onChange={() => {}}
        className="pointer-events-none absolute bottom-0 left-4 h-px w-px opacity-0"
      />
      {marcadas.map((m) => (
        <input key={m} type="hidden" name={name} value={m} />
      ))}
      {aberta && (
        <div className="absolute top-[calc(100%-4px)] right-0 left-0 z-20 mt-1 flex max-h-72 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-card">
          {opcoes.length > 8 && (
            <input
              autoFocus
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar…"
              aria-label={`Buscar em ${label}`}
              className="border-b border-border px-4 py-2.5 text-[14px] outline-none placeholder:text-[#8a9a90]"
            />
          )}
          <ul role="listbox" aria-multiselectable className="overflow-y-auto py-1">
            {visiveis.map((opcao) => (
              <li key={opcao} role="option" aria-selected={marcadas.includes(opcao)}>
                <label className="flex cursor-pointer items-center gap-3 px-4 py-2 text-[14px] text-ink hover:bg-green-50">
                  <CaixaMarcacao checked={marcadas.includes(opcao)} onChange={() => alternar(opcao)} />
                  {opcao}
                </label>
              </li>
            ))}
            {visiveis.length === 0 && <li className="px-4 py-2 text-[13px] text-muted">Nenhuma opção encontrada.</li>}
          </ul>
        </div>
      )}
      <Ajuda id={`${id}-ajuda`}>{ajuda}</Ajuda>
    </div>
  )
}

type CaixaProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { redondo?: boolean }

/** Caixa de marcação/opção estilizada sobre o input nativo (mantém teclado e leitores de tela). */
export function CaixaMarcacao({ redondo = false, className = '', ...input }: CaixaProps) {
  return (
    <span className={`relative flex size-5 shrink-0 ${className}`}>
      <input
        type={redondo ? 'radio' : 'checkbox'}
        className={`peer size-5 cursor-pointer appearance-none border-[1.5px] border-[#d0d8d3] bg-background transition-colors checked:border-green-900 focus-visible:ring-3 focus-visible:ring-green-100 focus-visible:outline-none ${
          redondo ? 'rounded-full checked:border-[6px]' : 'rounded-md checked:bg-green-900'
        }`}
        {...input}
      />
      {!redondo && (
        <img src={checkBranco} alt="" className="pointer-events-none absolute inset-[3px] size-3.5 opacity-0 peer-checked:opacity-100" />
      )}
    </span>
  )
}

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  rotulo: ReactNode
  descricao?: ReactNode
}

export function Checkbox({ rotulo, descricao, className = '', ...input }: CheckboxProps) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 ${className}`}>
      <CaixaMarcacao {...input} />
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[14px] leading-[1.4] font-medium text-ink">{rotulo}</span>
        {descricao && <span className="text-[13px] leading-[1.45] text-muted">{descricao}</span>}
      </span>
    </label>
  )
}

export function Radio({ rotulo, className = '', ...input }: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { rotulo: ReactNode }) {
  return (
    <label className={`flex cursor-pointer items-center gap-2.5 text-[14px] text-ink ${className}`}>
      <CaixaMarcacao redondo {...input} />
      {rotulo}
    </label>
  )
}

export function CartaoOpcao({ titulo, descricao, ...input }: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { titulo: string; descricao?: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-green-200 has-checked:border-[1.5px] has-checked:border-green-900 has-checked:bg-[#f1f7f3]">
      <CaixaMarcacao {...input} />
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[14px] leading-[1.4] font-semibold text-ink">{titulo}</span>
        {descricao && <span className="text-[13px] leading-[1.45] text-muted">{descricao}</span>}
      </span>
    </label>
  )
}

/** Chip de múltipla escolha (subáreas). */
export function Chip({ rotulo, ...input }: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { rotulo: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[#d0d8d3] bg-background px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-green-200 has-checked:border-green-800 has-checked:bg-green-800 has-checked:text-white has-focus-visible:ring-3 has-focus-visible:ring-green-100">
      <input type="checkbox" className="peer sr-only" {...input} />
      <img src={iconeMais} alt="" className="size-3.5 peer-checked:hidden" />
      <img src={checkBranco} alt="" className="hidden size-3.5 peer-checked:block" />
      {rotulo}
    </label>
  )
}

const NIVEIS = ['Alto', 'Médio', 'Baixo']

type NucleoOpcaoProps = {
  nome: string
  descricao: string
  name: string
  subareas?: string[]
}

/** Opção de núcleo: ao marcar, aparece a escolha de nível (Alto/Médio/Baixo) e as subáreas do núcleo. */
export function NucleoOpcao({ nome, descricao, name, subareas = [] }: NucleoOpcaoProps) {
  const [marcado, setMarcado] = useState(false)
  const comPainel = marcado && subareas.length > 0
  return (
    <div>
      <div
        className={`flex flex-wrap items-center gap-3.5 px-[18px] py-3.5 transition-colors ${
          marcado ? 'border-[1.5px] border-green-900 bg-[#f1f7f3]' : 'border border-border bg-background'
        } ${comPainel ? 'rounded-t-[14px]' : 'rounded-[14px]'}`}
      >
        <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3.5">
          <CaixaMarcacao name={name} value={nome} checked={marcado} onChange={(e: ChangeEvent<HTMLInputElement>) => setMarcado(e.target.checked)} />
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className={`text-[15px] text-ink ${marcado ? 'font-semibold' : 'font-medium'}`}>{nome}</span>
            <span className="text-[13px] leading-[1.45] text-muted">{descricao}</span>
          </span>
        </label>
        {marcado && (
          <fieldset className="flex items-center gap-2">
            <legend className="sr-only">Nível de atuação em {nome}</legend>
            <span aria-hidden className="text-[13px] font-medium text-muted">
              Nível:
            </span>
            {NIVEIS.map((nivel) => (
              <label key={nivel} className="cursor-pointer">
                <input type="radio" name={`${name}-nivel-${nome}`} value={nivel} required className="peer sr-only" />
                <span className="block rounded-full border border-[#d0d8d3] bg-background px-3.5 py-1.5 text-[13px] font-medium text-ink peer-checked:border-green-900 peer-checked:bg-green-900 peer-checked:text-white peer-focus-visible:ring-3 peer-focus-visible:ring-green-100">
                  {nivel}
                </span>
              </label>
            ))}
          </fieldset>
        )}
      </div>
      {comPainel && (
        <div className="flex flex-col gap-3.5 rounded-b-[14px] border-x-[1.5px] border-b-[1.5px] border-green-900 bg-[#f1f7f3] py-5 pr-5 pl-5 md:pl-[52px]">
          <Pergunta rotulo="Subáreas em que atua" descricao="Marque todas as que se aplicam." obrigatorio>
            <div className="flex flex-wrap gap-2">
              {subareas.map((s) => (
                <Chip key={s} name={`${name}-subareas-${nome}`} value={s} rotulo={s} />
              ))}
            </div>
          </Pergunta>
          <Campo
            name={`${name}-outras-${nome}`}
            label="Outras subáreas (opcional)"
            obrigatorio={false}
            placeholder="Descreva outras subáreas que não estão na lista"
          />
        </div>
      )}
    </div>
  )
}

export function CabecalhoSecaoForm({ numero, titulo, descricao }: { numero: number; titulo: string; descricao: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4c50e_0%,#d4a419_83.33%)] font-display text-[16px] font-bold text-green-900">
        {numero}
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <h2 className="font-display text-[20px] font-bold text-green-900">{titulo}</h2>
        <p className="text-[14px] leading-[1.5] text-muted">{descricao}</p>
      </div>
    </div>
  )
}

export function Dica({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="flex max-w-[471px] items-start gap-3 rounded-[14px] border border-yellow-100 bg-yellow-50 py-4 pr-5 pl-[18px]">
      <img src={iconeInfo} alt="" className="size-5 shrink-0" />
      <div className="flex flex-col gap-1.5 text-[13px] leading-[1.5] text-ink">
        <p className="text-[14px] font-semibold text-[#8a6508]">{titulo}</p>
        {children}
      </div>
    </div>
  )
}

type AvisoLgpdProps = {
  introducao: string
  finalidade: string
  compartilhamento: string
  armazenamento?: string
}

/** Aviso de proteção de dados (Lei nº 13.709/2018) exibido antes do envio. */
export function AvisoLgpd({ introducao, finalidade, compartilhamento, armazenamento }: AvisoLgpdProps) {
  const itens: [string, string][] = [
    ['Finalidade', finalidade],
    ['Compartilhamento', compartilhamento],
    ...(armazenamento ? [['Armazenamento', armazenamento] as [string, string]] : []),
    [
      'Seus direitos',
      'Confirmar o tratamento, acessar e corrigir seus dados, pedir anonimização, bloqueio ou eliminação, saber com quem foram compartilhados e revogar o consentimento a qualquer momento (art. 18 da LGPD).',
    ],
    ['Contato', 'sia@pi.gov.br — para dúvidas e solicitações sobre seus dados.'],
  ]
  return (
    <section aria-label="Proteção de dados pessoais" className="flex flex-col gap-3.5 rounded-2xl border border-yellow-100 bg-yellow-50 px-6 py-5">
      <h3 className="flex items-center gap-2.5 text-[15px] font-semibold text-green-900">
        <img src={iconeEscudo} alt="" className="size-5" />
        Proteção de dados pessoais (LGPD)
      </h3>
      <p className="text-[13px] leading-[1.5] text-ink">{introducao}</p>
      <dl className="flex flex-col gap-2 text-[13px] leading-[1.5]">
        {itens.map(([termo, texto]) => (
          <div key={termo} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
            <dt className="shrink-0 font-semibold text-green-900 sm:w-[150px]">{termo}</dt>
            <dd className="text-ink">{texto}</dd>
          </div>
        ))}
      </dl>
      <Link to="/politica-de-privacidade" className="self-start text-[13px] font-semibold text-[#8a6508] underline">
        Ler a Política de Privacidade
      </Link>
    </section>
  )
}

export type SecaoNavegacao = { id: string; rotulo: string }

type NavegacaoSecoesProps = {
  titulo: string
  secoes: SecaoNavegacao[]
  ativa: string
  preenchidas: Set<string>
}

/** Navegação lateral entre seções com progresso de preenchimento. */
export function NavegacaoSecoes({ titulo, secoes, ativa, preenchidas }: NavegacaoSecoesProps) {
  const total = secoes.length
  const feitas = secoes.filter((s) => preenchidas.has(s.id)).length
  return (
    <nav aria-label={titulo} className="flex flex-col gap-1 rounded-[20px] border border-border bg-background px-6 pt-5 pb-6">
      <p className="pb-2 text-[12px] font-semibold tracking-[0.72px] text-muted">{titulo.toUpperCase()}</p>
      <ol className="flex flex-col gap-1">
        {secoes.map((secao, i) => {
          const atual = secao.id === ativa
          const feita = preenchidas.has(secao.id)
          return (
            <li key={secao.id}>
              <a
                href={`#${secao.id}`}
                aria-current={atual ? 'step' : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${atual ? 'bg-yellow-50' : 'hover:bg-surface'}`}
              >
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${
                    atual
                      ? 'bg-[linear-gradient(135deg,#f4c50e_0%,#d4a419_83.33%)] text-green-900'
                      : feita
                        ? 'bg-green-700'
                        : 'border border-[#d0d8d3] bg-background text-muted'
                  }`}
                >
                  {feita && !atual ? <img src={checkBranco} alt="Preenchida" className="size-3.5" /> : i + 1}
                </span>
                <span className={`text-[14px] leading-[1.4] ${atual ? 'font-semibold text-[#8a6508]' : 'font-medium text-ink'}`}>
                  {secao.rotulo}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
      <div className="mt-1 flex flex-col gap-2 border-t border-border pt-4">
        <p className="text-[13px] font-medium text-muted">
          {feitas} de {total} seções preenchidas
        </p>
        <div className="h-1.5 overflow-hidden rounded-full bg-yellow-100">
          <div
            className="h-1.5 min-w-[18px] rounded-full bg-[linear-gradient(161.6deg,#f4c50e_0%,#d4a419_83.33%)] transition-[width]"
            style={{ width: `${(feitas / total) * 100}%` }}
          />
        </div>
      </div>
    </nav>
  )
}

export function CartaoAjuda({ children }: { children: ReactNode }) {
  return (
    <aside className="flex flex-col gap-1.5 rounded-[20px] border border-yellow-100 bg-yellow-50 px-6 py-5">
      <p className="text-[15px] font-semibold text-green-900">Precisa de ajuda?</p>
      <p className="text-[13px] leading-[1.5] text-ink">{children}</p>
      <a href="mailto:sia@pi.gov.br" className="self-start text-[13px] font-semibold text-[#8a6508] hover:underline">
        sia@pi.gov.br
      </a>
    </aside>
  )
}

/**
 * Acompanha um <form> dividido em <section id> e devolve a seção visível e
 * quais seções já estão preenchidas. Uma seção conta como preenchida quando
 * todos os campos obrigatórios são válidos e, se tiver data-minimo, quando há
 * ao menos uma caixa marcada.
 */
export function useProgressoFormulario(secoes: SecaoNavegacao[]) {
  const formRef = useRef<HTMLFormElement>(null)
  const [ativa, setAtiva] = useState(secoes[0].id)
  const [preenchidas, setPreenchidas] = useState<Set<string>>(new Set())

  function recalcular() {
    const form = formRef.current
    if (!form) return
    const prontas = new Set<string>()
    for (const { id } of secoes) {
      const secao = form.querySelector<HTMLElement>(`#${CSS.escape(id)}`)
      if (!secao) continue
      const controles = [...secao.querySelectorAll<HTMLInputElement>('input, textarea, select')]
      const obrigatorios = controles.filter((c) => c.required)
      const temValor = controles.some((c) => (c.type === 'checkbox' || c.type === 'radio' ? c.checked : c.value.trim() !== ''))
      const minimoOk = !secao.dataset.minimo || controles.some((c) => c.type === 'checkbox' && c.checked)
      if (temValor && minimoOk && obrigatorios.every((c) => c.checkValidity())) prontas.add(id)
    }
    setPreenchidas(prontas)
  }

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.find((e) => e.isIntersecting)
        if (visivel) setAtiva(visivel.target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    secoes.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observador.observe(el)
    })
    return () => observador.disconnect()
  }, [secoes])

  return { formRef, ativa, preenchidas, recalcular }
}
