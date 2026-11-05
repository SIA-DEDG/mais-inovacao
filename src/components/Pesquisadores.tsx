import { Fragment, type CSSProperties } from 'react'
import circuloFundo from '../assets/pesquisadores/circulo-fundo.svg'
import iconeMapa from '../assets/pesquisadores/icone-mapa.svg'
import iconePin from '../assets/pesquisadores/icone-pin.svg'
import iconePinBranco from '../assets/pesquisadores/icone-pin-branco.svg'
import iconePinCidade from '../assets/pesquisadores/icone-pin-cidade.svg'
import iconePremio from '../assets/pesquisadores/icone-premio.svg'
import mapaMunicipios from '../assets/pesquisadores/mapa-municipios.svg'
import marcadorCidade from '../assets/pesquisadores/marcador-cidade.svg'
import marcadorTeresina from '../assets/pesquisadores/marcador-teresina.svg'
import ponto from '../assets/pesquisadores/ponto.svg'
import setaVermelha from '../assets/pesquisadores/seta-vermelha.svg'
import { BotaoPilula, Container, Eyebrow } from './ui'

const DESTAQUES = [
  { icone: iconePremio, valor: '1º', texto: 'Teresina concentra 267 pesquisadores, em todos os 7 núcleos' },
  { icone: iconePin, valor: '56%', texto: 'dos pesquisadores estão em equipes sediadas na capital' },
  { icone: iconeMapa, valor: '20', texto: 'municípios do interior com equipes do projeto' },
]

// Coordenadas do quadro do mapa no Figma (640 × 630); convertidas em % para o mapa escalar.
const LARGURA_MAPA = 640
const ALTURA_MAPA = 630
const pos = (x: number, y: number): CSSProperties => ({
  left: `${(x / LARGURA_MAPA) * 100}%`,
  top: `${(y / ALTURA_MAPA) * 100}%`,
})

const CIDADES = [
  { nome: 'Parnaíba – PI', info: '34 pesquisadores · UFDPar', cartao: pos(208, 6), marcador: pos(425.2, 30.6) },
  { nome: 'Paulistana – PI', info: '25 pesquisadores · IFPI', cartao: pos(459, 394), marcador: pos(465.6, 419) },
  { nome: 'Bom Jesus – PI', info: '20 pesquisadores · UFPI', cartao: pos(18, 477), marcador: pos(219.2, 501.4) },
]

const LEGENDA = [
  { cor: 'bg-[#e4ebe6]', faixa: 'Sem pesquisadores' },
  { cor: 'bg-green-200', faixa: '1–5' },
  { cor: 'bg-green-400', faixa: '6–10' },
  { cor: 'bg-green-600', faixa: '11–20' },
  { cor: 'bg-green-800', faixa: '21–50' },
  { cor: 'bg-green-900', faixa: '51+' },
]

function MapaPiaui() {
  return (
    <figure className="flex w-full max-w-[640px] shrink-0 flex-col items-center">
      <div className="relative aspect-[640/630] w-full">
        <img src={circuloFundo} alt="" className="absolute aspect-square w-[93.75%]" style={pos(20, 20)} />
        <img
          src={mapaMunicipios}
          alt="Mapa do Piauí por município, colorido pela quantidade de pesquisadores"
          className="absolute h-[96.89%] w-[65%]"
          style={pos(112, 15)}
        />
        <img
          src={marcadorTeresina}
          alt=""
          className="absolute size-3 -translate-1/2"
          style={pos(348.4, 197.8)}
        />

        {CIDADES.map((cidade) => (
          <Fragment key={cidade.nome}>
            <div
              className="absolute hidden items-center gap-2.5 rounded-[14px] bg-background py-2.5 pr-3.5 pl-2.5 whitespace-nowrap shadow-card-sm sm:flex"
              style={cidade.cartao}
            >
              <span className="rounded-lg bg-red-100 p-1.5">
                <img src={iconePinCidade} alt="" className="size-3.5" />
              </span>
              <span className="flex flex-col gap-px">
                <span className="text-[12px] font-bold text-ink">{cidade.nome}</span>
                <span className="text-[11px] text-muted">{cidade.info}</span>
              </span>
            </div>
            <img src={marcadorCidade} alt="" className="absolute size-2.5 -translate-1/2" style={cidade.marcador} />
          </Fragment>
        ))}

        <div
          className="absolute hidden items-center gap-3 rounded-2xl bg-background px-4 py-3 whitespace-nowrap shadow-[0_12px_32px_rgb(5_51_28/0.14)] sm:flex"
          style={pos(372, 170)}
        >
          <span className="rounded-[10px] bg-red-500 p-2">
            <img src={iconePinBranco} alt="" className="size-4" />
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-[13px] font-bold text-ink">Teresina – PI</span>
            <span className="text-[12px] text-muted">267 pesquisadores · 7 núcleos</span>
          </span>
        </div>
      </div>

      <figcaption>
        <ul className="flex flex-wrap justify-center gap-3">
          {LEGENDA.map((item) => (
            <li key={item.faixa} className="flex items-center gap-[5px] text-[11px] text-muted">
              <span className={`size-3 rounded-[3px] ${item.cor}`} />
              {item.faixa}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}

export function Pesquisadores() {
  return (
    <section id="pesquisadores" className="bg-background py-[88px]">
      <Container className="flex flex-col items-center gap-12 xl:flex-row">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
          <Eyebrow ponto={ponto} className="bg-red-100 text-red-700">
            Pesquisadores
          </Eyebrow>
          <h2 className="font-display text-[32px] leading-[1.15] font-bold tracking-[-0.4px] text-green-900 md:text-[40px]">
            Nossos pesquisadores estão em <span className="text-red-500">21 municípios</span> do Piauí
          </h2>
          <p className="text-[16px] leading-[1.55] text-muted">
            Os pesquisadores estão espalhados por todas as regiões do estado, do litoral ao cerrado.
          </p>
          <ul className="flex w-full flex-col gap-6">
            {DESTAQUES.map((destaque) => (
              <li
                key={destaque.valor}
                className="flex items-center gap-4 rounded-2xl border border-red-100 px-[18px] py-3.5"
              >
                <span className="shrink-0 rounded-xl bg-red-50 p-2.5">
                  <img src={destaque.icone} alt="" className="size-5" />
                </span>
                <span className="shrink-0 font-display text-[24px] font-extrabold text-red-700">{destaque.valor}</span>
                <span className="text-[14px] leading-[1.4] text-ink">{destaque.texto}</span>
              </li>
            ))}
          </ul>
          <BotaoPilula href="/pesquisadores" seta={setaVermelha} variante="vermelho">
            Ver mapa por município
          </BotaoPilula>
        </div>

        <MapaPiaui />
      </Container>
    </section>
  )
}
