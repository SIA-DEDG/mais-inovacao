import mapaMunicipios from '../assets/pesquisadores-pagina/mapa-municipios.svg?raw'

/** Totais do Banco de Competências exibidos no Figma (Pesquisadores v4). */
export const TOTAL_PESQUISADORES = 475
export const COM_NUCLEO_INDICADO = 435
/** Malha do IBGE: o Piauí tem 224 municípios. */
export const TOTAL_MUNICIPIOS_PIAUI = 224
export const FORA_DO_MAPA = 12

export const MAPA_MUNICIPIOS = mapaMunicipios

export type DetalheMunicipio = {
  /** Pesquisadores do município por núcleo (slug de NUCLEOS). */
  nucleos: [slug: string, total: number][]
  instituicoes: [nome: string, total: number][]
}

export type MunicipioPesquisadores = {
  nome: string
  total: number
  /** Instituições com sede no município, da que tem mais pesquisadores para a que tem menos. */
  instituicoes: string[]
  detalhe?: DetalheMunicipio
}

/** Os 21 municípios com pesquisadores, em ordem decrescente. Só Teresina tem o detalhamento no Figma. */
export const MUNICIPIOS: MunicipioPesquisadores[] = [
  {
    nome: 'Teresina',
    total: 267,
    instituicoes: ['UFPI', 'UESPI', 'IFPI', 'Embrapa Meio-Norte', 'SENAI-PI', 'PIT', 'SGB'],
    detalhe: {
      nucleos: [
        ['industria-verde', 143],
        ['agroindustria-e-bioeconomia', 138],
        ['saude-e-biotecnologia', 137],
        ['economia-digital', 114],
        ['governo-digital-e-infraestrutura', 114],
        ['industria-mineral', 72],
        ['turismo-e-economia-criativa', 62],
      ],
      instituicoes: [
        ['UFPI', 123],
        ['UESPI', 80],
        ['IFPI', 58],
        ['Embrapa Meio-Norte', 3],
        ['SENAI-PI', 1],
        ['PIT', 1],
        ['SGB', 1],
      ],
    },
  },
  { nome: 'Parnaíba', total: 34, instituicoes: ['UFDPar', 'UESPI', 'IFPI'] },
  { nome: 'Paulistana', total: 25, instituicoes: ['IFPI'] },
  { nome: 'Bom Jesus', total: 20, instituicoes: ['UFPI'] },
  { nome: 'Cocal', total: 19, instituicoes: ['IFPI'] },
  { nome: 'Picos', total: 19, instituicoes: ['UFPI', 'IFPI', 'UESPI'] },
  { nome: 'Floriano', total: 15, instituicoes: ['UFPI', 'IFPI', 'UESPI'] },
  { nome: 'Corrente', total: 14, instituicoes: ['IFPI', 'UESPI'] },
  { nome: 'Oeiras', total: 11, instituicoes: ['IFPI'] },
  { nome: 'Uruçuí', total: 8, instituicoes: ['IFPI'] },
  { nome: 'Piripiri', total: 6, instituicoes: [] },
  { nome: 'José de Freitas', total: 5, instituicoes: [] },
  { nome: 'São João do Piauí', total: 5, instituicoes: [] },
  { nome: 'Campo Maior', total: 3, instituicoes: [] },
  { nome: 'São Raimundo Nonato', total: 3, instituicoes: [] },
  { nome: 'Valença do Piauí', total: 3, instituicoes: [] },
  { nome: 'Angical do Piauí', total: 1, instituicoes: [] },
  { nome: 'Barras', total: 1, instituicoes: [] },
  { nome: 'Esperantina', total: 1, instituicoes: [] },
  { nome: 'Pedro II', total: 1, instituicoes: [] },
  { nome: 'Pio IX', total: 1, instituicoes: [] },
]

export type NivelAtuacao = 'alto' | 'medio' | 'baixo' | 'naoInformado'

/** Pesquisadores de cada núcleo por nível de atuação declarado no cadastro. */
export const ATUACAO_NUCLEOS: { slug: string; niveis: Record<NivelAtuacao, number> }[] = [
  { slug: 'saude-e-biotecnologia', niveis: { alto: 121, medio: 76, baixo: 24, naoInformado: 14 } },
  { slug: 'industria-verde', niveis: { alto: 68, medio: 92, baixo: 34, naoInformado: 25 } },
  { slug: 'governo-digital-e-infraestrutura', niveis: { alto: 53, medio: 83, baixo: 32, naoInformado: 23 } },
  { slug: 'agroindustria-e-bioeconomia', niveis: { alto: 80, medio: 85, baixo: 53, naoInformado: 31 } },
  { slug: 'turismo-e-economia-criativa', niveis: { alto: 30, medio: 46, baixo: 31, naoInformado: 20 } },
  { slug: 'industria-mineral', niveis: { alto: 22, medio: 41, baixo: 30, naoInformado: 26 } },
  { slug: 'economia-digital', niveis: { alto: 27, medio: 53, baixo: 65, naoInformado: 54 } },
]

