import { NUCLEOS } from './nucleos'

/** Biblioteca de relatórios (dados de exemplo do Figma). */

export type TipoRelatorio = 'anual' | 'nucleo' | 'parcial'

export type ItemBiblioteca = {
  id: string
  ano: number
  tipo: TipoRelatorio
  titulo: string
  detalhe: string
  nucleo?: string // slug
  href: string
}

const PAGINAS_NUCLEOS: Record<string, [number, string]> = {
  'agroindustria-e-bioeconomia': [24, '2,6 MB'],
  'saude-e-biotecnologia': [26, '2,9 MB'],
  'industria-verde': [22, '2,4 MB'],
  'economia-digital': [20, '2,1 MB'],
  'governo-digital-e-infraestrutura': [22, '2,3 MB'],
  'turismo-e-economia-criativa': [18, '2,0 MB'],
  'industria-mineral': [18, '1,9 MB'],
}

export const RELATORIO_PREVISTO = {
  titulo: 'Relatório Anual 2026',
  detalhe: 'Em elaboração · publicação prevista para março de 2027',
}

export const BIBLIOTECA: ItemBiblioteca[] = [
  {
    id: 'parcial-2026',
    ano: 2026,
    tipo: 'parcial',
    titulo: 'Relatório parcial · 1º sem. 2026',
    detalhe: 'Publicado em 20/08/2026 · 28 p. · 3,1 MB',
    href: '/relatorios/anual-2025',
  },
  {
    id: 'anual-2025',
    ano: 2025,
    tipo: 'anual',
    titulo: 'Relatório Anual 2025',
    detalhe: 'Consolidado · 64 p. · 8,4 MB',
    href: '/relatorios/anual-2025',
  },
  ...NUCLEOS.map((n): ItemBiblioteca => {
    const [paginas, tamanho] = PAGINAS_NUCLEOS[n.slug]
    return {
      id: `2025-${n.slug}`,
      ano: 2025,
      tipo: 'nucleo',
      titulo: `Relatório 2025 · ${n.nome}`,
      detalhe: `Núcleo · ${paginas} p. · ${tamanho}`,
      nucleo: n.slug,
      href: `/nucleos/${n.slug}#chamadas`,
    }
  }),
]
