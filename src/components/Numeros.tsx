import { Container } from './ui'

const NUMEROS = [
  { valor: '7', titulo: 'Núcleos temáticos', descricao: 'áreas estratégicas para o desenvolvimento do Piauí' },
  { valor: '28', mais: true, titulo: 'Desafios', descricao: 'problemas reais do estado em desenvolvimento' },
  { valor: '475', mais: true, titulo: 'Pesquisadores', descricao: 'no Banco de Competências' },
  { valor: '21', titulo: 'Municípios', descricao: 'do Piauí participam do projeto' },
]

export function Numeros() {
  return (
    <section className="bg-background py-10">
      <Container>
        <ul className="grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {NUMEROS.map((numero, i) => (
            <li
              key={numero.titulo}
              className={`flex flex-col gap-1.5 py-2 pr-7 ${i > 0 ? 'lg:border-l lg:border-border lg:pl-7' : ''}`}
            >
              <p className="flex items-start gap-0.5 font-display font-extrabold">
                <span className="text-[56px] tracking-[-1.12px] text-green-800">{numero.valor}</span>
                {numero.mais && <span className="text-[28px] text-gold-500">+</span>}
              </p>
              <h3 className="font-display text-[16px] font-bold text-ink">{numero.titulo}</h3>
              <p className="text-[13px] leading-[1.5] text-muted">{numero.descricao}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
