import { useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { FaixaMarca } from '../../components/FaixaMarca'
import {
  CabecalhoSecaoForm,
  Campo,
  CartaoAjuda,
  Checkbox,
  NavegacaoSecoes,
  NucleoOpcao,
  Pergunta,
  Radio,
  Selecao,
  SimNao,
  TextoLongo,
  useProgressoFormulario,
} from '../../components/formulario'
import { Container } from '../../components/ui'
import { MUNICIPIOS_PI } from '../../dados/municipios'
import { NUCLEOS } from '../../dados/nucleos'
import { BotoesEnvio, ConfirmacaoEnvio, TopoFormulario, validarEnvio } from './comum'

const SECOES = [
  { id: 'identificacao', rotulo: 'Identificação' },
  { id: 'vinculo', rotulo: 'Vínculo institucional' },
  { id: 'formacao', rotulo: 'Formação e atuação' },
  { id: 'nucleos', rotulo: 'Núcleos de atuação' },
  { id: 'inovacao', rotulo: 'Inovação e produção tecnológica' },
  { id: 'infraestrutura', rotulo: 'Infraestrutura' },
  { id: 'redes', rotulo: 'Redes e parcerias' },
  { id: 'demandas', rotulo: 'Demandas e gargalos' },
]

// Instituições com pesquisadores no banco (Figma: "Instituições de vínculo").
const INSTITUICOES = ['UFPI', 'UESPI', 'IFPI', 'UFDPar', 'Embrapa Meio-Norte', 'SENAI-PI', 'PIT', 'UEMA', 'Outra']

const GRANDES_AREAS_CNPQ = [
  'Ciências Exatas e da Terra',
  'Ciências Biológicas',
  'Engenharias',
  'Ciências da Saúde',
  'Ciências Agrárias',
  'Ciências Sociais Aplicadas',
  'Ciências Humanas',
  'Linguística, Letras e Artes',
  'Multidisciplinar',
]

const CARGOS = ['Docente', 'Pesquisador(a)', 'Pós-doutorando(a)', 'Técnico(a)', 'Bolsista de PD&I', 'Outro']

const NUCLEOS_ORDEM_ALFABETICA = [...NUCLEOS].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))

// Subáreas do cadastro: o Figma detalha Agroindústria; os demais usam as subáreas da página de núcleos.
const SUBAREAS_CADASTRO: Record<string, string[]> = {
  'agroindustria-e-bioeconomia': [
    'Agricultura sustentável',
    'Agricultura de precisão',
    'Bioinsumos',
    'Bioprocessos',
    'Cadeias produtivas',
    'Economia circular',
    'Microbiologia industrial',
    'Processamento de alimentos',
    'Proteína alternativa',
    'Química/bioquímica de produtos naturais',
    'Resíduos agroindustriais',
    'Sustentabilidade e ESG',
    'Tecnologias agroindustriais',
    'Uso de resíduos',
  ],
}

const TIPOS_INFRAESTRUTURA = [
  'Laboratórios especializados',
  'Equipamentos multiusuários',
  'Softwares especializados',
  'Plataformas computacionais',
  'Plataformas digitais',
  'Áreas experimentais',
  'Infraestrutura de campo',
  'Sensoriamento remoto',
  'Coleções biológicas',
  'Biotérios',
  'Outro',
]

const ATUA_COM = [
  'Instituições públicas',
  'ICTs',
  'Empresas privadas',
  'Instituições internacionais',
  'Secretarias estaduais',
  'Prefeituras',
  'Cooperativas ou associações',
  'Organizações sociais',
  'Comunidades tradicionais',
  'Outro',
]

const TIPOS_PRODUCAO = [
  'Patentes',
  'Softwares',
  'Aplicativos',
  'Plataformas digitais',
  'Processos tecnológicos',
  'Produtos biotecnológicos',
  'Protocolos técnicos',
  'Materiais didáticos tecnológicos',
  'Bioinsumos',
  'Cultivares',
  'Startups',
  'Outro',
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
    <section id={id} data-minimo={minimo} className="flex scroll-mt-6 flex-col gap-6 border-b border-border py-10 first:pt-6">
      <CabecalhoSecaoForm numero={numero} titulo={titulo} descricao={descricao} />
      <div className="flex flex-col gap-6 md:pl-14">{children}</div>
    </section>
  )
}

const Linha = ({ children }: { children: ReactNode }) => <div className="grid gap-5 md:grid-cols-2">{children}</div>

