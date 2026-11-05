import fotoFundo from '../assets/como-funciona/foto-fundo.jpg'
import iconeBuscaArquivo from '../assets/como-funciona/icone-busca-arquivo.svg'
import iconeEquipe from '../assets/como-funciona/icone-equipe.svg'
import iconePacote from '../assets/como-funciona/icone-pacote.svg'
import iconePrancheta from '../assets/como-funciona/icone-prancheta.svg'
import iconeSelo from '../assets/como-funciona/icone-selo.svg'
import ponto from '../assets/como-funciona/ponto.svg'
import setaLink from '../assets/como-funciona/seta-link.svg'
import trilhaLinha from '../assets/como-funciona/trilha-linha.svg'
import { Container, Eyebrow, Ligacao } from './ui'

const ETAPAS = [
  {
    icone: iconePrancheta,
    titulo: 'Inscrição do desafio',
    descricao:
      'Empresas, órgãos públicos ou instituições descrevem o problema e o resultado esperado, e recebem um protocolo de acompanhamento.',
  },
  {
    icone: iconeSelo,
    titulo: 'Avaliação do comitê',
    descricao: 'Um comitê analisa o desafio e define o núcleo temático mais adequado para desenvolvê-lo.',
  },
  {
    icone: iconeEquipe,
    titulo: 'Formação da equipe',
    descricao: 'Se aprovado, pesquisadores do núcleo formam a equipe, que trabalha com quem inscreveu o desafio.',
  },
  {
    icone: iconeBuscaArquivo,
    titulo: 'Acompanhamento',
    descricao:
      'Com o número do protocolo, quem inscreveu acompanha cada etapa e pode contribuir com dados, equipe técnica e ambiente para testes.',
  },
  {
    icone: iconePacote,
    titulo: 'Entrega da solução',
    descricao: 'A solução é validada e entregue, com o registro dos resultados e apoio para colocá-la em uso.',
  },
]

export function ComoFunciona() {
  return (
    <section className="relative overflow-hidden bg-green-100">
      <img src={fotoFundo} alt="" className="absolute inset-0 size-full object-cover object-[center_68%] opacity-60" />
      <div className="relative bg-green-100/90 py-16">
        <Container className="flex flex-col items-start gap-5">
          <Eyebrow ponto={ponto} className="bg-green-200 text-green-700">
            Como funciona
          </Eyebrow>
          <h2 className="font-display text-[32px] leading-[1.15] font-bold tracking-[-0.4px] text-green-900 md:text-[40px]">
            Do desafio à solução
          </h2>
          <p className="text-[16px] text-muted">Cinco etapas, da inscrição do desafio até a entrega da solução.</p>

          <ol className="flex w-full flex-col gap-8 pt-7 pb-2 lg:flex-row lg:gap-6">
            {ETAPAS.map((etapa, i) => {
              const ultima = i === ETAPAS.length - 1
              return (
                <li key={etapa.titulo} className="flex min-w-0 flex-1 flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex size-14 shrink-0 items-center justify-center rounded-full border-3 ${
                        ultima ? 'border-green-800 bg-green-200' : 'border-green-200 bg-green-800'
                      }`}
                    >
                      <img src={etapa.icone} alt="" className="size-6" />
                    </span>
                    {!ultima && <img src={trilhaLinha} alt="" className="hidden h-0.5 min-w-0 flex-1 lg:block" />}
                  </div>
                  <div className="flex flex-col gap-1 pr-2">
                    <p className="text-[12px] font-bold tracking-[0.96px] text-gold-600">
                      ETAPA {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-display text-[20px] font-bold text-green-900">{etapa.titulo}</h3>
                    <p className="text-[15px] leading-[1.5] text-muted">{etapa.descricao}</p>
                  </div>
                </li>
              )
            })}
          </ol>

          <Ligacao
            href="/inscricoes"
            className="flex items-center gap-2 pt-3 text-[15px] font-semibold text-green-700 underline underline-offset-2 hover:text-green-900"
          >
            Ver como funcionam as inscrições
            <img src={setaLink} alt="" className="size-4" />
          </Ligacao>
        </Container>
      </div>
    </section>
  )
}
