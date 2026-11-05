import fotoAgro from '../assets/nucleos/foto-agro.jpg'
import fotoEconomiaDigital from '../assets/nucleos/foto-economia-digital.jpg'
import fotoGovernoDigital from '../assets/nucleos/foto-governo-digital.jpg'
import fotoIndustriaMineral from '../assets/nucleos/foto-industria-mineral.jpg'
import fotoIndustriaVerde from '../assets/nucleos/foto-industria-verde.jpg'
import fotoSaude from '../assets/nucleos/foto-saude.jpg'
import fotoTurismo from '../assets/nucleos/foto-turismo.jpg'
import iconeAgro from '../assets/nucleos/icone-agro.png'
import iconeEconomiaDigital from '../assets/nucleos/icone-economia-digital.png'
import iconeGovernoDigital from '../assets/nucleos/icone-governo-digital.png'
import iconeIndustriaMineral from '../assets/nucleos/icone-industria-mineral.png'
import iconeIndustriaVerde from '../assets/nucleos/icone-industria-verde.png'
import iconeSaude from '../assets/nucleos/icone-saude.png'
import iconeTurismo from '../assets/nucleos/icone-turismo.png'
import mapaAgro from '../assets/nucleos/mapa-agro.svg?raw'
import marcaDagua from '../assets/nucleos/marca-dagua-agro.png'

/*
 * Dados de exemplo tirados do Figma. Só "Agroindústria e Bioeconomia" tem o
 * detalhamento completo (desafios, chamadas, relatórios, mapa); os demais
 * núcleos exibem estado vazio nessas seções até que os dados sejam ligados.
 */

export type StatusDesafio = 'andamento' | 'atraso' | 'nao-iniciado'

export type Desafio = {
  numero: string
  titulo: string
  resumo: string
  status: StatusDesafio
  metas: number | null
  pesquisadores: string
  coordenacao: string
  municipios: string
}

export type Relatorio = {
  titulo: string
  data: string // AAAA-MM-DD
  paginas: number
  tamanho: string
  tipo: 'anual' | 'parcial'
}

export type Chamada = {
  titulo: string
  descricao: string
}

export type ItemRanking = { nome: string; total: number; percentual: number }

export type DetalheNucleo = {
  descricaoLonga: string
  instituicoes: number
  marcaDagua: string
  desafios: Desafio[]
  chamadas: Chamada[]
  relatorios: Relatorio[]
  mapa: string
  municipiosRanking: ItemRanking[]
  instituicoesRanking: ItemRanking[]
  foraDoMapa: number
}

export type Nucleo = {
  slug: string
  numero: string
  nome: string
  resumo: string
  subareas: string[]
  pesquisadores: number
  municipios: number
  desafios: number
  foto: string
  icone: string
  detalhe?: DetalheNucleo
}