const Opcoes = ({ children, colunas = 3 }: { children: ReactNode; colunas?: 2 | 3 }) => (
  <div className={`grid gap-x-4 gap-y-3.5 ${colunas === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>{children}</div>
)

export default function BancoCompetencias() {
  const { formRef, ativa, preenchidas, recalcular } = useProgressoFormulario(SECOES)
  const [erro, setErro] = useState<string>()
  const [enviadoPara, setEnviadoPara] = useState<string>()

  return (
    <>
      <FaixaMarca />
      <TopoFormulario
        trilha={[{ label: 'Inscrições', href: '/inscricoes' }, { label: 'Banco de Competências dos Pesquisadores' }]}
        titulo="Cadastre-se no Banco de Competências dos Pesquisadores"
        descricao="O Banco de Competências dos Pesquisadores é o banco de dados do Programa Mais Inovação com o perfil de cada pesquisador. Ele reúne quem você é, onde atua, sua formação e o que sabe fazer em pesquisa, desenvolvimento e inovação (PD&I). É a partir dele que o comitê encontra os pesquisadores certos para cada desafio dos 7 Núcleos de Referência."
        chips={[
          ['Protocolo:', 'gerado no envio'],
          ['Data:', 'registrada no envio'],
          ['Tempo para preencher:', 'cerca de 15 a 20 minutos'],
        ]}
      />
      <div className="bg-surface pt-16 pb-24">
        <Container largo className="flex flex-col gap-12 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-4 lg:sticky lg:top-6 lg:w-[300px] lg:shrink-0">
            <NavegacaoSecoes titulo="Seções do termo" secoes={SECOES} ativa={ativa} preenchidas={preenchidas} />
            <CartaoAjuda>
              Tenha em mãos o link do seu Currículo Lattes e as suas linhas de pesquisa. Você pode atuar em mais de um núcleo.
            </CartaoAjuda>
          </div>

          <div className="min-w-0 flex-1 rounded-3xl border border-border bg-background px-5 py-2 md:px-12">
            {enviadoPara ? (
              <ConfirmacaoEnvio titulo="Cadastro enviado" email={enviadoPara}>
                <p className="text-[14px] leading-[1.5] text-muted">
                  O comitê vai conferir o seu Lattes e os núcleos indicados. Depois da validação, o seu perfil fica disponível para os
                  desafios do núcleo.
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
                  id="identificacao"
                  numero={1}
                  titulo="Identificação"
                  descricao="Seus dados de contato e o currículo que comprova sua trajetória."
                >
                  <Campo name="nome" label="Nome completo" placeholder="Seu nome completo" autoComplete="name" />
                  <Linha>
                    <Campo
                      name="email"
                      type="email"
                      autoComplete="email"
                      label="E-mail"
                      placeholder="nome@instituicao.edu.br"
                      ajuda="O protocolo do cadastro será enviado para este e-mail."
                    />
                    <Campo name="telefone" type="tel" autoComplete="tel" label="Telefone / WhatsApp" placeholder="(86) 90000-0000" />
                  </Linha>
                  <Campo
                    name="lattes"
                    type="url"
                    label="Currículo Lattes"
                    placeholder="http://lattes.cnpq.br/0000000000000000"
                    pattern="https?://lattes\.cnpq\.br/\d+"
                    title="Use o link público do Lattes, no formato http://lattes.cnpq.br/ seguido do número."
                    ajuda="Use o link público do currículo (o endereço da área restrita do Lattes não funciona)."
                  />
                </Secao>

                <Secao id="vinculo" numero={2} titulo="Vínculo institucional" descricao="Onde você atua e qual a sua função.">
                  <Linha>
                    <Selecao
                      name="instituicao"
                      label="Instituição"
                      placeholder="Selecione a instituição"
                      opcoes={INSTITUICOES}
                      ajuda="Ex.: UFPI, UESPI, IFPI, UFDPar, Embrapa Meio-Norte."
                    />
                    {/* No Figma é um seletor; a lista de campi depende da instituição e ainda não existe. */}
                    <Campo name="campus" label="Campus / unidade" placeholder="Nome do campus ou unidade" />
                  </Linha>
                  <Linha>
                    <Selecao name="municipio" label="Município" placeholder="Selecione o município" opcoes={MUNICIPIOS_PI} />
                    <Campo
                      name="grupo"
                      label="Programa de pós-graduação / núcleo / grupo de pesquisa"
                      obrigatorio={false}
                      placeholder="Ex.: PPG em Ciência dos Materiais"
                    />
                  </Linha>
                  <Pergunta rotulo="Cargo / função" obrigatorio>
                    <div className="flex flex-wrap gap-x-7 gap-y-3">
                      {CARGOS.map((c) => (
                        <Radio key={c} name="cargo" value={c} rotulo={c} required />
                      ))}
                    </div>
                  </Pergunta>
                </Secao>

                <Secao id="formacao" numero={3} titulo="Formação e atuação" descricao="Sua área de formação e o que você pesquisa hoje.">
                  <Linha>
                    <Campo name="formacao" label="Área de formação" placeholder="Ex.: Química, Enfermagem, Ciência da Computação" />
                    <Selecao name="grande-area" label="Grande área (CNPq)" placeholder="Selecione a grande área" opcoes={GRANDES_AREAS_CNPQ} />
                  </Linha>
                  <Campo
                    name="areas-atuacao"
                    label="Área(s) de atuação científica e tecnológica"
                    placeholder="Ex.: química de produtos naturais, saúde digital"
                    ajuda="Separe as áreas por vírgula."
                  />
                  <TextoLongo
                    name="linhas-pesquisa"
                    label="Linhas de pesquisa"
                    limite={1500}
                    placeholder="Descreva suas principais linhas de pesquisa."
                    ajuda="Uma linha por item, se possível."
                  />
                  <TextoLongo
                    name="competencias"
                    label="Competências técnico-científicas"
                    placeholder="Métodos, técnicas, equipamentos e experiências que você domina."
                    ajuda="É a partir daqui que conectamos você aos desafios: seja específico(a)."
                  />
                </Secao>

                <Secao
                  id="nucleos"
                  numero={4}
                  minimo="Núcleos de atuação"
                  titulo="Núcleos de atuação"
                  descricao="Marque somente os Núcleos de Referência em que você atua. Os demais podem ficar em branco."
                >
                  <Pergunta
                    obrigatorio
                    rotulo="Em quais núcleos você atua?"
                    descricao="Marque apenas os núcleos em que você tem atuação (pelo menos um) e indique o nível em cada um. Alto: atuação principal e produção consolidada · Médio: atuação recorrente · Baixo: atuação pontual."
                  >
                    <div className="flex flex-col gap-2.5">
                      {NUCLEOS_ORDEM_ALFABETICA.map((n) => (
                        <NucleoOpcao
                          key={n.slug}
                          name="nucleos"
                          nome={n.nome}
                          descricao={n.resumo}
                          subareas={SUBAREAS_CADASTRO[n.slug] ?? n.subareas}
                        />
                      ))}
                    </div>
                  </Pergunta>
                </Secao>

                <Secao
                  id="inovacao"
                  numero={5}
                  titulo="Inovação e produção tecnológica"
                  descricao="Conte o que você já desenvolveu e como interage com empresas e o setor produtivo."
                >
                  <SimNao name="faz-inovacao" rotulo="Você desenvolve atividades de inovação?" />
                  <TextoLongo
                    name="atividades-inovacao"
                    obrigatorio={false}
                    limite={1500}
                    label="Quais atividades de inovação você desenvolve?"
                    placeholder="Ex.: desenvolvimento de bioadsorvente a partir de resíduos, aplicativo de apoio ao diagnóstico…"
                    ajuda="Responda se marcou “Sim”."
                  />
                  <hr className="border-border" />
                  <SimNao name="producao-tecnologica" rotulo="Possui produção tecnológica?" />
                  <Pergunta rotulo="Tipos de produção tecnológica" descricao="Marque todos que se aplicam.">
                    <Opcoes>
                      {TIPOS_PRODUCAO.map((t) => (
                        <Checkbox key={t} name="tipos-producao" value={t} rotulo={t} />
                      ))}
                    </Opcoes>
                  </Pergunta>
                  <TextoLongo
                    name="tecnologias"
                    obrigatorio={false}
                    limite={1500}
                    label="Tecnologias, produtos ou processos desenvolvidos"
                    placeholder="Descreva as principais tecnologias, produtos ou processos."
                  />
                  <hr className="border-border" />
                  <SimNao name="transferencia" rotulo="Realiza transferência de tecnologia ou interação com empresas?" />
                  <TextoLongo
                    name="acoes-transferencia"
                    obrigatorio={false}
                    limite={1500}
                    label="Quais ações de transferência e interação você realizou?"
                    placeholder="Licenciamentos, consultorias, projetos com empresas, prestação de serviços…"
                  />
                </Secao>

                <Secao
                  id="infraestrutura"
                  numero={6}
                  titulo="Infraestrutura laboratorial e tecnológica"
                  descricao="A infraestrutura que você utiliza, o potencial de compartilhamento e o que falta."
                >
                  <SimNao name="usa-infraestrutura" rotulo="Utiliza infraestrutura laboratorial ou tecnológica?" opcoes={['Sim', 'Não', 'Talvez']} />
                  <Pergunta rotulo="Tipos de infraestrutura utilizados" descricao="Marque todos que se aplicam.">
                    <Opcoes>
                      {TIPOS_INFRAESTRUTURA.map((t) => (
                        <Checkbox key={t} name="tipos-infraestrutura" value={t} rotulo={t} />
                      ))}
                    </Opcoes>
                  </Pergunta>
                  <TextoLongo
                    name="descricao-infraestrutura"
                    obrigatorio={false}
                    limite={1500}
                    label="Descrição da infraestrutura utilizada"
                    placeholder="Laboratórios, equipamentos e plataformas que você usa no dia a dia."
                  />
                  <SimNao
                    name="infraestrutura-redes"
                    rotulo="Essa infraestrutura tem potencial para redes colaborativas?"
                    descricao="Ou seja, se poderia ser compartilhada com outros pesquisadores e com projetos do programa."
                    opcoes={['Sim', 'Não', 'Talvez']}
                  />
                  <TextoLongo
                    name="demandas-infraestrutura"
                    obrigatorio={false}
                    limite={1500}
                    label="Demandas de infraestrutura para fortalecer suas atividades de PD&I"
                    placeholder="Equipamentos, laboratórios, softwares ou equipe que fariam diferença."
                  />
                </Secao>

                <Secao
                  id="redes"
                  numero={7}
                  titulo="Redes de cooperação e parcerias"
                  descricao="Com quem você já trabalha e se tem interesse em redes estaduais."
                >
                  <SimNao name="participa-redes" rotulo="Participa de redes de pesquisa, inovação ou cooperação?" />
                  <Campo
                    name="parceiros"
                    label="Principais parceiros institucionais"
                    obrigatorio={false}
                    placeholder="Ex.: UFPB, Embrapa, Secretaria de Estado da Saúde"
                    ajuda="Separe os parceiros por vírgula."
                  />
                  <Pergunta rotulo="Atua em conjunto com" descricao="Marque todos que se aplicam.">
                    <Opcoes>
                      {ATUA_COM.map((t) => (
                        <Checkbox key={t} name="atua-com" value={t} rotulo={t} />
                      ))}
                    </Opcoes>
                  </Pergunta>
                  <SimNao name="interesse-redes" rotulo="Tem interesse em integrar redes colaborativas estaduais?" />
                </Secao>

                <Secao
                  id="demandas"
                  numero={8}
                  titulo="Demandas e gargalos"
                  descricao="Sua visão sobre onde investir e o que trava a inovação no Piauí."
                >
                  <TextoLongo
                    name="areas-investimento"
                    obrigatorio={false}
                    limite={1500}
                    label="Áreas estratégicas que necessitam de maior investimento e fomento"
                    placeholder="Quais áreas deveriam receber mais apoio?"
                  />
                  <TextoLongo
                    name="gargalos"
                    obrigatorio={false}
                    limite={1500}
                    label="Principais gargalos para inovação e desenvolvimento tecnológico"
                    placeholder="Ex.: financiamento descontínuo, falta de equipe técnica, burocracia…"
                  />
                  <TextoLongo
                    name="complementares"
                    obrigatorio={false}
                    limite={1000}
                    label="Informações complementares"
                    placeholder="Algo mais que devemos saber sobre a sua atuação?"
                  />
                </Secao>

                <div className="flex flex-col gap-5 py-10">
                  <Checkbox
                    name="declaracao"
                    required
                    rotulo="Declaro que as informações apresentadas são verdadeiras."
                  />
                  <Checkbox
                    name="consentimento"
                    required
                    rotulo={
                      <>
                        Autorizo o tratamento dos meus dados pessoais pelo Programa Mais Inovação, conforme a{' '}
                        <Link to="/politica-de-privacidade" className="text-gold-600 underline">
                          Política de Privacidade
                        </Link>
                        .
                      </>
                    }
                    descricao="Você pode revogar esta autorização a qualquer momento. Ao enviar, o protocolo é enviado para o seu e-mail."
                  />
                  <BotoesEnvio rotulo="Enviar cadastro" cancelarPara="/inscricoes" erro={erro} />
                </div>
              </form>
            )}
          </div>
        </Container>
      </div>
    </>
  )
}
