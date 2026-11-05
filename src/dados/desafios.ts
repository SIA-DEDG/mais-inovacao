/*
 * Detalhamento de desafio (dados de exemplo do Figma). Só o Desafio 01 de
 * Agroindústria tem conteúdo completo; os outros mostram o que existe no card.
 */

export type SituacaoMeta = 'cumprida' | 'andamento' | 'prevista'

export type Etapa = { titulo: string; periodo: string; inicio: string; fim: string /* AAAA-MM */ }

export type Meta = { descricao: string; etapa: number; prazo: string; entrega: string | null; situacao: SituacaoMeta }

export type LeituraRelatorio = {
  id: string
  rotulo: string
  /** Mês de referência (AAAA-MM): etapas encerradas até ele estão cumpridas; a que o contém, em andamento. */
  referencia: string
  resumo?: { avancou: string; atencao: string; proximos: string }
}

export type BarraComposicao = { rotulo: string; total: number }

export type DetalheDesafio = {
  descricao: string
  periodo: string
  origem: string
  metasCumpridas: number
  metasTotal: number
  situacaoEm: string
  instituicoes: number
  municipios: number
  entregas: number
  etapas: Etapa[]
  leituras: LeituraRelatorio[]
  metas: Meta[]
  metasEmAndamentoAte: string
  equipe: {
    instituicoes: BarraComposicao[]
    papeis: BarraComposicao[]
    areas: BarraComposicao[]
    municipios: BarraComposicao[]
    parceiros: string[]
  }
  documentos: { titulo: string; detalhe: string; tipo: 'relatorio' | 'chamada'; href: string }[]
}

export const DESAFIOS: Record<string, Record<string, DetalheDesafio>> = {
  'agroindustria-e-bioeconomia': {
    '01': {
      descricao:
        'Desenvolver biofertilizantes e biodefensivos a partir de resíduos do caju — casca, bagaço e castanha não aproveitada — para reduzir custos e aumentar a renda de pequenos produtores do Piauí.',
      periodo: 'Mar/2025 – Fev/2027 · 24 meses',
      origem: 'Proposto por empresa · aprovado pelo conselho',
      metasCumpridas: 6,
      metasTotal: 10,
      situacaoEm: 'Relatório parcial · 1º sem. 2026',
      instituicoes: 3,
      municipios: 2,
      entregas: 4,
      etapas: [
        { titulo: 'Diagnóstico das cadeias do caju', periodo: 'Mar – Jun/2025', inicio: '2025-03', fim: '2025-06' },
        { titulo: 'Coleta e caracterização dos resíduos', periodo: 'Jul – Dez/2025', inicio: '2025-07', fim: '2025-12' },
        { titulo: 'Formulação dos bioinsumos', periodo: 'Jan – Ago/2026', inicio: '2026-01', fim: '2026-08' },
        { titulo: 'Testes de campo com produtores', periodo: 'Set – Dez/2026', inicio: '2026-09', fim: '2026-12' },
        { titulo: 'Transferência e capacitação', periodo: 'Jan – Fev/2027', inicio: '2027-01', fim: '2027-02' },
      ],
      leituras: [
        { id: '2025', rotulo: 'Relatório 2025', referencia: '2025-12' },
        {
          id: 'parcial-2026',
          rotulo: 'Parcial 2026',
          referencia: '2026-06',
          resumo: {
            avancou:
              'Concluída a caracterização química de 14 tipos de resíduos do caju. Três formulações de biofertilizante foram aprovadas nos testes de laboratório.',
            atencao:
              'A compra do biorreator piloto atrasou 2 meses, o que pode deslocar o início dos testes de campo para outubro.',
            proximos:
              'Concluir a formulação do biodefensivo e selecionar as 10 propriedades de Picos e Teresina para os testes de campo.',
          },
        },
      ],
      metasEmAndamentoAte: 'ago/2026',
      metas: [
        { descricao: 'Mapear os resíduos gerados por 30 agroindústrias de caju', etapa: 1, prazo: 'Jun/2025', entrega: 'Relatório de diagnóstico', situacao: 'cumprida' },
        { descricao: 'Caracterizar a composição química de ao menos 10 tipos de resíduo', etapa: 2, prazo: 'Out/2025', entrega: 'Banco de dados de resíduos', situacao: 'cumprida' },
        { descricao: 'Montar unidade de compostagem e fermentação em laboratório', etapa: 2, prazo: 'Dez/2025', entrega: 'Unidade instalada na UFPI', situacao: 'cumprida' },
        { descricao: 'Desenvolver 3 formulações de biofertilizante', etapa: 3, prazo: 'Abr/2026', entrega: 'Fichas técnicas das formulações', situacao: 'cumprida' },
        { descricao: 'Validar as formulações em casa de vegetação', etapa: 3, prazo: 'Jun/2026', entrega: 'Laudo de eficiência agronômica', situacao: 'cumprida' },
        { descricao: 'Publicar 2 artigos com os resultados', etapa: 3, prazo: 'Jul/2026', entrega: '1 artigo publicado', situacao: 'cumprida' },
        { descricao: 'Desenvolver 1 formulação de biodefensivo', etapa: 3, prazo: 'Ago/2026', entrega: null, situacao: 'andamento' },
        { descricao: 'Instalar o biorreator piloto', etapa: 3, prazo: 'Ago/2026', entrega: null, situacao: 'andamento' },
        { descricao: 'Testar em 10 propriedades de Picos e Teresina', etapa: 4, prazo: 'Dez/2026', entrega: null, situacao: 'prevista' },
        { descricao: 'Capacitar 100 produtores e registrar o pedido de patente', etapa: 5, prazo: 'Fev/2027', entrega: null, situacao: 'prevista' },
      ],
      equipe: {
        instituicoes: [
          { rotulo: 'UFPI · coordenação', total: 6 },
          { rotulo: 'IFPI', total: 4 },
          { rotulo: 'Embrapa Meio-Norte', total: 2 },
        ],
        papeis: [
          { rotulo: 'Coordenação', total: 1 },
          { rotulo: 'Pesquisadores', total: 8 },
          { rotulo: 'Bolsistas de PD&I', total: 3 },
        ],
        areas: [
          { rotulo: 'Ciências Agrárias', total: 5 },
          { rotulo: 'Exatas e da Terra', total: 4 },
          { rotulo: 'Ciências Biológicas', total: 3 },
        ],
        municipios: [
          { rotulo: 'Teresina', total: 9 },
          { rotulo: 'Picos', total: 3 },
        ],
        parceiros: [
          'Cooperativa de cajucultores de Picos',
          'Associação de produtores de Teresina',
          'Secretaria de Agricultura Familiar',
          'Agroindústria parceira',
        ],
      },
      documentos: [
        { titulo: 'Relatório 2025 · Agroindústria e Bioeconomia', detalhe: 'Publicado em 15/03/2026', tipo: 'relatorio', href: '/relatorios/anual-2025' },
        { titulo: 'Relatório parcial · 1º sem. 2026', detalhe: 'Publicado em 20/08/2026', tipo: 'relatorio', href: '/relatorios' },
        { titulo: 'Inscrição na chamada de desafios de empresas', detalhe: 'Aprovado pelo conselho', tipo: 'chamada', href: '/inscricoes' },
      ],
    },
  },
}

export const buscarDetalheDesafio = (nucleo: string, numero: string) => DESAFIOS[nucleo]?.[numero]

export function situacaoEtapa(etapa: Etapa, referencia: string): SituacaoMeta {
  if (etapa.fim <= referencia) return 'cumprida'
  return etapa.inicio <= referencia ? 'andamento' : 'prevista'
}