export const NUCLEOS: Nucleo[] = [
  {
    slug: 'agroindustria-e-bioeconomia',
    numero: '01',
    nome: 'Agroindústria e Bioeconomia',
    resumo: 'Cadeias produtivas do agro, bioinsumos, alimentos e aproveitamento de resíduos — do cerrado ao semiárido.',
    subareas: [
      'Agricultura sustentável',
      'Resíduos agroindustriais',
      'Bioinsumos',
      'Cadeias produtivas',
      'Economia circular',
    ],
    pesquisadores: 249,
    municipios: 20,
    desafios: 4,
    foto: fotoAgro,
    icone: iconeAgro,
    detalhe: {
      descricaoLonga:
        'Cadeias produtivas do agro, bioinsumos, alimentos e aproveitamento de resíduos — do cerrado ao semiárido. O núcleo reúne pesquisadores que transformam a produção agropecuária do Piauí em conhecimento, tecnologia e novos negócios de base biológica.',
      instituicoes: 8,
      marcaDagua,
      desafios: [
        {
          numero: '01',
          titulo: 'Bioinsumos a partir de resíduos da cajucultura',
          resumo: 'Desenvolver biofertilizantes e biodefensivos a partir de resíduos do caju para pequenos produtores.',
          status: 'andamento',
          metas: 60,
          pesquisadores: '12 pesquisadores',
          coordenacao: 'Coordenação: UFPI · com IFPI e Embrapa',
          municipios: 'Teresina · Picos',
        },
        {
          numero: '02',
          titulo: 'Rastreabilidade da cadeia do mel no semiárido',
          resumo: 'Plataforma de rastreio e certificação de origem do mel produzido no território do semiárido.',
          status: 'andamento',
          metas: 45,
          pesquisadores: '9 pesquisadores',
          coordenacao: 'Coordenação: IFPI · com UFPI',
          municipios: 'Paulistana · Picos',
        },
        {
          numero: '03',
          titulo: 'Agricultura de precisão para grãos do cerrado',
          resumo: 'Sensoriamento e modelos de previsão de safra para soja e milho nas cidades do cerrado piauiense.',
          status: 'atraso',
          metas: 30,
          pesquisadores: '8 pesquisadores',
          coordenacao: 'Coordenação: UFPI · com UESPI',
          municipios: 'Bom Jesus · Uruçuí',
        },
        {
          numero: '04',
          titulo: 'Aproveitamento de resíduos da carcinicultura',
          resumo: 'Transformação de cascas de camarão em quitosana e ração animal no litoral do Piauí.',
          status: 'nao-iniciado',
          metas: null,
          pesquisadores: '6 pesquisadores (equipe em formação)',
          coordenacao: 'Coordenação: UFDPar · com IFPI',
          municipios: 'Parnaíba · Cocal',
        },
      ],
      chamadas: [
        {
          titulo: 'Chamada de desafios · Empresas',
          descricao: 'Empresas propõem desafios para o núcleo. 4 desafios aprovados até agora.',
        },
        {
          titulo: 'Chamada de pesquisadores',
          descricao: 'Pesquisadores se candidatam para formar as equipes dos desafios aprovados.',
        },
      ],
      relatorios: [
        { titulo: 'Relatório parcial · 1º sem. 2026', data: '2026-08-20', paginas: 18, tamanho: '1,9 MB', tipo: 'parcial' },
        { titulo: 'Relatório 2025 · Agroindústria e Bioeconomia', data: '2026-03-15', paginas: 24, tamanho: '2,6 MB', tipo: 'anual' },
        { titulo: 'Relatório parcial · 2º sem. 2025', data: '2026-02-18', paginas: 16, tamanho: '1,7 MB', tipo: 'parcial' },
        { titulo: 'Relatório parcial · 1º sem. 2025', data: '2025-08-22', paginas: 14, tamanho: '1,4 MB', tipo: 'parcial' },
      ],
      mapa: mapaAgro,
      municipiosRanking: [
        { nome: 'Teresina', total: 138, percentual: 55 },
        { nome: 'Bom Jesus', total: 15, percentual: 6 },
        { nome: 'Parnaíba', total: 15, percentual: 6 },
        { nome: 'Picos', total: 12, percentual: 5 },
        { nome: 'Paulistana', total: 11, percentual: 4 },
        { nome: 'Cocal', total: 9, percentual: 4 },
        { nome: 'Corrente', total: 6, percentual: 2 },
        { nome: 'Floriano', total: 6, percentual: 2 },
        { nome: 'Uruçuí', total: 6, percentual: 2 },
        { nome: 'Oeiras', total: 5, percentual: 2 },
        { nome: 'Campo Maior', total: 3, percentual: 1 },
        { nome: 'José de Freitas', total: 3, percentual: 1 },
        { nome: 'Piripiri', total: 3, percentual: 1 },
        { nome: 'São João do Piauí', total: 3, percentual: 1 },
        { nome: 'Valença do Piauí', total: 2, percentual: 1 },
        { nome: 'Barras', total: 1, percentual: 0 },
        { nome: 'Esperantina', total: 1, percentual: 0 },
        { nome: 'Pedro II', total: 1, percentual: 0 },
        { nome: 'Pio IX', total: 1, percentual: 0 },
        { nome: 'São Raimundo Nonato', total: 1, percentual: 0 },
      ],
      instituicoesRanking: [
        { nome: 'UFPI', total: 107, percentual: 43 },
        { nome: 'IFPI', total: 85, percentual: 34 },
        { nome: 'UESPI', total: 39, percentual: 16 },
        { nome: 'UFDPar', total: 12, percentual: 5 },
        { nome: 'Embrapa Meio-Norte', total: 3, percentual: 1 },
        { nome: 'PIT', total: 1, percentual: 0 },
        { nome: 'SENAI-PI', total: 1, percentual: 0 },
        { nome: 'UEMA', total: 1, percentual: 0 },
      ],
      foraDoMapa: 6,
    },
  },
  {
    slug: 'saude-e-biotecnologia',
    numero: '02',
    nome: 'Saúde e Biotecnologia',
    resumo: 'Fármacos, diagnósticos, biomateriais e saúde única, com forte base em produtos naturais do Piauí.',
    subareas: ['Biomateriais', 'Biotecnologia em saúde', 'Saúde única', 'Bioprospecção'],
    pesquisadores: 235,
    municipios: 19,
    desafios: 4,
    foto: fotoSaude,
    icone: iconeSaude,
  },
  {
    slug: 'industria-verde',
    numero: '03',
    nome: 'Indústria Verde',
    resumo: 'Energias limpas, hidrogênio verde, economia circular e materiais sustentáveis para a indústria.',
    subareas: ['Materiais sustentáveis', 'Economia circular e reciclagem', 'Hidrogênio verde', 'Inovação e talentos'],
    pesquisadores: 219,
    municipios: 18,
    desafios: 4,
    foto: fotoIndustriaVerde,
    icone: iconeIndustriaVerde,
  },
  {
    slug: 'economia-digital',
    numero: '04',
    nome: 'Economia Digital',
    resumo: 'IA, transformação digital, plataformas e capacitação tecnológica para empresas e trabalhadores.',
    subareas: ['IA e automação', 'Transformação digital', 'Educação digital', 'Cidades inteligentes'],
    pesquisadores: 199,
    municipios: 17,
    desafios: 4,
    foto: fotoEconomiaDigital,
    icone: iconeEconomiaDigital,
  },
  {
    slug: 'governo-digital-e-infraestrutura',
    numero: '05',
    nome: 'Governo Digital e Infraestrutura',
    resumo: 'Dados, IA e plataformas para melhorar serviços públicos e a infraestrutura do estado.',
    subareas: ['Dados no setor público', 'Serviços públicos digitais', 'IA na gestão pública', 'Plataformas governamentais'],
    pesquisadores: 191,
    municipios: 15,
    desafios: 4,
    foto: fotoGovernoDigital,
    icone: iconeGovernoDigital,
  },
  {
    slug: 'turismo-e-economia-criativa',
    numero: '06',
    nome: 'Turismo e Economia Criativa',
    resumo: 'Ecoturismo, patrimônio cultural, economia criativa e eventos que movimentam o território.',
    subareas: ['Turismo científico e ecoturismo', 'Economia criativa', 'Patrimônio cultural', 'Eventos culturais'],
    pesquisadores: 127,
    municipios: 16,
    desafios: 4,
    foto: fotoTurismo,
    icone: iconeTurismo,
  },
  {
    slug: 'industria-mineral',
    numero: '07',
    nome: 'Indústria Mineral',
    resumo: 'Mineração sustentável, minerais críticos, geotecnologias e novos materiais.',
    subareas: ['Sustentabilidade e meio ambiente', 'Economia circular', 'Geotecnologias', 'Minerais críticos'],
    pesquisadores: 119,
    municipios: 14,
    desafios: 4,
    foto: fotoIndustriaMineral,
    icone: iconeIndustriaMineral,
  },
]

export const buscarNucleo = (slug: string | undefined) => NUCLEOS.find((n) => n.slug === slug)

export const formatarData = (iso: string) => iso.split('-').reverse().join('/')
