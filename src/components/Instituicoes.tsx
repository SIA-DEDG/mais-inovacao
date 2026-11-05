import embrapa from '../assets/instituicoes/embrapa.png'
import ifpi from '../assets/instituicoes/ifpi.png'
import senai from '../assets/instituicoes/senai.png'
import uespi from '../assets/instituicoes/uespi.png'
import ufdpar from '../assets/instituicoes/ufdpar.png'
import ufpi from '../assets/instituicoes/ufpi.png'
import { CarrosselLogos, type Logo } from './CarrosselLogos'
import { Container } from './ui'

const LOGOS: Logo[] = [
  { nome: 'Universidade Federal do Piauí (UFPI)', src: ufpi, largura: 121, altura: 76 },
  { nome: 'Universidade Estadual do Piauí (UESPI)', src: uespi, largura: 57, altura: 84 },
  { nome: 'Instituto Federal do Piauí (IFPI)', src: ifpi, largura: 179, altura: 51 },
  { nome: 'Universidade Federal do Delta do Parnaíba (UFDPar)', src: ufdpar, largura: 157, altura: 59 },
  { nome: 'Embrapa Meio-Norte', src: embrapa, largura: 115, altura: 80 },
  { nome: 'SENAI Piauí', src: senai, largura: 174, altura: 53 },
]

export function Instituicoes() {
  return (
    <section className="bg-background pt-10 pb-5">
      <Container className="flex flex-col items-center gap-[30px]">
        <h2 className="text-[18px] font-extrabold tracking-[0.36px] text-green-600">Instituições participantes</h2>
        <CarrosselLogos logos={LOGOS} rotulo="Logos das instituições participantes" />
      </Container>
    </section>
  )
}
