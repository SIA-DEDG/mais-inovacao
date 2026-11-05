import iconeSeta from '../assets/hero/icone-seta.svg'
import { FaixaMarca } from '../components/FaixaMarca'
import { BotaoPilula, Container } from '../components/ui'

export default function NaoEncontrada() {
  return (
    <>
      <FaixaMarca />
      <Container className="flex flex-col items-start gap-5 py-24">
        <p className="text-[12px] font-bold tracking-[0.96px] text-gold-600">ERRO 404</p>
        <h1 className="font-display text-[34px] font-bold text-green-900">Página não encontrada</h1>
        <p className="max-w-[560px] text-[16px] leading-[1.5] text-muted">
          O endereço pode ter mudado ou a página não existe mais. Volte para o início e navegue pelo menu.
        </p>
        <BotaoPilula href="/" seta={iconeSeta}>
          Ir para o início
        </BotaoPilula>
      </Container>
    </>
  )
}