/** Quantos pesquisadores indicaram 1, 2, … 7 núcleos (soma = COM_NUCLEO_INDICADO). */
export const QUANTIDADE_NUCLEOS = [107, 104, 70, 50, 41, 32, 31]

export type Categoria = { nome: string; total: number; /** "Não informada", "Outro"… */ neutra?: boolean }

export type GrupoPerfil = {
  id: 'grandeArea' | 'instituicao' | 'formacao' | 'cargo' | 'infraestrutura'
  titulo: string
  /** Quantas categorias existem no cadastro (pode haver mais do que as listadas). */
  categorias: number
  resumo: string
  cor: string
  itens: Categoria[]
  /** Múltipla escolha: a soma passa do total e não há linha de total. */
  multipla?: boolean
}

export const PERFIL: GrupoPerfil[] = [
  {
    id: 'grandeArea',
    titulo: 'Grande área (CNPq)',
    categorias: 11,
    resumo: '11 categorias',
    cor: 'bg-green-600',
    itens: [
      { nome: 'Ciências Exatas e da Terra', total: 126 },
      { nome: 'Engenharias', total: 79 },
      { nome: 'Ciências Agrárias', total: 65 },
      { nome: 'Ciências da Saúde', total: 51 },
      { nome: 'Ciências Sociais Aplicadas', total: 51 },
      { nome: 'Ciências Biológicas', total: 29 },
      { nome: 'Ciências Humanas', total: 26 },
      { nome: 'Linguística, Letras e Artes', total: 13 },
      { nome: 'Multidisciplinar', total: 6 },
      { nome: 'Não informada', total: 24, neutra: true },
      { nome: 'Não classificada', total: 5, neutra: true },
    ],
  },
  {
    id: 'instituicao',
    titulo: 'Instituição de vínculo',
    categorias: 9,
    resumo: '9 categorias',
    cor: 'bg-blue-500',
    itens: [
      { nome: 'IFPI', total: 168 },
      { nome: 'UFPI', total: 162 },
      { nome: 'UESPI', total: 113 },
      { nome: 'UFDPar', total: 25 },
      { nome: 'Embrapa Meio-Norte', total: 3 },
      { nome: 'SENAI-PI', total: 1 },
      { nome: 'PIT', total: 1 },
      { nome: 'SGB', total: 1 },
    ],
  },
  {
    id: 'formacao',
    titulo: 'Área de formação',
    categorias: 55,
    resumo: '55 áreas · 10 mais frequentes',
    cor: 'bg-green-400',
    itens: [
      { nome: 'Ciência da Computação / TI', total: 52 },
      { nome: 'Química', total: 47 },
      { nome: 'Agronomia', total: 32 },
      { nome: 'Engenharia Elétrica / Eletrônica', total: 31 },
      { nome: 'Ciências Biológicas', total: 29 },
      { nome: 'Administração', total: 28 },
      { nome: 'Farmácia / Farmacologia', total: 14 },
      { nome: 'Enfermagem', total: 13 },
      { nome: 'Zootecnia / Ciência Animal', total: 13 },
      { nome: 'Matemática / Estatística', total: 13 },
      { nome: 'Não informada', total: 24, neutra: true },
    ],
  },
  {
    id: 'cargo',
    titulo: 'Cargo / função',
    categorias: 7,
    resumo: '7 categorias',
    cor: 'bg-gold-500',
    itens: [
      { nome: 'Docente', total: 364 },
      { nome: 'Pesquisador(a)', total: 66 },
      { nome: 'Outro', total: 19, neutra: true },
      { nome: 'Pós-doutorando(a)', total: 9 },
      { nome: 'Técnico(a)', total: 8 },
      { nome: 'Bolsista de PD&I', total: 3 },
      { nome: 'Não informado', total: 6, neutra: true },
    ],
  },
  {
    id: 'infraestrutura',
    titulo: 'Infraestrutura utilizada',
    categorias: 11,
    resumo: '11 tipos · múltipla escolha',
    cor: 'bg-green-600',
    multipla: true,
    itens: [
      { nome: 'Laboratórios especializados', total: 250 },
      { nome: 'Equipamentos multiusuários', total: 193 },
      { nome: 'Softwares especializados', total: 173 },
      { nome: 'Plataformas computacionais', total: 155 },
      { nome: 'Áreas experimentais', total: 145 },
      { nome: 'Plataformas digitais', total: 136 },
      { nome: 'Infraestrutura de campo', total: 86 },
      { nome: 'Sensoriamento remoto', total: 50 },
      { nome: 'Coleções biológicas', total: 40 },
      { nome: 'Biotérios', total: 33 },
      { nome: 'Outro', total: 51, neutra: true },
    ],
  },
]

/** Percentual do banco com "<1%" para valores que arredondariam para zero. */
export function percentual(total: number, base = TOTAL_PESQUISADORES) {
  const valor = Math.round((total / base) * 100)
  return valor === 0 && total > 0 ? '<1%' : `${valor}%`
}
