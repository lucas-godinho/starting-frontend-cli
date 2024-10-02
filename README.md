
# Starting Frontend CLI

[![npm version](https://img.shields.io/npm/v/starting-frontend-cli)](https://www.npmjs.com/package/starting-frontend-cli)  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)  
[![Node Version](https://img.shields.io/badge/node-%3E%3D%2012.0.0-brightgreen)](https://nodejs.org/)

---

## 📋 Introdução

**Starting Frontend CLI** é a ferramenta que faltava para agilizar o início de qualquer projeto frontend! Esqueça a complexidade de configurar um ambiente de desenvolvimento ou lembrar comandos específicos para cada framework. Com um único comando, você pode gerar projetos utilizando os frameworks mais populares do mercado, como **React**, **Angular**, **Vue**, ou até mesmo configurar projetos legados. Ideal para desenvolvedores que desejam velocidade e eficiência na criação de novos projetos, seja para protótipos rápidos ou aplicações robustas.

A CLI foi pensada para ser intuitiva e interativa, permitindo que qualquer pessoa, desde iniciantes até desenvolvedores experientes, possa iniciar um projeto frontend em segundos. Você escolhe o framework, define o nome do projeto e deixa o resto com a Starting Frontend CLI!

## 🚀 Funcionalidades

- Criação rápida de projetos com **React**, **Angular**, **Vue.js** e templates legados.
- Uso simplificado com **comandos únicos** e interatividade.
- **Personalização** ao escolher o nome do projeto e framework.
- Compatível com sistemas baseados em Node.js, facilitando o setup em qualquer ambiente.

## 🛠 Como Utilizar

### Pré-requisitos

- **Node.js**: Versão 12.0.0 ou superior
- **npm**: Instalado junto com o Node.js

### Instalação Global

Para começar a usar a CLI, você precisa instalá-la globalmente. Siga os passos abaixo:

```bash
npm install -g starting-frontend-cli
```

### Iniciando um Projeto

1. Após a instalação, você pode rodar o seguinte comando para iniciar a CLI:

```bash
start-frontend
```

2. A CLI irá guiar você com algumas perguntas interativas:

- **Escolha o framework**: Selecione entre React, Angular, Vue ou Legacy.
- **Nome do projeto**: Digite o nome desejado para o seu projeto.

3. A CLI cuidará de todo o processo, configurando automaticamente o ambiente do seu projeto.

### Exemplo de Uso

```bash
start-frontend
```

Selecione um framework:

```
? Choose a frontend framework: (Use arrow keys)
❯ React
  Angular
  Vue
  Legacy
```

Digite o nome do projeto:

```
? What is the name of your project? my-awesome-project
```

A CLI então irá gerar o projeto com a configuração necessária, e você poderá começar a codar imediatamente!

## 📦 Desenvolvimento Local

Se quiser contribuir para o desenvolvimento da CLI ou rodá-la localmente, siga os passos abaixo:

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/starting-frontend-cli.git
cd starting-frontend-cli
```

2. Instale as dependências:

```bash
npm install
```

3. Compile o TypeScript:

```bash
npm run build
```

4. Teste a CLI localmente:

```bash
npm link
start-frontend
```

## 🔧 Comandos Disponíveis

- **`npm run build`**: Compila os arquivos TypeScript.
- **`npm run start`**: Executa a CLI sem precisar compilar (usando `ts-node`).
- **`npm link`**: Faz a CLI funcionar globalmente no ambiente de desenvolvimento local.

## 📄 Licença

Este projeto é licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🔍 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Inquirer.js** (para interatividade)
- **ShellJS** (execução de comandos shell)
- **Chalk** (para estilizar o terminal)

## 🛡️ Suporte

Se você encontrar algum problema, sinta-se à vontade para abrir uma [issue](https://github.com/lucas-godinho/starting-frontend-cliissues).

## 📢 Contribuições

Contribuições são muito bem-vindas! Se você tiver sugestões ou melhorias, abra uma pull request no repositório. Todos os tipos de contribuições são apreciados, desde correções de bugs até a adição de novos recursos.
