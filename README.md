# Ponte Saúde

# Tema: Limitação de Acesso a Dados Estratégicos do Território para Tomadores de Decisão em Saúde

## Equipe

* **Ponte Saúde**
* **Integrantes e Responsabilidades:**
  * **Pedro Henrique Félix da Fonseca** — Líder do Projeto, Desenvolvedor front-end em React.
  * **Julya** — Desenvolvedora e Gestora de Requisitos.
  * **Pedro Queiroz** — Modelagem do banco de dados, dados simulados e integração com o Supabase.

## Descrição do problema

Os tomadores de decisão em saúde do Recife enfrentam dificuldades no acesso a dados estratégicos do território, o que compromete o planejamento e torna a resposta às demandas locais mais lenta. O cenário afeta desde o gestor público até o Agente Comunitário de Saúde (ACS), que identifica as necessidades na ponta durante as visitas, mas carece de um canal simples para registrar ocorrências e acompanhar a resolução. Sem essa visão por bairro e Distrito Sanitário, a alocação dos dados tem como objetivo agilizar as decisões e garantir que a distribuição de recursos e insumos ocorra de forma mais rápida.

## Desafio CORETO

* **Link do Coreto:** [https://coreto.app.emprel.gov.br/banco-de-bo/limitacao-de-acesso-a-dados-estrategicos-do-territorio-para-tomadores-]

## Objetivo da Solução e Público Beneficiado

* **Objetivo:** Criar um web app responsivo para que os agentes registrem alertas territoriais de saúde em campo e os gestores acompanhem esses dados em um painel integrado, orientando a tomada de decisão e a distribuição de recursos entre os 8 Distritos Sanitários (DS I a DS VIII).

* **Público Beneficiado:** 
- **Agentes Comunitários de Saúde (ACS):** registram alertas da sua microárea pelo celular, com poucos toques.
- **Coordenadores das Unidades de Saúde da Família (USF):** recebem os alertas, fazem a triagem e organizam o atendimento local.
- **Gestores e supervisores dos Distritos Sanitários:** acompanham os indicadores por território e decidem onde direcionar equipes, insumos e campanhas.
- **População dos bairros atendidos**, beneficiada por respostas mais rápidas e mais bem direcionadas.

## Funcionalidades Previstas (Versão 1.0)

1. **Coleta de campo:** Formulário para o ACS registrar alertas com distrito sanitário, bairro, tipo de alerta, nível de prioridade, ponto de referência e descrição, sem dados pessoais de pacientes.
2. **Painel integrado:** Indicadores no topo (total de registros, alertas de prioridade crítica e demandas resolvidas) e filtros por distrito sanitário, tipo de alerta e prioridade.
3. **Fila de acompanhamento:** Fila de Acompanhamento em Tabela: Lista ordenada das ocorrências mais recentes para a mais antiga, com selo visual de prioridade e alteração de status na própria linha (Pendente pelo ACS, Em triagem pela USF e Resolvido pelo Distrito).
4. **Detalhes da ocorrência:** Botão que abre uma janela com informações do alerta, incluindo ponto de referência e descrição.
5. **Acesso por perfil:** Login com identificação do profissional e visualização para cada nível de atuação (ACS, coordenador de USF e gestor do distrito).

## Tecnologias previstas

- **Front-end:** React com Vite, React Router e CSS
- **Banco de dados e autenticação:** Supabase (a confirmar)
- **Controle de versão:** Git e GitHub
- **Gestão do projeto:** TRELLO
- **Hospedagem:** a definir