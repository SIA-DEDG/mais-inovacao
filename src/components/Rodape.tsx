import logoSia from '../assets/header/logo-sia.png'
import logoMaisInovacao from '../assets/rodape/logo-mais-inovacao.svg'
import { Container, Ligacao } from './ui'

const COLUNAS = [
  {
    titulo: 'Projeto',
    links: [
      { label: 'Núcleos', href: '/nucleos' },
      { label: 'Inscrições', href: '/inscricoes' },
      { label: 'Relatórios', href: '/relatorios' },
      { label: 'Pesquisadores', href: '/pesquisadores' },
    ],
  },
  {
    titulo: 'Institucional',
    links: [
      { label: 'Sobre o projeto', href: '#sobre' },
      { label: 'Instituições', href: '#instituicoes' },
      { label: 'Transparência', href: '#transparencia' },
      { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
    ],
  },
  {
    titulo: 'Contato',
    links: [
      { label: 'Fale conosco', href: '/fale-conosco' },
      { label: 'contato@maisinovacao.pi.gov.br', href: 'mailto:contato@maisinovacao.pi.gov.br' },
      { label: 'Segunda a sexta, 8h às 14h' },
      { label: 'Teresina – PI' },
    ],
  },
]

export function Rodape() {
  return (
    <footer className="bg-green-900 pt-14 pb-8">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-5">
              <img src={logoMaisInovacao} alt="Projeto Mais Inovação" className="h-[64px] w-[141px]" />
              <span className="h-12 w-px bg-white/20" />
              <span className="rounded-lg bg-background px-3 py-2">
                <img src={logoSia} alt="SIA · Governo do Piauí" className="h-11 w-[159px]" />
              </span>
            </div>
            <p className="text-[14px] leading-[1.55] text-green-200">
              Ciência, tecnologia e inovação a serviço
              <br />
              dos desafios reais do Piauí.
            </p>
          </div>

          <nav aria-label="Rodapé" className="flex flex-wrap gap-x-[72px] gap-y-8 text-[14px]">
            {COLUNAS.map((coluna) => (
              <div key={coluna.titulo} className="flex flex-col gap-3">
                <h2 className="font-bold text-gold-300">{coluna.titulo}</h2>
                <ul className="flex flex-col gap-3 text-[#d7e6db]">
                  {coluna.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <Ligacao href={link.href} className="hover:text-white hover:underline">
                          {link.label}
                        </Ligacao>
                      ) : (
                        link.label
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <hr className="border-white/12" />

        <div className="flex flex-col justify-between gap-4 text-[12px] text-[#7fa58c] md:flex-row">
          <p>
            Governo do Estado do Piauí · Secretaria de Inteligência Artificial, Economia Digital, Ciência, Tecnologia e
            Inovação – SIA · Fundação de Amparo à Pesquisa do Estado do Piauí – FAPEPI
          </p>
          <p className="shrink-0">© 2026</p>
        </div>
      </Container>
    </footer>
  )
}
