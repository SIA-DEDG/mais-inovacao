import { useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { FaixaMarca } from '../../components/FaixaMarca'
import {
  AvisoLgpd,
  CabecalhoSecaoForm,
  Campo,
  CartaoAjuda,
  CartaoOpcao,
  Checkbox,
  Dica,
  NavegacaoSecoes,
  SelecaoMultipla,
  TextoLongo,
  useProgressoFormulario,
} from '../../components/formulario'
import { Container } from '../../components/ui'
import { MUNICIPIOS_PI } from '../../dados/municipios'
import { NUCLEOS } from '../../dados/nucleos'
import { BotoesEnvio, ConfirmacaoEnvio, TopoFormulario, validarEnvio } from './comum'

const SECOES = [
  { id: 'titulo', rotulo: 'Título do desafio' },
  { id: 'demandante', rotulo: 'Identificação do demandante' },
  { id: 'problema', rotulo: 'Descrição do problema' },
  { id: 'contexto', rotulo: 'Contexto e relevância estratégica' },
  { id: 'resultado', rotulo: 'Resultado esperado' },
  { id: 'inovacao', rotulo: 'Potencial de inovação' },
  { id: 'nucleos', rotulo: 'Área(s) temática(s) / Núcleo(s)' },
]

const PARTICIPACAO = [
  'Disponibilização de infraestrutura',
  'Disponibilização de dados',
  'Disponibilização de equipe técnica',
  'Ambiente para teste/validação',
  'Contrapartida econômica',
  'Contrapartida financeira',
  'Apoio à adoção da solução',
  'Outro',
]

const POTENCIAL = [
  'Novo produto',
  'Melhoria significativa de produto, processo ou serviço',
  'Novo processo',
  'Inovação em política pública ou gestão governamental',
  'Novo serviço',
  'Novo modelo de negócio',
  'Solução tecnológica',
  'Ativo de propriedade intelectual',
  'Outro resultado inovador',
]

// Opções de exemplo para o seletor; a lista oficial de setores ainda precisa ser definida.
const SETORES = [
  'Administração pública',
  'Agropecuária',
  'Comércio e serviços',
  'Educação',
  'Energia',
  'Indústria',
  'Meio ambiente',
  'Mineração',
  'Saúde',
  'Tecnologia da informação',
  'Turismo e cultura',
  'Outro',
]

// Ordem dos núcleos como no Figma (duas colunas).
const ORDEM_NUCLEOS = [
  'governo-digital-e-infraestrutura',
  'economia-digital',
  'agroindustria-e-bioeconomia',
  'industria-verde',
  'industria-mineral',
  'turismo-e-economia-criativa',
  'saude-e-biotecnologia',
]

function Secao({ id, numero, titulo, descricao, minimo, children }: {
  id: string
  numero: number
  titulo: string
  descricao: string
  minimo?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      data-minimo={minimo}
      className="flex scroll-mt-6 flex-col gap-6 border-b border-border py-10 first:pt-6"
    >
      <CabecalhoSecaoForm numero={numero} titulo={titulo} descricao={descricao} />
      <div className="flex flex-col gap-6 md:pl-14">{children}</div>
    </section>
  )
}

const Linha = ({ children }: { children: ReactNode }) => <div className="grid gap-5 md:grid-cols-2">{children}</div>

export default function TermoDesafio() {
  const { formRef, ativa, preenchidas, recalcular } = useProgressoFormulario(SECOES)
  const [erro, setErro] = useState<string>()
  const [enviadoPara, setEnviadoPara] = useState<string>()

  return (
    <>
      <FaixaMarca />
      <TopoFormulario
        trilha={[{ label: 'Inscrições', href: '/inscricoes' }, { label: 'Termo de Apresentação de Desafio' }]}
        titulo="Apresente seu desafio"
        descricao="Preencha o Termo de Apresentação de Desafio do Programa Mais Inovação – 7 Núcleos de Referência em Pesquisa e Desenvolvimento (P&D)."
        chips={[
          ['Termo nº:', 'gerado automaticamente no envio'],
          ['Data:', 'registrada no envio'],
          ['Tempo para preencher:', 'cerca de 20 a 30 minutos'],
        ]}
      />
      <div className="bg-surface pt-16 pb-24">
        <Container largo className="flex flex-col gap-12 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-4 lg:sticky lg:top-6 lg:w-[300px] lg:shrink-0">
            <NavegacaoSecoes titulo="Seções do termo" secoes={SECOES} ativa={ativa} preenchidas={preenchidas} />
            <CartaoAjuda>
              Descreva o problema, não a solução: o comitê e os pesquisadores dos núcleos vão construir a resposta com você.
            </CartaoAjuda>
          </div>

          <div className="min-w-0 flex-1 rounded-3xl border border-border bg-background px-5 py-2 md:px-12">
            {enviadoPara ? (
              <ConfirmacaoEnvio titulo="Desafio enviado" email={enviadoPara}>
                <p className="text-[14px] leading-[1.5] text-muted">
                  O comitê do programa vai avaliar o desafio e indicar o Núcleo de Referência. Você recebe as atualizações por e-mail.
                </p>
              </ConfirmacaoEnvio>
            ) : (
              <form
                ref={formRef}
                onInput={recalcular}
                onChange={recalcular}
                onSubmit={(e) => {
                  const mensagem = validarEnvio(e)
                  setErro(mensagem)
                  if (!mensagem) setEnviadoPara(String(new FormData(e.currentTarget).get('email')))
                }}
              >
                <p className="pt-8 text-[13px] text-muted">
                  Campos marcados com <span className="font-semibold text-gold-600">*</span> são obrigatórios.
                </p>

                <Secao
                  id="titulo"
                  numero={1}
                  titulo="Título do desafio"
                  descricao="Apresente uma denominação curta, clara e objetiva que permita identificar imediatamente o desafio."
                >
                  <Campo
                    name="titulo"
                    label="Título do desafio"
                    maxLength={120}
                    placeholder="Ex.: Perdas na colheita do caju por falta de rastreabilidade"
                    ajuda="Até 120 caracteres. Evite siglas e nomes de soluções."
                  />
                </Secao>

                <Secao
                  id="demandante"
                  numero={2}
                  titulo="Identificação do demandante"
                  descricao="Quem apresenta o desafio e quem será o ponto de contato durante a avaliação."
                >
                  <Linha>
                    <Campo name="instituicao" label="Instituição / órgão / empresa" placeholder="Nome da instituição, órgão ou empresa" />
                    <Campo name="unidade" label="Unidade / setor" placeholder="Ex.: Diretoria de Tecnologia" />
                  </Linha>
                  <Linha>
                    <Campo name="responsavel" label="Responsável" placeholder="Nome completo" autoComplete="name" />
                    <Campo name="cargo" label="Cargo / função" placeholder="Ex.: Coordenador(a) de inovação" />
                  </Linha>
                  <Linha>
                    <Campo
                      name="email"
                      type="email"
                      autoComplete="email"
                      label="E-mail de contato"
                      placeholder="nome@instituicao.com.br"
                      ajuda="O número do termo e o protocolo serão enviados para este e-mail."
                    />
                    <Campo name="telefone" type="tel" autoComplete="tel" label="Telefone / WhatsApp" placeholder="(86) 00000-0000" />
                  </Linha>
                  <hr className="border-border" />
                  <fieldset className="flex flex-col gap-6">
                    <legend className="mb-6 flex flex-col gap-1">
                      <span className="text-[15px] font-semibold text-green-900">Participação prevista da entidade demandante</span>
                      <span className="text-[13px] leading-[1.45] text-muted">
                        Marque todas as formas de participação que a entidade pode oferecer ao projeto.
                      </span>
                    </legend>
                    <div className="grid gap-x-5 gap-y-3.5 md:grid-cols-2">
                      {PARTICIPACAO.map((opcao) => (
                        <Checkbox key={opcao} name="participacao" value={opcao} rotulo={opcao} />
                      ))}
                    </div>
                  </fieldset>
                  <Campo name="participacao-outro" label="Outro (especifique)" obrigatorio={false} placeholder="Descreva outra forma de participação" />
                </Secao>

                <Secao
                  id="problema"
                  numero={3}
                  titulo="Descrição do problema"
                  descricao="Descreva objetivamente o problema que se pretende enfrentar, respondendo, preferencialmente, às perguntas abaixo."
                >
                  <TextoLongo
                    name="problema"
                    label="Qual é o problema?"
                    limite={1500}
                    placeholder="Explique o problema de forma objetiva, sem propor uma solução."
                    ajuda="Foque na dor: o que acontece hoje e por que isso é um problema."
                  />
                  <Linha>
                    <TextoLongo
                      name="onde"
                      label="Onde ele ocorre?"
                      obrigatorio={false}
                      limite={800}
                      placeholder="Locais, unidades, etapas do processo…"
                      ajuda="Território, unidade ou etapa."
                    />
                    <TextoLongo
                      name="afetados"
                      label="Quem é afetado?"
                      obrigatorio={false}
                      limite={800}
                      placeholder="Pessoas, empresas, instituições ou unidades…"
                      ajuda="Públicos impactados direta e indiretamente."
                    />
                  </Linha>
                  <Linha>
                    <TextoLongo
                      name="dimensao"
                      label="Qual é sua dimensão ou magnitude?"
                      obrigatorio={false}
                      limite={800}
                      placeholder="Ex.: perdas de 30% da produção, 5 mil atendimentos/mês…"
                      ajuda="Use números sempre que possível."
                    />
                    <TextoLongo
                      name="causas"
                      label="Quais são suas principais causas ou condicionantes?"
                      obrigatorio={false}
                      limite={800}
                      placeholder="Fatores técnicos, econômicos, sociais, regulatórios…"
                      ajuda="O que origina ou agrava o problema."
                    />
                  </Linha>
                  <TextoLongo
                    name="solucoes-insuficientes"
                    label="Por que as soluções atualmente disponíveis são insuficientes?"
                    obrigatorio={false}
                    limite={1500}
                    placeholder="O que já foi tentado e quais limitações foram encontradas."
                    ajuda="Inclua soluções de mercado, internas ou de outras instituições."
                  />
                  <TextoLongo
                    name="demanda-pdi"
                    label="Por que esse problema demanda pesquisa, desenvolvimento tecnológico ou inovação?"
                    limite={1500}
                    placeholder="Explique o que ainda não se sabe ou não existe para resolvê-lo."
                    ajuda="É o que justifica o envolvimento dos Núcleos de Referência em P&D."
                  />
                </Secao>

                <Secao
                  id="contexto"
                  numero={4}
                  titulo="Contexto e relevância estratégica"
                  descricao="Indique o contexto no qual o desafio está inserido e sua importância para o Estado do Piauí."
                >
                  <Linha>
                    <SelecaoMultipla
                      name="municipios"
                      label="Município(s) / território(s) relacionado(s)"
                      placeholder="Selecione um ou mais municípios"
                      opcoes={['Todo o Estado', ...MUNICIPIOS_PI]}
                      ajuda="Ou marque “Todo o Estado”."
                    />
                    <SelecaoMultipla
                      name="setores"
                      label="Setor(es)"
                      placeholder="Selecione um ou mais setores"
                      opcoes={SETORES}
                      ajuda="Ex.: agropecuária, saúde, administração pública."
                    />
                  </Linha>
                  <Linha>
                    <Campo
                      name="cadeias"
                      label="Cadeia(s) produtiva(s)"
                      obrigatorio={false}
                      placeholder="Ex.: cajucultura, apicultura, mineração"
                      ajuda="Se não se aplicar, deixe em branco."
                    />
                    <Campo
                      name="politicas"
                      label="Política(s) pública(s) relacionada(s)"
                      obrigatorio={false}
                      placeholder="Ex.: Plano Estadual de CT&I"
                      ajuda="Programas, planos ou leis ligados ao desafio."
                    />
                  </Linha>
                  <Campo
                    name="beneficiados"
                    label="Estimativa da população, empresas, instituições ou unidades potencialmente beneficiadas"
                    placeholder="Ex.: 12 mil produtores rurais em 30 municípios"
                  />
                  <TextoLongo
                    name="importancia"
                    label="Importância do problema para o Estado do Piauí"
                    placeholder="Descreva a relevância do desafio para o Estado."
                    ajuda="Econômica, social, ambiental, tecnológica, territorial ou institucional."
                  />
                </Secao>

                <Secao
                  id="resultado"
                  numero={5}
                  titulo="Resultado esperado"
                  descricao="Descreva o resultado que se pretende alcançar, evitando predeterminar uma solução tecnológica específica."
                >
                  <Dica titulo="Dica: descreva o resultado, não a solução">
                    <p>Prefira: “Reduzir em 30% as perdas na colheita do caju em dois anos.”</p>
                    <p>Evite: “Desenvolver um aplicativo de rastreamento da produção.”</p>
                  </Dica>
                  <TextoLongo
                    name="resultado"
                    label="Ao final do projeto ou conjunto de projetos associados ao desafio, espera-se:"
                    placeholder="Descreva os resultados esperados. Você pode listar mais de um, um por linha."
                    ajuda="Se possível, inclua indicadores ou metas que permitam medir o resultado."
                  />
                </Secao>

                <Secao
                  id="inovacao"
                  numero={6}
                  minimo="Potencial de inovação"
                  titulo="Potencial de inovação"
                  descricao="Indique em que medida o desafio poderá gerar ou estimular os resultados abaixo. Marque uma ou mais opções."
                >
                  <div className="grid gap-x-4 gap-y-3.5 md:grid-cols-2">
                    {POTENCIAL.map((opcao) => (
                      <Checkbox key={opcao} name="potencial" value={opcao} rotulo={opcao} />
                    ))}
                  </div>
                </Secao>

                <Secao
                  id="nucleos"
                  numero={7}
                  minimo="Área(s) temática(s) / Núcleo(s) de referência"
                  titulo="Área(s) temática(s) / Núcleo(s) de referência"
                  descricao="Sugira o Núcleo ou os Núcleos de Referência aos quais o desafio está vinculado. O comitê confirma o enquadramento na avaliação."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    {ORDEM_NUCLEOS.map((slug) => {
                      const nucleo = NUCLEOS.find((n) => n.slug === slug)!
                      return <CartaoOpcao key={slug} name="nucleos" value={nucleo.nome} titulo={nucleo.nome} descricao={nucleo.resumo} />
                    })}
                  </div>
                </Secao>

                <div className="flex flex-col gap-5 py-10">
                  <AvisoLgpd
                    introducao="Os dados pessoais informados neste termo (nome, cargo, e-mail e telefone do responsável) são tratados pela Secretaria de Inteligência Artificial, Economia Digital, Ciência, Tecnologia e Inovação do Piauí (SIA), conforme a Lei nº 13.709/2018 – Lei Geral de Proteção de Dados Pessoais (LGPD)."
                    finalidade="Avaliar o desafio, entrar em contato com a entidade demandante e acompanhar o projeto."
                    compartilhamento="Somente com o comitê avaliador e os Núcleos de Referência envolvidos no desafio. Os dados não são vendidos nem usados para outros fins."
                    armazenamento="Pelo tempo necessário à avaliação e à execução do projeto, observados os prazos legais de guarda de documentos públicos."
                  />
                  <Checkbox
                    name="declaracao"
                    required
                    rotulo="Declaro que as informações apresentadas são verdadeiras e que a entidade demandante está ciente da participação prevista neste termo."
                  />
                  <Checkbox
                    name="consentimento"
                    required
                    rotulo={
                      <>
                        Concordo com o tratamento dos dados pessoais deste termo, conforme a{' '}
                        <Link to="/politica-de-privacidade" className="text-gold-600 underline">
                          Política de Privacidade
                        </Link>
                        .
                      </>
                    }
                    descricao="Ao enviar, o termo recebe número e data automaticamente, e o protocolo é enviado para o e-mail de contato."
                  />
                  <BotoesEnvio rotulo="Enviar desafio" cancelarPara="/inscricoes" erro={erro} />
                </div>
              </form>
            )}
          </div>
        </Container>
      </div>
    </>
  )
}
