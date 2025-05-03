# brev.ly
Desafio Prático da Fase 1 da Pós Tech Developer 360 na FTR.

O objetivo é criar uma aplicação que permita o cadastro, listagem e remoção de links encurtados, geração de relatório dos acessos de cada link e também o redirecionamento correto do link encurtado para o link original.

## Back-end

### Funcionalidades e Regras

- [X]  Deve ser possível criar um link
    - [X]  Não deve ser possível criar um link com URL encurtada mal formatada
    - [X]  Não deve ser possível criar um link com URL encurtada já existente
- [ ]  Deve ser possível deletar um link
- [X]  Deve ser possível obter a URL original por meio de uma URL encurtada
- [X]  Deve ser possível listar todas as URL’s cadastradas
- [X]  Deve ser possível incrementar a quantidade de acessos de um link
- [ ]  Deve ser possível exportar os links criados em um CSV
    - [ ]  Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
    - [ ]  Deve ser gerado um nome aleatório e único para o arquivo
    - [ ]  Deve ser possível realizar a listagem de forma performática
    - [ ]  O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.

## Front-end

## Funcionalidades e Regras

Assim como na API, temos as seguintes funcionalidades e regras:

- [X]  Deve ser possível criar um link
    - [X]  Não deve ser possível criar um link com encurtamento mal formatado
    - [X]  Não deve ser possível criar um link com encurtamento já existente
- [ ]  Deve ser possível deletar um link
- [X]  Deve ser possível obter a URL original por meio do encurtamento
- [X]  Deve ser possível listar todas as URL’s cadastradas
- [X]  Deve ser possível incrementar a quantidade de acessos de um link
- [ ]  Deve ser possível baixar um CSV com o relatório dos links criados

Além disso, também temos algumas regras importantes específicas para o front-end:

- [X]  É obrigatória a criação de uma aplicação React no formato SPA utilizando o Vite como `bundler`;
- [X]  Siga o mais fielmente possível o layout do Figma;
- [X]  Trabalhe com elementos que tragam uma boa experiência ao usuário (`empty state`, ícones de carregamento, bloqueio de ações a depender do estado da aplicação);
- [X]  Foco na responsividade: essa aplicação deve ter um bom uso tanto em desktops quanto em celulares.
