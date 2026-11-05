import { useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router'
import setaDiagonal from '../../assets/comum/seta-diagonal-amarela.svg'
import iconeCheck from '../../assets/form/check-branco.svg'
import decorTopo from '../../assets/inscricoes/decor-topo.svg'
import { Trilha, type ItemTrilha } from '../../components/pagina'
import { Container } from '../../components/ui'

type TopoFormularioProps = {
  trilha: ItemTrilha[]
  titulo: string
  descricao: string
  chips: [string, string][]
}

/** Topo amarelo dos formulários de inscrição (termo de desafio e banco de competências). */
export function TopoFormulario({ trilha, titulo, descricao, chips }: TopoFormularioProps) {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-[#fffbeb] via-yellow-100 via-55% to-[#f8e3a0] pt-12 pb-14">
      <img src={decorTopo} alt="" className="pointer-events-none absolute -top-[260px] left-0 h-[640px] w-[1600px] max-w-none" />
      <Container largo className="relative flex flex-col gap-6">
        <Trilha claro itens={trilha} />
        <h1 className="font-display text-[32px] font-extrabold text-green-900 md:text-[44px]">{titulo}</h1>
        <p className="text-[15px] leading-[1.5] text-[#2b2a14]">{descricao}</p>
        <ul className="flex flex-wrap gap-3 text-[13px]">
          {chips.map(([rotulo, valor]) => (
            <li key={rotulo} className="flex gap-1.5 rounded-full border border-yellow-100 bg-white/70 px-3.5 py-2">
              <span className="font-semibold text-green-900">{rotulo}</span>
              <span className="text-ink">{valor}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function BotoesEnvio({ rotulo, cancelarPara, erro }: { rotulo: string; cancelarPara: string; erro?: string }) {
  return (
    <div className="flex flex-col items-end gap-3">
      {erro && (
        <p role="alert" className="w-full rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {erro}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-end gap-3">
        <Link
          to={cancelarPara}
          className="flex h-11 items-center rounded-full border border-green-900/45 px-5 text-[14px] font-semibold text-green-900 hover:bg-green-50"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          className="group flex h-11 items-center gap-2 rounded-full bg-green-900 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-green-700"
        >
          {rotulo}
          <img src={setaDiagonal} alt="" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  )
}

/** Confirmação exibida depois do envio (a tela não existe no Figma; o protocolo real virá do back-end). */
export function ConfirmacaoEnvio({ titulo, email, children }: { titulo: string; email: string; children?: ReactNode }) {
  const [protocolo] = useState(() => `MI-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1e6)).padStart(6, '0')}`)
  return (
    <div role="status" className="flex flex-col items-start gap-4 py-10">
      <span className="flex size-12 items-center justify-center rounded-full bg-green-700">
        <img src={iconeCheck} alt="" className="size-6" />
      </span>
      <h2 className="font-display text-[26px] font-bold text-green-900">{titulo}</h2>
      <p className="text-[15px] leading-[1.5] text-muted">
        O protocolo <strong className="font-semibold text-ink">{protocolo}</strong> foi enviado para{' '}
        <strong className="font-semibold text-ink">{email}</strong>. Use-o para acompanhar cada etapa.
      </p>
      {children}
      <div className="flex flex-wrap gap-3 pt-2">
        <Link to="/entrar" className="flex h-11 items-center rounded-full bg-green-900 px-6 text-[15px] font-semibold text-white hover:bg-green-700">
          Acompanhar inscrição
        </Link>
        <Link
          to="/inscricoes"
          className="flex h-11 items-center rounded-full border border-green-900/45 px-5 text-[14px] font-semibold text-green-900 hover:bg-green-50"
        >
          Voltar para Inscrições
        </Link>
      </div>
    </div>
  )
}

/** Valida o formulário (nativo + seções com data-minimo) e devolve a mensagem de erro, se houver. */
export function validarEnvio(e: FormEvent<HTMLFormElement>): string | undefined {
  e.preventDefault()
  const form = e.currentTarget
  const semMarcacao = [...form.querySelectorAll<HTMLElement>('[data-minimo]')].find(
    (secao) => !secao.querySelector('input[type=checkbox]:checked'),
  )
  if (!form.reportValidity()) return 'Revise os campos obrigatórios destacados.'
  if (semMarcacao) {
    semMarcacao.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return `Marque ao menos uma opção em “${semMarcacao.dataset.minimo}”.`
  }
}
