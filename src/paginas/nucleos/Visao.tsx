import { Link } from 'react-router'
import setaEscura from '../../assets/comum/seta-escura-pequena.svg'
import circuloIcone from '../../assets/nucleos/circulo-icone-pequeno.svg'
import { Container } from '../../components/ui'
import { FaixaMarca } from '../../components/FaixaMarca'
import { NUCLEOS, type Nucleo } from '../../dados/nucleos'
import { CtaDesafios, TopoNucleos } from './comum'

function VisualNucleo({ nucleo }: { nucleo: Nucleo }) {
  return (
    <div className="relative aspect-[440/300] w-full shrink-0 overflow-hidden rounded-3xl bg-[linear-gradient(145.7deg,#0a4a28_0%,#1e7a42_71.43%)] lg:w-[440px]">
      <img src={nucleo.foto} alt="" className="absolute inset-0 size-full object-cover opacity-38" />
      <div className="absolute inset-0 bg-[linear-gradient(34.3deg,rgb(4_51_28/0.85)_12.5%,rgb(10_74_40/0.25)_58.33%,rgb(10_74_40/0)_95.83%)]" />
      <div className="absolute bottom-5 left-5 size-20">
        <img src={circuloIcone} alt="" className="absolute inset-[-22.5%_-35%_-47.5%_-35%] max-w-none" />
        <img src={nucleo.icone} alt="" className="absolute inset-4 size-12" />
      </div>
      <p className="absolute top-5 right-5 flex items-center gap-2 rounded-full bg-background py-2 pr-4 pl-3.5 whitespace-nowrap">
        <span className="font-display text-[16px] font-extrabold text-green-800">{nucleo.pesquisadores}</span>
        <span className="text-[12px] text-muted">pesquisadores · {nucleo.municipios} municípios</span>
      </p>
    </div>
  )
}

function LinhaNucleo({ nucleo, invertido }: { nucleo: Nucleo; invertido: boolean }) {
  return (
    <article className={`flex flex-col gap-8 lg:items-center lg:gap-14 ${invertido ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
      <VisualNucleo nucleo={nucleo} />
      <div className="flex min-w-0 flex-1 flex-col items-start gap-4 lg:py-3">
        <p className="text-[12px] font-bold tracking-[0.96px] text-gold-600">NÚCLEO {nucleo.numero}</p>
        <h3 className="font-display text-[26px] leading-[1.15] font-bold text-green-900 md:text-[30px]">{nucleo.nome}</h3>
        <p className="text-[15px] leading-[1.55] text-muted">{nucleo.resumo}</p>
        <dl className="flex gap-7">
          {[
            [nucleo.pesquisadores, 'pesquisadores'],
            [nucleo.municipios, 'municípios'],
            [nucleo.desafios, 'desafios no núcleo'],
          ].map(([valor, legenda]) => (
            <div key={legenda} className="flex flex-col-reverse">
              <dt className="text-[12px] text-muted">{legenda}</dt>
              <dd className="font-display text-[28px] font-extrabold text-green-800">{valor}</dd>
            </div>
          ))}
        </dl>
        <ul className="flex flex-wrap gap-1.5">
          {nucleo.subareas.map((area) => (
            <li key={area} className="rounded-full border border-green-200 bg-background px-3 py-[5px] text-[12px] text-green-800">
              {area}
            </li>
          ))}
        </ul>
        <Link
          to={`/nucleos/${nucleo.slug}`}
          aria-label={`Ver núcleo ${nucleo.nome}`}
          className="group flex items-center gap-2.5 rounded-full bg-green-800 py-[9px] pr-[11px] pl-[18px] text-[14px] font-semibold text-white transition-colors hover:bg-green-600"
        >
          Ver núcleo
          <span className="rounded-full bg-gold-500 p-1.5 transition-colors group-hover:bg-yellow-500">
            <img src={setaEscura} alt="" className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </article>
  )
}

export default function NucleosVisao() {
  return (
    <>
      <FaixaMarca />
      <TopoNucleos trilha={[{ label: 'Núcleos' }]} />
      <section className="bg-surface pt-10 pb-14">
        <Container largo className="flex flex-col gap-7">
          <div className="flex flex-col gap-1.5">
            <h2 className="font-display text-[26px] font-bold text-green-900">Conheça os núcleos</h2>
            <p className="text-[14px] text-muted">Ordenados pelo número de pesquisadores vinculados no Banco de Competências.</p>
          </div>
          <div className="flex flex-col gap-10 pt-2">
            {NUCLEOS.map((nucleo, i) => (
              <div key={nucleo.slug} className="flex flex-col gap-10">
                {i > 0 && <hr className="border-border" />}
                <LinhaNucleo nucleo={nucleo} invertido={i % 2 === 1} />
              </div>
            ))}
          </div>
          <CtaDesafios />
        </Container>
      </section>
    </>
  )
}
