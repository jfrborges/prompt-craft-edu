// Usando objetos globais do React em vez de importações ES6
const { useState, useEffect } = React;
const icons = lucide;

// Componente principal
const PromptCraftEdu = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [activeLevel, setActiveLevel] = useState('basico');
  const [showTips, setShowTips] = useState(false);

  // Dados de exemplo de cenários educativos
  const scenarios = {
    basico: [
      {
        id: 'b1',
        title: 'Plano de Aula',
        description: 'Precisa criar um plano de aula sobre fotossíntese para alunos do 7º ano.',
        context: 'Ciências Naturais, 30 alunos, aula de 50 minutos, sem acesso a laboratório.',
        examplePrompt: 'Crie um plano de aula detalhado sobre fotossíntese para alunos do 7º ano. A turma tem 30 alunos, a aula dura 50 minutos e não temos acesso a laboratório. Inclua objetivos de aprendizagem claros, uma atividade introdutória envolvente (5-10 min), explicação principal (20 min), atividade prática que possa ser realizada na sala de aula normal (15 min), e uma avaliação rápida final (5 min). Adicione também uma lista de materiais necessários que sejam fáceis de obter.',
        tips: ['Especifique o tópico e nível escolar', 'Indique restrições de tempo e recursos', 'Solicite elementos específicos do plano', 'Mencione o número de alunos']
      },
      {
        id: 'b2',
        title: 'Material Diferenciado',
        description: 'Precisa adaptar exercícios de matemática para diferentes níveis de aprendizagem.',
        context: 'Matemática, 6º ano, tema de frações, alunos com diferentes capacidades.',
        examplePrompt: 'Crie três versões do mesmo conjunto de exercícios sobre adição e subtração de frações para alunos do 6º ano, adaptados para diferentes níveis: nível 1 (básico) para alunos que ainda estão a compreender conceitos fundamentais, nível 2 (intermédio) para a maioria da turma, e nível 3 (avançado) para desafiar os alunos mais rápidos. Cada versão deve ter 5 exercícios com progressão de dificuldade. Para o nível 1, inclua suporte visual. Para o nível 3, inclua problemas com aplicações do mundo real. Forneça também as soluções.',
        tips: ['Especifique os diferentes níveis de habilidade', 'Defina quantos exercícios para cada nível', 'Solicite suportes visuais ou estratégias específicas', 'Peça soluções']
      },
      {
        id: 'b3',
        title: 'Avaliação Formativa',
        description: 'Precisa criar uma avaliação rápida para verificar a compreensão durante a aula.',
        context: 'História, 8º ano, tópico sobre Revolução Industrial.',
        examplePrompt: 'Desenvolva 3 estratégias de avaliação formativa de 5 minutos que posso implementar durante uma aula sobre a Revolução Industrial para alunos do 8º ano. Quero verificar a compreensão dos alunos sobre as causas, principais desenvolvimentos tecnológicos e impactos sociais. Uma estratégia deve ser individual e silenciosa, outra deve envolver discussão em pares, e a terceira deve ser uma atividade para toda a turma. Forneça instruções claras para implementação e explique como cada estratégia me ajudará a identificar lacunas de compreensão.',
        tips: ['Especifique o tipo de avaliação', 'Indique tópicos específicos a avaliar', 'Defina restrições de tempo', 'Solicite variedade de formatos']
      }
    ],
    intermedio: [
      {
        id: 'i1',
        title: 'Abordagem Interdisciplinar',
        description: 'Precisa criar uma unidade que conecte várias disciplinas.',
        context: 'Projeto interdisciplinar conectando Ciências, História e Artes para o 9º ano.',
        examplePrompt: 'Ajude-me a planejar um projeto interdisciplinar de duas semanas sobre "Grandes Invenções que Mudaram o Mundo" para o 9º ano, integrando Ciências, História e Artes. Quero que os alunos explorem como invenções específicas transformaram a sociedade ao longo do tempo. \n\nDetalhe os seguintes componentes:\n1. 3-5 objetivos de aprendizagem mensuráveis\n2. Uma linha do tempo sugerindo como estruturar as atividades ao longo de 10 dias letivos\n3. 4-5 invenções recomendadas a explorar que ofereçam ricas conexões entre as três disciplinas\n4. Para cada disciplina, duas atividades específicas alinhadas com o currículo do 9º ano\n5. Uma rubrica de avaliação que valorize tanto o conhecimento de conteúdo quanto competências transversais\n6. Uma atividade final colaborativa que demonstre a aprendizagem interdisciplinar\n\nQuero garantir que o projeto seja rigoroso academicamente, mas também criativo e envolvente para adolescentes.',
        tips: ['Detalhe os objetivos interdisciplinares', 'Estruture o projeto por fases', 'Especifique conexões entre disciplinas', 'Solicite critérios de avaliação claros']
      },
      {
        id: 'i2',
        title: 'Feedback Construtivo',
        description: 'Precisa de ajuda para fornecer feedback construtivo em redações.',
        context: 'Português, 10º ano, redações argumentativas, vários níveis de habilidade.',
        examplePrompt: 'Preciso de orientação para dar feedback mais eficaz em redações argumentativas de alunos do 10º ano. Analise esta redação de exemplo: [INSIRA TEXTO DA REDAÇÃO AQUI] e forneça três tipos de feedback:\n\n1. Feedback geral: 2-3 parágrafos avaliando os pontos fortes e fracos gerais, com foco na estrutura argumentativa, clareza de pensamento e uso de evidências.\n\n2. Feedback específico: Anotações detalhadas de 5-7 trechos específicos do texto, comentando tanto aspectos positivos quanto áreas de melhoria. Para cada comentário, forneça uma sugestão prática que o aluno possa implementar.\n\n3. Estratégia de melhoria: Um plano personalizado com 3 prioridades de desenvolvimento que este aluno específico deve focar nas próximas redações, com exercícios práticos para cada prioridade.\n\nPor favor, mantenha o feedback construtivo, específico e encorajador, visando desenvolver a confiança do aluno enquanto aponta caminhos claros para melhoria.',
        tips: ['Incluir o texto específico a ser analisado', 'Solicitar diferentes tipos de feedback', 'Pedir sugestões práticas e acionáveis', 'Especificar um tom encorajador']
      },
      {
        id: 'i3',
        title: 'Adaptação Curricular',
        description: 'Precisa adaptar materiais para alunos com necessidades educativas especiais.',
        context: 'Inglês, 5º ano, aluno com dislexia na turma regular.',
        examplePrompt: 'Preciso adaptar minha próxima unidade sobre "Descrições e Adjetivos" em Inglês para um aluno com dislexia moderada integrado na minha turma de 5º ano. O aluno tem boa compreensão oral, mas enfrenta desafios significativos com leitura e escrita. \n\nA unidade inclui: vocabulário sobre adjetivos, exercícios de leitura de descrições e uma atividade final de escrita criativa.\n\nPor favor, forneça:\n\n1. 5-7 adaptações específicas que posso implementar para os materiais existentes (tanto para fichas de trabalho quanto para apresentações visuais)\n\n2. 3 estratégias alternativas de avaliação que permitam ao aluno demonstrar compreensão sem depender excessivamente da leitura e escrita\n\n3. Uma lista de recursos multissensoriais e tecnológicos recomendados que possam apoiar a aprendizagem\n\n4. Sugestões sobre como implementar estas adaptações de forma inclusiva, sem que o aluno se sinta destacado negativamente\n\nBasei-me nas recomendações do relatório psicopedagógico do aluno que sugere: maior tempo para tarefas, uso de fontes específicas para disléxicos, redução da quantidade de texto escrito, e apoio visual aumentado.',
        tips: ['Especificar o tipo de necessidade educativa', 'Descrever o conteúdo a ser adaptado', 'Solicitar tipos específicos de adaptações', 'Mencionar preocupações com inclusão']
      }
    ],
    avancado: [
      {
        id: 'a1',
        title: 'Projeto Baseado em Problemas',
        description: 'Precisa estruturar um projeto complexo de aprendizagem baseada em problemas.',
        context: 'Economia e Matemática, 11º ano, projeto de 6 semanas sobre sustentabilidade.',
        examplePrompt: 'Ajude-me a desenvolver um projeto de Aprendizagem Baseada em Problemas (PBL) rigoroso intitulado "Redesenhando Economias Sustentáveis" para alunos do 11º ano, integrando Economia e Matemática aplicada. O projeto durará 6 semanas (18 aulas de 90 minutos).\n\nO desafio central deve exigir que os alunos analisem dados econômicos reais e proponham modelos matemáticos para uma transição econômica sustentável em nossa região. Quero que desenvolvam tanto competências técnicas (modelagem matemática, análise de dados) quanto transversais (pensamento crítico, colaboração).\n\nPor favor, desenvolva:\n\n1. Um cenário de problema complexo mas realista, com subproblemas que exijam investigação interdisciplinar\n\n2. Um mapa de progressão detalhado das 6 semanas, dividido em fases (lançamento, investigação, desenvolvimento de soluções, refinamento, apresentação)\n\n3. 3-4 momentos estratégicos de ensino direto (mini-lições de 20 minutos) que introduzam conceitos essenciais quando os alunos precisarem deles\n\n4. Um sistema de scaffolding que apoie gradualmente os alunos em direção à autonomia\n\n5. Pontos de verificação e avaliações formativas para cada fase, incluindo oportunidades de feedback por pares\n\n6. Uma estratégia de diferenciação que permita a alunos com diferentes níveis de habilidade matemática participarem significativamente\n\n7. Critérios de avaliação rigorosos para o produto final com descritores de qualidade específicos\n\nQuero garantir que este projeto seja academicamente rigoroso, autêntico, e suficientemente complexo para justificar seis semanas de trabalho aprofundado.',
        tips: ['Formular um problema central autêntico', 'Detalhar a estrutura e progressão por fases', 'Especificar momentos de instrução direta', 'Solicitar estratégias de diferenciação']
      },
      {
        id: 'a2',
        title: 'Análise de Dados Educativos',
        description: 'Precisa analisar dados de avaliação da turma para informar o ensino.',
        context: 'Matemática, 8º ano, resultados recentes de avaliação mostrando padrões diversos.',
        examplePrompt: 'Preciso analisar os dados de avaliação da minha turma de Matemática do 8º ano para informar minha abordagem pedagógica nas próximas 3 semanas. \n\nAqui estão os dados da última avaliação trimestral, organizada por domínios de conteúdo e competências:\n\n[TABELA DE DADOS AQUI COM: Pontuações por aluno em cada domínio (Números e Operações, Álgebra, Geometria, Estatística), competências transversais (Resolução de problemas, Raciocínio, Comunicação matemática), informações demográficas relevantes (aluno com plano educativo individualizado, etc.)]\n\nPor favor, ajude-me a:\n\n1. Identificar 3-5 padrões significativos nestes dados, incluindo áreas de força coletiva, conceitos problemáticos comuns, e disparidades entre subgrupos\n\n2. Sugerir 2-3 hipóteses sobre as causas das dificuldades identificadas, considerando possíveis lacunas conceituais anteriores ou concepções errôneas\n\n3. Recomendar uma estratégia de agrupamento flexível para as próximas 3 semanas baseada nestes dados, que me permita direcionar o apoio onde é mais necessário\n\n4. Desenvolver 3 intervenções pedagógicas específicas para os conceitos mais problemáticos, incluindo abordagens diferenciadas\n\n5. Sugerir 2-3 métricas formativas que posso usar nas próximas semanas para monitorar o progresso e ajustar as intervenções conforme necessário\n\nQuero garantir que minha resposta aos dados seja metodologicamente sólida e realmente responda às necessidades demonstradas pelos alunos.',
        tips: ['Incluir dados específicos para análise', 'Pedir identificação de padrões específicos', 'Solicitar intervenções pedagógicas baseadas em dados', 'Pedir métricas para monitoramento']
      },
      {
        id: 'a3',
        title: 'Desenvolvimento Profissional',
        description: 'Precisa de um plano de formação para colegas professores.',
        context: 'Formação sobre integração de tecnologia na sala de aula para equipe diversificada.',
        examplePrompt: 'Ajude-me a desenvolver um workshop de desenvolvimento profissional de 3 horas sobre "Integração Significativa de IA na Pedagogia" para os professores da minha escola. O grupo é diverso: inclui professores de várias disciplinas, do 5º ao 12º ano, com níveis de fluência tecnológica variados (30% são relutantes com tecnologia, 50% são moderadamente confortáveis, 20% são tecnologicamente fluentes).\n\nOs objetivos principais são: (1) desenvolver uma compreensão nuançada das capacidades e limitações da IA na educação, (2) equipar os professores com critérios para avaliar quando a integração de IA adiciona valor pedagógico, e (3) capacitá-los a projetar experiências de aprendizagem que utilizem IA como amplificadora de boas práticas pedagógicas, não como substituta.\n\nPor favor, desenvolva:\n\n1. Uma agenda detalhada para as 3 horas, incluindo tempos específicos e transições\n\n2. 2-3 atividades experienciais que permitam aos professores experimentar ferramentas de IA do ponto de vista do aluno\n\n3. 1-2 estudos de caso concretos para cada nível (básico, intermédio e secundário) que demonstrem integração de IA pedagogicamente sólida\n\n4. Uma estrutura para apoiar os participantes a desenvolverem e receberem feedback sobre pelo menos uma atividade de aprendizagem para sua própria disciplina/nível\n\n5. Estratégias específicas para envolver os participantes mais relutantes sem alienar os tecnologicamente fluentes\n\n6. Um plano de acompanhamento de 8 semanas que apoie a implementação e reflexão após o workshop\n\nQuero que este workshop seja prático, baseado em pesquisa sobre boas práticas de desenvolvimento profissional, e que catalise mudanças reais nas práticas de sala de aula.',
        tips: ['Detalhar objetivos específicos da formação', 'Considerar os diferentes níveis de fluência tecnológica', 'Solicitar atividades experienciais', 'Incluir estratégias de acompanhamento']
      }
    ]
  };

  const principios = [
    {
      id: 'p1',
      title: 'Especificidade',
      description: 'Quanto mais específico for o prompt, melhores serão os resultados. Inclua detalhes relevantes sobre contexto, objetivos, restrições e formato desejado.',
      exemplo: 'Em vez de pedir "atividades de matemática", especifique: "5 atividades interativas sobre frações para alunos do 4º ano, usando materiais disponíveis em sala de aula comum, duração de 15 minutos cada".'
    },
    {
      id: 'p2',
      title: 'Estrutura Clara',
      description: 'Organize o prompt em seções ou listas numeradas para obter respostas igualmente estruturadas e facilitar a extração das informações necessárias.',
      exemplo: 'Crie um plano de aula sobre poesia para o 8º ano incluindo:\n1. Objetivos de aprendizagem\n2. Atividade introdutória (10 min)\n3. Explicação principal (20 min)\n4. Atividade prática (15 min)\n5. Avaliação (5 min)'
    },
    {
      id: 'p3',
      title: 'Contexto Educativo',
      description: 'Forneça informações sobre os alunos, o ambiente de aprendizagem e os recursos disponíveis para receber conteúdo adequado ao contexto.',
      exemplo: 'A turma tem 28 alunos do 6º ano, incluindo 3 alunos com dificuldades de leitura e 2 alunos avançados. Temos acesso a tablets (1 para cada 2 alunos) e a aula dura 50 minutos.'
    },
    {
      id: 'p4',
      title: 'Objetivos Claros',
      description: 'Defina explicitamente o que pretende alcançar com a resposta, especificando níveis de profundidade, complexidade e resultados esperados.',
      exemplo: 'Preciso de uma explicação sobre fotossíntese para alunos do 7º ano que inclua analogias visuais, aborde conceitos errôneos comuns e forneça um exemplo concreto que possa ser demonstrado em sala de aula.'
    },
    {
      id: 'p5',
      title: 'Restrições Importantes',
      description: 'Mencione limitações de tempo, recursos, competências dos alunos ou requisitos curriculares que devem ser considerados.',
      exemplo: 'As atividades devem ser realizáveis em grupos de 4-5 alunos, durar no máximo 20 minutos, e não exigir materiais além de papel, canetas e tesouras que temos disponíveis.'
    },
    {
      id: 'p6',
      title: 'Iteração e Refinamento',
      description: 'Use prompts sequenciais para refinar e melhorar os resultados iniciais, solicitando ajustes específicos ou expansões.',
      exemplo: 'No plano de aula anterior, preciso que adapte a atividade prática para incluir opções para alunos com dificuldades motoras e adicione critérios de avaliação mais detalhados.'
    },
  ];

  const criterios = [
    { id: 'c1', criterio: 'Especificidade', pontos: 0, descricao: 'O prompt fornece detalhes específicos sobre o contexto, requisitos e objetivos?' },
    { id: 'c2', criterio: 'Estrutura', pontos: 0, descricao: 'O prompt está bem organizado e claramente estruturado?' },
    { id: 'c3', criterio: 'Contexto', pontos: 0, descricao: 'O prompt inclui informações relevantes sobre o ambiente educativo e os alunos?' },
    { id: 'c4', criterio: 'Objetivos', pontos: 0, descricao: 'Os objetivos do que se pretende obter estão claramente definidos?' },
    { id: 'c5', criterio: 'Restrições', pontos: 0, descricao: 'O prompt menciona limitações ou requisitos importantes a considerar?' }
  ];

  const avaliarPrompt = (prompt) => {
    // Lógica simplificada de avaliação
    if (!prompt || prompt.length < 50) {
      return {
        pontuacao: 0,
        criterios: criterios.map(c => ({...c, pontos: 0})),
        feedback: "O prompt é muito curto. Tente adicionar mais detalhes e contexto."
      };
    }

    const avaliacaoCriterios = criterios.map(c => {
      let pontos = 0;
      
      // Avaliação básica baseada em palavras-chave e comprimento
      switch(c.id) {
        case 'c1': // Especificidade
          pontos = (prompt.length > 200) ? 2 : (prompt.length > 100) ? 1 : 0;
          pontos += (prompt.includes('anos') || prompt.includes('turma') || prompt.includes('alunos')) ? 1 : 0;
          break;
        case 'c2': // Estrutura
          pontos = (prompt.includes('\n') || prompt.includes('1.') || prompt.includes('2.')) ? 2 : 0;
          break;
        case 'c3': // Contexto
          pontos = (prompt.includes('alunos') || prompt.includes('sala') || prompt.includes('turma')) ? 2 : 0;
          break;
        case 'c4': // Objetivos
          pontos = (prompt.includes('objetivos') || prompt.includes('pretendo') || prompt.includes('quero')) ? 2 : 0;
          break;
        case 'c5': // Restrições
          pontos = (prompt.includes('minutos') || prompt.includes('tempo') || prompt.includes('recursos') || prompt.includes('disponíveis')) ? 2 : 0;
          break;
      }
      
      return {...c, pontos: Math.min(pontos, 3)};
    });

    const pontuacaoTotal = avaliacaoCriterios.reduce((sum, c) => sum + c.pontos, 0);
    const percentual = Math.round((pontuacaoTotal / (avaliacaoCriterios.length * 3)) * 100);
    
    let feedbackGeral = "";
    if (percentual < 30) {
      feedbackGeral = "O prompt precisa de melhorias significativas. Tente adicionar mais detalhes, contexto e estrutura.";
    } else if (percentual < 60) {
      feedbackGeral = "O prompt tem elementos úteis, mas poderia ser mais específico e estruturado para obter melhores resultados.";
    } else if (percentual < 80) {
      feedbackGeral = "Bom prompt! Tem muitos elementos importantes, mas ainda pode ser aprimorado em alguns aspectos.";
    } else {
      feedbackGeral = "Excelente prompt! Contém especificidade, estrutura clara e todos os elementos necessários para obter ótimos resultados.";
    }

    // Identificar áreas para melhoria
    const areasParaMelhoria = avaliacaoCriterios
      .filter(c => c.pontos < 2)
      .map(c => `${c.criterio}: ${c.descricao}`);

    return {
      pontuacao: percentual,
      criterios: avaliacaoCriterios,
      feedback: feedbackGeral,
      melhorias: areasParaMelhoria
    };
  };

  const handlePromptSubmit = () => {
    if (userPrompt.length < 10) {
      setFeedback({
        pontuacao: 0,
        feedback: "Por favor, escreva um prompt mais elaborado para avaliação."
      });
      return;
    }

    const resultado = avaliarPrompt(userPrompt);
    setFeedback(resultado);
    
    if (resultado.pontuacao >= 70 && selectedScenario) {
      if (!completedExercises.includes(selectedScenario.id)) {
        setCompletedExercises([...completedExercises, selectedScenario.id]);
      }
    }
  };

  const handleReset = () => {
    setUserPrompt('');
    setFeedback(null);
  };

  const getNextLevel = () => {
    if (activeLevel === 'basico' && completedExercises.filter(id => id.startsWith('b')).length >= 2) {
      return 'intermedio';
    }
    if (activeLevel === 'intermedio' && completedExercises.filter(id => id.startsWith('i')).length >= 2) {
      return 'avancado';
    }
    return activeLevel;
  };

  useEffect(() => {
    const nextLevel = getNextLevel();
    if (nextLevel !== activeLevel) {
      setActiveLevel(nextLevel);
    }
  }, [completedExercises]);

  const getProgressPercent = () => {
    const total = Object.values(scenarios).flat().length;
    return Math.round((completedExercises.length / total) * 100);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'intro':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Bem-vindo ao PromptCraft Edu!</h2>
            <p className="mb-4">Esta aplicação foi desenvolvida para ajudar professores a aprimorar suas habilidades na escrita de prompts eficazes para sistemas de IA, visando resultados pedagógicos mais relevantes e úteis.</p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <i data-lucide="coffee" className="w-5 h-5 mr-2 text-blue-500"></i>
                Por que prompts eficazes são importantes para professores?
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Economizam tempo ao obter respostas relevantes na primeira tentativa</li>
                <li>Produzem materiais educativos mais adaptados ao contexto específico</li>
                <li>Permitem personalizar recursos para diferentes necessidades dos alunos</li>
                <li>Ajudam a extrair o máximo potencial das ferramentas de IA para educação</li>
              </ul>
            </div>
            
            <h3 className="text-lg font-semibold mb-3">Como usar esta aplicação:</h3>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Estude os <strong>Princípios</strong> de escrita eficaz de prompts</li>
              <li>Pratique com os <strong>Cenários</strong> educativos, começando pelo nível básico</li>
              <li>Receba feedback sobre seus prompts e aprimore suas habilidades</li>
              <li>Avance para níveis mais complexos conforme sua proficiência aumenta</li>
            </ol>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <i data-lucide="zap" className="w-5 h-5 mr-2 text-yellow-500"></i>
                Dica inicial:
              </h3>
              <p>O segredo para prompts eficazes está na especificidade, estrutura e contexto. Quanto mais informações relevantes você fornecer, melhor será o resultado!</p>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button 
                onClick={() => setActiveTab('principios')} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
              >
                <i data-lucide="book-open" className="w-5 h-5 mr-2"></i>
                Começar a Aprender
              </button>
            </div>
          </div>
        );
        
      case 'principios':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Princípios para Prompts Educativos Eficazes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {principios.map(principio => (
                <div key={principio.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold mb-2 text-blue-700">{principio.title}</h3>
                  <p className="mb-3 text-gray-700">{principio.description}</p>
                  <div className="bg-white p-3 rounded-md border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Exemplo:</h4>
                    <p className="text-sm">{principio.exemplo}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center text-green-700">
                <i data-lucide="check-circle" className="w-5 h-5 mr-2 text-green-500"></i>
                Fórmula para um Prompt Educativo Eficaz
              </h3>
              <ol className="list-decimal pl-6 space-y-1">
                <li><strong>Contexto Educativo:</strong> nível, disciplina, características dos alunos</li>
                <li><strong>Objetivo Pedagógico:</strong> o que você quer alcançar</li>
                <li><strong>Restrições:</strong> tempo, recursos, requisitos curriculares</li>
                <li><strong>Detalhes Específicos:</strong> formato, estrutura, elementos desejados</li>
                <li><strong>Considerações Especiais:</strong> diferenciação, inclusão, etc.</li>
              </ol>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <i data-lucide="help-circle" className="w-5 h-5 mr-2 text-blue-500"></i>
                Perguntas orientadoras para elaborar seu prompt:
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Quem são meus alunos e quais são suas necessidades?</li>
                <li>Que recursos e limitações devo considerar?</li>
                <li>Quais elementos específicos preciso incluir na resposta?</li>
                <li>Como vou utilizar este material no meu contexto de ensino?</li>
                <li>Que formatos ou estruturas facilitariam o uso deste material?</li>
              </ul>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button 
                onClick={() => setActiveTab('pratica')} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
              >
                <i data-lucide="edit3" className="w-5 h-5 mr-2"></i>
                Praticar com Cenários
              </button>
            </div>
          </div>
        );
        
      case 'pratica':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Prática com Cenários Educativos</h2>
            <p className="mb-6">Selecione um cenário e escreva um prompt eficaz para resolver o desafio educativo apresentado.</p>
            
            <div className="mb-8">
              <div className="flex space-x-2 mb-4">
                <button 
                  onClick={() => setActiveLevel('basico')} 
                  className={`px-4 py-2 rounded-lg transition duration-200 ${activeLevel === 'basico' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  Nível Básico
                </button>
                <button 
                  onClick={() => setActiveLevel('intermedio')} 
                  className={`px-4 py-2 rounded-lg transition duration-200 ${activeLevel === 'intermedio' ? 'bg-blue-600 text-white' : 'bg-gray-200'} ${getNextLevel() === 'basico' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={getNextLevel() === 'basico'}
                >
                  Nível Intermédio
                </button>
                <button 
                  onClick={() => setActiveLevel('avancado')} 
                  className={`px-4 py-2 rounded-lg transition duration-200 ${activeLevel === 'avancado' ? 'bg-blue-600 text-white' : 'bg-gray-200'} ${getNextLevel() !== 'avancado' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={getNextLevel() !== 'avancado'}
                >
                  Nível Avançado
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scenarios[activeLevel].map(scenario => (
                  <div 
                    key={scenario.id} 
                    className={`p-4 rounded-lg border cursor-pointer transition duration-200 ${selectedScenario?.id === scenario.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                    onClick={() => setSelectedScenario(scenario)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{scenario.title}</h3>
                      {completedExercises.includes(scenario.id) && (
                        <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full flex items-center">
                          <i data-lucide="check-circle" className="w-3 h-3 mr-1"></i>
                          Concluído
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
                    <p className="text-xs text-gray-500">Contexto: {scenario.context}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {selectedScenario && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">{selectedScenario.title}</h3>
                <p className="mb-4">{selectedScenario.description}</p>
                <div className="bg-white p-3 rounded-md border border-gray-200 mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Contexto:</h4>
                  <p>{selectedScenario.context}</p>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="promptInput" className="font-medium">Escreva seu prompt:</label>
                    <button 
                      onClick={() => setShowTips(!showTips)} 
                      className="text-blue-600 text-sm flex items-center hover:underline"
                    >
                      <i data-lucide="message-circle" className="w-4 h-4 mr-1"></i>
                      {showTips ? "Ocultar dicas" : "Ver dicas"}
                    </button>
                  </div>
                  
                  {showTips && (
                    <div className="bg-yellow-50 p-3 rounded-md mb-3 border border-yellow-200">
                      <h4 className="text-sm font-medium text-yellow-700 mb-1">Dicas para este cenário:</h4>
                      <ul className="list-disc pl-4 space-y-1 text-sm">
                        {selectedScenario.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <textarea 
                    id="promptInput"
                    className="w-full p-3 border border-gray-300 rounded-lg min-h-[150px]"
                    placeholder="Escreva seu prompt aqui, considerando o contexto e os princípios aprendidos..."
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={handlePromptSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Avaliar Prompt
                  </button>
                  <button 
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 flex items-center"
                  >
                    <i data-lucide="rotate-ccw" className="w-4 h-4 mr-1"></i>
                    Limpar
                  </button>
                </div>
              </div>
            )}
            
            {feedback && (
              <div className={`p-4 rounded-lg mb-6 ${feedback.pontuacao >= 70 ? 'bg-green-50' : feedback.pontuacao >= 40 ? 'bg-yellow-50' : 'bg-red-50'}`}>
                <h3 className="text-lg font-semibold mb-2">Feedback do seu Prompt</h3>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Pontuação:</span>
                    <span className={`font-bold ${feedback.pontuacao >= 70 ? 'text-green-600' : feedback.pontuacao >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {feedback.pontuacao}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${feedback.pontuacao >= 70 ? 'bg-green-600' : feedback.pontuacao >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                      style={{width: `${feedback.pontuacao}%`}}
                    ></div>
                  </div>
                </div>
                
                <p className="mb-4">{feedback.feedback}</p>
                
                {feedback.criterios && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Avaliação por critério:</h4>
                    <div className="space-y-2">
                      {feedback.criterios.map(c => (
                        <div key={c.id} className="flex items-center">
                          <div className="w-32 flex-shrink-0 font-medium">{c.criterio}:</div>
                          <div className="flex-grow">
                            <div className="flex space-x-1">
                              {[...Array(3)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`w-8 h-2 rounded ${i < c.pontos ? 'bg-blue-500' : 'bg-gray-200'}`}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {feedback.melhorias && feedback.melhorias.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Áreas para melhoria:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      {feedback.melhorias.map((m, i) => (
                        <li key={i} className="text-sm">{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {feedback.pontuacao >= 70 && selectedScenario && (
                  <div className="mt-4 p-3 bg-green-100 rounded-lg flex items-start">
                    <i data-lucide="check-circle" className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"></i>
                    <div>
                      <p className="font-medium text-green-700">Excelente trabalho!</p>
                      <p className="text-sm">Seu prompt atende aos critérios de qualidade. Confira abaixo um exemplo de prompt modelo para este cenário.</p>
                    </div>
                  </div>
                )}
                
                {feedback.pontuacao >= 70 && selectedScenario && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Exemplo de prompt modelo:</h4>
                    <div className="bg-white p-3 rounded-md border border-gray-200 text-sm">
                      {selectedScenario.examplePrompt}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-between items-center mt-8">
              <button 
                onClick={() => setActiveTab('principios')} 
                className="text-blue-600 hover:underline flex items-center"
              >
                <i data-lucide="book-open" className="w-4 h-4 mr-1"></i>
                Revisar Princípios
              </button>
              
              <div className="text-sm text-gray-500">
                Progresso geral: {getProgressPercent()}% concluído
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i data-lucide="edit" className="w-6 h-6 text-blue-600 mr-2"></i>
              <h1 className="text-xl font-bold text-blue-800">PromptCraft Edu</h1>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setActiveTab('intro')} 
                className={`px-3 py-2 text-sm ${activeTab === 'intro' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Introdução
              </button>
              <button 
                onClick={() => setActiveTab('principios')} 
                className={`px-3 py-2 text-sm ${activeTab === 'principios' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Princípios
              </button>
              <button 
                onClick={() => setActiveTab('pratica')} 
                className={`px-3 py-2 text-sm ${activeTab === 'pratica' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Prática
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        {renderContent()}
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <i data-lucide="book" className="w-5 h-5 mr-2 text-blue-400"></i>
                PromptCraft Edu
              </h2>
              <p className="text-sm">Desenvolvido para formação de professores em escrita de prompts eficazes para IA</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <div className="text-sm mb-2">Dúvidas ou sugestões? Contacte o formador</div>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  <span className="sr-only">Recursos</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 4h-4V2h-6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-7 0h2v2h-2V4zm-2 4h6v2h-6V8zm-4 4h14v2H6v-2zm0 4h14v2H6v-2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  <span className="sr-only">Ajuda</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Inicializar os ícones do Lucide
document.addEventListener('DOMContentLoaded', function() {
  lucide.createIcons();
});

// Renderizar o componente React na página
ReactDOM.render(<PromptCraftEdu />, document.getElementById('root'));