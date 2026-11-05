import setaLink from '../assets/como-funciona/seta-link.svg'
import iconeEmail from '../assets/faq/icone-email.svg'
import ponto from '../assets/faq/ponto.svg'
import { Acordeao } from './Acordeao'
import { Container, Eyebrow, Ligacao } from './ui'

const PERGUNTAS = [
  {
    pergunta: 'O que é o Projeto Mais Inovação?',
    resposta:
      'Uma iniciativa do Governo do Piauí que conecta empresas, universidades, institutos de pesquisa e governo para resolver desafios reais do estado com ciência, tecnologia e inovação, organizados em 7 núcleos estratégicos.',
  },
  {
    pergunta: 'Como minha empresa pode inscrever um desafio?',
    resposta:
      "Clique em 'Inscrever desafio' e preencha o Termo de Apresentação de Desafio, descrevendo o problema, o contexto, o resultado esperado e o núcleo relacionado. Empresas, órgãos públicos e instituições podem participar. Ao concluir, você recebe um número de protocolo.",
  },
  {
    pergunta: 'Existe prazo para as inscrições?',
    resposta: 'Não. A chamada é aberta e os desafios podem ser inscritos a qualquer momento, sem prazo final.',
  },
  {
    pergunta: 'Quem avalia os desafios inscritos?',
    resposta:
      'Um comitê do programa analisa cada desafio inscrito e define o núcleo temático mais adequado para desenvolvê-lo.',
  },
  {
    pergunta: 'Como os pesquisadores são selecionados?',
    resposta:
      'Depois que o desafio é aprovado, a equipe é formada por pesquisadores do núcleo relacionado, de acordo com a área e as competências que o problema exige.',
  },
  {
    pergunta: 'Como acompanho uma inscrição?',
    resposta:
      'Use o número de protocolo recebido na inscrição para acompanhar cada etapa do desafio, da avaliação à entrega da solução.',
  },
]

export function PerguntasFrequentes() {
  return (
    <section className="bg-surface py-[88px]">
      <Container className="flex flex-col gap-16 xl:flex-row xl:items-start">
        <div className="flex w-full flex-col items-start gap-3.5 xl:w-[400px] xl:shrink-0">
          <Eyebrow ponto={ponto} className="bg-green-100 text-green-700">
            Dúvidas
          </Eyebrow>
          <h2 className="font-display text-[34px] font-bold text-green-900">Perguntas frequentes</h2>
          <p className="text-[16px] leading-[1.5] text-muted">
            O essencial sobre o projeto, as inscrições de desafios e o trabalho com os pesquisadores.
          </p>
          <p className="flex items-center gap-2.5 pt-2 text-[14px] leading-[1.4] text-ink">
            <img src={iconeEmail} alt="" className="size-[18px]" />
            <span>
              Não encontrou sua dúvida?{' '}
              <Ligacao href="/fale-conosco" className="font-semibold text-green-700 underline underline-offset-2">
                Fale conosco
              </Ligacao>
            </span>
          </p>
          <Ligacao href="/inscricoes" className="flex items-center gap-1.5 text-[14px] font-semibold text-green-700 hover:underline">
            Ver como funcionam as inscrições
            <img src={setaLink} alt="" className="size-4" />
          </Ligacao>
        </div>

        <Acordeao itens={PERGUNTAS} className="flex-1 rounded-2xl border border-border px-7" />
      </Container>
    </section>
  )
}
